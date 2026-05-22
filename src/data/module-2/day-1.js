export const id = "2-1";
export const title = "Places — गन्तव्यानि";
export const icon = "🏘️";

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 9,
  tags: ["places", "vocabulary", "accusative", "sentences"],
  grammarTopics: ["accusative-case", "destination-nouns"],
  vocabularyTopics: ["places", "destinations"]
};

export const briefing = {
  pre: {
    title: "Places & Destinations — गन्तव्यानि",
    lead: "You know how to go (गच्छामि). Now learn where to go. These six place words are the destinations of everyday life.",
    sections: [
      { type:"table", label:"DESTINATIONS // गन्तव्यानि", cols:["Devanagari","Hindi","Meaning"],
        rows:[["गृहम्","घर","Home"],["नगरम्","नगर","City / Town"],["ग्रामम्","गाँव","Village"],["आपणम्","बाज़ार","Market"],["पाठशालाम्","पाठशाला","School"],["उद्यानम्","बाग","Garden / Park"]] },
      { type:"grammar", label:"ACCUSATIVE // कर्मकारक", text:"The <strong>-म्</strong> ending marks the destination (accusative case). It answers 'where to?'<br>अहं <strong>गृहं</strong> गच्छामि। — I go <strong>home</strong>.<br>सः <strong>ग्रामं</strong> गच्छति। — He goes <strong>to the village</strong>.<br>(The final म् softens to ं in connected speech.)" },
      { type:"block", text:"<strong>Sentences:</strong><br>त्वं कुत्र गच्छसि। — Where do you go? (तुम कहाँ जाते हो?)<br>अहं गृहं गच्छामि। — I go home. (मैं घर जाता हूँ।)<br>सः कुत्र गच्छति। — Where does he go? (वह कहाँ जाता है?)<br>सः ग्रामं गच्छति। — He goes to the village. (वह गाँव जाता है।)" }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"गृहम् means:",options:["Village","Market","Home — घर","School"],answer:"Home — घर",explanation:"गृहम् = Home (घर). Cognate with English 'hovel' and Greek 'choira' — all from the same Indo-European root."},
  {type:"match",question:"Match the place words to their meanings",pairs:[{left:"गृहम्",right:"Home — घर"},{left:"नगरम्",right:"City — नगर"},{left:"ग्रामम्",right:"Village — गाँव"},{left:"आपणम्",right:"Market — बाज़ार"}],explanation:"गृहम् = घर, नगरम् = नगर, ग्रामम् = गाँव, आपणम् = बाज़ार."},
  {type:"mcq",question:"अहं गृहं गच्छामि means:",options:["I go to the market","I go home — मैं घर जाता हूँ","He goes home","You go to school"],answer:"I go home — मैं घर जाता हूँ",explanation:"अहं गृहं गच्छामि = I go home (मैं घर जाता हूँ). The -म् ending of गृहम् softens to -ं to show destination."},
  {type:"fill",question:"Fill in the destination — he is going to a village: सः ___ गच्छति",sentenceParts:["सः "," गच्छति"],answer:"ग्रामं",answerRoman:"grAmam",translation:"He goes to the village",explanation:"सः ग्रामं गच्छति = He goes to the village (वह गाँव जाता है). ग्रामम् → ग्रामं in connected speech."},
  {type:"match",question:"Match more place words",pairs:[{left:"पाठशालाम्",right:"School — पाठशाला"},{left:"उद्यानम्",right:"Garden / Park — बाग"},{left:"नगरम्",right:"City — नगर"},{left:"ग्रामम्",right:"Village — गाँव"}],explanation:"पाठशालाम् = पाठशाला (school), उद्यानम् = बाग (garden), नगरम् = नगर (city), ग्रामम् = गाँव (village)."},
  {type:"mcq",question:"त्वं पाठशालां गच्छसि किम् means:",options:["You go to school","Do you go to school? — क्या तुम पाठशाला जाते हो?","Does he go to school?","Where do you go?"],answer:"Do you go to school? — क्या तुम पाठशाला जाते हो?",explanation:"त्वं पाठशालां गच्छसि किम् = Do you go to school? (क्या तुम पाठशाला जाते हो?) — किम् at the end makes it a yes/no question."},
  {type:"wordtiles",question:"Build the sentence: 'He goes to the village'",tiles:["सः","ग्रामं","गच्छति"],distractors:["तत्र","अहं"],answer:"सः ग्रामं गच्छति",explanation:"सः ग्रामं गच्छति = He goes to the village (वह गाँव जाता है). The words can appear in any order — Sanskrit word order is flexible."},
  {type:"mcq",question:"The -म् ending in गृहम् indicates:",options:["Subject of the sentence","The verb","Destination / goal of going — गन्तव्य","Plural form"],answer:"Destination / goal of going — गन्तव्य",explanation:"The accusative case (-म् ending) marks the destination or object. अहं गृहं गच्छामि — गृहम् is where I am going, not where I am."}
];
