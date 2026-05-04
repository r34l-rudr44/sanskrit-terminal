import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const dataRoot = path.join(projectRoot, 'src', 'data');
const indexFile = path.join(dataRoot, 'index.js');

const allowedBriefingTypes = new Set(['table', 'grammar', 'block']);
const allowedQuestionTypes = new Set(['mcq', 'translation', 'fill', 'match', 'wordtiles']);

const errors = [];

function fail(message) {
  errors.push(message);
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function ensureArray(value, label) {
  if (!Array.isArray(value)) {
    fail(`${label} must be an array`);
    return false;
  }
  return true;
}

function validateBriefingSection(section, label) {
  if (!section || typeof section !== 'object') {
    fail(`${label} must be an object`);
    return;
  }

  if (!allowedBriefingTypes.has(section.type)) {
    fail(`${label} has unsupported type "${section.type}"`);
    return;
  }

  if (section.type === 'table') {
    if (!isNonEmptyString(section.label)) fail(`${label}.label must be a non-empty string`);
    if (!ensureArray(section.cols, `${label}.cols`)) return;
    if (!ensureArray(section.rows, `${label}.rows`)) return;
    section.rows.forEach((row, idx) => {
      if (!Array.isArray(row)) fail(`${label}.rows[${idx}] must be an array`);
    });
  }

  if (section.type === 'grammar') {
    if (!isNonEmptyString(section.label)) fail(`${label}.label must be a non-empty string`);
    if (!isNonEmptyString(section.text)) fail(`${label}.text must be a non-empty string`);
  }

  if (section.type === 'block' && !isNonEmptyString(section.text)) {
    fail(`${label}.text must be a non-empty string`);
  }
}

function validateQuestion(question, label) {
  if (!question || typeof question !== 'object') {
    fail(`${label} must be an object`);
    return;
  }

  if (!allowedQuestionTypes.has(question.type)) {
    fail(`${label} has unsupported type "${question.type}"`);
    return;
  }

  if (!isNonEmptyString(question.question)) fail(`${label}.question must be a non-empty string`);
  if (!isNonEmptyString(question.explanation)) fail(`${label}.explanation must be a non-empty string`);

  switch (question.type) {
    case 'mcq': {
      if (!ensureArray(question.options, `${label}.options`)) break;
      if (!question.options.every(isNonEmptyString)) fail(`${label}.options must contain only non-empty strings`);
      if (!isNonEmptyString(question.answer)) fail(`${label}.answer must be a non-empty string`);
      if (!question.options.includes(question.answer)) fail(`${label}.answer must exactly match one item in options`);
      if (question.optionsDevanagari) {
        if (!ensureArray(question.optionsDevanagari, `${label}.optionsDevanagari`)) break;
        if (question.optionsDevanagari.length !== question.options.length) {
          fail(`${label}.optionsDevanagari must match options length`);
        }
      }
      break;
    }
    case 'translation': {
      if (!isNonEmptyString(question.answer)) fail(`${label}.answer must be a non-empty string`);
      break;
    }
    case 'fill': {
      if (!ensureArray(question.sentenceParts, `${label}.sentenceParts`)) break;
      if (question.sentenceParts.length !== 2) fail(`${label}.sentenceParts must contain exactly two strings`);
      if (!question.sentenceParts.every(part => typeof part === 'string')) fail(`${label}.sentenceParts must contain only strings`);
      if (!isNonEmptyString(question.answer)) fail(`${label}.answer must be a non-empty string`);
      break;
    }
    case 'match': {
      if (!ensureArray(question.pairs, `${label}.pairs`)) break;
      if (question.pairs.length === 0) fail(`${label}.pairs must not be empty`);
      question.pairs.forEach((pair, idx) => {
        if (!pair || typeof pair !== 'object') {
          fail(`${label}.pairs[${idx}] must be an object`);
          return;
        }
        if (!isNonEmptyString(pair.left)) fail(`${label}.pairs[${idx}].left must be a non-empty string`);
        if (!isNonEmptyString(pair.right)) fail(`${label}.pairs[${idx}].right must be a non-empty string`);
      });
      break;
    }
    case 'wordtiles': {
      if (!ensureArray(question.tiles, `${label}.tiles`)) break;
      if (question.tiles.length === 0) fail(`${label}.tiles must not be empty`);
      if (!question.tiles.every(isNonEmptyString)) fail(`${label}.tiles must contain only non-empty strings`);
      if (question.distractors && !question.distractors.every(isNonEmptyString)) {
        fail(`${label}.distractors must contain only non-empty strings`);
      }
      if (!isNonEmptyString(question.answer)) fail(`${label}.answer must be a non-empty string`);
      break;
    }
  }
}

async function importModule(filePath) {
  return import(pathToFileURL(filePath).href);
}

function collectDataFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...collectDataFiles(full));
    else if (entry.isFile() && entry.name.endsWith('.js') && full !== indexFile) files.push(full);
  }
  return files;
}

