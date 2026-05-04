export const id = "1-2";
export const title = "Numbers & Counting";
export const icon = "🔢";

export const metadata = {
  difficulty: "beginner",
  estimatedMinutes: 8,
  tags: ["numbers", "counting", "intro"],
  grammarTopics: ["basic numerals"],
  vocabularyTopics: ["numbers 1-10"]
};

export const briefing = {
  pre: {
    title: "Sanskrit Numbers // संख्या",
    lead: "Sanskrit numbers are ancestors of modern numerals. Many English words trace back through Proto-Indo-European roots.",
    sections: [
      { type:"table", label:"NUMBERS 1–10", cols:["#","Devanagari","IAST","English cognate"],
        rows:[["१","एक","Eka","unique, once"],["२","द्वि","Dvi","dual, between"],["३","त्रि","Tri","three, trio"],["४","चतुर्","Catur","quarter, four"],["५","पञ्च","Pañca","pentagon"],["६","षट्","Ṣaṭ","six"],["७","सप्त","Sapta","September"],["८","अष्ट","Aṣṭa","octave, eight"],["९","नव","Nava","nine, November"],["१०","दश","Daśa","decade, ten"]] },
      { type:"block", text:"<strong>च</strong> (ca) is Sanskrit for 'and' — it appears after the last item. E.g. <span class='dev'>रामः सीता च</span> = Rama and Sita." }
    ]
  },
  mid: [{ afterQ:3, title:"Compound Numbers", tag:"CONCEPT_UNLOCK", content:{ type:"table", label:"NUMBERS 11–15", cols:["#","Sanskrit","Breakdown"], rows:[["११","एकादश","एक (1) + दश (10)"],["१२","द्वादश","द्वि (2) + दश (10)"],["१३","त्रयोदश","त्रि (3) + दश (10)"],["१४","चतुर्दश","चतुर् (4) + दश (10)"],["१५","पञ्चदश","पञ्च (5) + दश (10)"]] } }]
};

export const questions = [
  {type:"mcq",question:"What is the Sanskrit word for number 'One' (१)?",options:["Dvi","Eka","Tri","Chatur"],optionsDevanagari:["द्वि","एक","त्रि","चतुर्"],answer:"Eka",explanation:"एक (Eka) means 'one'. It is the root of the English word 'unique' via Latin."},
  {type:"mcq",question:"Which Sanskrit word means 'Five' (५)?",options:["Shat","Sapta","Pancha","Nava"],optionsDevanagari:["षट्","सप्त","पञ्च","नव"],answer:"Pancha",explanation:"पञ्च (Pañca) means five. It appears in Panchatantra and Panchamahabhuta."},
  {type:"translation",question:"Type the Sanskrit word for 'Ten' (१०)",hint:"Hint: This word relates to the English word 'decade'",answer:"दश",explanation:"दश (Daśa) means ten. The English word 'decade' traces back to this via Proto-Indo-European roots."},
  {type:"match",question:"Match the numbers with their Sanskrit names",pairs:[{left:"1 (एक)",right:"Eka"},{left:"2 (द्वि)",right:"Dvi"},{left:"3 (त्रि)",right:"Tri"},{left:"4 (चतुर्)",right:"Chatur"}],explanation:"These are the first four Sanskrit numbers: Eka, Dvi, Tri, Chatur."},
  {type:"mcq",question:"What is दश + एक (Dasha + Eka)?",options:["Eleven","Twelve","Twenty","Nine"],answer:"Eleven",explanation:"दश (10) + एक (1) = एकादश (Ekādaśa), meaning eleven."},
  {type:"wordtiles",question:"Arrange to form: 'Two and three make five'",tiles:["द्वि","त्रि","च","पञ्च"],distractors:["एक","दश"],answer:"द्वि त्रि च पञ्च",explanation:"द्वि (2) + त्रि (3) + च (and) + पञ्च (5). 'च' is Sanskrit for 'and'."}
];
