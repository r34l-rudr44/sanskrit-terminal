export const id = "2-1";
export const title = "Verbs & Actions";
export const icon = "⚡";

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 8,
  tags: ["verbs", "actions", "sentences"],
  grammarTopics: ["present tense verbs"],
  vocabularyTopics: ["common action verbs"]
};

export const briefing = {
  pre: {
    title: "Sanskrit Verbs // क्रियापद",
    lead: "Verbs are the engine of Sanskrit. They change form based on person, number, and tense. Today we learn the most common action words.",
    sections: [
      { type:"table", label:"COMMON VERBS (Present tense, 3rd person singular)", cols:["Devanagari","IAST","Meaning"],
        rows:[["गच्छति","gacchati","goes / walks"],["पिबति","pibati","drinks"],["खादति","khādati","eats"],["पठति","paṭhati","reads / studies"],["वदति","vadati","speaks / says"],["ददाति","dadāti","gives"]] },
      { type:"grammar", label:"VERB_ENDINGS", text:"In Sanskrit, verb endings encode the subject. <strong>-ति</strong> (-ti) indicates third person singular present tense. रामः <span class='dev'>गच्छति</span> = Ram goes." }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"What does गच्छति (gacchati) mean?",options:["Eats","Goes / walks","Reads","Speaks"],answer:"Goes / walks",explanation:"गच्छति is the present tense 3rd person singular of √गम् (gam) — to go."},
  {type:"mcq",question:"Which verb means 'reads / studies'?",options:["खादति","पिबति","पठति","वदति"],answer:"पठति",explanation:"पठति (paṭhati) — from root √पठ् (paṭh), to read or study."},
  {type:"mcq",question:"What does खादति (khādati) mean?",options:["Drinks","Goes","Eats","Gives"],answer:"Eats",explanation:"खादति (khādati) — from root √खाद् (khād), to eat or chew."},
  {type:"translation",question:"Type the Sanskrit verb meaning 'drinks'",hint:"Hint: The boy _____ water (पिबति / pibati)",answer:"पिबति",explanation:"पिबति (pibati) — from root √पा (pā), to drink. Cognate with Latin 'bibit'."},
  {type:"mcq",question:"वदति (vadati) means?",options:["Runs","Speaks / says","Sleeps","Writes"],answer:"Speaks / says",explanation:"वदति — from root √वद् (vad), to speak. Cognate with Latin 'vox' (voice)."},
  {type:"wordtiles",question:"Arrange: 'The student reads'",tiles:["छात्रः","पठति"],distractors:["खादति","पिबति"],answer:"छात्रः पठति",explanation:"छात्रः = student (subject), पठति = reads (verb). In Sanskrit, subject alone + verb is a complete sentence."}
];
