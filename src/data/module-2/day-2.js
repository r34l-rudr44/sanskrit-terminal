export const id = "2-2";
export const title = "Questions + Places";
export const icon = "🗺️";

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 9,
  tags: ["questions", "places", "sentences"],
  grammarTopics: ["question-words", "destination-nouns"],
  vocabularyTopics: ["places", "question patterns"]
};

export const briefing = {
  pre: {
    title: "Questions + Places — प्रश्नानि",
    lead: "You know the places. Now ask about them. Three question tools — कुत्र, किम्, and कः — combine with place words to build real conversations.",
    sections: [
      { type:"grammar", label:"ASKING WHERE // कुत्र", text:"Use <strong>कुत्र</strong> to ask 'where' someone goes:<br>त्वं <strong>कुत्र</strong> गच्छसि। — Where do you go? (तुम कहाँ जाते हो?)<br>सः <strong>कुत्र</strong> गच्छति। — Where does he go? (वह कहाँ जाता है?)" },
      { type:"grammar", label:"YES/NO QUESTIONS // किम्", text:"<strong>किम्</strong> at the start or end makes any sentence a yes/no question:<br><strong>किं</strong> त्वम् आपणं गच्छसि। — Do you go to the market?<br>सः उद्यानं गच्छति <strong>किम्</strong>। — Does he go to the garden?<br>Both positions are correct." },
      { type:"grammar", label:"WHO + PLACE // कः", text:"<strong>कः</strong> with a place and verb asks 'Who goes to ___?'<br>कः आपणं गच्छति। — Who goes to the market?<br>कः पाठशालां गच्छति। — Who goes to school?" },
      { type:"block", text:"<strong>Correlative sentences:</strong><br>यत्र त्वं गच्छसि। — Where you go. (जहाँ तुम जाते हो।)<br>तत्र अहं गच्छामि। — I go there. (वहाँ मैं जाता हूँ।)<br>Together: यत्र त्वं गच्छसि तत्र अहं गच्छामि। — Where you go, I go there too." }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"त्वं कुत्र गच्छसि। means:",options:["You go home","Where do you go? — तुम कहाँ जाते हो?","Who goes there?","Do you go?"],answer:"Where do you go? — तुम कहाँ जाते हो?",explanation:"त्वं कुत्र गच्छसि = Where do you go? (तुम कहाँ जाते हो?) — कुत्र asks for a location answer."},
  {type:"mcq",question:"किं त्वम् आपणं गच्छसि। means:",options:["You go to the market","Do you go to the market? — क्या तुम बाज़ार जाते हो?","He goes to the market","Where is the market?"],answer:"Do you go to the market? — क्या तुम बाज़ार जाते हो?",explanation:"किं त्वम् आपणं गच्छसि = Do you go to the market? (क्या तुम बाज़ार जाते हो?) — किम् turns it into a yes/no question."},
  {type:"fill",question:"Add the question particle to make this a yes/no question: सः उद्यानं गच्छति ___",sentenceParts:["सः उद्यानं गच्छति ","।"],answer:"किम्",answerRoman:"kim",translation:"Does he go to the garden?",explanation:"सः उद्यानं गच्छति किम् = Does he go to the garden? — किम् at the end makes it a yes/no question."},
  {type:"wordtiles",question:"Build: 'Does he go to the village?'",tiles:["किं","सः","ग्रामं","गच्छति"],distractors:["न","तत्र"],answer:"किं सः ग्रामं गच्छति।",explanation:"किं सः ग्रामं गच्छति = Does he go to the village? किम् can appear at the start or end — the remaining words are flexible."},
  {type:"mcq",question:"Where in the sentence can किम् appear for a yes/no question?",options:["Only in the middle","Start or end — both work","Always at the end only","Always at the start only"],answer:"Start or end — both work",explanation:"किम् is flexible: किं सः गच्छति (start) and सः गच्छति किम् (end) both mean 'Does he go?' Sanskrit word order is freer than English."},
  {type:"match",question:"Match the question words",pairs:[{left:"कुत्र",right:"Where? — कहाँ"},{left:"किम्",right:"Does? / What? — क्या"},{left:"कः",right:"Who? — कौन"},{left:"तत्र",right:"There — वहाँ"}],explanation:"कुत्र = कहाँ (where), किम् = क्या (does/what), कः = कौन (who), तत्र = वहाँ (there)."},
  {type:"translation",question:"Type: 'Where does he go?' (use कुत्र)",hint:"सः + कुत्र + verb (any order works)",answer:"सः कुत्र गच्छति।",answerRoman:"saH kutra gacchati",explanation:"सः कुत्र गच्छति = Where does he go? (वह कहाँ जाता है?) — कुत्र sits between the subject and verb."}
];
