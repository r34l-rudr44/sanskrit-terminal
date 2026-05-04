export const id = "1-4";
export const title = "Nature & Elements";
export const icon = "🌿";

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 8,
  tags: ["nature", "cosmos", "elements"],
  grammarTopics: ["basic predicates"],
  vocabularyTopics: ["earth", "sky", "moon", "elements"]
};

export const briefing = {
  pre: {
    title: "Nature & Elements // प्रकृति",
    lead: "Sanskrit has a rich vocabulary for the natural world. The Panchamahabhuta forms the basis of Ayurveda, yoga, and Hindu cosmology.",
    sections: [
      { type:"table", label:"THE FIVE ELEMENTS", cols:["Element","Sanskrit","Deity / Association"],
        rows:[["Earth 🌍","पृथ्वी Pṛthvī","Prithvi Mata — Earth Mother"],["Water 💧","जल Jala","Varuna — God of Water"],["Fire 🔥","अग्नि Agni","Agni — Fire deity, Rigveda"],["Wind 🌬","वायु Vāyu","Vayu — father of Hanuman"],["Sky ✨","आकाश Ākāśa","Fifth element — space/ether"]] },
      { type:"table", label:"CELESTIAL BODIES", cols:["Body","Sanskrit","IAST"],
        rows:[["Sun ☀","सूर्य","Sūrya"],["Moon 🌙","चन्द्र","Candra"],["Earth 🌍","पृथ्वी","Pṛthvī"],["Sky 🌌","आकाश","Ākāśa"]] }
    ]
  },
  mid: [{ afterQ:1, title:"Panchamahabhuta", tag:"DEEP_CONTEXT", content:{ type:"block", text:"In Ayurveda, the five elements combine into three <strong>doshas</strong>: Vata (Vayu + Akasha), Pitta (Agni + Jala), and Kapha (Prithvi + Jala)." } }]
};

export const questions = [
  {type:"mcq",question:"What is the Sanskrit word for 'sky' or 'ether'?",options:["Vayu","Jala","Akasha","Prithvi"],optionsDevanagari:["वायु","जल","आकाश","पृथ्वी"],answer:"Akasha",explanation:"आकाश (Ākāśa) means sky or the fifth element 'ether/space'."},
  {type:"match",question:"Match the five elements with their Sanskrit names",pairs:[{left:"Earth 🌍",right:"Prithvi"},{left:"Water 💧",right:"Jala"},{left:"Fire 🔥",right:"Agni"},{left:"Wind 💨",right:"Vayu"}],explanation:"The Panchamahabhuta: Prithvi, Jala, Agni, Vayu, Akasha."},
  {type:"translation",question:"Type the Sanskrit word for 'Earth' (the element)",hint:"This word is also a name — Goddess of the Earth",answer:"पृथ्वी",explanation:"पृथ्वी (Pṛthvī) is Earth — both the element and the personified Earth Goddess."},
  {type:"mcq",question:"वायु (Vayu) is the personification of which element?",options:["Fire","Water","Wind","Earth"],answer:"Wind",explanation:"वायु (Vāyu) is wind/air. Hanuman is said to be the son of Vayu, hence 'Pawan Putra'."},
  {type:"fill",question:"The Sanskrit word for 'moon' is ______",sentenceParts:["The Sanskrit word for 'moon' is ",""],answer:"चन्द्र",answerRoman:"Chandra",explanation:"चन्द्र (Candra) means moon. It also means 'shining, bright'."},
  {type:"wordtiles",question:"Arrange to form: 'The earth is our mother'",tiles:["पृथ्वी","अस्माकं","माता","अस्ति"],distractors:["वायु","जलम्"],answer:"पृथ्वी अस्माकं माता अस्ति",explanation:"पृथ्वी = earth, अस्माकं = our, माता = mother, अस्ति = is."}
];
