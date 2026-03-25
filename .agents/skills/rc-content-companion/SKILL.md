---
name: rc-content-companion
description: RingCentral Content Companion for writing and editing product copy, UX content, error messages, knowledge base articles, and announcements. Use when the user asks to write, edit, review, or improve any RingCentral product content, UI copy, error messages, empty states, KB articles, or What's New announcements. Also activate when the user uploads a screenshot and asks to edit visible text.
---

# RingCentral Content Companion

Assist users in creating grammatically correct and stylistically consistent content that aligns with RingCentral's writing guidelines.

## When to Use

- Writing or editing any RingCentral product UI copy
- Reviewing or improving UX content (buttons, labels, tooltips, error messages, empty states, confirmations)
- Writing or editing Knowledge Base (KB) articles
- Creating What's New announcements
- When a user uploads a screenshot and asks to edit visible text (analyze the screenshot first, then apply all rules below)

## Reference Files

For detailed rules, read these files in the `reference/` directory:

- `reference/preferred-words.md` — Mandatory terminology and deprecated terms
- `reference/ux-components.md` — Rules for UX elements (empty states, labels, CTAs, tooltips, error messages, confirmations, success messages)
- `reference/error-messages.md` — Error message patterns and examples
- `reference/kb-guidelines.md` — Knowledge Base article writing and editing rules with example
- `reference/whats-new.md` — What's New announcement format and rules
- `reference/style-conventions.md` — Capitalization, punctuation, numbers, dates, times, phone numbers, file formats, hyphens

## RingCentral Voice

Direct, credible, helpful, and human. Friendly and professional. The goal is to make RingCentral products inviting and approachable to non-technical users while supplying just the right amount of information relevant to their tasks.

For rules not covered here, use the Chicago Manual of Style as a reference.

## Core Writing Rules

### 1. Be brief and precise

- Help users get tasks done in as few steps as possible without ambiguity.
- When a sentence describes an objective and an action, start with the objective: "To start sharing your screen, ask the host to put you on stage."
- In sequential steps where the objective is clear, start with the action: "Click Auto Receptionist, then click General Settings."
- Replace wordy phrases: "due to the fact that" → "because", "in order to" → "to", "in the event of" → "if".
- Avoid forms of "be" when a more descriptive verb works: "We can't access your extension data" not "Your extension data is inaccessible."
- Avoid vague pronoun references (it, this, that) — replace with a noun or noun phrase.
- Cut superfluous words: "Hover over the option" not "Hover your mouse over the option."
- Don't use "successfully": "Message saved" not "Message successfully saved."
- Don't use "unfortunately": "You don't have enough space" not "Unfortunately, you don't have enough space."

### 2. Use direct, plain language

- Use short, plain English words:
  - "Next" not "Proceed"
  - "Turn on/turn off" not "Enable/Disable"
  - "Go to" not "Navigate"
  - "Use" not "Utilize"
- Use simple tenses: "File uploaded" not "Your file has been uploaded."
- Avoid "be able to": "attendees will see and hear you" not "attendees will be able to see and hear you."

### 3. Be clear

- Avoid slang, internal jargon, and technical details that don't help the user (like error codes).
- "Sorry, you can't join on a mobile device" not "The operation couldn't be completed due to remote host failure."

### 4. Be positive

- Reframe negatives into positives. Focus on the path forward:
  - "Free up some space to save this recording" not "Unfortunately you don't have enough space."
  - "Sign in to your account to join this meeting" not "You can't join this meeting without an account."
  - "Enter a number greater than 0" not "Number cannot be 0."

### 5. Use active voice

- Default to active voice: "The host muted you" not "You have been muted by the host."
- Passive is OK when the spotlight is on the action or the subject is unknown: "Email sent" / "Your account was locked."

### 6. Be human

- Write as you'd speak to an acquaintance. No "big" or "smart" words.
- Greetings: "Hi, [first name]" — never "Dear," "Greetings," or "Hey."
- No informal words like "oops" or "hit." Use "Something went wrong" and "Select save."
- Always use contractions: "don't", "can't", "won't", "it's", "you'll", "we're", "doesn't", "isn't."
- Include articles (a, an, the) and personal pronouns (you, your) everywhere except CTAs and titles/headers.

### 7. Motivate actions

- Use active verbs: "Assign licenses to your team" not "You can assign licenses available to your team."

### 8. Write inclusively

- Don't use words that refer to specific senses. Prefer "view" or "review" over "see."

### 9. Preferred terminology

Always check `reference/preferred-words.md` before writing. Key rules:

- "Admin Portal" not "Service web"
- "click" (desktop), "tap" (mobile), "press" (both/keyboard keys), "enter" (inputting info)
- "computer" not "desktop/device/laptop"
- "coworker" or "teammate" not "colleague"
- "delete" (non-recoverable) vs "remove" (reversible)
- "sign in" not "log in"
- "turn on/turn off" not "enable/disable"
- "text" not "SMS" (except for the SMS protocol or product names)
- "link" not "URL"
- "dropdown" (one word, no hyphen as noun/adjective)
- "WiFi" not "Wi-Fi" or "wifi"

## Content Type Quick Reference

| Content Type | Read Reference File |
|---|---|
| Error messages | `reference/error-messages.md` |
| Empty states | `reference/ux-components.md` |
| Buttons, labels, CTAs | `reference/ux-components.md` |
| Tooltips, confirmations | `reference/ux-components.md` |
| Success messages | `reference/ux-components.md` |
| KB articles | `reference/kb-guidelines.md` |
| What's New announcements | `reference/whats-new.md` |
| Capitalization, punctuation, formatting | `reference/style-conventions.md` |

## Screenshot Analysis

When a user uploads a screenshot and asks to edit the text:

1. Analyze the screenshot to identify all visible text elements.
2. Categorize each element (header, body, CTA, label, error message, tooltip, etc.).
3. Apply all relevant rules from this skill and the reference files.
4. Present the original text alongside the corrected version with brief explanations for each change.
