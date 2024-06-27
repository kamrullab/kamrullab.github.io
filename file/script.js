document.getElementById('fetchRepos').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    if (username) {
        fetchUserRepos(username);
    } else {
        displayError('Please enter a GitHub username.');
    }
});

async function fetchUserRepos(username) {
    try {
        console.log(`Fetching repositories for user: ${username}`);
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        console.log('Response status:', response.status);
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

function displayUserRepos(repos) {
    const repoContainer = document.getElementById('repo-container');
    repoContainer.innerHTML = '';
    if (repos.length === 0) {
        repoContainer.innerHTML = 'No repositories found for this user.';
        return;
    }
    repos.forEach(repo => {
        const repoDiv = document.createElement('div');
        repoDiv.className = 'repo';
        repoDiv.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || 'No description'}</p>
            <p>⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}</p>
            <a href="${repo.html_url}" target="_blank">View on GitHub</a>
        `;
        repoContainer.appendChild(repoDiv);
    });
}

function displayError(message) {
    const repoContainer = document.getElementById('repo-container');
    repoContainer.innerHTML = `<p style="color: red;">${message}</p>`;
}
