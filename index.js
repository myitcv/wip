const github = require('@actions/github');
const core = require('@actions/core');

const isWip = /^\[WIP\] /.test(github.context.payload.pull_request.title)

const token = core.getInput('token');

const octokit = new github.GitHub(token);

octokit.repos.createStatus({
	owner: github.context.repo.owner,
	repo: github.context.repo.repo,
	sha: github.context.payload.pull_request.head.sha,
	state: isWip ? 'error' : 'success',
	target_url: 'https://github.com/myitcv/wip',
	description: isWip ? 'work in progress' : 'ready for review',
	context: 'WIP'
});
