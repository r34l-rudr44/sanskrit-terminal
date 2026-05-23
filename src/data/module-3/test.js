export const id = "3-T";
export const title = "Final Test";
export const icon = "📝";
export const isTest = true;

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 12,
  tags: ["assessment", "module-test", "review"],
  grammarTopics: ["temporal-adverbs", "future-tense", "correlatives"],
  vocabularyTopics: ["time", "conditionals"]
};

export const briefing = {
  pre: {
    title: "Module 3 Final Test",
    lead: "You've covered time words (कदा, यदा, सदा, तदा), time of day, the full correlative family (यदा…तदा, यदि…तर्हि, यथा…तथा), and the future tense (गमिष्यामि). This test brings it all together.",
    sections: [
      { type:"block", text:"<strong>This test covers:</strong> -दा time words · time of day · future tense · correlative pairs" },
      { type:"grammar", label:"TEST RULES", text:"Answer at least 60% correctly to pass. Mistakes show the correct answer with an explanation." }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"कदा means:",options:["Always — हमेशा","Then — तब","When? — कब","Where? — कहाँ"],answer:"When? — कब",explanation:"कदा = When? (कब). The कु- prefix marks the interrogative: कदा (when?), कुत्र (where?)."},
  {type:"mcq",question:"Which pair expresses 'when…then'?",options:["यत्र...तत्र","यदि...तर्हि","यदा...तदा","यथा...तथा"],answer:"यदा...तदा",explanation:"यदा...तदा = when...then (जब...तब). यत्र...तत्र = where...there; यदि...तर्हि = if...then; यथा...तथा = just as...so too."},
  {type:"mcq",question:"प्रातः means:",options:["In the evening","At night","At noon","In the morning — प्रातःकाल"],answer:"In the morning — प्रातःकाल",explanation:"प्रातः = in the morning. Time of day: प्रातः (morning) → दिवा (day) → मध्याह्ने (noon) → सायम् (evening) → रात्रौ (night)."},
  {type:"fill",question:"Complete — 'Today I do not go to school': ___ अहं पाठशालां न गच्छामि",sentenceParts:[" अहं पाठशालां न गच्छामि।"],answer:"अद्य",answerRoman:"adya",translation:"Today I do not go to school.",explanation:"अद्य = today (आज). Time axis: ह्यः (yesterday) → अद्य (today) → श्वः (tomorrow)."},
  {type:"mcq",question:"गमिष्यति means:",options:["He is going — वह जाता है","He went — वह गया","He will go — वह जाएगा","He does not go — वह नहीं जाता"],answer:"He will go — वह जाएगा",explanation:"गमिष्यति = He/she will go (वह जाएगा). Future infix -इष्य-: गमिष्यामि (I), गमिष्यसि (you), गमिष्यति (he/she)."},
  {type:"fill",question:"Complete: यदि त्वं पाठशालां गच्छसि ___ अहं अपि गच्छामि",sentenceParts:["यदि त्वं पाठशालां गच्छसि "," अहं अपि गच्छामि।"],answer:"तर्हि",answerRoman:"tarhi",translation:"If you go to school, then I also go.",explanation:"यदि...तर्हि = if...then. तर्हि is the result-half of the condition correlative, parallel to तदा and तत्र."},
  {type:"mcq",question:"यथा...तथा expresses:",options:["A time sequence — when...then","A place — where...there","A condition — if...then","A comparison — just as...so too"],answer:"A comparison — just as...so too",explanation:"यथा...तथा = just as...so too (जैसे...वैसे). यथा सः गच्छति तथा त्वं गमिष्यसि = Just as he goes, so will you go."},
  {type:"wordtiles",question:"Build: 'He will go to school tomorrow'",tiles:["सः","श्वः","पाठशालां","गमिष्यति"],distractors:["गच्छति","अद्य"],answer:"सः श्वः पाठशालां गमिष्यति।",explanation:"सः श्वः पाठशालां गमिष्यति = He will go to school tomorrow. श्वः = tomorrow, गमिष्यति = he will go (future tense)."}
];
