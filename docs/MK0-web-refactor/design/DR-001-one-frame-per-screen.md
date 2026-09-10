# DR-001 — One Frame Per Screen

Status: `ACCEPTED_FOR_MK0_RUNTIME`

Provenance: `GENERATED`, informed by `personal_knowledge` UX/system rules and accepted explicitly for OptiHome MK0.

## Decision

Eyewear selection surfaces MUST present one active frame as the dominant visual object at a time.

This is a decision-density rule, not a literal ban on all secondary imagery elsewhere on the page.

## Why

The previous multi-card/grid presentation made several monturas compete simultaneously for attention. For OptiHome, the desired sequence is progressive comparison:

```text
see one frame
→ understand it
→ move previous/next
→ try it
→ consult availability
```

This better supports:

- reduced cognitive load;
- stronger hierarchy;
- mobile reachability;
- clearer CTA ownership;
- a cleaner handoff into virtual try-on.

## Application

### Homepage

The featured-frame section exposes one featured montura as the visual authority.

### Catalog

- one active frame article;
- previous/next navigation;
- Left/Right keyboard support;
- filters narrow the collection and reset to a safe first item;
- index/count stays synchronized with the filtered set.

### Virtual try-on

- one active overlay frame;
- previous/next navigation;
- current frame label and counter synchronized;
- switching frame does not restart camera permission or destroy the current photo/stream.

## Non-goals

This decision does not:

- remove all 8 catalog references;
- prohibit small progress indicators;
- prohibit decorative/service imagery unrelated to frame comparison;
- convert the catalog into a checkout surface.

## Acceptance

`DR-001_PASS` requires the homepage, catalog and try-on to obey the rule at every supported viewport without hiding access to the remaining frame references.
