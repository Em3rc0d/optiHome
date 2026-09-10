# Mining Site — MK0 OptiHome Web Refactor

Status: `ACTIVE`

## Purpose

Collect evidence that can improve the OptiHome public web refactor without turning external examples into aesthetic templates.

## Sources inspected

### Legacy OptiHome repository

Observed:

- home-first optical service proposition
- frame catalog
- virtual try-on capability
- React/Next.js implementation
- blue/green visual language
- WhatsApp-oriented contact flow
- mixed `OptiHome` / `DaVision` naming
- unsupported social-proof/availability/guarantee-style copy in public UI
- monolithic catalog + try-on implementation

Authority: `OBSERVED`

### LensCrafters public experience

Sources:

- https://www.lenscrafters.com/
- https://www.lenscrafters.com/lc-us/shopping-guide-eyewear
- https://www.lenscrafters.com/lc-us/virtual-try-on

Observed patterns:

- explicit path from frame selection to lens configuration and completion
- virtual try-on placed in the shopping journey
- eye exam surfaced as a first-class action
- product discovery, optical care and digital assistance coexist without making the ML technology itself the core proposition

Authority: `OBSERVED_EXTERNAL`

### Warby Parker public experience

Sources:

- https://www.warbyparker.com/eyeglasses
- https://www.warbyparker.com/get-a-prescription
- https://www.warbyparker.com/app

Observed patterns:

- catalog and try-on are directly connected
- prescription/eye-exam actions are explicit
- virtual tools support selection and care rather than replacing the customer journey
- product cards communicate an actionable next step

Authority: `OBSERVED_EXTERNAL`

## Accepted extraction rules

External evidence may influence:

- journey visibility
- information hierarchy
- interaction expectations
- accessibility expectations
- commerce/service mental models

External evidence may **not** be copied as:

- brand aesthetics
- proprietary copy
- exact layouts
- distinctive artwork
- proprietary product naming

## Mining conclusion for MK0

The strongest reusable pattern is not a visual trend. It is architectural:

```text
Need
→ clear pathway
→ product/service understanding
→ confidence
→ supported action
```

OptiHome MK0 therefore refactors around explicit journeys before adding any later acquisition automation.
