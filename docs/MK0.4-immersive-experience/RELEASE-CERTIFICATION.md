# RELEASE CERTIFICATION — MK0.4

Status: **CANDIDATE_CERTIFIED / PRODUCTION_PENDING**

Baseline: `master@89db095ffe65755f31131eca15e2180deb3b8ae3`

Implementation candidate SHA: `461286eecffbc40918400011137509790e76eede`
Candidate CI: `MK0.4 Certification #34542913935` — **SUCCESS**
Pull request: `#7`
Preview deployment: `dpl_4KEeWk9k7wFF9YTiCUB4vvNso4ow` — **READY**
Merge SHA: **PENDING_EXACT_HEAD_MERGE**
Production deployment: **PENDING_PRODUCTION_SMOKE**

## Gate ledger

| Gate | State | Evidence |
|---|---|---|
| DESIGN_GATE | PASS | `DESIGN.md` |
| ARCHITECTURE_GATE | PASS | `ARCHITECTURE.md` |
| 3D_ASSET_GATE | REJECTED_BY_CONTRACT | No authoritative GLB; 2.5D track selected |
| 3D_RUNTIME_GATE | NOT_APPLICABLE | Runtime dependency intentionally not introduced |
| MOTION_GATE | PASS | centralized tokens + reduced-motion-aware components |
| RESPONSIVE_GATE | PASS_AUTOMATED | capability policy + responsive layouts |
| A11Y_GATE | PASS_AUTOMATED | semantic/keyboard/reduced-motion source contract |
| PERFORMANCE_GATE | PASS_AUTOMATED | no new WebGL/dependency; clean production build/runtime |
| TRYON_REGRESSION_GATE | PASS_FROZEN_SOURCE | exact baseline blob SHA preserved |
| BUILD_GATE | PASS | CI run `34542913935` |
| PREVIEW_RUNTIME_GATE | PASS | Vercel deployment READY + rendered home HTML verified |
| PRODUCTION_GATE | PENDING_MERGE | exact-head merge + production smoke required |

## Candidate evidence

The first CI attempt on `1bbeba5bbf294c3ce2ab6fbff2561cd610fe581b` failed lint and is permanently rejected as release evidence. The capability hook was corrected using `useSyncExternalStore`; the implementation candidate `461286eecffbc40918400011137509790e76eede` then passed the complete certification workflow.

A preview inspection also caught and removed the pre-hydration `opacity: 0` dependency from generic reveal content before candidate certification.

## Remaining release rule

Only an exact-head merge of the final PR head is allowed. After merge, the Vercel deployment tied to the resulting `master` SHA must reach `READY` and pass production smoke before MK0.4 is considered **CERTIFIED / CLOSED**.

Post-production evidence is recorded on PR #7 after the smoke succeeds so closing the release does not require a documentation-only production redeploy.
