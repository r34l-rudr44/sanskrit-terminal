export const id = "3-1";
export const title = "Lesson Title";
export const icon = "📘";
export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 8,
  tags: ["vocabulary", "intro"],
  grammarTopics: ["sov-order"],
  vocabularyTopics: ["core nouns", "intro phrases"]
};

export const briefing = {
  pre: {
    title: "Lesson Briefing Title",
    lead: "A short introduction explaining what the learner is about to study.",
    sections: [
      {
        type: "table",
        label: "VOCABULARY",
        cols: ["Devanagari", "IAST", "Meaning"],
        rows: [
          ["रामः", "Ramah", "Rama"],
          ["वनम्", "Vanam", "Forest"]
        ]
      },
      {
        type: "grammar",
        label: "GRAMMAR_NOTE",
        text: "Explain one key idea. You may use simple HTML like <strong>bold</strong> or <span class='dev'>देवनागरी</span>."
      },
      {
        type: "block",
        text: "Add one memorable cultural, vocabulary, or derivation note."
      }
    ]
  },
  mid: [
    {
      afterQ: 2,
      title: "Checkpoint",
      tag: "GRAMMAR_CHECKPOINT",
      content: {
        type: "grammar",
        label: "REMINDER",
        text: "Short in-lesson reminder shown after question 2."
      }
    }
  ]
};

export const questions = [
  {
    type: "mcq",
    question: "What does रामः mean?",
    options: ["Forest", "Rama", "Water", "Fire"],
    optionsDevanagari: ["वनम्", "रामः", "जल", "अग्नि"],
    answer: "Rama",
    explanation: "रामः refers to Rama."
  },
  {
    type: "translation",
    question: "Type the Sanskrit word for forest",
    hint: "Think of vanam",
    answer: "वनम्",
    explanation: "वनम् means forest."
  },
  {
    type: "fill",
    question: "The Sanskrit word for sun is ______",
    sentenceParts: ["The Sanskrit word for sun is ", ""],
    answer: "सूर्य",
    answerRoman: "Surya",
    explanation: "सूर्य means sun."
  },
  {
    type: "match",
    question: "Match the words",
    pairs: [
      { left: "Rama", right: "रामः" },
      { left: "Forest", right: "वनम्" }
    ],
    explanation: "These vocabulary pairs reinforce the lesson words."
  },
  {
    type: "wordtiles",
    question: "Arrange: Rama goes to the forest",
    tiles: ["रामः", "वनं", "गच्छति"],
    distractors: ["जलं", "पिबति"],
    answer: "रामः वनं गच्छति",
    explanation: "This follows the common Sanskrit SOV order."
  }
];
