const container = document.getElementById("tool-container");
const pinnedContainer = document.getElementById("pinned-section");
const categoryFilter = document.getElementById("categoryFilter");
const searchInput = document.getElementById("searchInput");

const GITHUB_TOKEN = "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"; // Replace with your token

// Fetch all public repos of the user
async function getAllRepos(username) {
  const headers = {
    Accept: "application/vnd.github.mercy-preview+json"
  };
  if (GITHUB_TOKEN) headers.Authorization = `token ${GITHUB_TOKEN}`;

  const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers });
  const repos = await res.json();

  if (!Array.isArray(repos)) {
    console.error("GitHub API error:", repos);
    return [];
  }

  return repos
    .filter(repo => !(overrides[repo.name]?.hide))
    .map(repo => ({
      repo: `${username}/${repo.name}`,
      category: overrides[repo.name]?.category || "Auto",
      pinned: overrides[repo.name]?.pin || false
    }));
}

// Fetch repo details + detect primary language (with fallback and formatting)
async function fetchRepo(repoPath) {
  const headers = {
    Accept: "application/vnd.github.mercy-preview+json"
  };
  if (GITHUB_TOKEN) headers.Authorization = `token ${GITHUB_TOKEN}`;

  const [repoRes, langRes] = await Promise.all([
    fetch(`https://api.github.com/repos/${repoPath}`, { headers }),
    fetch(`https://api.github.com/repos/${repoPath}/languages`, { headers })
  ]);

  const repoData = await repoRes.json();
  const langData = await langRes.json();

  if (!repoRes.ok) return null;

  // Determine primary language from .language or fallback to top used
  let primaryLang = repoData.language;
  if (!primaryLang || primaryLang === "null") {
    const languages = Object.entries(langData); // [ [lang, bytes], ... ]
    if (languages.length > 0) {
      primaryLang = languages.sort((a, b) => b[1] - a[1])[0][0];
    } else {
      primaryLang = "N/A";
    }
  }

  // Bonus: Format some technical language names to friendly names
  if (primaryLang === "Batchfile") primaryLang = "CMD/Batch";
  if (primaryLang === "Shell") primaryLang = "Shell Script";

  return {
    ...repoData,
    primary_language: primaryLang
  };
}

// Search and category filter match
function matchFilter(tool, search, category) {
  const textMatch = tool.name.toLowerCase().includes(search.toLowerCase()) ||
    (tool.description || "").toLowerCase().includes(search.toLowerCase());
  const categoryMatch = category === "all" || tool.category === category;
  return textMatch && categoryMatch;
}

// Render all tool cards
async function renderTools() {
  container.innerHTML = "";
  pinnedContainer.innerHTML = "";

  const tools = await getAllRepos(username);
  const fetches = tools.map(tool => fetchRepo(tool.repo));
  const results = await Promise.all(fetches);

  results.forEach((data, index) => {
    if (!data) return;
    const tool = tools[index];

    tool.name = data.name;
    tool.description = data.description || "No description available.";
    tool.language = data.primary_language;
    tool.url = data.html_url;

    const topics = (data.topics || []).map(t => `<span class="tag">${t}</span>`).join(" ");
    const stats = `⭐ ${data.stargazers_count} | 🍴 ${data.forks_count} | ❗ ${data.open_issues_count}`;

    const card = document.createElement("div");
    card.className = "tool-card";
    if (tool.pinned) {
      card.classList.add("pinned");
    }
    card.setAttribute("data-category", tool.category);

    const effects = ["fade-up", "fade-right", "fade-left"];
    const effect = effects[Math.floor(Math.random() * effects.length)];
    card.setAttribute("data-aos", effect);

    card.innerHTML = `
      <h2>${data.name}</h2>
      <p>${tool.description}</p>
      <div class="tags">${topics}</div>
      <p><strong>Language:</strong> ${tool.language || "N/A"}</p>
      <p class="stats">${stats}</p>
      <div class="button-group">
        <a href="${tool.url}" target="_blank">GitHub</a>
        <button class="readme-btn" data-repo="${tool.repo}">View Details</button>
      </div>
    `;

    if (matchFilter(tool, searchInput.value, categoryFilter.value)) {
      (tool.pinned ? pinnedContainer : container).appendChild(card);
    }
  });

  document.getElementById("loader").style.display = "none";
}

// Event listeners
searchInput.addEventListener("input", renderTools);
categoryFilter.addEventListener("change", renderTools);

document.addEventListener("click", e => {
  if (e.target.classList.contains("readme-btn")) {
    showReadmeModal(e.target.getAttribute("data-repo"));
  }
});

renderTools();
AOS.init({ duration: 800, once: true });
