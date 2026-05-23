export const id = "2-P2";
export const title = "Practice 2 — अभ्यासः २";
export const icon = "🧩";

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 12,
  tags: ["practice", "sentences", "negation", "questions", "correlatives"],
  grammarTopics: ["negative-questions", "correlatives", "all-persons"],
  vocabularyTopics: ["places", "extended sentences"]
};

export const briefing = {
  pre: {
    title: "Practice 2 — अभ्यासः २",
    lead: "Now build on what you know. Combine negation with questions, switch freely between all three persons, and use यत्र...तत्र in richer contexts — the same words, used together.",
    sections: [
      { type:"grammar", label:"NEGATIVE QUESTIONS // न + किम्", text:"You can combine negation and a question in one sentence:<br>सः ग्रामं <strong>न</strong> गच्छति <strong>किम्</strong>। — Does he not go to the village?<br>त्वं पाठशालां <strong>न</strong> गच्छसि <strong>किम्</strong>। — Do you not go to school?<br>The pattern is: subject + place + <strong>न</strong> + verb + <strong>किम्</strong>." },
      { type:"grammar", label:"THREE PERSONS // त्रयः पुरुषाः", text:"All three persons with destinations:<br><strong>अहं</strong> आपणं गच्छ<strong>आमि</strong> — I go to the market.<br><strong>त्वं</strong> आपणं गच्छ<strong>सि</strong> — You go to the market.<br><strong>सः</strong> आपणं गच्छ<strong>ति</strong> — He goes to the market.<br>Only the verb ending changes — the place stays the same." },
      { type:"block", text:"<strong>Extended sentences:</strong><br>कः पाठशालां न गच्छति। — Who does not go to school?<br>यत्र सः न गच्छति तत्र त्वं गच्छसि। — Where he does not go, you go.<br>सः कुत्र न गच्छति। — Where does he not go?" }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"सः ग्रामं न गच्छति किम्। means:",options:["He goes to the village","He does not go to the village","Does he not go to the village? — क्या वह गाँव नहीं जाता?","Where does he not go?"],answer:"Does he not go to the village? — क्या वह गाँव नहीं जाता?",explanation:"न + किम् together make a negative yes/no question. सः ग्रामं न गच्छति = he does not go; adding किम् turns it into: Does he not go to the village?"},
  {type:"match",question:"Match each sentence to its meaning",pairs:[{left:"अहं आपणं गच्छामि।",right:"I go to the market"},{left:"त्वं आपणं गच्छसि।",right:"You go to the market"},{left:"सः आपणं गच्छति।",right:"He goes to the market"},{left:"कः आपणं गच्छति।",right:"Who goes to the market?"}],explanation:"Only the subject and verb ending change: अहं → -आमि, त्वं → -सि, सः → -ति, कः = who?"},
  {type:"wordtiles",question:"Build: 'Does he not go to school?'",tiles:["सः","पाठशालां","न","गच्छति","किम्"],distractors:["कुत्र","अहं"],answer:"सः पाठशालां न गच्छति किम्।",explanation:"सः पाठशालां न गच्छति किम् = Does he not go to school? (क्या वह पाठशाला नहीं जाता?) — न before verb, किम् at end."},
  {type:"fill",question:"Complete: 'Where he does not go, you go' — यत्र सः न गच्छति ___ त्वं गच्छसि",sentenceParts:["यत्र सः न गच्छति "," त्वं गच्छसि।"],answer:"तत्र",answerRoman:"tatra",translation:"Where he does not go, you go.",explanation:"यत्र...तत्र = where...there. Even with negation in the first clause, the structure stays the same: यत्र (where) ... तत्र (there)."},
  {type:"mcq",question:"कः पाठशालां न गच्छति। means:",options:["He does not go to school","Who does not go to school? — पाठशाला कौन नहीं जाता?","Does he not go to school?","You do not go to school"],answer:"Who does not go to school? — पाठशाला कौन नहीं जाता?",explanation:"कः = Who? (कौन). Adding न makes it negative: कः पाठशालां न गच्छति = Who does not go to school?"},
  {type:"mcq",question:"सः कुत्र न गच्छति। means:",options:["He does not go","Where does he not go? — वह कहाँ नहीं जाता?","He goes where you go","Does he not go?"],answer:"Where does he not go? — वह कहाँ नहीं जाता?",explanation:"कुत्र + न together in the same sentence: सः कुत्र न गच्छति = Where does he not go? (वह कहाँ नहीं जाता?)"},
  {type:"wordtiles",question:"Build: 'Where you go, he does not go'",tiles:["यत्र","त्वं","गच्छसि","तत्र","सः","न","गच्छति"],distractors:["किम्","अहं"],answer:"यत्र त्वं गच्छसि तत्र सः न गच्छति।",explanation:"यत्र त्वं गच्छसि = where you go; तत्र सः न गच्छति = there he does not go. यत्र...तत्र holds the two clauses together."},
  {type:"translation",question:"Type: 'Who does not go to the market?'",hint:"कः + market + न + he-goes-verb",answer:"कः आपणं न गच्छति।",answerRoman:"kaH AapaNam na gacchati",explanation:"कः आपणं न गच्छति = Who does not go to the market? (बाज़ार कौन नहीं जाता?) — कः acts like सः for the verb: गच्छति."}
];
