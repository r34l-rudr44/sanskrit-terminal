export const id = "1-1";
export const title = "Pronouns";
export const icon = "👤";

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
    lead: "Sanskrit has three persons and three genders. Here are five common pronouns.<br><span class=\"devanagari\">संस्कृतमें हिन्दीके समान ही तीन पुरुष हैं किन्तु हिन्दीसे एक अतिरिक्त अर्थात् तीन लिङ्ग हैं। अभी इन पाँच सर्वनामोंको अर्थ सहित आत्मसात करें।</span>",
    sections: [
      { type:"table", label:"Read पठ", cols:["Devanagari","Meaning","Hindi"],
        rows:[["सः","He","वह (पुं)"],["सा","She","वह (स्त्री)"],["तत्","It","वो (नपुं)"],["त्वम्","You","तुम"],["अहम्","I","मैं"]] },
      { type:"grammar", label:"GENDER_NOTE", text:"<strong>सः</strong> is masculine, <strong>सा</strong> is feminine, <strong>तत्</strong> is neuter. <strong>त्वम्</strong> and <strong>अहम्</strong> refer to persons and cover all genders. Alternate spellings: त्वं and अहं respectively.<br><span class=\"devanagari\"><strong>सः</strong> पुंलिङ्गमें है। <strong>सा</strong> स्त्रीलिङ्गमें तथा <strong>तत्</strong> नपुंसकलिङ्गी है। <strong>त्वम्</strong> और <strong>अहम्</strong> तीनों लिङ्गोंके सन्दर्भमें उपयोगी हैं। नियमानुसार त्वम् को त्वं तथा अहम् को अहं भी लिखा जाता है।</span>" }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"What does सः mean?",options:["He — वह","She — वह (स्त्री.)","It — वो","You — तुम"],answer:"He — वह",explanation:"सः = He (वह). The masculine third-person pronoun."},
  {type:"mcq",question:"Which Sanskrit word means 'I — मैं'?",options:["सः","सा","त्वम्","अहम्"],answer:"अहम्",explanation:"अहम् = I (मैं). Also written अहं. First-person singular."},
  {type:"mcq",question:"तत् refers to:",options:["He — वह (पु.)","She — वह (स्त्री.)","It — वो","You — तुम"],answer:"It — वो",explanation:"तत् = It (वो). The neuter pronoun, used for things that are neither masculine nor feminine."},
  {type:"match",question:"Match the Sanskrit pronouns to their meanings",pairs:[{left:"सः",right:"He — वह"},{left:"सा",right:"She — वह"},{left:"तत्",right:"It — वो"},{left:"अहम्",right:"I — मैं"},{left:"त्वम्",right:"You — तुम"}],explanation:"सः = He (वह), सा = She (वह), तत् = It (वो), अहम् = I (मैं), त्वम् = You (तुम)."},
  {type:"mcq",question:"त्वम् translates to:",options:["I — मैं","He — वह","She — वह","You — तुम"],answer:"You — तुम",explanation:"त्वम् = You (तुम). Second-person singular. Also written त्वं."},
  {type:"mcq",question:"Which pronoun is feminine?",options:["सः","तत्","त्वम्","सा"],answer:"सा",explanation:"सा = She (वह स्त्री.). सः is masculine — He (वह), तत् is neuter — It (वो)."},
  {type:"mcq",question:"Which pronoun is neuter — neither masculine nor feminine?",options:["सः","सा","त्वम्","तत्"],answer:"तत्",explanation:"तत् = It (वो) — the neuter pronoun. सः (He) is masculine, सा (She) is feminine. त्वम् and अहम् cover all genders."}
];
