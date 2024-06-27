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
        displayRepoDetails(repoDat
