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
    title: "Pronouns — सर्वनामानि",
    lead: "Sanskrit has three persons and three genders. These five pronouns are your entry point to every sentence.",
    sections: [
      { type:"table", label:"PRONOUNS // सर्वनामानि", cols:["Devanagari","Meaning","Hindi"],
        rows:[["सः","He","वह (पु.)"],["सा","She","वह (स्त्री.)"],["तत्","It","वो"],["त्वम्","You","तुम"],["अहम्","I","मैं"]] },
      { type:"grammar", label:"GENDER_NOTE", text:"<strong>सः</strong> is masculine, <strong>सा</strong> is feminine, <strong>तत्</strong> is neuter. <strong>त्वम्</strong> and <strong>अहम्</strong> refer to persons and cover all genders. Alternate spellings: त्वं, अहं." }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"What does सः mean?",options:["He — वह","She — वह (स्त्री.)","It — वो","You — तुम"],answer:"He — वह",explanation:"सः = He (वह). The masculine third-person pronoun."},
  {type:"mcq",question:"Which Sanskrit word means 'I — मैं'?",options:["सः","सा","त्वम्","अहम्"],answer:"अहम्",explanation:"अहम् = I (मैं). Also written अहं. First-person singular."},
  {type:"mcq",question:"तत् refers to:",options:["He — वह (पु.)","She — वह (स्त्री.)","It — वो","You — तुम"],answer:"It — वो",explanation:"तत् = It (वो). The neuter pronoun, used for things that are neither masculine nor feminine."},
  {type:"match",question:"Match the Sanskrit pronouns to their meanings",pairs:[{left:"सः",right:"He — वह"},{left:"सा",right:"She — वह"},{left:"अहम्",right:"I — मैं"},{left:"त्वम्",right:"You — तुम"}],explanation:"सः = He (वह), सा = She (वह), अहम् = I (मैं), त्वम् = You (तुम)."},
  {type:"mcq",question:"त्वम् translates to:",options:["I — मैं","He — वह","She — वह","You — तुम"],answer:"You — तुम",explanation:"त्वम् = You (तुम). Second-person singular. Also written त्वं."},
  {type:"mcq",question:"Which pronoun is feminine?",options:["सः","तत्","त्वम्","सा"],answer:"सा",explanation:"सा = She (वह स्त्री.). सः is masculine — He (वह), तत् is neuter — It (वो)."}
];
