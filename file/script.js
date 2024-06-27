async function fetchUserRepos(username) {
    try {
        console.log(`Fetching repositories for user: ${username}`);
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!response.ok) {
            throw new Error('User not found');
        }
        const repos = await response.json();
        console.log('Repositories fetched successfully:', repos);
        displayUserRepos(repos);
    } catch (error) {
        console.error('Error fetching user repositories:', error);
        displayError(error.message);
    }
}

async function fetchRepoDetails(username, repo) {
    try {
        console.log(`Fetching details for repository: ${repo} of user: ${username}`);
        const response = await fetch(`https://api.github.com/repos/${username}/${repo}`);
        if (!response.ok) {
            throw new Error('Repository not found');
        }
        const repoData = await response.json();
        console.log('Repository details fetched successfully:', repoData);
        displayRepoDetails(repoData);
    } catch (error) {
        console.error('Error fetching repository details:', error);
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
    document.getElementById('repo-container').innerText = JSON.stringify(response, null, 2);
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
    document.getElementById('repo-container').innerText = JSON.stringify(response, null, 2);
}

function displayError(message) {
    const response = {
        status: 'error',
        message: message
    };
    document.getElementById('repo-container').innerText = JSON.stringify(response, null, 2);
}

function parseUrl() {
    const pathArray = window.location.pathname.split('/').filter(Boolean);
    console.log('Parsed URL path:', pathArray);
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
