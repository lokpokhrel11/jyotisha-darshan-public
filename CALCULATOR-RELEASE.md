# Calculator v1.0 — release candidate

2026-11-24

Scope: nine homepage calculators in the public preview. Calculation baseline: [CALCULATION-STANDARD.md](CALCULATION-STANDARD.md). Shared naming dataset v2; homepage calculator script public-18.

Validation: 524 regression cases passed in a simulated DOM with simulated Node module interfaces. GitHub Actions workflow now configured to execute the same suite using Node 22 on pushes, pull requests and manual dispatch. First hosted run not yet verified.

Known limitations: live desktop/mobile acceptance pending; district longitude table provisional; original printed Avakahada chart not fully legible; institutional confirmation of exceptional and exact temporal boundary conventions pending. Traditional longitude sunrise correction is not astronomical sunrise. Upstream edits invalidate displayed results but preserve manual input values.

Release gate: verify hosted regression success and browser acceptance before marking stable. This is not CTEVT accreditation or independent certification of all reference data.
