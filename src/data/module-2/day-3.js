export const id = "2-3";
export const title = "Colors & World";
export const icon = "🎨";

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 8,
  tags: ["colors", "adjectives", "descriptions"],
  grammarTopics: ["adjective noun agreement"],
  vocabularyTopics: ["colors", "descriptive adjectives"]
};

export const briefing = {
  pre: {
    title: "Colors & Descriptions // वर्ण",
    lead: "Sanskrit color words are deeply tied to nature and mythology. Many are still used in modern Indian languages and names.",
    sections: [
      { type:"table", label:"COLORS", cols:["Sanskrit","IAST","Meaning / Notes"],
        rows:[["रक्त","rakta","red (also means blood)"],["नील","nīla","blue (also indigo)"],["हरित","harita","green"],["पीत","pīta","yellow"],["श्वेत","śveta","white"],["कृष्ण","kṛṣṇa","black (also the name Krishna)"],["श्याम","śyāma","dark / dusky"],["सुवर्ण","suvarṇa","golden"]] },
      { type:"grammar", label:"ADJECTIVE_AGREEMENT", text:"Sanskrit adjectives agree with the noun in gender, case, and number. <span class='dev'>नीलं आकाशम्</span> = blue sky (neuter). <span class='dev'>नीला माता</span> = the blue mother (feminine)." }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"'Red' in Sanskrit is?",options:["Nila","Harita","Rakta","Pita"],optionsDevanagari:["नील","हरित","रक्त","पीत"],answer:"Rakta",explanation:"रक्त (rakta) means red — the word also means blood, reflecting the color association."},
  {type:"mcq",question:"Which word means 'blue'?",options:["Shveta","Nila","Kṛishna","Harita"],optionsDevanagari:["श्वेत","नील","कृष्ण","हरित"],answer:"Nila",explanation:"नील (nīla) means blue or indigo. The English word 'indigo' itself comes from Sanskrit 'nīlā' via Greek."},
  {type:"mcq",question:"हरित (harita) means?",options:["Red","Yellow","White","Green"],answer:"Green",explanation:"हरित (harita) means green. Related to 'hari' — a name of Vishnu associated with verdant/golden color."},
  {type:"fill",question:"The Sanskrit word for 'white' is ______",sentenceParts:["The Sanskrit word for 'white' is ",""],answer:"श्वेत",answerRoman:"Shveta",explanation:"श्वेत (śveta) means white. Cognate with English 'white' via Proto-Indo-European."},
  {type:"mcq",question:"'Beautiful' in Sanskrit is?",options:["Sundara","Rakta","Nila","Guru"],optionsDevanagari:["सुन्दर","रक्त","नील","गुरु"],answer:"Sundara",explanation:"सुन्दर (sundara) means beautiful or handsome. A very common word in Indian names and poetry."},
  {type:"wordtiles",question:"Arrange: 'The blue sky'",tiles:["नीलं","आकाशम्"],distractors:["रक्तं","हरितम्"],answer:"नीलं आकाशम्",explanation:"नीलं = blue (neuter, agreeing with आकाशम्), आकाशम् = sky. Adjective precedes noun in Sanskrit."}
];
