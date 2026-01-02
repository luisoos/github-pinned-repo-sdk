import { expect, test, describe } from 'vitest';
import { getPinnedRepos } from '../src/index.js';
describe('getPinnedRepos with GitHub API', () => {
    test('fetches user profile + pinned repos', async () => {
        const result = await getPinnedRepos('torvalds');
        // API user data
        expect(result.user.login).toBe('torvalds');
        expect(result.user.public_repos).toBeTypeOf('number');
        expect(result.user.followers).toBeTypeOf('number');
        expect(result.user.avatar_url).toMatch(/^https/);
        // Scraped pinned data
        expect(Array.isArray(result.pinned_repos)).toBe(true);
        expect(result.pinned_repos.length).toBeGreaterThan(0);
        expect(result.pinned_repos[0]?.owner).toBe('torvalds');
        expect(result.pinned_repos_total_stars).toBeGreaterThan(0);
    });
});
//# sourceMappingURL=index.test.js.map