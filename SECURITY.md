# Security Policy

## Reporting

Do not open a public issue for a suspected vulnerability. Use the repository's private
"Report a vulnerability" flow under GitHub Security Advisories. If private reporting is not
enabled, contact a maintainer through a private channel before sharing technical details.

Do not attach real datasets, credentials, access tokens, model artifacts containing sensitive
data, or exploit output with user information. Provide a minimal synthetic reproduction.

## High-priority areas

Report issues involving sandbox escape, host or Docker socket access, unauthorized artifact
or dataset access, secret exposure, network-policy bypass, cross-project data access, arbitrary
code execution outside the sandbox, or approval/authorization bypass as high priority.

Only the latest `main` revision and current pre-release are supported during the MVP phase.
