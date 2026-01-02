type GithubUser = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
};

type Data = {
  [key: string | number | symbol]: any;
};

type PinnedRepo = {
  owner: string;
  repo: string;
  internal_link?: string;
  link?: string;
  description?: string;
  language?: string;
  languageColor?: string;
  stars: number;
  forks: number;
};

export async function getPinnedRepos(username: string): Promise<{
  user: GithubUser;
  pinned_repos: PinnedRepo[];
  pinned_repos_total_stars: number;
}> {
  // 1. Official GitHub API for user data
  const apiUrl = `https://api.github.com/users/${username}`;
  const apiResponse = await fetch(apiUrl, {
    headers: { 'User-Agent': 'github-pinned-sdk/1.0.0' }
  });
  if (!apiResponse.ok) {
    throw new Error(`GitHub API failed: ${apiResponse.status}`);
  }
  const user: GithubUser = await apiResponse.json();

  // 2. Scrape page for pinned repos (no official endpoint)
  const pageUrl = `https://github.com/${username}`;
  const pageResponse = await fetch(pageUrl, {
    headers: { 'User-Agent': 'github-pinned-sdk/1.0.0' }
  });
  if (!pageResponse.ok) {
    throw new Error(`GitHub page fetch failed: ${pageResponse.status}`);
  }
  
  const html = await pageResponse.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  const pinnedItems = doc.querySelectorAll('.js-pinned-items-reorder-container > ol > li');
  const pinnedRepositories: PinnedRepo[] = [];
  let pinnedRepositoriesStars = 0;
  
  pinnedItems.forEach((elem) => {
    const ownerEl = elem.querySelector('.owner');
    const owner = ownerEl ? ownerEl.textContent?.trim() || username : username;
    
    const repoEl = elem.querySelector('.repo');
    const repo = repoEl ? repoEl.textContent?.trim() || '' : '';
    
    const linkEl = elem.querySelector('a');
    const internal_link = linkEl?.getAttribute('href') || undefined;
    const link = internal_link ? `https://github.com${internal_link}` : undefined;
    
    const descEl = elem.querySelector('.pinned-item-desc');
    let description = descEl ? descEl.textContent?.trim() || undefined : undefined;
    if (description) {
      description = description.slice(9, -7).trim();
    }
    
    const langEl = elem.querySelector('[itemprop="programmingLanguage"]');
    const language = langEl ? langEl.textContent?.trim() || undefined : undefined;
    
    const langColorEl = elem.querySelector('.repo-language-color');
    const languageColor = langColorEl ? langColorEl.getAttribute('style')?.match(/background-color:\s*(.+?);/)?.[1] || undefined : undefined;
    
    const starsEl = elem.querySelector('a[href$="/stargazers"]');
    const stars = starsEl ? parseInt(starsEl.textContent?.trim() || '0', 10) : 0;
    
    const forksEl = elem.querySelector('a[href$="/forks"]');
    const forks = forksEl ? parseInt(forksEl.textContent?.trim() || '0', 10) : 0;
    
    const repoData: PinnedRepo = {
      owner,
      repo,
      ...(internal_link !== undefined && { internal_link }),
      ...(link !== undefined && { link }),
      ...(description !== undefined && { description }),
      ...(language !== undefined && { language }),
      ...(languageColor !== undefined && { languageColor }),
      stars,
      forks,
    };

    pinnedRepositories.push(repoData);
    pinnedRepositoriesStars += stars;
  });
  
  return {
    user,
    pinned_repos: pinnedRepositories,
    pinned_repos_total_stars: pinnedRepositoriesStars,
  };
}
