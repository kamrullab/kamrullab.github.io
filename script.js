async function fetchUserRepos(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) {
            throw new Error('User not found');
        }
        const repos = await response.json();
        displayUserRepos(repos);
    } catch (error) {
        displayError(error.message);
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
        displayError(error.message);
    }
}

function displayUserRepos(repos) {
    const response = {
        status: 'success',
        data: repos.map(repo => ({
            name: repo.name,
            full_name: repo.full_name,
            description: repo.description,
            html_url: repo.html_url,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count
        }))
    };
    document.body.innerText = JSON.stringify(response, null, 2);
}

function displayRepoDetails(repoData) {
    const response = {
        status: 'success',
        data: {
            name: repoData.name,
            full_name: repoData.full_name,
            description: repoData.description,
            html_url: repoData.html_url,
            stargazers_count: repoData.stargazers_count,
            forks_count: repoData.forks_count
        }
    };
    document.body.innerText = JSON.stringify(response, null, 2);
}

function displayError(message) {
    const response = {
        status: 'error',
        message: message
    };
    document.body.innerText = JSON.stringify(response, null, 2);
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
        displayError('Please provide a GitHub username in the URL.');
    }
}

window.onload = parseUrl;
