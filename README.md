# GitHub Pinned Repository SDK

[![npm version](https://img.shields.io/npm/v/github-pinned-repo-sdk)](https://npmjs.com/package/github-pinned-repo-sdk)
[![npm downloads](https://img.shields.io/npm/dm/github-pinned-repo-sdk)](https://npmjs.com/package/github-pinned-repo-sdk)
[![License](https://img.shields.io/npm/l/github-pinned-repo-sdk)](https://github.com/luisoos/github-pinned-repo-sdk/blob/main/LICENSE)

Fetch GitHub user profile + pinned repositories with full TypeScript support.

**Based on** [better-github-api](https://github.com/luisoos/better-github-api)

## 🚀 Installation
```bash
npm i github-pinned-repo-sdk

// OR using yarn

yarn add github-pinned-repo-sdk
```

## 📖 Usage
```ts
import { getPinnedRepos } from 'github-pinned-repo-sdk';

const data = await getPinnedRepos('sindresorhus');
```

#### TypeScript
Define types: 
```ts
import { getPinnedRepos, type PinnedRepo, type GithubUser } from 'github-pinned-repo-sdk';

type ApiResponse = {
  user: GithubUser;
  pinned_repos: PinnedRepo[];
  pinned_repos_total_stars: number;
};

const data: ApiResponse = await getPinnedRepos('sindresorhus');
```

## 🧪 Testing
Run tests using vitest:
```bash
npm test
```

### In node console
```bash
node -e "import('./dist/index.js').then(m => m.getPinnedRepos('luisoos').then(console.log))"
```

## 🌐 Astro Example

```astro
--- 
import { getPinnedRepos } from 'github-pinned-repo-sdk';
const { user, pinned_repos } = await getPinnedRepos('torvalds');
***
<h1>{user.login}</h1>
<ul>
  {pinned_repos.map(repo => (
    <li>
      <a href={repo.link}>{repo.repo}</a> 
      <span>⭐ {repo.stars.toLocaleString()}</span>
    </li>
  ))}
</ul>
```

## 📦 Features

- ✅ **Extremely Lightweight** (pure `fetch` + `jsdom`)
- ✅ **Robust Parsing** (uses `jsdom` for reliable scraping)
- ✅ **Full TypeScript** (IntelliSense ready)
- ✅ **Node.js & SSR** optimized (perfect for Astro/Next.js)
- ✅ **GitHub API** + HTML scraping hybrid
- ✅ **Rate-limit safe** (User-Agent headers)

## 🙌 Credits

Inspired by [better-github-api](https://github.com/luisoos/better-github-api)

## 📄 License

MIT © [luisoos](https://github.com/luisoos)