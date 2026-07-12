export const id = "1-1";
export const title = "Pronouns";
export const icon = "person";

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 7,
  tags: ["pronouns", "grammar", "intro"],
  grammarTopics: ["pronouns", "gender"],
  vocabularyTopics: ["personal pronouns"]
};

export const briefing = {
  pre: {
    title: "Pronouns सर्वनामानि",
    lead: "Sanskrit has three persons and three genders. Here are five common pronouns.<br><span class=\"devanagari\">संस्कृतमें हिन्दीके समान ही तीन पुरुष हैं किन्तु हिन्दीसे एक अधिक अर्थात् तीन लिङ्ग हैं। अभी इन पाँच सर्वनामोंको अर्थ सहित आत्मसात करें।</span>",
    sections: [
      { type:"table", label:"Read पठ", cols:["संस्कृत","English","हिन्दी"],
        rows:[["सः","He","वह (पुं)"],["सा","She","वह (स्त्री)"],["तत्","It","वो (नपुं)"],["त्वम्","You","तुम"],["अहम्","I","मैं"]] },
      { type:"grammar", label:"विवेचना।", text:"<strong>सः</strong> is masculine, <strong>सा</strong> is feminine, <strong>तत्</strong> is neuter. <strong>त्वम्</strong> and <strong>अहम्</strong> refer to persons and cover all genders. Alternate spellings: त्वं and अहं respectively.<br><span class=\"devanagari\"><strong>सः</strong> पुंलिङ्गमें है। <strong>सा</strong> स्त्रीलिङ्गमें तथा <strong>तत्</strong> नपुंसकलिङ्गी है। <strong>त्वम्</strong> और <strong>अहम्</strong> तीनों लिङ्गोंके सन्दर्भमें उपयोगी हैं। नियमानुसार त्वम् को त्वं तथा अहम् को अहं भी लिखा जाता है।</span>" }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"What does सः mean?",instruction:"सः शब्दका अनुवाद करें।",options:["He वह (पुं)","She वह (स्त्री)","It वो (नपुं)","You तुम"],answer:"He वह (पुं)",explanation:"सः = He (वह). The masculine third-person pronoun."},
  {type:"mcq",question:"Which Sanskrit word means 'I'?",instruction:"मैं शब्दको संस्कृतमें लिखें।",options:["सः","सा","त्वम्","अहम्"],answer:"अहम्",explanation:"अहम् = I (मैं). Also written अहं. First-person singular."},
  {type:"mcq",question:"तत् refers to?",instruction:"तत् शब्दका अनुवाद करें।",options:["He वह (पुं)","She वह (स्त्री)","It वो (नपुं)","You तुम"],answer:"It वो (नपुं)",explanation:"तत् = It (वो). The neuter pronoun, used for things that are neither masculine nor feminine."},
  {type:"match",question:"Match the Sanskrit pronouns to their meanings",pairs:[{left:"सः",right:"He वह (पुं)"},{left:"सा",right:"She वह (स्त्री)"},{left:"तत्",right:"It वो (नपुं)"},{left:"अहम्",right:"I मैं"},{left:"त्वम्",right:"You तुम"}],explanation:"सः = He (वह), सा = She (वह), तत् = It (वो), अहम् = I (मैं), त्वम् = You (तुम)."},
  {type:"mcq",question:"त्वम् translates to:",instruction:"त्वम् शब्दका अनुवाद करें।",options:["I मैं","He वह (पुं)","She वह (स्त्री)","You तुम"],answer:"You तुम",explanation:"त्वम् = You (तुम). Second-person singular. Also written त्वं."},
  {type:"mcq",question:"Which pronoun is feminine?",instruction:"निम्नलिखितमें से स्त्रीलिङ्गी सर्वनाम शब्दको चुनें।",options:["सः","तत्","त्वम्","सा"],answer:"सा",explanation:"सा = She (वह स्त्री.). सः is masculine — He (वह), तत् is neuter — It (वो)."},
  {type:"mcq",question:"Which pronoun is neuter — neither masculine nor feminine?",instruction:"निम्नलिखितमें से नपुंसकलिङ्गी सर्वनाम शब्दको चुनें।",options:["सः","सा","त्वम्","तत्"],answer:"तत्",explanation:"तत् = It (वो) — the neuter pronoun. सः (He) is masculine, सा (She) is feminine. त्वम् and अहम् cover all genders."}
];
