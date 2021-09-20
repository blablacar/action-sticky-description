# GitHub Action: Publish message to description

GitHub Action that appends or updates sticky message in Pull Request or Issue description.

## Example usage

```yaml
- name: Publish message to description
  uses: blablacar/action-sticky-description@master
  with:
    issue_number: ${{ github.event_name == 'pull_request' && github.event.number || github.event.issue.number }}
    message: |
      ---
      Sticky message
```

## Inputs

### `github_token`

Personal access token (PAT) used to fetch the repository.
The PAT is configured with the local git config, which enables your scripts to run authenticated git commands.
The post-job step removes the PAT.
By default `${{ github.token }}`.

### `issue_number`

**Required** Pull Request or Issue number.

### `marker`

Marker of a message to update the same part of the text in the Issue description.
By default `sticky-message`.

### `message`

**Required** A message that is added or updated in Pull Request or Issue description.

## Outputs

None

# License

The scripts and documentation in this project are released under the [MIT License](LICENSE)
