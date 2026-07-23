# Sandbox threat model

Protect the host filesystem and Docker daemon, service credentials, other users' data,
internal network, worker availability, and artifact integrity.

| Threat | Required control |
|---|---|
| Host file access | no host mount; isolated workspace; read-only root |
| Privilege escalation | non-root; drop capabilities; no-new-privileges; no privileged |
| Docker escape amplification | never mount Docker socket; patched pinned runtime/image |
| Data exfiltration | network none; no secrets; sanitized bounded output |
| Cross-run data access | fresh workspace/container and guaranteed cleanup |
| Resource denial | CPU/RAM/PID/disk/time/output quotas; whole-container kill |
| Path/symlink escape | canonicalize, containment-check, reject escaping symlinks |
| Supply-chain mutation | digest-pinned image/package allowlist; no runtime install |
| Artifact spoofing | validate type/size/path and checksum after execution |
| Duplicate job | idempotency key and one durable result per invocation |

Approval cannot permit privileged mode, Docker socket access, arbitrary host mounts, service
credentials, disabled quotas, or unrestricted network.

Docker is not a complete hostile multi-tenant boundary. Before public multi-tenancy, assess
microVMs or managed sandboxes, separate worker hosts, kernel hardening, and mediated egress.
