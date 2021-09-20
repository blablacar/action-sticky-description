const github = require('@actions/github')

function updateDescription(body, marker, message) {
    const wrapperBegin = `<!-- BEGIN ${marker} -->`
    const wrapperEnd = `<!-- END ${marker} -->`
    const re = new RegExp(`\\r?\\n?${wrapperBegin}[\\s\\S]+${wrapperEnd}`, 'gmu')
    const text = body || ''
    const wrappedMessage = `\r\n${wrapperBegin}\r\n\r\n${message}\r\n\r\n${wrapperEnd}`

    if (re.test(text)) {
        return text.replace(re, wrappedMessage)
    }

    return text + wrappedMessage
}

async function githubPublishMessage(token, number, marker, message) {
    const octokit = github.getOctokit(token)

    const { data: issue } = await octokit.rest.issues.get({
        owner: github.context.payload.repository.owner.login,
        repo: github.context.payload.repository.name,
        issue_number: number
    })

    await octokit.rest.issues.update({
        owner: github.context.payload.repository.owner.login,
        repo: github.context.payload.repository.name,
        issue_number: number,
        body: updateDescription(issue.body, marker, message)
    })
}

module.exports = {
    updateDescription,
    githubPublishMessage
}
