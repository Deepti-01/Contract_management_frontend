# Contract Management Platform (Frontend Only)

## Overview
A small assessment-ready React + TypeScript frontend for managing contract blueprints and contracts entirely in-memory. It follows a strict lifecycle (CREATED → APPROVED → SENT → SIGNED → LOCKED with optional REVOKED from CREATED/SENT) and uses Zustand for state and Tailwind for styling.

## Stack
- React (CRA TypeScript)
- Zustand (state only, no persistence)
- Tailwind CSS (utility styling)

## Setup
1) Install deps: `npm install`
2) Run dev server: `npm start`
3) Build: `npm run build`

## Architecture Decisions
- In-memory Zustand store; IDs use `Date.now().toString()`; no persistence or backend.
- UI organized by spec-required folders (Blueprint, Contract, Dashboard, Common).
- No routing library; navigation handled with `useState` in `App.tsx`.
- Tailwind utilities only; no additional UI libs or animations.

## Assumptions & Limitations
- Data resets on reload (intentionally no storage).
- Signature fields are placeholders (visual only).
- No deletion of blueprints/contracts; revoke is terminal where allowed.
- Locked and revoked contracts are read-only.

## Contract Lifecycle
- Forward path: CREATED → APPROVED → SENT → SIGNED → LOCKED
- REVOKED allowed only from CREATED or SENT
- LOCKED and REVOKED are terminal; no skipping steps.

## Feature Walkthrough
- **Create Blueprint:** Enter a name and add one or more fields (TEXT, DATE, SIGNATURE, CHECKBOX). At least one field is required.
- **Create Contract:** Pick a blueprint, name the contract, auto-generated fields appear. Edits auto-save; inputs disable when status is LOCKED or REVOKED. Signature shows as a placeholder box.
- **Dashboard:** Table of contracts with status badges, updated timestamps, and actions to advance to the next valid state or revoke (when allowed). Filter contracts by status.
- **Navigation:** Top-level buttons switch between Dashboard, Create Blueprint, and Create Contract pages.
