export const id = "1-1";
export const title = "Basic Vocabulary";
export const icon = "🌊";

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 8,
  tags: ["vocabulary", "elements", "intro"],
  grammarTopics: ["sov-order"],
  vocabularyTopics: ["five elements", "greetings", "core nouns"]
};

export const briefing = {
  pre: {
    title: "Basic Sanskrit Vocabulary",
    lead: "Sanskrit is one of the oldest languages still in active use. Before we begin, load these core words into memory.",
    sections: [
      { type:"table", label:"THE FIVE ELEMENTS // पञ्चमहाभूत", cols:["Devanagari","IAST","Meaning"],
        rows:[["जल","Jala","Water 💧"],["अग्नि","Agni","Fire 🔥"],["वायु","Vāyu","Wind 🌬"],["पृथ्वी","Pṛthvī","Earth 🌍"],["आकाश","Ākāśa","Sky / Ether ✨"]] },
      { type:"grammar", label:"WORD_ORDER", text:"Sanskrit typically follows <strong>Subject → Object → Verb</strong> (SOV) order. Example: <span class='dev'>रामः वनं गच्छति</span> = Rāmaḥ (Ram) + Vanam (forest) + Gacchati (goes)." },
      { type:"block", text:"<strong>नमस्ते</strong> (Namaste) literally means <em>'I bow to you'</em> — नमः (I bow) + ते (to you). It acknowledges the divine in the other person." }
    ]
  },
  mid: [{ afterQ:2, title:"Sentence Structure Hint", tag:"GRAMMAR_CHECKPOINT", content:{ type:"grammar", label:"SOV ORDER", text:"Remember: <strong>Subject + Object + Verb</strong>. <span class='dev'>रामः</span> is the subject (nominative case, ends in -ः)." } }]
};

export const questions = [
  {type:"mcq",question:"What is the Sanskrit word for 'water'?",options:["Agni","Jala","Vayu","Prithvi"],optionsDevanagari:["अग्नि","जल","वायु","पृथ्वी"],answer:"Jala",explanation:"जल (Jala) means water — one of the five classical elements (Panchamahabhuta)."},
  {type:"mcq",question:"Which Sanskrit word means 'fire'?",options:["Jala","Prithvi","Agni","Akasha"],optionsDevanagari:["जल","पृथ्वी","अग्नि","आकाश"],answer:"Agni",explanation:"अग्नि (Agni) is fire — also the name of the fire deity in the Rigveda."},
  {type:"translation",question:"Type the Sanskrit sentence for: 'Ram goes to the forest'",hint:"Use: रामः (Rama) + वनम् (forest) + गच्छति (goes)",answer:"रामः वनं गच्छति",explanation:"रामः = Ram (subject), वनं = forest (object), गच्छति = goes (verb). Sanskrit follows SOV order."},
  {type:"mcq",question:"What does 'नमस्ते' (Namaste) literally mean?",options:["Hello friend","I bow to you","Good morning","Peace be with you"],answer:"I bow to you",explanation:"नमस्ते = नमः (I bow) + ते (to you). It acknowledges the divine in the other person."},
  {type:"fill",question:"Fill in the blank: 'Sun' in Sanskrit is ______",sentenceParts:["'Sun' in Sanskrit is ",""],answer:"सूर्य",answerRoman:"Surya",explanation:"सूर्य (Sūrya) is the Sanskrit word for the Sun, and also the name of the solar deity."},
  {type:"wordtiles",question:"Arrange the words to form: 'The boy drinks water'",tiles:["बालकः","जलं","पिबति"],distractors:["गच्छति","वनम्"],answer:"बालकः जलं पिबति",explanation:"बालकः = boy, जलं = water, पिबति = drinks. Subject–Object–Verb order."}
];
