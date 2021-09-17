const { githubPublishMessage } = require('./github')

async function run(core) {
    const token = core.getInput('github_token', {required: true})
    const number = parseInt(core.getInput('issue_number', {required: true}), 10)
    const marker = core.getInput('marker', {required: true})
    const message = core.getInput('message', {required: true})

    try {
        await githubPublishMessage(token, number, marker, message)
    } catch (error) {
        core.setFailed(error.message)
    }
}

module.exports = {
    run
}
