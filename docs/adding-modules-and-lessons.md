# Adding Modules, Days, and Lessons

This guide explains how to turn raw Sanskrit lesson content into the JavaScript data files used by `SANSKRIT.EXE`.

It is written for:

- Developers adding new curriculum content
- LLMs converting source material into app-ready lesson files

## Where lesson content lives

Lesson content is stored under `src/data/`.

Current pattern:

```text
src/data/
  index.js
  module-1/
    day-1.js
    day-2.js
    day-3.js
    day-4.js
    test.js
  module-2/
    day-1.js
    day-2.js
    day-3.js
    test.js
```

`src/data/index.js` is the registry. New day/test files do nothing until they are imported and wired into `MODULES`.

## High-level workflow

1. Create a new folder like `src/data/module-3/` if you are adding a new module.
2. Add one file per lesson day, such as `day-1.js`, `day-2.js`, etc.
3. Add `test.js` for the module test if the module has one.
4. Export the lesson metadata, briefing, and questions from each file.
5. Import those files in `src/data/index.js`.
6. Add the new module entry or extend an existing module’s `days` array.
7. Run the app and manually verify:
   - Home page shows the module/day
   - Sidebar opens the day
   - Lesson briefing renders
   - All question types work
   - Module test unlock logic still behaves correctly

## File shape for a normal day

Each day file should export:

- `id`
- `title`
- `icon`
- `briefing`
- `questions`

Example template:

```js
export const id = "3-1";
export const title = "Sample Lesson Title";
export const icon = "📘";

export const briefing = {
  pre: {
    title: "What This Lesson Covers",
    lead: "Short intro shown before the lesson starts.",
    sections: [
      {
        type: "table",
        label: "VOCABULARY",
        cols: ["Devanagari", "IAST", "Meaning"],
        rows: [
          ["रामः", "Ramah", "Rama"],
          ["वनम्", "Vanam", "Forest"]
        ]
      },
      {
        type: "grammar",
        label: "GRAMMAR_NOTE",
        text: "Use HTML when needed, for example <strong>bold</strong> or <span class='dev'>देवनागरी</span>."
      },
      {
        type: "block",
        text: "Short memorable note, cultural context, or derivation."
      }
    ]
  },
  mid: [
    {
      afterQ: 2,
      title: "Checkpoint",
      tag: "GRAMMAR_CHECKPOINT",
      content: {
        type: "grammar",
        label: "REMINDER",
        text: "Mid-lesson reminder shown after question index 2."
      }
    }
  ]
};

export const questions = [
  {
    type: "mcq",
    question: "What does रामः mean?",
    options: ["Forest", "Rama", "Water", "Fire"],
    optionsDevanagari: ["वनम्", "रामः", "जल", "अग्नि"],
    answer: "Rama",
    explanation: "रामः refers to Rama."
  }
];
```

## File shape for a module test

A module test uses the same structure as a day file, but also exports:

- `isTest = true`

Example:

```js
export const id = "3-T";
export const title = "Final Test";
export const icon = "📝";
export const isTest = true;

export const briefing = {
  pre: {
    title: "Module 3 Final Test",
    lead: "Review material from all days in this module.",
    sections: [
      {
        type: "block",
        text: "Summarize what the learner is being tested on."
      }
    ]
  },
  mid: []
};

export const questions = [
  // same question schema as a normal day
];
```

## Registering a new module or day

After creating the data files, update `src/data/index.js`.

### Add imports

```js
import * as m3d1 from './module-3/day-1.js';
import * as m3d2 from './module-3/day-2.js';
import * as m3test from './module-3/test.js';
```

### Add a module entry

```js
{
  id: 3,
  title: "NEW MODULE TITLE",
  subtitle: "Short subtitle",
  icon: "📘",
  description: "One-sentence summary of what the learner will study.",
  days: [m3d1, m3d2, m3test]
}
```

### Add a day to an existing module

Update that module’s `days` array in the intended order:

```js
days: [m2d1, m2d2, m2d3, m2d4, m2test]
```

Order matters because:

- It controls display order on the home page and sidebar
- It controls unlock flow
- Tests are expected to come after normal day lessons

## Supported briefing section types

The lesson runtime supports these section types:

### `table`

Required fields:

- `type`
- `label`
- `cols`
- `rows`

Example:

```js
{
  type: "table",
  label: "NUMBERS",
  cols: ["Devanagari", "IAST", "Meaning"],
  rows: [
    ["एक", "Eka", "One"],
    ["द्वि", "Dvi", "Two"]
  ]
}
```

### `grammar`

Required fields:

- `type`
- `label`
- `text`

### `block`

Required fields:

- `type`
- `text`

## Supported question types

The lesson runtime currently supports:

- `mcq`
- `translation`
- `fill`
- `match`
- `wordtiles`

### `mcq`

Required fields:

- `type`
- `question`
- `options`
- `answer`
- `explanation`

Optional:

- `optionsDevanagari`

Rules:

- `answer` must exactly match one value in `options`
- If `optionsDevanagari` is provided, it should have the same number of items as `options`

Example:

```js
{
  type: "mcq",
  question: "What is the Sanskrit word for water?",
  options: ["Agni", "Jala", "Vayu", "Prithvi"],
  optionsDevanagari: ["अग्नि", "जल", "वायु", "पृथ्वी"],
  answer: "Jala",
  explanation: "जल means water."
}
```

### `translation`

Required fields:

- `type`
- `question`
- `answer`
- `explanation`

Optional:

- `hint`

