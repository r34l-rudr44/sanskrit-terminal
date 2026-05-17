export const id = "1-3";
export const title = "Where? — स्थानवाचक शब्द";
export const icon = "📍";

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 9,
  tags: ["location", "adverbs", "sentences"],
  grammarTopics: ["location-adverbs", "correlatives"],
  vocabularyTopics: ["where", "here", "there", "everywhere"]
};

export const briefing = {
  pre: {
    title: "Location Words — स्थानवाचक शब्द",
    lead: "Sanskrit has a rich set of location adverbs. The suffix -त्र means 'place'. The prefix tells you which place.",
    sections: [
      { type:"table", label:"LOCATION WORDS // स्थानवाचक", cols:["Devanagari","Hindi","Meaning"],
        rows:[["कुत्र","कहाँ","Where?"],["यत्र","जहाँ","Where (relative)"],["अत्र","यहाँ","Here"],["तत्र","वहाँ","There"],["सर्वत्र","सब स्थान पर","Everywhere"],["अन्यत्र","कहीं और","Somewhere else"],["एकत्र","एक स्थान पर","At one place"]] },
      { type:"block", text:"<strong>Sentences:</strong><br>त्वं कुत्र गच्छसि। — Where do you go? (तुम कहाँ जाते हो?)<br>सः कुत्र गच्छति। — Where does he go? (वह कहाँ जाता है?)<br>अहं तत्र गच्छामि। — I go there. (मैं वहाँ जाता हूँ।)<br>यत्र सः गच्छति तत्र अहम्। — Where he goes, there I go too. (जहाँ वह जाता है वहाँ मैं।)<br>अहं सर्वत्र गच्छामि। — I go everywhere. (मैं सब स्थान पर जाता हूँ।)<br>त्वं सर्वत्र गच्छसि। — You go everywhere. (तुम सब स्थान पर जाते हो।)<br>किं सः गच्छति। — Does he go? (क्या वह जाता है?)" },
      { type:"grammar", label:"CORRELATIVES", text:"<strong>यत्र...तत्र</strong> is a correlative pair: 'where...there'. Like English 'wherever he goes, there I go too.' The कु- prefix forms questions (कुत्र = where?), the य- prefix forms relative clauses (यत्र = where), the त- prefix gives the answer (तत्र = there)." },
      { type:"grammar", label:"QUESTIONS WITH किम्", text:"<strong>किम्</strong> (kim) placed at the start of a sentence turns it into a yes/no question — like English 'Does...?'<br>किं सः गच्छति। — Does he go? (क्या वह जाता है?)<br>It can also appear at the end: सः गच्छति किम्। — He goes, doesn't he?" }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"कुत्र means:",options:["Here — यहाँ","There — वहाँ","Where? — कहाँ","Everywhere — सब स्थान पर"],answer:"Where? — कहाँ",explanation:"कुत्र = Where? (कहाँ) — an interrogative adverb for location."},
  {type:"mcq",question:"Which word means 'Here — यहाँ'?",options:["तत्र","यत्र","सर्वत्र","अत्र"],answer:"अत्र",explanation:"अत्र = Here (यहाँ). तत्र = There (वहाँ), यत्र = Where (जहाँ), सर्वत्र = Everywhere (सब स्थान पर)."},
  {type:"match",question:"Match the location words to their meanings",pairs:[{left:"कुत्र",right:"Where? — कहाँ"},{left:"अत्र",right:"Here — यहाँ"},{left:"तत्र",right:"There — वहाँ"},{left:"यत्र",right:"Where — जहाँ"},{left:"सर्वत्र",right:"Everywhere — सब स्थान पर"},{left:"अन्यत्र",right:"Somewhere else — कहीं और"}],explanation:"कुत्र = कहाँ, अत्र = यहाँ, तत्र = वहाँ, यत्र = जहाँ, सर्वत्र = सब स्थान पर, अन्यत्र = कहीं और."},
  {type:"mcq",question:"त्वं कुत्र गच्छसि means:",options:["Where do you go? — तुम कहाँ जाते हो?","I go there — मैं वहाँ जाता हूँ","He goes here — वह यहाँ जाता है","You go everywhere — तुम सब स्थान पर जाते हो"],answer:"Where do you go? — तुम कहाँ जाते हो?",explanation:"त्वं कुत्र गच्छसि = Where do you go? (तुम कहाँ जाते हो?) — pronoun + location word + verb."},
  {type:"mcq",question:"एकत्र means:",options:["Everywhere — सब स्थान पर","Somewhere else — कहीं और","Where? — कहाँ","At one place — एक स्थान पर"],answer:"At one place — एक स्थान पर",explanation:"एकत्र = At one place (एक स्थान पर). एक = one, -त्र = place."},
  {type:"mcq",question:"सर्वत्र means:",options:["Somewhere else — कहीं और","At one place — एक स्थान पर","Everywhere — सब स्थान पर","Where? — कहाँ"],answer:"Everywhere — सब स्थान पर",explanation:"सर्वत्र = Everywhere (सब स्थान पर). सर्व = all/every, -त्र = place."},
  {type:"mcq",question:"यत्र सः गच्छति तत्र अहम् means:",options:["He goes everywhere — वह सब स्थान पर जाता है","Where he goes, there I go too — जहाँ वह जाता है वहाँ मैं","Where do I go? — मैं कहाँ जाता हूँ?","I go there — मैं वहाँ जाता हूँ"],answer:"Where he goes, there I go too — जहाँ वह जाता है वहाँ मैं",explanation:"यत्र...तत्र is a correlative pair meaning 'where...there'. यत्र सः गच्छति = where he goes; तत्र अहम् = there I (go too)."},
  {type:"mcq",question:"किं सः गच्छति means:",options:["He goes everywhere — वह सब स्थान पर जाता है","Where does he go? — वह कहाँ जाता है?","Does he go? — क्या वह जाता है?","He does not go — वह नहीं जाता"],answer:"Does he go? — क्या वह जाता है?",explanation:"किम् at the start of a sentence creates a yes/no question. किं सः गच्छति = Does he go? (क्या वह जाता है?)"}
];
