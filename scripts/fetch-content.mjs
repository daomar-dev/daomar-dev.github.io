#!/usr/bin/env node
/**
 * Daily content builder for daomar.dev.
 *
 * Pulls public data from:
 *   - https://api.github.com/orgs/daomar-dev/repos (all public repos)
 *   - For each repo: README, recent commits, recent releases
 *   - https://luckydraw.daomar.dev/sitemap.xml, /llms.txt, /feed.xml, /rss.xml
 *
 * Writes:
 *   - data/updates.json  -> drives /updates.html and homepage pulse
 *   - data/sources.json  -> drives /sources.html
 *
 * Designed to be run from GitHub Actions. Uses GITHUB_TOKEN if available
 * (just for higher rate limits — only public data is read).
 *
 * Node 20+; no dependencies (uses global fetch).
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ORG = 'daomar-dev';
const LUCKY_DOMAIN = 'luckydraw.daomar.dev';
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DATA_DIR = resolve(ROOT, 'data');

const GH_TOKEN = process.env.GITHUB_TOKEN || '';
const UA = 'daomar-dev-site-builder';

function ghHeaders() {
  const h = {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': UA,
  };
  if (GH_TOKEN) h.Authorization = `Bearer ${GH_TOKEN}`;
  return h;
}

async function safeFetchJSON(url, headers = {}) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA, ...headers } });
    if (!res.ok) return null;
    return await res.json();
  } catch (_) {
    return null;
  }
}

async function safeFetchText(url, headers = {}) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA, ...headers } });
    if (!res.ok) return null;
    return await res.text();
  } catch (_) {
    return null;
  }
}

function plainText(markdown) {
  if (!markdown) return '';
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[#*_`>|]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function firstSentence(text, max = 240) {
  if (!text) return '';
  const t = text.slice(0, 800);
  const m = t.match(/^(.+?[\.!?。！？])\s/);
  const s = m ? m[1] : t;
  return s.length > max ? s.slice(0, max - 1).trim() + '…' : s;
}

async function listRepos() {
  const repos = [];
  let page = 1;
  while (true) {
    const url = `https://api.github.com/orgs/${ORG}/repos?per_page=100&type=public&sort=updated&page=${page}`;
    const data = await safeFetchJSON(url, ghHeaders());
    if (!data || !Array.isArray(data) || data.length === 0) break;
    repos.push(...data.filter((r) => !r.private && !r.archived));
    if (data.length < 100) break;
    page += 1;
  }
  return repos;
}

async function fetchRepoReadme(repo) {
  // Try the API first (handles default branch & case-insensitive name).
  const apiUrl = `https://api.github.com/repos/${ORG}/${repo.name}/readme`;
  const meta = await safeFetchJSON(apiUrl, ghHeaders());
  if (meta && meta.download_url) {
    const text = await safeFetchText(meta.download_url);
    if (text) return text;
  }
  // Fallback: raw default branch.
  const branch = repo.default_branch || 'main';
  for (const name of ['README.md', 'readme.md', 'Readme.md', 'README.MD']) {
    const raw = await safeFetchText(`https://raw.githubusercontent.com/${ORG}/${repo.name}/${branch}/${name}`);
    if (raw) return raw;
  }
  return '';
}

async function fetchRecentCommits(repo, limit = 5) {
  const url = `https://api.github.com/repos/${ORG}/${repo.name}/commits?per_page=${limit}`;
  const data = await safeFetchJSON(url, ghHeaders());
  if (!Array.isArray(data)) return [];
  return data
    .filter((c) => c && c.commit)
    .map((c) => ({
      sha: c.sha,
      message: (c.commit.message || '').split('\n')[0].slice(0, 180),
      date: c.commit.author?.date || c.commit.committer?.date || null,
      url: c.html_url,
      author: c.author?.login || c.commit.author?.name || null,
    }));
}

async function fetchRecentReleases(repo, limit = 3) {
  const url = `https://api.github.com/repos/${ORG}/${repo.name}/releases?per_page=${limit}`;
  const data = await safeFetchJSON(url, ghHeaders());
  if (!Array.isArray(data)) return [];
  return data
    .filter((r) => !r.draft)
    .map((r) => ({
      name: r.name || r.tag_name,
      tag: r.tag_name,
      date: r.published_at || r.created_at,
      url: r.html_url,
      summary: firstSentence(plainText(r.body || '')),
    }));
}

function extractLinksFromXML(xml, host) {
  if (!xml) return [];
  const re = new RegExp(`https?:\\/\\/${host.replace(/\./g, '\\.')}[^\\s<"'\\]]+`, 'g');
  return [...new Set([...xml.matchAll(re)].map((m) => m[0]))];
}

async function fetchLuckyDraw() {
  const base = `https://${LUCKY_DOMAIN}`;
  const result = {
    summary: 'Lucky Draw is a simple web app for fair random draws and giveaways. The repository is private; this entry summarizes only public website content.',
    links: [],
    llms: null,
    fetchedAt: new Date().toISOString(),
  };

  // llms.txt
  const llms = await safeFetchText(`${base}/llms.txt`);
  if (llms) {
    result.llms = llms.slice(0, 4000);
    const firstPara = firstSentence(plainText(llms), 280);
    if (firstPara && firstPara.length > 40) result.summary = firstPara;
  }

  const candidates = ['/sitemap.xml', '/feed.xml', '/rss.xml', '/atom.xml', '/index.xml'];
  for (const p of candidates) {
    const text = await safeFetchText(base + p);
    if (text) {
      result.links.push(...extractLinksFromXML(text, LUCKY_DOMAIN));
    }
  }
  result.links = [...new Set(result.links)].slice(0, 50);
  if (!result.links.includes(base + '/')) result.links.unshift(base + '/');
  return result;
}

async function build() {
  await mkdir(DATA_DIR, { recursive: true });

  const repos = await listRepos();
  console.log(`Found ${repos.length} public repos under ${ORG}.`);

  const repoSummaries = [];
  const items = []; // unified activity feed
  let agentfleetSnapshot = null;
  const otherRepos = [];

  for (const repo of repos) {
    const readme = await fetchRepoReadme(repo);
    const readmePlain = plainText(readme);
    const summary = firstSentence(readmePlain, 280) || repo.description || '';
    const [commits, releases] = await Promise.all([
      fetchRecentCommits(repo, 3),
      fetchRecentReleases(repo, 2),
    ]);

    repoSummaries.push({
      name: repo.name,
      url: repo.html_url,
      homepage: repo.homepage || null,
      description: repo.description || summary || '',
      language: repo.language || null,
      stars: repo.stargazers_count || 0,
      updatedAt: repo.pushed_at || repo.updated_at,
      topics: repo.topics || [],
    });

    if (repo.name === 'agentfleet') {
      agentfleetSnapshot = {
        name: repo.name,
        url: repo.html_url,
        summary,
        readme: readme.slice(0, 6000),
        updatedAt: repo.pushed_at || repo.updated_at,
      };
    } else {
      otherRepos.push({
        name: repo.name,
        url: repo.html_url,
        homepage: repo.homepage || null,
        description: repo.description || summary || '',
      });
    }

    for (const c of commits) {
      items.push({
        date: c.date,
        source: `${repo.name} · commit`,
        title: c.message,
        summary: c.author ? `By ${c.author}` : '',
        url: c.url,
      });
    }
    for (const r of releases) {
      items.push({
        date: r.date,
        source: `${repo.name} · release`,
        title: `${repo.name} ${r.tag}${r.name && r.name !== r.tag ? ' — ' + r.name : ''}`,
        summary: r.summary,
        url: r.url,
      });
    }
  }

  // Lucky Draw public website
  const lucky = await fetchLuckyDraw();
  if (lucky.links.length) {
    items.push({
      date: lucky.fetchedAt,
      source: 'luckydraw.daomar.dev',
      title: `Lucky Draw — ${lucky.links.length} public URL${lucky.links.length === 1 ? '' : 's'} discovered`,
      summary: lucky.summary,
      url: `https://${LUCKY_DOMAIN}/`,
    });
  }

  // Sort items by date desc
  items.sort((a, b) => {
    const da = a.date ? new Date(a.date).getTime() : 0;
    const db = b.date ? new Date(b.date).getTime() : 0;
    return db - da;
  });

  const generatedAt = new Date().toISOString();

  const updates = {
    generatedAt,
    org: ORG,
    repos: repoSummaries,
    items: items.slice(0, 40),
  };

  const sources = {
    generatedAt,
    agentfleet: agentfleetSnapshot || {
      name: 'agentfleet',
      url: `https://github.com/${ORG}/agentfleet`,
      summary: 'AgentFleet orchestrates AI coding agents across multiple machines without a hosted backend.',
      readme: '',
    },
    luckydraw: {
      summary: lucky.summary,
      links: lucky.links,
      llms: lucky.llms,
    },
    otherRepos,
  };

  await writeFile(resolve(DATA_DIR, 'updates.json'), JSON.stringify(updates, null, 2));
  await writeFile(resolve(DATA_DIR, 'sources.json'), JSON.stringify(sources, null, 2));

  console.log(`Wrote ${updates.items.length} items, ${repoSummaries.length} repos, ${lucky.links.length} luckydraw links.`);
}

build().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
