# UX Content Components

Rules for writing copy for specific UX elements.

## 1. Empty States

Determine which of three patterns fits the user context:

### 1A. First-time user (FTUE)
Use proactive, positive, engaging language that educates about possibilities and invites exploration.

- **Header**: Playful invitation to interact; exclamation points OK but don't overuse
- **Body**: Recommended action with key benefit
- **CTA**: Verbal phrase with desired action

Examples:
```
[Header]: Chat productively!
[Body]: Create an unlimited number of team chats for sharing project-related files, assigning tasks, and more.
[CTA]: Create team

[Header]: See what your attendees think
[Body]: Create up to 25 polls to increase engagement with your audience.
[CTA]: Create poll

[Header]: Get connected!
[Body]: Add your favorite app to simplify communications and streamline productivity.
[CTA]: Add app
```

Avoid over-the-top playfulness that doesn't fit RingCentral voice.

### 1B. Heavy user (tasks completed)
Reward the sense of accomplishment. No CTA needed.

Examples:
```
[Header]: Well done!
[Body]: You have no outstanding tasks.

[Header]: Take a quick break
[Body]: You have no upcoming meetings.
```

### 1C. User who can't initiate an interaction
Statement of facts. No CTA required.

Pattern: Header: "No [data type] yet" / Body: "Your [data type] will appear here."

Examples:
```
[Header]: No recordings yet
[Body]: Your webinar recordings will appear here.

[Header]: No sent faxes yet
[Body]: Your sent faxes will appear here.
```

## 2. Field Labels
(Password fields, checkboxes, radio buttons, toggles, and other input fields.)

- Use minimum words necessary
- Sentence case capitalization
- Lead with an action verb in instructional phrases ("Turn off audio" not "You can turn off audio")
- No periods, colons, or other punctuation
- No complete sentences or multi-line text
- No preambles ("You can turn on..." or "Turning on..."). Start with action verb.
- No "click this button" expressions

Correct: Allow panelists to turn on their video
Incorrect: You can allow panelists to turn on their video here.
Incorrect: Click this button to allow panelists to turn on their videos

## 3. Ghost Text (Placeholder Text)
Copy inside input fields telling users what content is expected.

- Use for fields requiring data in a specific format (password, meeting ID)
- Pattern: "Enter [field name]" or show an example
- If multiple identical fields: use "Enter" in the first instance, omit in subsequent
- For search fields: "Search for..." (e.g., "Search for contacts")

Correct: Enter display name for the link
Incorrect: Type the display name for the link

## 4. CTA (Call to Action) Buttons

- All labels must contain an action, phrased as commands or strong requests
- For creating new entities: use "Create" not "Add" or "New"
- Minimum words
- Sentence case, no punctuation
- No complete sentences or multi-line text
- No technical words: "Start" not "Launch", "Refresh" not "Reload"
- No articles ("a", "the") in CTAs
- No "Click here" followed by the action. Just use the action.

Correct: Create webinar | Start meeting | Start conference call
Incorrect: Add a webinar | Launch meeting | Click here to start conference call

## 5. Checkbox Labels
Use "Check" or "uncheck." Don't use "click" or "select." For multiple: "check the boxes."

## 6. Radio Button Labels
- Use "Select" or "Unselect"
- Don't use "click" or "check"
- Use "option" not "radio button"

Correct: Select Public if you want to reach the most viewers
Incorrect: Check Public if you want to reach the most viewers

## 7. Toggle Labels
Use "turn on/turn off" not "enable/disable."

Correct: Turn on Q&A
Incorrect: Enable Q&A

## 8. Links (Text Buttons)
Used as redirection tools to a different area or external site.

- No "Click here" — use a specific action verb in imperative form.

Correct: Download this file
Incorrect: Click here to download this file

## 9. Tab Labels
- Must be nouns
- Clearly describe contents and differentiate from other tabs

## 10. Tooltips
- 1 word to 2 short sentences max
- Lead with the action; avoid "you may/you can," "allows you to"
- Period if longer than 2 words and a complete thought
- Capitalize single-word tooltips

Correct: Copy recording link
Incorrect: You can copy the recording link / This button lets you copy the recording link

## 11. Error Messages
See `error-messages.md` for full patterns. Quick rules:

- Format: Title (2-3 word summary) + Sentence 1 + Sentence 2
- Neutral tone, positive language, clear resolution instructions
- No exclamation points
- No informal words ("uh-oh", "oops")
- Use "sorry" when the error is caused by RingCentral's systems or when empathy is needed
- Don't use "please" more than once
- Don't use "Don't worry"

## 12. Confirmation Messages
Confirmations ask users to verify whether to proceed or cancel.

- Present the action as a question in the header: "Discard changes?"
- Explain the outcome in the body (skip if self-explanatory)
- Restate the action in the confirmation button; give option to cancel
- Don't use "Are you sure?"
- Don't use Yes/No CTAs (repeat the action instead)
- When the question starts with "Cancel," use "Yes, cancel" and "No, don't cancel"

```
Correct: Delete post? [Cancel] [Delete]
Incorrect: Are you sure you want to delete that post? [Yes] [No]

Correct: Delete this webinar? You will lose all webinar data. [Cancel] [Delete]
Incorrect: Are you sure you want to delete this webinar?
```

Non-question format example:
```
Header: Upgrade recommended
Body: For the best webinar experience, ask your company admin to upgrade your Poly system's firmware.
CTA1: Join without upgrading
CTA2: Cancel
```

## 13. Success Messages
Confirm that the desired action has been performed. Typically displayed in toasts and banners.

- Use straightforward words leaving no room for doubt
- Use fewer words and simple past tense ("Question saved", "Meeting scheduled")
- Passive voice OK (spotlight is on task accomplishment)
- Period at end if longer than 2 words
- Include CTA anticipating next user action when practical
- Don't use full sentences ("Your message has been saved" → "Message saved")
- Don't use "successfully"

Correct: Webinar created
Incorrect: Webinar successfully created
