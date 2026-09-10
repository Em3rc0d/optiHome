# BR-001 — Appointment Capacity Contract

Status: `FROZEN_FOR_LATER_BUILD`

## Context

OptiHome is a home-first optical service. A visitor who decides to request an evaluation must not be sent into an unstructured conversation that can create duplicated requests, impossible time promises or more home visits than the business can operationally execute.

The public website is therefore not allowed to treat WhatsApp itself as the appointment system.

## Product decision

**WhatsApp is a communication and confirmation channel. The appointment system owns availability and appointment state.**

Target journey:

```text
Visitor
→ Request evaluation
→ Select service area / preferred date or available slot
→ Capacity validation
→ Create structured appointment request
→ Show request reference + status
→ WhatsApp handoff with structured context
→ Business notification
→ Staff confirmation when required
→ Confirmed appointment
→ Visit execution
```

A WhatsApp-only fallback may remain available, but it is not the canonical scheduling path once the scheduler exists.

## Why this matters

Without an availability owner, the business can receive more visits than it can execute, promise overlapping times, waste travel time and lose operational control.

The scheduler must protect business capacity before optimizing conversion.

## Required capacity model

The future appointment engine must be able to express, at minimum:

- operating days and hours;
- appointment duration by service type;
- maximum appointments per day;
- maximum simultaneous appointments per professional/team;
- buffer before/after a visit;
- minimum booking lead time;
- blackout dates / unavailable periods;
- service zones or districts;
- optional travel-time or zone grouping rules;
- reschedule/cancellation policy;
- manual capacity overrides.

The first implementation does not need sophisticated route optimization, but it may not assume infinite capacity.

## Appointment state model

Canonical state vocabulary:

```text
REQUESTED
→ PENDING_CONFIRMATION      # when manual confirmation is required
→ CONFIRMED
→ IN_PROGRESS
→ COMPLETED
```

Alternative exits:

```text
REQUESTED/PENDING_CONFIRMATION/CONFIRMED
→ CANCELLED
→ RESCHEDULED
→ NO_SHOW
```

`REQUESTED` is not equivalent to `CONFIRMED`.

The UI and WhatsApp messages must never tell a user that an appointment is booked unless the appointment engine has actually reserved the slot according to the configured rules.

## Notifications

On a valid appointment request, the future system should generate an operational notification containing only the information needed to act:

- appointment/request reference;
- customer name;
- contact channel;
- selected service;
- date/time or preference;
- service area;
- current status.

The business must not have to manually reconstruct this information from a free-form WhatsApp conversation.

## Agenda / operations view

The future operations surface should answer, at minimum:

- What appointments do we have today?
- Which are confirmed vs pending?
- Where are they?
- Who is assigned?
- How much capacity remains?
- Which appointments were cancelled/rescheduled/no-show?

Initial form may be a lightweight internal agenda; a full CRM is explicitly unnecessary for the first scheduling release.

## WhatsApp handoff contract

After a structured request exists, WhatsApp can receive a prefilled message such as:

```text
Hola, solicité una evaluación visual en OptiHome.
Solicitud: <reference>
Fecha/horario: <selected value>
Zona: <service area>
```

The canonical data remains in the appointment system, not in the message body.

## Analytics seam

Future measurable events:

```text
appointment_flow_started
appointment_slot_viewed
appointment_request_created
appointment_whatsapp_handoff
appointment_confirmed
appointment_rescheduled
appointment_cancelled
appointment_completed
```

This will later allow acquisition sources to be connected to real operational outcomes.

## MK0 boundary

MK0 Web Refactor does **not** build this appointment engine.

During MK0:

- CTA copy must distinguish `request` from `confirmed booking`;
- no UI may claim a confirmed appointment when only opening WhatsApp;
- contact configuration must be centralized;
- analytics event seams must be stable;
- visual flows should leave room for the future scheduling step;
- no fake availability may be shown.

After the public web refactor is closed, this contract becomes the input for a dedicated appointment/operations MK.

## Decision

`APPOINTMENT_CAPACITY_CONTRACT_FROZEN`

OptiHome's future appointment flow is **capacity-first and structured**, with WhatsApp as a downstream communication channel rather than the source of truth.
