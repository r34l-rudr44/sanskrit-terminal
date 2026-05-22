export const id = "4-1";
export const title = "Long Vowel Fusion — दीर्घ सन्धि";
export const icon = "🔗";

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 10,
  tags: ["sandhi", "grammar", "vowels", "phonology"],
  grammarTopics: ["sandhi", "vowel-combination", "savarNa"],
  vocabularyTopics: ["compound words"]
};

export const briefing = {
  pre: {
    title: "Long Vowel Fusion — दीर्घ सन्धि",
    lead: "When two similar vowels meet at a word boundary, they fuse into one long vowel. This is called दीर्घ सन्धि — the foundational sandhi rule behind many Sanskrit compound words you already know.",
    sections: [
      { type:"grammar", label:"THE RULE // अकः सवर्णे दीर्घः", text:"The Pāṇinian rule <strong>अकः सवर्णे दीर्घः</strong> states: when a vowel from the 'ak' set (अ, इ, उ, ऋ) is followed by a <em>similar</em> (सवर्ण) vowel, both fuse into one long vowel.<br><strong>Short + short → long &nbsp;|&nbsp; Short + long → long &nbsp;|&nbsp; Long + long → long</strong>" },
      { type:"table", label:"THE FOUR RULES // चत्वारि नियमानि", cols:["Vowels joining","Result","Example"],
        rows:[["अ / आ + अ / आ","→ आ","हिम + आलय = हिमालय"],["इ / ई + इ / ई","→ ई","रवि + इन्द्र = रवीन्द्र"],["उ / ऊ + उ / ऊ","→ ऊ","भानु + उदय = भानूदय"],["ऋ / ॠ + ऋ / ॠ","→ ॠ","पितृ + ऋण = पितॄण"]] },
      { type:"block", text:"<strong>More examples:</strong><br>विद्या + अर्थी = विद्यार्थी &nbsp;(Knowledge + seeker = Student)<br>पुस्तक + आलय = पुस्तकालय &nbsp;(Book + house = Library)<br>मुनि + ईश = मुनीश &nbsp;(Sage + lord = Lord of sages)<br>सती + ईश = सतीश &nbsp;(Sati + lord = Satish)<br>वधू + उत्सव = वधूत्सवः &nbsp;(Bride + festival = Wedding celebration)<br>मातृ + ऋण = मातॄण &nbsp;(Mother + debt = Debt to mother)" }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"\"अकः सवर्णे दीर्घः\" means:",options:["Two different vowels create a new sound","Two similar vowels fuse into one long vowel — सवर्ण स्वर मिलकर दीर्घ बनते हैं","A consonant lengthens the next vowel","Vowels disappear at word boundaries"],answer:"Two similar vowels fuse into one long vowel — सवर्ण स्वर मिलकर दीर्घ बनते हैं",explanation:"अकः = from the 'ak' set (अ, इ, उ, ऋ); सवर्णे = when followed by a similar vowel; दीर्घः = becomes long. The rule covers all four vowel pairs at once."},
  {type:"mcq",question:"अ + आ = ?",options:["अ","ऐ","अआ","आ"],answer:"आ",explanation:"अ + आ → आ by दीर्घ सन्धि. Example: हिम (ends in अ) + आलय (begins with आ) = हिमालय. The boundary अ+आ fuses into one long आ."},
  {type:"mcq",question:"हिम + आलय = ?",options:["हिमेलय","हिमाँलय","हिमाआलय","हिमालय"],answer:"हिमालय",explanation:"हिम ends in अ; आलय begins with आ. अ + आ → आ: the boundary fuses into a single long आ, giving हिमालय (Himalaya)."},
  {type:"match",question:"Match each combination to its sandhi result",pairs:[{left:"हिम + आलय",right:"हिमालय"},{left:"रवि + इन्द्र",right:"रवीन्द्र"},{left:"भानु + उदय",right:"भानूदय"},{left:"पितृ + ऋण",right:"पितॄण"}],explanation:"Each pair shows one rule: अ+आ→आ (हिमालय), इ+इ→ई (रवीन्द्र), उ+उ→ऊ (भानूदय), ऋ+ऋ→ॠ (पितॄण)."},
  {type:"mcq",question:"रवि + इन्द्र = ?",options:["रविइन्द्र","रवेन्द्र","रविन्द्र","रवीन्द्र"],answer:"रवीन्द्र",explanation:"रवि ends in इ; इन्द्र begins with इ. इ + इ → ई: the boundary double-इ fuses into one long ई, giving रवीन्द्र (Rabindra/Ravindra)."},
  {type:"fill",question:"Apply दीर्घ सन्धि: विद्या + अर्थी = ___",sentenceParts:["विद्या + अर्थी = ",""],answer:"विद्यार्थी",answerRoman:"vidyaarthii",translation:"Knowledge + seeker = Student",explanation:"विद्या ends in आ; अर्थी begins with अ. आ + अ → आ. The boundary fuses: विद्यार्थी (student)."},
  {type:"fill",question:"Apply दीर्घ सन्धि: पुस्तक + आलय = ___",sentenceParts:["पुस्तक + आलय = ",""],answer:"पुस्तकालय",answerRoman:"pustakaalaya",translation:"Book + house = Library",explanation:"पुस्तक ends in अ; आलय begins with आ. अ + आ → आ. The boundary fuses: पुस्तकालय (library)."}
];
