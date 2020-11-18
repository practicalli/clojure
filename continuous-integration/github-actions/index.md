![GitHub Actions banner](https://raw.githubusercontent.com/practicalli/graphic-design/live/banners/github-actions-banner.png)

Automate tasks, such as running unit tests or lint code, whenever code is committed to a  GitHub repository.

GitHub Actions can run one or more tasks after specific events, such as commits, raising issues or pull requests.

An event triggers a configured workflow which contains one or more jobs. A job contains a one or more steps which defines actions to run.

* [Introduction to GitHub Actions](https://docs.github.com/en/free-pro-team@latest/actions/learn-github-actions/introduction-to-github-actions)
* [Understanding the workflow file](https://docs.github.com/en/free-pro-team@latest/actions/learn-github-actions/introduction-to-github-actions#understanding-the-workflow-file)

| Term     | Description                                                                                                                                                                            |
|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Event    | [Triggers a workflow](https://docs.github.com/en/free-pro-team@latest/actions/reference/events-that-trigger-workflows), e.g. Create pull request, push commit, etc.                    |
| Workflow | Tope level configuration containing one or more jobs, [triggered by a specific event](https://docs.github.com/en/free-pro-team@latest/actions/reference/events-that-trigger-workflows) |
| Job      | Set of steps executed in the same runner, multiple jobs execute in parallel within their own instance of a runner                                                               |
| Step     | Individual task that runs commands (actions), sharing data with other steps                                                                                                             |
| Action   | Standalone commands defined within a step, custom commands or GitHub community                                                                                                          |
| Runner   | A GitHub Actions server, listening for available jobs                                                                                                                                  |


## Defining a workflow

.github/workflows/workflow-name.yml


```yml
name: learn-github-actions
on: [push]
jobs:
  check-bats-version:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
      - run: npm install -g bats
      - run: bats -v
```
