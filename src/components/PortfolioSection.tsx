import { useEffect, useState } from "react";
import PixelReveal from "./PixelReveal";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  homepage: string | null;
}

const langColors: Record<string, string> = {
  TypeScript: "hsl(210, 80%, 55%)",
  JavaScript: "hsl(50, 90%, 50%)",
  Python: "hsl(210, 50%, 45%)",
  HTML: "hsl(15, 80%, 55%)",
  CSS: "hsl(260, 50%, 55%)",
  Java: "hsl(20, 70%, 50%)",
  "C++": "hsl(340, 60%, 50%)",
  Shell: "hsl(120, 40%, 45%)",
};

const PortfolioSection = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/z927/repos?sort=updated&per_page=30")
      .then((res) => res.json())
      .then((data: GitHubRepo[]) => {
        const filtered = data
          .filter((r) => !r.name.startsWith("z927"))
          .sort((a, b) => b.stargazers_count - a.stargazers_count);
        setRepos(filtered);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="portfolio" className="py-24 bg-card/50 relative">
      <div className="container mx-auto px-6 relative z-10">
        <PixelReveal>
          <p className="font-mono text-primary text-sm tracking-widest uppercase mb-2">
            &gt; my_projects
          </p>
          <h2 className="text-4xl font-bold mb-12">
            Port<span className="text-accent text-glow-purple">folio</span>
          </h2>
        </PixelReveal>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 rounded-lg bg-muted animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, i) => (
              <PixelReveal key={repo.id} delay={i * 0.06} cols={6} rows={4}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-card border border-border rounded-lg p-5 hover:border-primary/50 transition-all hover:shadow-[var(--glow-green)]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-heading text-xs text-foreground group-hover:text-primary transition-colors leading-relaxed">
                      {repo.name}
                    </h3>
                    <svg
                      className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {repo.description || "No description provided."}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{
                            backgroundColor:
                              langColors[repo.language] || "hsl(var(--muted-foreground))",
                          }}
                        />
                        {repo.language}
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        {repo.stargazers_count}
                      </span>
                    )}
                    {repo.forks_count > 0 && (
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="18" r="3" />
                          <circle cx="6" cy="6" r="3" />
                          <circle cx="18" cy="6" r="3" />
                          <path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" />
                          <path d="M12 12v3" />
                        </svg>
                        {repo.forks_count}
                      </span>
                    )}
                  </div>
                </a>
              </PixelReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
