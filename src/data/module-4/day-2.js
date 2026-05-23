export const id = "4-2";
export const title = "Vowel Upgrade — गुण सन्धि";
export const icon = "✨";

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 10,
  tags: ["sandhi", "grammar", "vowels", "phonology"],
  grammarTopics: ["sandhi", "guNa-sandhi", "vowel-combination"],
  vocabularyTopics: ["compound words"]
};

export const briefing = {
  pre: {
    title: "Vowel Upgrade — गुण सन्धि",
    lead: "When अ or आ meets a vowel from the इ, उ, or ऋ family, both upgrade into a new guṇa vowel. This is गुण सन्धि — responsible for beloved Sanskrit words like देवेन्द्र, सूर्योदय, and गणेश.",
    sections: [
      { type:"grammar", label:"THE RULE // आदगुणः", text:"<strong>आदगुणः</strong> — when अ or आ precedes इ/ई, उ/ऊ, or ऋ, both merge into the guṇa vowel of the second family.<br><strong>ए, ओ,</strong> and <strong>अर्</strong> are the three guṇa vowels produced." },
      { type:"table", label:"THE THREE RULES // त्रीणि नियमानि", cols:["Vowels joining","Result","Example"],
        rows:[["अ / आ + इ / ई","→ ए","देव + इन्द्र = देवेन्द्र"],["अ / आ + उ / ऊ","→ ओ","सूर्य + उदय = सूर्योदय"],["अ / आ + ऋ","→ अर्","राज + ऋषि = राजर्षि"]] },
      { type:"block", text:"<strong>More examples:</strong><br>महा + इन्द्र = महेन्द्र &nbsp;(Great + Indra = Mahendra)<br>नर + उत्तम = नरोत्तम &nbsp;(Man + best = Best of men)<br>देव + ऋषि = देवर्षि &nbsp;(God + sage = Divine sage)<br>गण + ईश = गणेश &nbsp;(Gaṇa + lord = Ganesha)<br>राम + इच्छा = रामेच्छा &nbsp;(Rāma + wish = Rāma's wish)" }
    ]
  },
  mid: []
};

export const questions = [
  {type:"mcq",question:"\"आदगुणः\" means:",options:["Two similar vowels fuse into one long vowel","अ/आ combines with इ, उ, or ऋ to produce a guṇa vowel — अ/आ से गुण स्वर बनता है","A vowel disappears at word boundaries","Two consonants merge"],answer:"अ/आ combines with इ, उ, or ऋ to produce a guṇa vowel — अ/आ से गुण स्वर बनता है",explanation:"आद् = from आ/अ; गुणः = guṇa vowel. When अ or आ precedes इ/ई, उ/ऊ, or ऋ, both upgrade to the corresponding guṇa vowel: ए, ओ, or अर्."},
  {type:"mcq",question:"अ + इ = ?",options:["ऐ","आ","ए","ओ"],answer:"ए",explanation:"अ + इ → ए by गुण सन्धि. Example: देव (ends in अ) + इन्द्र (starts with इ) = देवेन्द्र. The boundary अ+इ upgrades to ए."},
  {type:"mcq",question:"देव + इन्द्र = ?",options:["देवइन्द्र","देवैन्द्र","देवेन्द्र","देवोन्द्र"],answer:"देवेन्द्र",explanation:"देव ends in अ; इन्द्र begins with इ. अ + इ → ए: the boundary upgrades to ए, giving देवेन्द्र (Lord of gods / Devendra)."},
  {type:"mcq",question:"अ + उ = ?",options:["ओ","ए","औ","ऊ"],answer:"ओ",explanation:"अ + उ → ओ by गुण सन्धि. Example: सूर्य (ends in अ) + उदय (starts with उ) = सूर्योदय. The boundary अ+उ upgrades to ओ."},
  {type:"mcq",question:"सूर्य + उदय = ?",options:["सूर्युदय","सूर्यौदय","सूर्योदय","सूर्यादय"],answer:"सूर्योदय",explanation:"सूर्य ends in अ; उदय begins with उ. अ + उ → ओ: the boundary upgrades to ओ, giving सूर्योदय (sunrise)."},
  {type:"fill",question:"Apply गुण सन्धि: महा + इन्द्र = ___",sentenceParts:["महा + इन्द्र = ",""],answer:"महेन्द्र",answerRoman:"mahendra",translation:"Great + Indra = Mahendra",explanation:"महा ends in आ; इन्द्र begins with इ. आ + इ → ए: the boundary upgrades to ए, giving महेन्द्र."},
  {type:"fill",question:"Apply गुण सन्धि: गण + ईश = ___",sentenceParts:["गण + ईश = ",""],answer:"गणेश",answerRoman:"gaNeSha",translation:"Gana + lord = Ganesha",explanation:"गण ends in अ; ईश begins with ई. अ + ई → ए: the boundary upgrades to ए, giving गणेश."},
  {type:"match",question:"Match each combination to its sandhi result",pairs:[{left:"देव + इन्द्र",right:"देवेन्द्र"},{left:"सूर्य + उदय",right:"सूर्योदय"},{left:"राज + ऋषि",right:"राजर्षि"},{left:"गण + ईश",right:"गणेश"}],explanation:"अ+इ→ए (देवेन्द्र), अ+उ→ओ (सूर्योदय), अ+ऋ→अर् (राजर्षि), अ+ई→ए (गणेश) — all three guṇa rules in action."}
];
