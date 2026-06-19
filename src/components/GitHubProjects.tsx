import { useEffect, useState } from "react";
import { getProjects } from "../services/github";

export default function GitHubProjects() {
  const [repos, setRepos] = useState<any[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    getProjects()
      .then((data) => {
        console.log("GitHub Data:", data);
        setRepos(data);
      })
      .catch((error) => {
        console.error("GitHub Error:", error);
        setError(true);
      });
  }, []);

  return (
    <section
      id="projects"
      className="py-24 px-8 max-w-7xl mx-auto"
    >
      <h2 className="text-5xl font-bold mb-4">
        My Projects
      </h2>

      <p className="text-gray-400 mb-12">
        Explore my latest software engineering, DevOps, cloud infrastructure,
        automation, and open-source projects.
      </p>

      {error && (
        <p className="text-center text-red-400 mb-8">
          Unable to load GitHub repositories.
        </p>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-green-500 transition"
          >
            <h3 className="text-2xl font-bold">
              {repo.name}
            </h3>

            <p className="text-gray-400 mt-4">
              {repo.description || "No description available"}
            </p>

            <div className="flex gap-4 mt-4">
              <span>⭐ {repo.stargazers_count}</span>
              <span>🍴 {repo.forks_count}</span>
            </div>

            <div className="mt-4">
              <span className="text-green-400">
                {repo.language}
              </span>
            </div>

            <div className="mt-6">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 px-4 py-2 rounded-lg"
              >
                View Repository
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}