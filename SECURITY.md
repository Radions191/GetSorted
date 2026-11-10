# Security Policy

## Supported Versions

Security fixes are currently considered for the latest version on the `main`
branch. There are no formal release branches or version-based support guarantees
at this time.

## Reporting a Vulnerability

Please do not report security vulnerabilities in public GitHub Issues.

If Private Vulnerability Reporting is enabled for this repository, use the
**Security** tab on GitHub and select **Report a vulnerability**.

If that option is unavailable, contact the repository maintainer privately
through a contact method listed on the maintainer's GitHub profile. Do not
include exploit details or sensitive data in a public discussion.

Please include, where possible:

- A brief description of the potential vulnerability.
- The affected component or file.
- Steps to reproduce the issue.
- The potential impact.
- Any suggested mitigation.

## Response

The maintainer will review the report and may ask for additional information.
Please allow reasonable time for investigation and a fix before disclosing the
issue publicly.

## Security Notes

- Never commit `.env` files, passwords, API keys, tokens, or database credentials.
- Do not put secrets in frontend environment variables. Values exposed to a
  browser must be treated as public.
- The current project documentation notes that administrative API routes do
  not yet have authentication and authorization. Do not expose the application
  publicly in a production environment until appropriate access controls and
  other production security measures have been implemented and tested.
