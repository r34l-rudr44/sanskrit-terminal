export const id = "1-T";
export const title = "Final Test";
export const icon = "📝";
export const isTest = true;

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 10,
  tags: ["assessment", "module-test", "review"],
  grammarTopics: ["pronouns", "verb-conjugation", "location-adverbs", "negation", "existence-verb", "question-words"],
  vocabularyTopics: ["module 1 review"]
};

export const briefing = {
  pre: {
    title: "Module 1 Final Test",
    lead: "You've covered pronouns, गम् verb, location words, negation, and कः questions. This test brings it all together.",
    sections: [
      { type:"block", text:"This review covers <strong>pronouns</strong>, <strong>गम् verb forms</strong>, and <strong>location words</strong>. Take your time. Good luck — शुभकामना!" },
      { type:"grammar", label:"TEST_RULES", text:"Answer each question carefully. Skips count as wrong. Score <strong>60%+</strong> to unlock your certificate." }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"सा means:",options:["He — वह (पु.)","She — वह (स्त्री.)","It — वो","You — तुम"],answer:"She — वह (स्त्री.)",explanation:"सा = She (वह). The feminine third-person pronoun."},
  {type:"mcq",question:"गच्छसि is used with which pronoun?",options:["सः (He — वह)","सा (She — वह)","अहम् (I — मैं)","त्वम् (You — तुम)"],answer:"त्वम् (You — तुम)",explanation:"त्वम् गच्छसि = You go (तुम जाते हो). गच्छसि is always second-person, paired with त्वम्."},
  {type:"match",question:"Match pronoun to verb",pairs:[{left:"अहम् (I — मैं)",right:"गच्छामि"},{left:"त्वम् (You — तुम)",right:"गच्छसि"},{left:"सः (He — वह)",right:"गच्छति"}],explanation:"Three persons of गम्: first — I (मैं→गच्छामि), second — You (तुम→गच्छसि), third — He/She (वह→गच्छति)."},
  {type:"mcq",question:"अत्र means:",options:["Where? — कहाँ","There — वहाँ","Here — यहाँ","Everywhere — सब स्थान पर"],answer:"Here — यहाँ",explanation:"अत्र = Here (यहाँ). तत्र = There (वहाँ), कुत्र = Where? (कहाँ)."},
  {type:"mcq",question:"सः कुत्र गच्छति means:",options:["Where does he go? — वह कहाँ जाता है?","He goes here — वह यहाँ जाता है","I go there — मैं वहाँ जाता हूँ","You go where? — तुम कहाँ जाते हो?"],answer:"Where does he go? — वह कहाँ जाता है?",explanation:"सः कुत्र गच्छति = Where does he go? (वह कहाँ जाता है?) — सः (he) + कुत्र (where?) + गच्छति (goes)."},
  {type:"match",question:"Match the location words to their meanings",pairs:[{left:"कुत्र",right:"Where? — कहाँ"},{left:"तत्र",right:"There — वहाँ"},{left:"यत्र",right:"Where — जहाँ"},{left:"सर्वत्र",right:"Everywhere — सब स्थान पर"},{left:"अन्यत्र",right:"Somewhere else — कहीं और"}],explanation:"कुत्र = कहाँ, तत्र = वहाँ, यत्र = जहाँ, सर्वत्र = सब स्थान पर, अन्यत्र = कहीं और."},
  {type:"mcq",question:"अहं सर्वत्र गच्छामि means:",options:["I go somewhere — मैं कहीं जाता हूँ","I go here — मैं यहाँ जाता हूँ","I go everywhere — मैं सब स्थान पर जाता हूँ","You go everywhere — तुम सब स्थान पर जाते हो"],answer:"I go everywhere — मैं सब स्थान पर जाता हूँ",explanation:"अहं सर्वत्र गच्छामि = I go everywhere (मैं सब स्थान पर जाता हूँ)."},
  {type:"mcq",question:"अहं न गच्छामि means:",options:["I go everywhere","I do not go — मैं नहीं जाता","He does not go","You do not go"],answer:"I do not go — मैं नहीं जाता",explanation:"न before a verb negates it. अहं न गच्छामि = I do not go (मैं नहीं जाता हूँ)."},
  {type:"mcq",question:"कः तत्र अस्ति means:",options:["He is here","Who is there? — कौन वहाँ है?","Where does he go?","Is someone here?"],answer:"Who is there? — कौन वहाँ है?",explanation:"कः = who, तत्र = there, अस्ति = is. कः तत्र अस्ति = Who is there? (कौन वहाँ है?)"}
];
