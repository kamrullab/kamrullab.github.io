async function fetchUserRepos(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) {
            throw new Error('User not found');
        }
        const repos = await response.json();
        displayUserRepos(username, repos);
    } catch (error) {
        document.getElementById('repo-container').innerHTML = `<p>${error.message}</p>`;
    }
}

async function fetchRepoDetails(username, repo) {
    try {
        const response = await fetch(`https://api.github.com/repos/${username}/${repo}`);
        if (!response.ok) {
            throw new Error('Repository not found');
        }
        const repoData = await response.json();
        displayRepoDetails(repoData);
    } catch (error) {
        document.getElementById('repo-container').innerHTML = `<p>${error.message}</p>`;
    }
}

function displayUserRepos(username, repos) {
    const repoContainer = document.getElementById('repo-container');
    repoContainer.innerHTML = `<h1>Repositories of ${username}</h1>`;
    repos.forEach(repo => {
        const repoDiv = document.createElement('div');
        repoDiv.classList.add('repo');

        const repoLink = document.createElement('a');
        repoLink.href = `/file/${username}/${repo.name}`;
        repoLink.classList.add('link');
        repoLink.textContent = repo.name;

        repoDiv.appendChild(repoLink);
        repoContainer.appendChild(repoDiv);
    });
}

function displayRepoDetails(repoData) {
    const repoContainer = document.getElementById('repo-container');
    repoContainer.innerHTML = `
        <h1>${repoData.full_name}</h1>
        <p class="description">${repoData.description || 'No description available.'}</p>
        <p>Stars: ${repoData.stargazers_count}</p>
        <p>Forks: ${repoData.forks_count}</p>
        <p><a class="link" href="${repoData.html_url}" target="_blank">View on GitHub</a></p>
    `;
}

function parseUrl() {
    const pathArray = window.location.pathname.split('/').filter(Boolean);
    if (pathArray.length === 2 && pathArray[0] === 'file') {
        const username = pathArray[1];
        fetchUserRepos(username);
    } else if (pathArray.length === 3 && pathArray[0] === 'file') {
        const username = pathArray[1];
        const repo = pathArray[2];
        fetchRepoDetails(username, repo);
    } else {
        document.getElementById('repo-container').innerHTML = `<p>Please provide a GitHub username in the URL.</p>`;
    }
}

window.onload = function() {
    document.body.innerHTML = `
        <div style="padding: 20px;">
            <div id="repo-container"></div>
        </div>
    `;
    parseUrl();
};
