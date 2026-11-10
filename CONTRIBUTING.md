# Contributing to GetSorted

Thank you for your interest in improving GetSorted. Contributions such as bug
reports, feature suggestions, documentation improvements, and code changes are
welcome.

## Before You Start

1. Check existing Issues and Pull Requests to avoid duplicate work.
2. For a significant change, open an Issue first to discuss the proposed approach.
3. Do not include passwords, API keys, tokens, database credentials, personal
   information, or real `.env` files in Issues, commits, or Pull Requests.

## Development Setup

1. Install the versions of Node.js and npm required by the project.
2. Clone the repository.
3. Install dependencies separately in `client` and `server` using `npm ci`.
4. Create local environment files from the provided `.env.example` files.
5. Configure your local PostgreSQL connection and start the database using the
   instructions in the root README.
6. Generate the Prisma client and apply the required migrations as described in
   the README.

Never commit local `.env` files. Keep `.env.example` files free of real secrets.

## Branches and Commits

- Create a separate branch for each feature or bug fix.
- Use a descriptive branch name, for example `feature/add-filter` or
  `fix/api-validation`.
- Keep changes focused and avoid mixing unrelated work.
- Write clear commit messages that describe the change.

## Code Guidelines

- Follow the existing project structure and coding style.
- Use TypeScript types where appropriate; avoid introducing `any` without a
  clear reason.
- Validate and handle user input on the server.
- Do not expose secrets or sensitive data in client-side code or logs.
- Update documentation when behavior, setup steps, or configuration changes.
- Avoid adding dependencies unless they are needed; explain significant additions.

## Checks Before Opening a Pull Request

Run the relevant checks for the part of the project you changed.

Frontend (`client`):

```bash
npm run lint
npm run build
```

Backend (`server`):

```bash
npm run build
npx prisma validate
```

If tests are available for the changed functionality, run them and include the
results in your Pull Request. Do not claim that tests were run if they were not.

## Pull Requests

1. Push your branch to GitHub.
2. Open a Pull Request against `main`.
3. Complete the Pull Request template.
4. Explain what changed, why it was needed, and how it was checked.
5. Link related Issues where applicable.
6. Respond constructively to review feedback.

A Pull Request may be updated or declined if it is incomplete, introduces
unnecessary risk, or does not fit the project's direction.

## Reporting Bugs and Suggesting Features

Use the repository's Issue templates where possible. Include enough detail to
understand the problem, but remove private information, credentials, and
sensitive data from screenshots and logs.
