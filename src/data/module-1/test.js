export const id = "1-T";
export const title = "Final Test";
export const icon = "📝";
export const isTest = true;

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 10,
  tags: ["assessment", "module-test", "review"],
  grammarTopics: ["sov-order", "basic numerals", "simple expressions"],
  vocabularyTopics: ["module 1 review"]
};

export const briefing = {
  pre: {
    title: "Module 1 Final Test",
    lead: "You've completed all four days of Module 1 — Foundations. This test draws from all lessons. Show what you've loaded into memory.",
    sections: [
      { type:"block", text:"This review covers <strong>vocabulary, numbers, greetings,</strong> and <strong>nature</strong>. Take your time. Good luck — शुभकामना!" },
      { type:"grammar", label:"TEST_RULES", text:"Answer each question to the best of your ability. You can skip if unsure, but skips count as wrong. Score <strong>60%+</strong> to unlock your certificate." }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"What is the Sanskrit word for 'water'?",options:["Agni","Prithvi","Jala","Vayu"],optionsDevanagari:["अग्नि","पृथ्वी","जल","वायु"],answer:"Jala",explanation:"जल (Jala) means water — one of the Panchamahabhuta."},
  {type:"mcq",question:"Sanskrit for 'Five' (५) is?",options:["Dasha","Eka","Tri","Pancha"],optionsDevanagari:["दश","एक","त्रि","पञ्च"],answer:"Pancha",explanation:"पञ्च (Pañca) means five."},
  {type:"mcq",question:"'Good morning' in Sanskrit is?",options:["Shubha Ratri","Shubha Sandhya","Shubha Prabhat","Dhanyavad"],answer:"Shubha Prabhat",explanation:"शुभ प्रभात — शुभ (auspicious) + प्रभात (morning)."},
  {type:"mcq",question:"वायु (Vayu) is associated with which element?",options:["Fire","Earth","Wind","Water"],answer:"Wind",explanation:"वायु (Vāyu) is the deity and personification of wind/air."},
  {type:"translation",question:"Type the Sanskrit word for 'Ten'",hint:"Relates to the English word 'decade'",answer:"दश",explanation:"दश (Daśa) = ten."},
  {type:"mcq",question:"What does नमस्ते literally mean?",options:["Hello","Good day","I bow to you","Be well"],answer:"I bow to you",explanation:"नमस्ते = नमः (I bow) + ते (to you)."},
  {type:"fill",question:"The Sanskrit word for 'moon' is ______",sentenceParts:["The Sanskrit word for 'moon' is ",""],answer:"चन्द्र",answerRoman:"Chandra",explanation:"चन्द्र (Candra) — moon, also meaning 'shining'."},
  {type:"wordtiles",question:"Arrange: 'The boy drinks water'",tiles:["बालकः","जलं","पिबति"],distractors:["वनम्","गच्छति"],answer:"बालकः जलं पिबति",explanation:"SOV order: बालकः (boy) + जलं (water) + पिबति (drinks)."}
];
