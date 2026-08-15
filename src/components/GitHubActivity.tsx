import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { portfolioData } from '../data/portfolioData';
import { Github, Star, GitFork, Calendar, RefreshCw, AlertTriangle, ArrowRight } from 'lucide-react';

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  pushed_at: string;
  fork: boolean;
  topics: string[];
}

const CACHE_KEY = 'github_repos_data';
const CACHE_TIME_KEY = 'github_repos_timestamp';
const CACHE_DURATION_MS = 45 * 60 * 1000; // 45 mins cache

// Get standard color badges for programming languages
const getLanguageColor = (lang: string) => {
  const norm = lang.toLowerCase();
  if (norm.includes('python')) return 'bg-[#3572A5]';
  if (norm.includes('typescript') || norm === 'ts') return 'bg-[#3178C6]';
  if (norm.includes('javascript') || norm === 'js') return 'bg-[#f1e05a]';
  if (norm.includes('html')) return 'bg-[#e34c26]';
  if (norm.includes('css')) return 'bg-[#563d7c]';
  if (norm.includes('java')) return 'bg-[#b07219]';
  if (norm.includes('c++')) return 'bg-[#f34b7d]';
  if (norm.includes('shell') || norm.includes('bash')) return 'bg-[#89e051]';
  return 'bg-[#858585]';
};

