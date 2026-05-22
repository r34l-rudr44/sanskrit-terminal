export const id = "3-4";
export const title = "Future Tense — भविष्यत्काल";
export const icon = "🔮";

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 8,
  tags: ["future-tense", "sentences", "questions"],
  grammarTopics: ["future-tense", "katham"],
  vocabularyTopics: ["will go", "how", "tomorrow"]
};

export const briefing = {
  pre: {
    title: "Future Tense — भविष्यत्काल",
    lead: "Add -इष्य- to गम् and the sentence jumps forward in time. Three forms cover all three persons — and कथम् (how?) lets you question the plan.",
    sections: [
      { type:"table", label:"FUTURE TENSE // भविष्यत्काल", cols:["Sanskrit","Hindi","Meaning"],
        rows:[["गमिष्यामि","मैं जाऊँगा","I will go"],["गमिष्यसि","तुम जाओगे","You will go"],["गमिष्यति","वह जाएगा","He/She will go"]] },
      { type:"grammar", label:"HOW IT WORKS // -इष्य- INFIX", text:"The future tense inserts <strong>-इष्य-</strong> between the root and the personal ending:<br>गम् + इष्य + आमि → <strong>गमिष्यामि</strong> (I will go)<br>गम् + इष्य + सि → <strong>गमिष्यसि</strong> (you will go)<br>गम् + इष्य + ति → <strong>गमिष्यति</strong> (he/she will go)<br><br>The endings -आमि / -सि / -ति are the same ones you know from the present tense (गच्छामि / गच्छसि / गच्छति)." },
      { type:"block", text:"<strong>Sentences:</strong><br>अहं श्वः जयनगरम् गमिष्यामि — I will go to Jaynagar tomorrow. (मैं कल जयनगर जाऊँगा।)<br>सः परश्वः मधुपुरम् गमिष्यति — He will go to Madhupur day after tomorrow. (वह परसों मधुपुर जाएगा।)<br>त्वं कथम् जयनगरम् गमिष्यसि — How will you go to Jaynagar? (तुम कैसे जयनगर जाओगे?)<br>सा श्वः पाठशालां न गमिष्यति — She will not go to school tomorrow. (वह कल पाठशाला नहीं जाएगी।)" }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"गमिष्यामि means:",options:["I am going — मैं जाता हूँ","I went — मैं गया","He will go — वह जाएगा","I will go — मैं जाऊँगा"],answer:"I will go — मैं जाऊँगा",explanation:"गमिष्यामि = I will go (मैं जाऊँगा). The -इष्य- infix marks the future tense; -आमि = I. Pattern: गमिष्यामि (I) / गमिष्यसि (you) / गमिष्यति (he/she)."},
  {type:"mcq",question:"गमिष्यसि means:",options:["I will go — मैं जाऊँगा","He will go — वह जाएगा","You will go — तुम जाओगे","She will go — वह जाएगी"],answer:"You will go — तुम जाओगे",explanation:"गमिष्यसि = You will go (तुम जाओगे). The -सि ending always marks the second person (त्वम् / you), in present (गच्छसि) and future alike."},
  {type:"mcq",question:"कथम् means:",options:["Where? — कहाँ","When? — कब","What? — क्या","How? — कैसे"],answer:"How? — कैसे",explanation:"कथम् = How? (कैसे). The question word family: कुत्र = where?, कदा = when?, कः = who?, कथम् = how?"},
  {type:"match",question:"Match the future tense forms and question word",pairs:[{left:"गमिष्यामि",right:"I will go — मैं जाऊँगा"},{left:"गमिष्यसि",right:"You will go — तुम जाओगे"},{left:"गमिष्यति",right:"He will go — वह जाएगा"},{left:"कथम्",right:"How? — कैसे"}],explanation:"Future tense of गम्: -आमि (I), -सि (you), -ति (he/she). कथम् = how?, the manner question word."},
  {type:"fill",question:"Complete — 'He will go to school tomorrow': सः श्वः पाठशालां ___",sentenceParts:["सः श्वः पाठशालां ","।"],answer:"गमिष्यति",answerRoman:"gamishyati",translation:"He will go to school tomorrow.",explanation:"गमिष्यति = He/she will go. सः श्वः पाठशालां गमिष्यति = He will go to school tomorrow. श्वः = tomorrow."},
  {type:"mcq",question:"त्वं कथम् जयनगरम् गमिष्यसि। means:",options:["When will you go to Jaynagar?","Where will you go tomorrow?","How will you go to Jaynagar? — तुम कैसे जयनगर जाओगे?","Will you go to Jaynagar?"],answer:"How will you go to Jaynagar? — तुम कैसे जयनगर जाओगे?",explanation:"कथम् = how? (कैसे). त्वं कथम् जयनगरम् गमिष्यसि = How will you go to Jaynagar? (तुम कैसे जयनगर जाओगे?)"},
  {type:"wordtiles",question:"Build: 'I will go to Jaynagar tomorrow'",tiles:["अहं","श्वः","जयनगरम्","गमिष्यामि"],distractors:["गमिष्यति","परश्वः"],answer:"अहं श्वः जयनगरम् गमिष्यामि।",explanation:"अहं श्वः जयनगरम् गमिष्यामि = I will go to Jaynagar tomorrow. श्वः = tomorrow, जयनगरम् = to Jaynagar (accusative), गमिष्यामि = I will go."}
];
