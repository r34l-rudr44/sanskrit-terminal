export const id = "2-T";
export const title = "Final Test";
export const icon = "📝";
export const isTest = true;

export const briefing = {
  pre: {
    title: "Module 2 Final Test",
    lead: "You've completed the three days of Module 2 — The Living Language. This test covers verbs, family terms, and colors. Prove your mastery!",
    sections: [
      { type:"block", text:"Questions cover <strong>verbs in action, family vocabulary,</strong> and <strong>color terms</strong>. Remember: verb endings reveal the subject." },
      { type:"grammar", label:"TEST_RULES", text:"Answer each question carefully. Score <strong>60%+</strong> to earn your Module 2 certificate." }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"गच्छति means?",options:["Eats","Reads","Goes","Speaks"],answer:"Goes",explanation:"गच्छति — 3rd person singular present of √गम् (to go)."},
  {type:"mcq",question:"पिता means?",options:["Son","Teacher","Mother","Father"],answer:"Father",explanation:"पिता (pitā) = father. Cognate with Latin 'pater'."},
  {type:"mcq",question:"Which color is रक्त?",options:["Blue","Green","Red","White"],answer:"Red",explanation:"रक्त (rakta) = red (also means blood)."},
  {type:"mcq",question:"पठति means?",options:["Eats","Reads","Goes","Gives"],answer:"Reads",explanation:"पठति (paṭhati) — from root √पठ् (paṭh), to read/study."},
  {type:"fill",question:"Sanskrit for 'teacher' is ______",sentenceParts:["Sanskrit for 'teacher' is ",""],answer:"गुरु",answerRoman:"Guru",explanation:"गुरु (guru) — one who dispels darkness. Now used globally."},
  {type:"mcq",question:"नील means?",options:["Green","Yellow","Red","Blue"],answer:"Blue",explanation:"नील (nīla) = blue or indigo. Root of the English word 'indigo'."},
  {type:"translation",question:"Type Sanskrit for 'friend'",hint:"Vedic deity of friendship: Mitra",answer:"मित्र",explanation:"मित्र (mitra) = friend or ally."},
  {type:"wordtiles",question:"Arrange: 'The student reads'",tiles:["छात्रः","पठति"],distractors:["खादति","वदति"],answer:"छात्रः पठति",explanation:"छात्रः (student) + पठति (reads). Complete sentence: subject + verb."}
];
