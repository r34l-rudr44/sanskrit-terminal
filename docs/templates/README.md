# Lesson Templates

These templates are starting points for new Sanskrit lesson content.

Files:

- `lesson-day.template.js`: standard day lesson template
- `lesson-test.template.js`: module final test template

How to use:

1. Copy the relevant template into `src/data/module-X/`.
2. Rename it to `day-N.js` or `test.js`.
3. Replace placeholder IDs, titles, icons, briefing content, and questions.
4. Register the new file in `src/data/index.js`.
5. Run `npm run validate:lessons`.
6. Run `npm run test:smoke` if your changes affect lesson flows.

Notes:

- Keep files UTF-8 encoded.
- Use only the supported briefing and question types.
- Exact-match answers matter for `translation`, `fill`, and `wordtiles`.
- Every lesson file should include a `metadata` export with difficulty, time estimate, tags, grammar topics, and vocabulary topics.