Rules:

- The app checks `inp.value.trim() === q.answer.trim()`
- This means the answer is exact-match after trimming whitespace
- Case, spelling, punctuation, and script must match what you put in `answer`

Example:

```js
{
  type: "translation",
  question: "Type the Sanskrit word for ten",
  hint: "Related to decade",
  answer: "दश",
  explanation: "दश means ten."
}
```

### `fill`

Required fields:

- `type`
- `question`
- `sentenceParts`
- `answer`
- `explanation`

Optional:

- `answerRoman`

Rules:

- `sentenceParts` must be an array with two strings:
  - text before the input
  - text after the input
- `answerRoman` is informational only right now
- Validation still uses only `answer`

Example:

```js
{
  type: "fill",
  question: "The Sanskrit word for moon is ______",
  sentenceParts: ["The Sanskrit word for moon is ", ""],
  answer: "चन्द्र",
  answerRoman: "Chandra",
  explanation: "चन्द्र means moon."
}
```

### `match`

Required fields:

- `type`
- `question`
- `pairs`
- `explanation`

Rules:

- `pairs` must be an array of `{ left, right }`
- A match question is marked correct only when all pairs are matched

Example:

```js
{
  type: "match",
  question: "Match the family terms",
  pairs: [
    { left: "Father", right: "पिता" },
    { left: "Mother", right: "माता" },
    { left: "Son", right: "पुत्र" }
  ],
  explanation: "Core Sanskrit family vocabulary."
}
```

### `wordtiles`

Required fields:

- `type`
- `question`
- `tiles`
- `answer`
- `explanation`

Optional:

- `distractors`

Rules:

- The app joins placed tiles with spaces and compares the result to `answer`
- `answer` must exactly match the final tile order with spaces
- `distractors` can be omitted, but they help make the exercise better

Example:

```js
{
  type: "wordtiles",
  question: "Arrange: The student reads",
  tiles: ["छात्रः", "पठति"],
  distractors: ["खादति", "वदति"],
  answer: "छात्रः पठति",
  explanation: "Subject + verb forms a valid sentence."
}
```

## Important authoring rules

### 1. Use unique IDs

Recommended format:

- Day: `"3-1"`, `"3-2"`, `"3-3"`
- Test: `"3-T"`

Do not reuse IDs across files.

### 2. Keep question answers exact

Several question types use strict string comparison.

Be careful about:

- Devanagari vs romanized form
- Trailing punctuation
- Spacing
- Visually similar Unicode characters

### 3. Save files as UTF-8

Lesson content includes Devanagari text. Always save files as UTF-8.

### 4. Prefer 5 to 8 questions per lesson

This matches the current app style and keeps daily lessons short.

### 5. Give every question a useful explanation

Explanations are shown after answer submission and help reinforce learning.

### 6. Keep pre-briefing concise

The pre-lesson briefing should prepare the learner, not overwhelm them.

### 7. Put tests after all normal days

`isTest` days should come last in a module’s `days` array.

## Raw Sanskrit content -> code workflow

When converting raw curriculum notes into app data, use this order:

1. Extract the lesson goal.
2. Choose the module and day number.
3. Pick a short learner-facing title.
4. Pick one icon.
5. Write a `briefing.pre.lead`.
6. Turn the source material into 1 to 3 briefing sections:
   - vocabulary table
   - grammar explanation
   - memory block / cultural note
7. Write 5 to 8 questions using a mix of supported types.
8. Add a clear explanation for every question.
9. Make sure all exact-match answers use the exact string the learner should type.
10. Register the file in `src/data/index.js`.

## Recommended lesson design pattern

For a normal day lesson:

- 2 to 3 `mcq`
- 1 `translation` or `fill`
- 1 `match` or `wordtiles`
- Optional mid-lesson checkpoint after question 2

For a module test:

- Reuse content from all prior days in the module
- Avoid new teaching content
- Favor recall and sentence building

## Copyable authoring checklist

Before committing a new lesson, verify:

- File exports `id`, `title`, `icon`, `briefing`, `questions`
- Test files also export `isTest = true`
- IDs are unique
- All `type` values are supported by `lesson.js`
- `mcq.answer` matches an entry in `options`
- `fill.sentenceParts` has exactly two strings
- `match.pairs` is an array of `{ left, right }`
- `wordtiles.answer` matches the intended tile order exactly
- All questions have `explanation`
- The file is imported in `src/data/index.js`
- The day/test is included in the correct module `days` array

## Copyable LLM handoff template

Use this when asking an LLM to convert lesson content:

```text
Convert the following Sanskrit lesson material into a JS lesson file for SANSKRIT.EXE.

Constraints:
- Output valid ES module code
- Export: id, title, icon, briefing, questions
- If it is a module test, also export isTest = true
- Use only supported question types: mcq, translation, fill, match, wordtiles
- Every question must include explanation
- translation/fill/wordtiles answers must be exact strings
- briefing sections may only use: table, grammar, block
- Preserve Devanagari in UTF-8

Target:
- Module: <number>
- Day/Test: <day number or test>
- Theme: <topic>
- Desired difficulty: <easy/medium/hard>

Source lesson content:
<paste raw Sanskrit notes here>
```

## Good reference files in this repo

Useful examples:

- `src/data/module-1/day-1.js`
- `src/data/module-1/day-2.js`
- `src/data/module-1/test.js`
- `src/data/module-2/day-2.js`
- `src/data/index.js`
- `src/js/lesson.js`

These show the current data shape used by the app runtime.
