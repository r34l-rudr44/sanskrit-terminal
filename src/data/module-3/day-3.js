export const id = "3-3";
export const title = "Time of Day — दिनकालः";
export const icon = "🌅";

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 9,
  tags: ["time", "day-parts", "adverbs", "sentences"],
  grammarTopics: ["temporal-adverbs", "time-expressions"],
  vocabularyTopics: ["morning", "evening", "night", "today", "tomorrow"]
};

export const briefing = {
  pre: {
    title: "Time of Day — दिनकालः",
    lead: "Sanskrit has precise words for every part of the day — and for yesterday, today, and tomorrow. Place any of these time words alongside verbs you already know to anchor a sentence in time.",
    sections: [
      { type:"table", label:"TIME OF DAY // दिनकालः", cols:["Devanagari","Hindi","Meaning"],
        rows:[["प्रातः","प्रातःकाल","In the morning"],["दिवा","दिन में","During the day"],["मध्याह्ने","दोपहर में","At noon"],["सायम्","शाम को","In the evening"],["रात्रौ","रात्रि में","At night"],["ह्यः","कल (बीता हुआ)","Yesterday"],["अद्य","आज","Today"],["श्वः","कल (आने वाला)","Tomorrow"],["परश्वः","परसों","Day after tomorrow"]] },
      { type:"block", text:"<strong>Sentences:</strong><br>अहं सदैव प्रातः उद्यानं गच्छामि — I always go to the garden in the morning. (मैं सदा प्रातःकाल बाग जाता हूँ।)<br>सः सायम् उद्यानं गच्छति — He goes to the garden in the evening. (वह सायंकाल बाग जाता है।)<br>सः दिवा नगरं गच्छति — He goes to the city during the day. (वह दिन में नगर जाता है।)<br>अहं रात्रौ गृहं गच्छामि — I go home at night. (मैं रात्रि में घर जाता हूँ।)<br>अद्य अहं पाठशालां न गच्छामि — Today I do not go to school. (आज मैं पाठशाला नहीं जाता हूँ।)" },
      { type:"grammar", label:"TIME AXIS // ह्यः · अद्य · श्वः · परश्वः", text:"These four words mark a time axis across days:<br><strong>ह्यः</strong> (yesterday) — <strong>अद्य</strong> (today) — <strong>श्वः</strong> (tomorrow) — <strong>परश्वः</strong> (day after tomorrow)<br>Note: both ह्यः and श्वः translate as 'कल' in Hindi — context makes the direction clear." }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"प्रातः means:",options:["In the evening — शाम को","During the day — दिन में","At night — रात्रि में","In the morning — प्रातःकाल"],answer:"In the morning — प्रातःकाल",explanation:"प्रातः = In the morning (प्रातःकाल). It contrasts with सायम् (evening) and रात्रौ (night)."},
  {type:"mcq",question:"अद्य means:",options:["Tomorrow — कल (आने वाला)","Yesterday — कल (बीता हुआ)","In the morning — प्रातःकाल","Today — आज"],answer:"Today — आज",explanation:"अद्य = Today (आज). Time axis: ह्यः (yesterday) → अद्य (today) → श्वः (tomorrow) → परश्वः (day after tomorrow)."},
  {type:"match",question:"Match the time words to their meanings",pairs:[{left:"प्रातः",right:"In the morning — प्रातःकाल"},{left:"सायम्",right:"In the evening — शाम को"},{left:"रात्रौ",right:"At night — रात्रि में"},{left:"दिवा",right:"During the day — दिन में"},{left:"मध्याह्ने",right:"At noon — दोपहर में"},{left:"अद्य",right:"Today — आज"}],explanation:"प्रातः = morning, सायम् = evening, रात्रौ = night, दिवा = during the day, मध्याह्ने = at noon, अद्य = today."},
  {type:"mcq",question:"अहं सदैव प्रातः उद्यानं गच्छामि। means:",options:["I go to the garden in the morning sometimes","He always goes to the garden in the morning","I always go to school in the morning","I always go to the garden in the morning — मैं सदा प्रातःकाल बाग जाता हूँ"],answer:"I always go to the garden in the morning — मैं सदा प्रातःकाल बाग जाता हूँ",explanation:"सदैव = always, प्रातः = in the morning, उद्यानं = garden, गच्छामि = I go. Time word (प्रातः) fits naturally between the subject and the destination."},
  {type:"mcq",question:"अद्य अहं पाठशालां न गच्छामि। means:",options:["I always go to school","Today I go to school","Tomorrow I will not go to school","Today I do not go to school — आज मैं पाठशाला नहीं जाता हूँ"],answer:"Today I do not go to school — आज मैं पाठशाला नहीं जाता हूँ",explanation:"अद्य = today, न गच्छामि = do not go. The time word अद्य pins the negation to today specifically."},
  {type:"fill",question:"Complete — he goes to the garden in the evening: सः ___ उद्यानं गच्छति",sentenceParts:["सः "," उद्यानं गच्छति।"],answer:"सायम्",answerRoman:"saayam",translation:"He goes to the garden in the evening",explanation:"सः सायम् उद्यानं गच्छति = He goes to the garden in the evening (वह सायंकाल बाग जाता है). सायम् = in the evening."},
  {type:"wordtiles",question:"Build: 'I go home at night'",tiles:["अहं","रात्रौ","गृहं","गच्छामि"],distractors:["सायम्","त्वं"],answer:"अहं रात्रौ गृहं गच्छामि।",explanation:"अहं रात्रौ गृहं गच्छामि = I go home at night (मैं रात्रि में घर जाता हूँ). रात्रौ = at night, गृहं = home."}
];
