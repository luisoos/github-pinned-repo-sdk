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

#### Usage
```ts
import { getPinnedRepos } from 'github-pinned-repo-sdk';

const data = await getPinnedRepos('sindresorhus');
```

##### TypeScript
Define types: 
```ts
import { getPinnedRepos } from 'github-pinned-repo-sdk';

type ApiResponse = {
  user: GithubUser;
  pinned_repos: PinnedRepo[];
  pinned_repos_total_stars: number;
};

const data: ApiResponse = await getPinnedRepos('sindresorhus');
```

### Testing
Run tests using vitest:
```bash
npm test
```

#### In node console
```bash
node -e "import('./dist/index.js').then(async m=>{const {JSDOM}=await import('jsdom');global.DOMParser=new JSDOM().window.DOMParser;const data=await m.getPinnedRepos('luisoos');console.log(data)})"
```