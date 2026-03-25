# Error Messages

## General Principles

The main purpose of error messages is to navigate the user to success, not to explain what went wrong.

- Restate negative messages in positive terms; avoid "blaming" the user
- Avoid "error," "failure" in titles — use "issue" instead
- Avoid repetition between header and body; if not enough varying info for both, drop the title
- Avoid vagueness ("password error") — be specific ("Allowed number of password attempts exceeded")
- Always name the failed user task, not generic "this feature" or "this action"
- Balance specificity with security. Use "information" if you can't reveal what kind of data is wrong
- Avoid technical terms like "server," "credentials," "BKOS connection" — choose words a non-technical user will understand

## Format

```
Title (2-3 word summary)
Sentence 1 (what happened)
Sentence 2 (what to do)
```

## Rules

1. Use neutral tone
2. Use positive language with clear, direct resolution instructions
3. Don't use exclamation points
4. Don't use informal words ("uh-oh", "oops")
5. Use "sorry" when the error is caused by RingCentral's systems or when empathy is needed
6. Don't use "please" more than once
7. Don't use "Don't worry"

## Error Categories and Patterns

### I. User Responsibility Errors
Don't use "sorry" or "please" unless context demands it. Avoid "wrong" (judgmental) — use "incorrect" if necessary. Always provide resolution steps.

#### 1A. Wrong data input — Mistyped/forgotten
```
Title: Check info
Body: The [meeting ID/password/username] you entered doesn't match our records. Please try again.
Short: Incorrect/invalid [data parameter], try again.
CTA: OK
```

#### 1B. Expired data
```
Title: Expired meeting ID
Body: The [input data] you entered has expired. Please check and try again.
```

Use "is expired" for data that was valid but isn't anymore.

#### 1C. Wrong format
Give instructions on the correct format where security allows.
```
Title: Check the info
Body: The [input data] should be [format rule]. Please check and try again.
Example: The meeting ID should have [XX] digits. Please try again.
Example: The password should be [XXX]. Please try again.
```

Use "should be [format]" or "isn't valid" when format doesn't match.
Use "doesn't match our records" when format is right but data is wrong.

#### 1D. Generic (can't reveal which parameter is wrong)
```
Title: Check info
Body: The information you entered doesn't match our records. Please try again.
```

#### Wrong file format/size
```
Title: File too large
Body: This [GIF/video] file is too large. Try one that's smaller than {{MB}}.
Pattern: [File type] isn't supported, try JPG, PNG, GIF or video instead.
Title: Check file format
```

### II. Unsupported/Outdated Browser

#### 3A. Unsupported browser
```
Title: Try another browser
Body: Your current browser doesn't support [feature name]. Try [browser name/s] instead.
```

#### 3B. Outdated browser version
```
Title: Upgrade browser
Body: Your current browser version has limited [feature name] support. Upgrade your browser version or try switching to [browser name/s] instead.
```

#### 3C. Wrong password format (inline validation)
```
Password must start with a letter and contain a combination of uppercase and lowercase letters, numbers and/or allowed characters, including space, period(.), hyphen(-) and apostrophe(').
```

#### 3D. Need to update browser
```
Banner: To use RingCentral for Google, you'll need to update Chrome to the latest version.
CTA: Learn how
```

### III. Connectivity/Network Issues
Low connectivity that interferes with a live event; no user action required. Use "sorry" to show empathy.

### IV. Feature/Action Unavailable
When a feature or action isn't available to the user due to permissions, licensing, or system limitations.

### V. System Errors
RingCentral-side failures. Always use "sorry" at the beginning.
```
Correct: Sorry, something went wrong. Refresh your browser page or select Rejoin.
Incorrect: Something went wrong. Refresh your browser page or select Rejoin.
```
