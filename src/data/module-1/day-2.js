export const id = "1-2";
export const title = "Going — गम् धातु";
export const icon = "🚶";

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 8,
  tags: ["verbs", "grammar", "gam"],
  grammarTopics: ["verb-conjugation", "person"],
  vocabularyTopics: ["gam dhatu", "going"]
};

export const briefing = {
  pre: {
    title: "The Verb गम् — To Go",
    lead: "गम् means 'to go'. Its present-tense forms change with the person — I, You, or He/She.",
    sections: [
      { type:"table", label:"गम् — TO GO", cols:["Form","Used with","Meaning","Hindi"],
        rows:[["गच्छामि","अहम्","I go","मैं जाता हूँ"],["गच्छसि","त्वम्","You go","तुम जाते हो"],["गच्छति","सः / सा","He/She goes","वह जाता/जाती है"]] },
      { type:"block", text:"<strong>Sentences:</strong><br>अहं गच्छामि — मैं जाता हूँ।<br>त्वं गच्छसि — तुम जाते हो।<br>सः गच्छति — वह जाता है।<br>सा गच्छति — वह जाती है।" },
      { type:"grammar", label:"WORD_ORDER", text:"Word order in Sanskrit is <strong>flexible</strong>. सः गच्छति and गच्छति सः both mean the same thing. Meaning is carried by each word's form, not its position in the sentence." }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"गच्छति means:",options:["I go — मैं जाता हूँ","You go — तुम जाते हो","He/She goes — वह जाता/जाती है","We go — हम जाते हैं"],answer:"He/She goes — वह जाता/जाती है",explanation:"गच्छति = He/She goes (वह जाता/जाती है). Third-person singular — used with सः and सा."},
  {type:"mcq",question:"Which verb form pairs with अहम् (I — मैं)?",options:["गच्छति","गच्छसि","गच्छामि","गम्"],answer:"गच्छामि",explanation:"अहम् गच्छामि = I go (मैं जाता हूँ). गच्छामि is the first-person form."},
  {type:"mcq",question:"त्वं गच्छसि means:",options:["I go — मैं जाता हूँ","He goes — वह जाता है","You go — तुम जाते हो","She goes — वह जाती है"],answer:"You go — तुम जाते हो",explanation:"त्वं गच्छसि = You go (तुम जाते हो). गच्छसि is always paired with त्वम्."},
  {type:"match",question:"Match the pronoun to the correct verb form",pairs:[{left:"अहम् (I — मैं)",right:"गच्छामि"},{left:"त्वम् (You — तुम)",right:"गच्छसि"},{left:"सः / सा (He/She — वह)",right:"गच्छति"}],explanation:"Three persons of गम्: first — I (मैं→गच्छामि), second — You (तुम→गच्छसि), third — He/She (वह→गच्छति)."},
  {type:"mcq",question:"सा गच्छति means:",options:["You go — तुम जाते हो","I go — मैं जाता हूँ","She goes — वह जाती है","He goes — वह जाता है"],answer:"She goes — वह जाती है",explanation:"सा गच्छति = She goes (वह जाती है). सा is feminine; गच्छति covers both masculine and feminine third person."},
  {type:"match",question:"Match each sentence to its meaning",pairs:[{left:"अहं गच्छामि",right:"I go — मैं जाता हूँ"},{left:"त्वं गच्छसि",right:"You go — तुम जाते हो"},{left:"सः गच्छति",right:"He goes — वह जाता है"}],explanation:"The verb ending tells you who is going: -आमि = I, -सि = You, -ति = He/She."},
  {type:"mcq",question:"अहं गच्छामि means:",options:["I come — मैं आता हूँ","You go — तुम जाते हो","He goes — वह जाता है","I go — मैं जाता हूँ"],answer:"I go — मैं जाता हूँ",explanation:"अहं गच्छामि = I go (मैं जाता हूँ). Note: अहम् and अहं are both correct spellings."}
];
