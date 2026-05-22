export const id = "2-T";
export const title = "Final Test";
export const icon = "📝";
export const isTest = true;

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 10,
  tags: ["assessment", "module-test", "review"],
  grammarTopics: ["destination-nouns", "question-words", "negation"],
  vocabularyTopics: ["module 2 review"]
};

export const briefing = {
  pre: {
    title: "Module 2 Final Test",
    lead: "You've learned 6 destination nouns, how to ask where someone goes with किम्/कुत्र/कः, and how to negate with न. This test brings it all together.",
    sections: [
      { type:"block", text:"Questions cover <strong>place words</strong>, <strong>question patterns</strong>, and <strong>negation with destinations</strong>. Take your time." },
      { type:"grammar", label:"TEST_RULES", text:"Answer each question carefully. Score <strong>60%+</strong> to earn your Module 2 certificate." }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"ग्रामम् means:",options:["Market","Village — गाँव","Home","School"],answer:"Village — गाँव",explanation:"ग्रामम् = Village (गाँव). The English word 'grammar' is distantly related via Greek 'gramma' (written mark) — not to be confused!"},
  {type:"match",question:"Match the place words",pairs:[{left:"गृहम्",right:"Home — घर"},{left:"आपणम्",right:"Market — बाज़ार"},{left:"पाठशालाम्",right:"School — पाठशाला"},{left:"उद्यानम्",right:"Garden — बाग"}],explanation:"गृहम् = घर, आपणम् = बाज़ार, पाठशालाम् = पाठशाला, उद्यानम् = बाग."},
  {type:"mcq",question:"सः ग्रामं गच्छति। means:",options:["He goes to the market","He goes to the village — वह गाँव जाता है","I go to the village","Does he go?"],answer:"He goes to the village — वह गाँव जाता है",explanation:"सः ग्रामं गच्छति = He goes to the village (वह गाँव जाता है). सः (he) + ग्रामं (to village) + गच्छति (goes)."},
  {type:"mcq",question:"त्वं कुत्र गच्छसि। means:",options:["You go home","Where do you go? — तुम कहाँ जाते हो?","Who goes there?","Does he go?"],answer:"Where do you go? — तुम कहाँ जाते हो?",explanation:"त्वं कुत्र गच्छसि = Where do you go? (तुम कहाँ जाते हो?) — कुत्र asks for a location answer."},
  {type:"mcq",question:"किं सः उद्यानं गच्छति। means:",options:["He goes to the garden","Does he go to the garden? — क्या वह बाग जाता है?","Who goes to the garden?","He does not go to the garden"],answer:"Does he go to the garden? — क्या वह बाग जाता है?",explanation:"किं सः उद्यानं गच्छति = Does he go to the garden? (क्या वह बाग जाता है?) — किम् at start makes it a yes/no question."},
  {type:"fill",question:"Complete: अहं नगरं ___ गच्छामि (I do not go to the city)",sentenceParts:["अहं नगरं "," गच्छामि।"],answer:"न",answerRoman:"na",explanation:"अहं नगरं न गच्छामि = I do not go to the city (मैं नगर नहीं जाता). न before गच्छामि negates the sentence."},
  {type:"wordtiles",question:"Build: 'Do you go to school?'",tiles:["त्वं","पाठशालां","गच्छसि","किम्"],distractors:["न","सः"],answer:"त्वं पाठशालां गच्छसि किम्।",explanation:"त्वं पाठशालां गच्छसि किम् = Do you go to school? (क्या तुम पाठशाला जाते हो?) — किम् at the end."},
  {type:"mcq",question:"यत्र त्वं गच्छसि तत्र अहं गच्छामि। means:",options:["Where you go, I go there too — जहाँ तुम जाते हो वहाँ मैं जाता हूँ","I do not go anywhere","You go everywhere","Where does he go?"],answer:"Where you go, I go there too — जहाँ तुम जाते हो वहाँ मैं जाता हूँ",explanation:"यत्र...तत्र is the 'where...there' correlative pair. यत्र त्वं गच्छसि = where you go; तत्र अहं गच्छामि = there I go."},
  {type:"translation",question:"Type: 'He does not go to the market'",hint:"सः + market + न + he-goes-verb",answer:"सः आपणं न गच्छति।",answerRoman:"saH AapaNam na gacchati",explanation:"सः आपणं न गच्छति = He does not go to the market (वह बाज़ार नहीं जाता). आपणम् = market, न before गच्छति negates."}
];