function validateLessonModule(mod, fileLabel) {
  if (!isNonEmptyString(mod.id)) fail(`${fileLabel}: export const id must be a non-empty string`);
  if (!isNonEmptyString(mod.title)) fail(`${fileLabel}: export const title must be a non-empty string`);
  if (!isNonEmptyString(mod.icon)) fail(`${fileLabel}: export const icon must be a non-empty string`);
  if (!mod.metadata || typeof mod.metadata !== 'object') fail(`${fileLabel}: export const metadata must be an object`);
  if (!mod.briefing || typeof mod.briefing !== 'object') fail(`${fileLabel}: export const briefing must be an object`);
  if (!Array.isArray(mod.questions)) fail(`${fileLabel}: export const questions must be an array`);

  if (mod.metadata) {
    if (!isNonEmptyString(mod.metadata.difficulty)) fail(`${fileLabel}: metadata.difficulty must be a non-empty string`);
    if (!Number.isFinite(mod.metadata.estimatedMinutes) || mod.metadata.estimatedMinutes <= 0) {
      fail(`${fileLabel}: metadata.estimatedMinutes must be a positive number`);
    }
    if (ensureArray(mod.metadata.tags, `${fileLabel}: metadata.tags`) && !mod.metadata.tags.every(isNonEmptyString)) {
      fail(`${fileLabel}: metadata.tags must contain only non-empty strings`);
    }
    if (ensureArray(mod.metadata.grammarTopics, `${fileLabel}: metadata.grammarTopics`) && !mod.metadata.grammarTopics.every(isNonEmptyString)) {
      fail(`${fileLabel}: metadata.grammarTopics must contain only non-empty strings`);
    }
    if (ensureArray(mod.metadata.vocabularyTopics, `${fileLabel}: metadata.vocabularyTopics`) && !mod.metadata.vocabularyTopics.every(isNonEmptyString)) {
      fail(`${fileLabel}: metadata.vocabularyTopics must contain only non-empty strings`);
    }
  }

  if (mod.briefing?.pre) {
    const pre = mod.briefing.pre;
    if (!isNonEmptyString(pre.title)) fail(`${fileLabel}: briefing.pre.title must be a non-empty string`);
    if (!isNonEmptyString(pre.lead)) fail(`${fileLabel}: briefing.pre.lead must be a non-empty string`);
    if (!ensureArray(pre.sections, `${fileLabel}: briefing.pre.sections`)) return;
    pre.sections.forEach((section, idx) => validateBriefingSection(section, `${fileLabel}: briefing.pre.sections[${idx}]`));
  }

  if (mod.briefing?.mid) {
    if (!ensureArray(mod.briefing.mid, `${fileLabel}: briefing.mid`)) return;
    mod.briefing.mid.forEach((entry, idx) => {
      const prefix = `${fileLabel}: briefing.mid[${idx}]`;
      if (!entry || typeof entry !== 'object') {
        fail(`${prefix} must be an object`);
        return;
      }
      if (!Number.isInteger(entry.afterQ) || entry.afterQ < 0) fail(`${prefix}.afterQ must be a non-negative integer`);
      if (!isNonEmptyString(entry.title)) fail(`${prefix}.title must be a non-empty string`);
      if (!entry.content) fail(`${prefix}.content is required`);
      else validateBriefingSection(entry.content, `${prefix}.content`);
    });
  }

  (mod.questions || []).forEach((question, idx) => validateQuestion(question, `${fileLabel}: questions[${idx}]`));
}

async function main() {
  const dataFiles = collectDataFiles(dataRoot);
  const seenIds = new Map();

  for (const file of dataFiles) {
    const lesson = await importModule(file);
    const fileLabel = path.relative(projectRoot, file);
    validateLessonModule(lesson, fileLabel);

    if (lesson.id) {
      if (seenIds.has(lesson.id)) fail(`Duplicate lesson id "${lesson.id}" in ${fileLabel} and ${seenIds.get(lesson.id)}`);
      else seenIds.set(lesson.id, fileLabel);
    }
  }

  const registry = await importModule(indexFile);
  const modules = registry.MODULES;
  if (!Array.isArray(modules)) fail(`src/data/index.js must export MODULES as an array`);

  const registeredDayIds = new Set();
  const seenModuleIds = new Set();

  (modules || []).forEach((mod, modIdx) => {
    const prefix = `src/data/index.js MODULES[${modIdx}]`;
    if (!Number.isInteger(mod.id)) fail(`${prefix}.id must be an integer`);
    if (seenModuleIds.has(mod.id)) fail(`${prefix}.id "${mod.id}" is duplicated`);
    seenModuleIds.add(mod.id);
    if (!isNonEmptyString(mod.title)) fail(`${prefix}.title must be a non-empty string`);
    if (!isNonEmptyString(mod.subtitle)) fail(`${prefix}.subtitle must be a non-empty string`);
    if (!isNonEmptyString(mod.icon)) fail(`${prefix}.icon must be a non-empty string`);
    if (!isNonEmptyString(mod.description)) fail(`${prefix}.description must be a non-empty string`);
    if (!ensureArray(mod.days, `${prefix}.days`)) return;
    if (mod.days.length === 0) fail(`${prefix}.days must not be empty`);

    mod.days.forEach((day, dayIdx) => {
      const dayLabel = `${prefix}.days[${dayIdx}]`;
      if (!day || typeof day !== 'object') {
        fail(`${dayLabel} must be a lesson module object`);
        return;
      }
      if (!day.id) fail(`${dayLabel} is missing id`);
      if (registeredDayIds.has(day.id)) fail(`${dayLabel} references duplicate lesson id "${day.id}"`);
      registeredDayIds.add(day.id);
    });
  });

  for (const id of seenIds.keys()) {
    if (!registeredDayIds.has(id)) fail(`Lesson file with id "${id}" is not registered in src/data/index.js`);
  }

  if (errors.length > 0) {
    console.error('\nLesson data validation failed:\n');
    errors.forEach((error, idx) => console.error(`${idx + 1}. ${error}`));
    process.exit(1);
  }

  console.log(`Validated ${seenIds.size} lesson files across ${(modules || []).length} modules.`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
