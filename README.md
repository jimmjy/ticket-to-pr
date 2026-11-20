# Ticket to PR

A small agent pipeline that takes an issue, writes a plan, gets Claude Code to do the work, checks it, and opens a pull request.

## What happens when you run it

1. It reads the issue and makes a fresh copy of the repo to work in.
2. A cheap model turns the issue into a clear spec.
3. Claude Code writes the change and runs the tests itself.
4. If the tests fail, the failure goes back to Claude Code and it tries again. It gets three tries before the run gives up.
5. A reviewer checks the diff against the spec. If it isn't happy, its notes go back for another try too.
6. The pipeline pauses and shows you the diff. Nothing happens until you say yes.
7. It commits the change and writes up the pull request.

Every step shows up in LangFuse, so when something goes sideways you can open the trace and see exactly what each step saw and said.

## How I know it works

The agent writes its own tests, and its own tests can happily agree with its own bug. So the eval suite grades every run with tests the agent never sees, plus a second model that scores the change for quality. It also tracks cost, so you can compare models on how many tickets they actually solve and what each solved ticket costs.

One of the six practice issues is there to prove the point. The agent's fix passes its own tests, opens a PR, and is still wrong. The hidden test catches it.

In mock mode the pipeline solves 5 of the 6 issues with retries and 4 of 6 without, which puts a real number on what the retry loop is worth. I'll add my real model comparison here once I've run it.

## Built with

- LangGraph runs the workflow (state, routing, retries, pausing for a person)
- Claude Code does the coding in headless mode, and it's only allowed to edit files and run the tests
- LangFuse for traces and eval scores
- LangChain for an optional reviewer agent that reads around the codebase before judging a change
- Zod to make sure every model reply has the right shape
- TypeScript on Node 22

## Running it

Everything runs in mock mode by default with canned model answers, so you can try the whole thing without any API keys.

```bash
npm install
cp .env.example .env
npm test
npm run pipeline -- issue-003
```

A few more things worth trying.

```bash
npm run pipeline -- issue-001                 # fails once, then passes on the retry
MAX_ATTEMPTS=1 npm run pipeline -- issue-001  # runs out of tries and gives up
npm run evals && npm run compare              # the scorecard
```

For real runs, set `MOCK=0` and add your Anthropic API key to `.env`. Claude Code needs to be installed and signed in. Add your LangFuse keys if you want traces, and set `REVIEWER=agent` to swap in the reviewer agent.

## How the code is laid out

Each folder does one job. The graph lives in `src/pipeline` and only knows about small interfaces, things like "somewhere issues come from" and "something that writes code." The real versions and the mock versions both plug into those, and `src/app.ts` is the one place that decides which ones you get.

That's what lets the whole graph run in the tests with no files, git or models involved. It also means reading issues from GitHub instead of JSON files is one new file rather than a rewrite.

## What's next

- Read real GitHub issues and open real pull requests
- Run the evals in a container on AWS
- Swap the in memory checkpointer for Postgres so a paused run survives a restart