export const GitHubActivity: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rateLimited, setRateLimited] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  
  const sectionRef = useRef<HTMLDivElement>(null);

  // Fetch repositories from API or cache
  const fetchRepos = async (signal?: AbortSignal) => {
    setIsLoading(true);
    setError(null);
    setRateLimited(false);

    try {
      // 1. Check LocalStorage Cache
      const cachedData = localStorage.getItem(CACHE_KEY);
      const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
      const now = Date.now();

      if (cachedData && cachedTime && now - Number(cachedTime) < CACHE_DURATION_MS) {
        const parsed = JSON.parse(cachedData) as Repository[];
        setRepos(parsed);
        setIsLoading(false);
        setHasLoadedOnce(true);
        return;
      }

      // 2. Fetch from GitHub API
      const response = await fetch(
        'https://api.github.com/users/KAVIN-RAJENDRAN/repos?sort=pushed&per_page=60',
        { signal }
      );

      if (response.status === 403) {
        setRateLimited(true);
        throw new Error('API rate limit exceeded. Please view my profile on GitHub or try again later.');
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch repositories: ${response.statusText}`);
      }

      const data = await response.json() as Repository[];
      
      // Filter out forks and slice first 6 items
      const filtered = data
        .filter((repo) => !repo.fork)
        .slice(0, 6);

      // Save to cache
      localStorage.setItem(CACHE_KEY, JSON.stringify(filtered));
      localStorage.setItem(CACHE_TIME_KEY, now.toString());

      setRepos(filtered);
      setHasLoadedOnce(true);
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Lazy loading using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasLoadedOnce) {
          const controller = new AbortController();
          fetchRepos(controller.signal);
          return () => controller.abort();
        }
      },
      { rootMargin: '0px 0px 100px 0px', threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasLoadedOnce]);

  const handleRetry = () => {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(CACHE_TIME_KEY);
    fetchRepos();
  };

  // Format Date (e.g., Jul 2026)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  // Render Skeletons (6 cards)
  const renderSkeletons = () => {
    return Array.from({ length: 6 }).map((_, idx) => (
      <div 
        key={idx} 
        className="rounded-xl p-6 border flex flex-col justify-between h-[190px] animate-pulse bg-white dark:bg-[#0D1117] border-[#e1e4e8] dark:border-[#21262d]"
      >
        <div>
          <div className="h-5 bg-text-secondary/15 rounded w-2/3 mb-4" />
          <div className="h-3.5 bg-text-secondary/10 rounded w-full mb-2" />
          <div className="h-3.5 bg-text-secondary/10 rounded w-4/5" />
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="h-3.5 bg-text-secondary/10 rounded w-1/4" />
          <div className="h-3.5 bg-text-secondary/10 rounded w-1/4" />
        </div>
      </div>
    ));
  };

  return (
    <section id="github" ref={sectionRef} className="section bg-background py-20 select-none md:select-text">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading title="GitHub Repositories" subtitle="Real-Time Activity" />

        {/* Content States */}
        {isLoading && repos.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {renderSkeletons()}
          </div>
        ) : error || rateLimited ? (
          /* Error State Card */
          <div className="glass-card rounded-xl p-8 max-w-lg mx-auto text-center border border-border mt-12">
            <div className="flex justify-center text-text-secondary mb-4">
              <AlertTriangle size={48} className="text-text-secondary/60 animate-bounce" />
            </div>
            
            <h3 className="font-outfit font-bold text-lg text-text-primary mb-2">
              {rateLimited ? 'Rate Limit Reached' : 'Failed to Load Repositories'}
            </h3>
            
            <p className="text-sm font-light text-text-secondary mb-6 leading-relaxed">
              {error}
            </p>

            <button
              onClick={handleRetry}
              className="btn btn-outline border border-border font-mono text-xs py-2 px-4 rounded-lg inline-flex items-center gap-2 hover:bg-text-primary hover:text-background transition-colors"
            >
              <RefreshCw size={13} />
              <span>Retry Fetching</span>
            </button>
          </div>
        ) : repos.length === 0 && hasLoadedOnce ? (
          /* Empty State */
          <div className="glass-card rounded-xl p-8 max-w-lg mx-auto text-center border border-border mt-12">
            <h3 className="font-outfit font-bold text-lg text-text-primary mb-2">
              No Public Repositories Found
            </h3>
            <p className="text-sm font-light text-text-secondary leading-relaxed">
              It looks like there are no public repositories available on this account.
            </p>
          </div>
        ) : (
          /* Main Repository Cards Grid - Styled like real GitHub Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {repos.map((repo, idx) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="rounded-xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg relative group h-[190px] bg-white dark:bg-[#0D1117] border border-[#e1e4e8] dark:border-[#21262d] hover:border-accent/40"
              >
                <div>
                  {/* Repo title */}
                  <div className="flex items-start gap-2 mb-2 justify-between">
                    <h3 className="font-outfit font-extrabold text-base text-accent leading-snug group-hover:text-accent-secondary transition-colors break-all">
                      {repo.name}
                    </h3>
                    <Github size={16} className="text-text-secondary/60 flex-shrink-0 group-hover:text-text-primary transition-colors" />
                  </div>

                  {/* Description */}
                  <p className="text-xs font-light text-text-secondary leading-relaxed line-clamp-3">
                    {repo.description || 'No description provided.'}
                  </p>
                </div>

                {/* Metadata row */}
                <div className="flex items-center justify-between text-[11px] font-mono text-text-secondary mt-4 border-t border-border/40 pt-3 select-none">
                  <div className="flex items-center gap-3">
                    {/* Primary Language */}
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span className={`w-2.5 h-2.5 rounded-full ${getLanguageColor(repo.language)}`} />
                        {repo.language}
                      </span>
                    )}

                    {/* Stars count */}
                    <span className="flex items-center gap-0.5">
                      <Star size={11} className="text-text-secondary/80" />
                      {repo.stargazers_count}
                    </span>

                    {/* Forks count */}
                    <span className="flex items-center gap-0.5">
                      <GitFork size={11} className="text-text-secondary/80" />
                      {repo.forks_count}
                    </span>
                  </div>

                  {/* Date pushed */}
                  <span className="flex items-center gap-1 opacity-70">
                    <Calendar size={11} />
                    {formatDate(repo.pushed_at)}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        )}

        {/* View Profile Button */}
        <div className="text-center mt-12 select-none">
          <a
            href="https://github.com/KAVIN-RAJENDRAN"
            target="_blank"
            rel="noopener noreferrer"
            className="group btn btn-outline border border-border hover:bg-text-primary hover:text-background font-mono text-xs py-3.5 px-6 rounded-lg inline-flex items-center gap-2 transition-all shadow-sm"
          >
            <span>View GitHub Profile</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
};
