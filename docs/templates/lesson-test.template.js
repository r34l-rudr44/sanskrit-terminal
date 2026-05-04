export const id = "3-T";
export const title = "Final Test";
export const icon = "📝";
export const isTest = true;
export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 10,
  tags: ["assessment", "module-test"],
  grammarTopics: ["review"],
  vocabularyTopics: ["review"]
};

export const briefing = {
  pre: {
    title: "Module Final Test",
    lead: "This test reviews all lessons in the module. No new material should appear here.",
    sections: [
      {
        type: "block",
        text: "Summarize what the learner is being tested on and set expectations."
      },
      {
        type: "grammar",
        label: "TEST_RULES",
        text: "Keep this short. Remind the learner to answer each question carefully."
      }
    ]
  },
  mid: []
};

export const questions = [
  {
    type: "mcq",
    question: "What does रामः mean?",
    options: ["Forest", "Rama", "Water", "Fire"],
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
    type: "wordtiles",
    question: "Arrange: Rama goes to the forest",
    tiles: ["रामः", "वनं", "गच्छति"],
    distractors: ["जलं", "पिबति"],
    answer: "रामः वनं गच्छति",
    explanation: "This follows the common Sanskrit SOV order."
  }
];
