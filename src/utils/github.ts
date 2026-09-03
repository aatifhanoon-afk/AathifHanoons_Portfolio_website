export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  language: string | null;
  stars: number;
  repoUrl: string;
  liveUrl: string | null;
  isPrivate: boolean;
  topics: string[];
}

function categorizeRepo(name: string, desc: string): 'ai-web' | 'automation' {
  const text = (name + ' ' + desc).toLowerCase();
  if (text.match(/cli|script|auto|deploy|bash|shell|workflow|tool/)) return 'automation';
  return 'ai-web';
}

export async function fetchGitHubRepos(
  username: string,
  pat?: string,
  exclusions: string[] = []
): Promise<GitHubRepo[]> {
  if (!username) throw new Error('No GitHub username');

  const headers: Record<string, string> = {};
  if (pat) headers['Authorization'] = `Bearer ${pat}`;

  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`,
    { headers }
  );

  if (!res.ok) throw new Error(`GitHub API ${res.status}`);

  const data = await res.json();
  if (!Array.isArray(data)) throw new Error('Invalid response');

  return data
    .filter((r: Record<string, unknown>) => {
      const name = r.name as string;
      return !r.fork && !r.archived && !exclusions.includes(name);
    })
    .map((r: Record<string, unknown>) => ({
      id: r.id as number,
      name: (r.name as string).replace(/-/g, ' '),
      description: (r.description as string) || 'No description provided.',
      language: (r.language as string) || null,
      stars: r.stargazers_count as number,
      repoUrl: r.html_url as string,
      liveUrl: (r.homepage as string) || null,
      isPrivate: (r.private as boolean) || false,
      topics: (r.topics as string[]) || [],
    }))
    .map((r) => ({ ...r, category: categorizeRepo(r.name, r.description) }));
}
