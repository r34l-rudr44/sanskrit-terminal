export const id = "2-2";
export const title = "Family & People";
export const icon = "👨‍👩‍👧";

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 8,
  tags: ["family", "relationships", "vocabulary"],
  grammarTopics: ["basic noun recall"],
  vocabularyTopics: ["family terms", "social words"]
};

export const briefing = {
  pre: {
    title: "Family & People // परिवार",
    lead: "Sanskrit family terms are the roots of many modern Indo-European words. The word 'father' in English traces directly back to Sanskrit पितृ.",
    sections: [
      { type:"table", label:"FAMILY TERMS", cols:["Sanskrit","IAST","Meaning"],
        rows:[["माता","mātā","mother"],["पिता","pitā","father"],["पुत्र","putra","son"],["पुत्री","putrī","daughter"],["भ्राता","bhrātā","brother"],["भगिनी","bhaginī","sister"],["गुरु","guru","teacher"],["शिष्य","śiṣya","student"]] },
      { type:"block", text:"<strong>मित्र</strong> (mitra) means 'friend' — it also appears as Mitra, the Vedic deity of friendship and contracts." }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"What is 'mother' in Sanskrit?",options:["Pita","Mata","Putra","Guru"],optionsDevanagari:["पिता","माता","पुत्र","गुरु"],answer:"Mata",explanation:"माता (mātā) means mother. Cognate with Latin 'mater', English 'mother'."},
  {type:"mcq",question:"Which word means 'father'?",options:["Bhrata","Putra","Pita","Sishya"],optionsDevanagari:["भ्राता","पुत्र","पिता","शिष्य"],answer:"Pita",explanation:"पिता (pitā) means father. Cognate with Latin 'pater', English 'father'."},
  {type:"mcq",question:"पुत्र (putra) means?",options:["Teacher","Brother","Son","Student"],answer:"Son",explanation:"पुत्र (putra) means son. The word appears in many Indian names like Putrajaya."},
  {type:"fill",question:"The Sanskrit word for 'teacher' is ______",sentenceParts:["The Sanskrit word for 'teacher' is ",""],answer:"गुरु",answerRoman:"Guru",explanation:"गुरु (guru) means teacher or one who dispels darkness. Now used worldwide."},
  {type:"match",question:"Match the family terms",pairs:[{left:"Father",right:"पिता"},{left:"Mother",right:"माता"},{left:"Son",right:"पुत्र"},{left:"Sister",right:"भगिनी"}],explanation:"Core Sanskrit family vocabulary — roots of many Indo-European family words."},
  {type:"translation",question:"Type the Sanskrit word for 'friend'",hint:"Hint: Mitra — the Vedic deity of friendship",answer:"मित्र",explanation:"मित्र (mitra) means friend or ally. Mitra is also a Vedic deity presiding over contracts."}
];
