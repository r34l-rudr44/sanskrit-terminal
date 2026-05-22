export const id = "4-T";
export const title = "Final Test";
export const icon = "📝";
export const isTest = true;

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 8,
  tags: ["assessment", "module-test", "sandhi", "review"],
  grammarTopics: ["sandhi", "dirgha-sandhi"],
  vocabularyTopics: ["compound words"]
};

export const briefing = {
  pre: {
    title: "Module 4 Final Test",
    lead: "You've learned दीर्घ सन्धि — the rule that fuses two similar vowels into one long vowel at a word boundary. This test checks whether you can apply the rule and recognise real words formed by it.",
    sections: [
      { type:"block", text:"<strong>This test covers:</strong> The दीर्घ सन्धि rule · all four vowel pairs (अ/आ, इ/ई, उ/ऊ, ऋ/ॠ) · recognising and applying sandhi in real Sanskrit words" },
      { type:"grammar", label:"TEST RULES", text:"Answer at least 60% correctly to pass. Mistakes show the correct answer with an explanation." }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"दीर्घ सन्धि occurs when:",options:["Two different vowels meet","Two similar vowels meet at a word boundary — सवर्ण स्वर मिलते हैं","A vowel meets a consonant","Two consonants meet"],answer:"Two similar vowels meet at a word boundary — सवर्ण स्वर मिलते हैं",explanation:"दीर्घ सन्धि = long vowel fusion. The rule अकः सवर्णे दीर्घः: when two similar (सवर्ण) vowels meet at a boundary, they fuse into one long vowel."},
  {type:"mcq",question:"उ + ऊ = ?",options:["उ","ओ","उऊ","ऊ"],answer:"ऊ",explanation:"उ + ऊ → ऊ by दीर्घ सन्धि. Short or long, two similar उ-family vowels always fuse to long ऊ. Example: भानु + उदय = भानूदय."},
  {type:"mcq",question:"भानु + उदय = ?",options:["भानुउदय","भानोदय","भानूदय","भानोउदय"],answer:"भानूदय",explanation:"भानु ends in उ; उदय begins with उ. उ + उ → ऊ: the boundary fuses into long ऊ, giving भानूदय (sunrise)."},
  {type:"mcq",question:"Which of these is NOT a दीर्घ सन्धि combination?",options:["आ + अ","इ + ई","उ + उ","अ + इ"],answer:"अ + इ",explanation:"अ + इ is NOT दीर्घ सन्धि — these are different vowel families (अ-family and इ-family). Mixing vowel families produces गुण or वृद्धि सन्धि, not दीर्घ. दीर्घ सन्धि only applies when both vowels belong to the same family."},
  {type:"fill",question:"Apply दीर्घ सन्धि: मुनि + ईश = ___",sentenceParts:["मुनि + ईश = ",""],answer:"मुनीश",answerRoman:"muniisha",translation:"Sage + lord = Lord of sages",explanation:"मुनि ends in इ; ईश begins with ई. इ + ई → ई: the boundary इ+ई fuses into one long ई, giving मुनीश."},
  {type:"fill",question:"Apply दीर्घ सन्धि: हिम + आलय = ___",sentenceParts:["हिम + आलय = ",""],answer:"हिमालय",answerRoman:"himaalaya",translation:"Snow + abode = Himalaya",explanation:"हिम ends in अ; आलय begins with आ. अ + आ → आ: the boundary fuses into one long आ, giving हिमालय (Himalaya)."},
  {type:"match",question:"Match each word pair to its sandhi result",pairs:[{left:"विद्या + अर्थी",right:"विद्यार्थी"},{left:"पुस्तक + आलय",right:"पुस्तकालय"},{left:"रवि + इन्द्र",right:"रवीन्द्र"},{left:"भानु + उदय",right:"भानूदय"}],explanation:"All four are दीर्घ सन्धि: आ+अ→आ (विद्यार्थी), अ+आ→आ (पुस्तकालय), इ+इ→ई (रवीन्द्र), उ+उ→ऊ (भानूदय)."}
];
