// Données factuelles corrigées pour le site des Lions de l'Atlas - Juin 2026

export const countdownTarget = "2026-06-24T19:00:00Z"; // Match Maroc vs Haïti au Atlanta Stadium

export const keyStatsData = [
  { value: "6", labelKey: "stats.participations" },
  { valueKey: "history.best_result_val", labelKey: "stats.best_result" },
  { value: "7e", labelKey: "stats.fifa_rank" },
  { value: "1ère", labelKey: "stats.african_first" }
];

export const historyData = [
  {
    year: "1970",
    host: "Mexique",
    resultKey: "history.group_stage",
    anecdoteKey: "history.1970.anecdote",
    highlight: false
  },
  {
    year: "1986",
    host: "Mexique",
    resultKey: "history.round_16",
    anecdoteKey: "history.1986.anecdote",
    highlight: false
  },
  {
    year: "1994",
    host: "États-Unis",
    resultKey: "history.group_stage",
    anecdoteKey: "history.1994.anecdote",
    highlight: false
  },
  {
    year: "1998",
    host: "France",
    resultKey: "history.group_stage",
    anecdoteKey: "history.1998.anecdote",
    highlight: false
  },
  {
    year: "2018",
    host: "Russie",
    resultKey: "history.group_stage",
    anecdoteKey: "history.2018.anecdote",
    highlight: false
  },
  {
    year: "2022",
    host: "Qatar",
    resultKey: "history.semi_finals",
    anecdoteKey: "history.2022.anecdote",
    highlight: true
  }
];

export const squadData = [
  {
    id: "bounou",
    number: 1,
    positionKey: "squad.filter_gk",
    club: "Al-Hilal",
    age: 35,
    caps: 68,
    goals: 0,
    photoColor: "from-emerald-600 to-teal-800",
    imagePath: "players/bouno.png",
    stats: [
      { labelKey: "players.bounou.stat1", value: "86%" },
      { labelKey: "players.bounou.stat2", value: "31" },
      { labelKey: "players.bounou.stat3", value: "7" }
    ]
  },
  {
    id: "elkajoui",
    number: 12,
    positionKey: "squad.filter_gk",
    club: "RS Berkane",
    age: 37,
    caps: 45,
    goals: 0,
    photoColor: "from-emerald-700 to-teal-900",
    imagePath: "players/elkajoui.jpeg",
    stats: [
      { labelKey: "players.elkajoui.stat1", value: "79%" },
      { labelKey: "players.elkajoui.stat2", value: "19" },
      { labelKey: "players.elkajoui.stat3", value: "45" }
    ]
  },
  {
    id: "tagnaouti",
    number: 22,
    positionKey: "squad.filter_gk",
    club: "ASFAR",
    age: 29,
    caps: 3,
    goals: 0,
    photoColor: "from-emerald-800 to-emerald-950",
    imagePath: "players/tagnaouti.jpg",
    stats: [
      { labelKey: "players.tagnaouti.stat1", value: "74%" },
      { labelKey: "players.tagnaouti.stat2", value: "2" },
      { labelKey: "players.tagnaouti.stat3", value: "18" }
    ]
  },
  {
    id: "hakimi",
    number: 2,
    positionKey: "squad.filter_df",
    club: "Paris Saint-Germain",
    age: 27,
    caps: 80,
    goals: 10,
    photoColor: "from-red-600 to-amber-700",
    imagePath: "players/hakimi.webp",
    isCaptain: true,
    stats: [
      { labelKey: "players.hakimi.stat1", value: "36.4 km/h" },
      { labelKey: "players.hakimi.stat2", value: "82%" },
      { labelKey: "players.hakimi.stat3", value: "124" }
    ]
  },
  {
    id: "mazraoui",
    number: 3,
    positionKey: "squad.filter_df",
    club: "Manchester United",
    age: 28,
    caps: 35,
    goals: 2,
    photoColor: "from-red-700 to-red-950",
    imagePath: "players/mazraoui.webp",
    stats: [
      { labelKey: "players.mazraoui.stat1", value: "95%" },
      { labelKey: "players.mazraoui.stat2", value: "58" },
      { labelKey: "players.mazraoui.stat3", value: "88%" }
    ]
  },
  {
    id: "aguerd",
    number: 5,
    positionKey: "squad.filter_df",
    club: "Olympique de Marseille",
    age: 30,
    caps: 49,
    goals: 1,
    photoColor: "from-emerald-700 to-emerald-950",
    imagePath: "players/aguerd.jpg",
    stats: [
      { labelKey: "players.aguerd.stat1", value: "78%" },
      { labelKey: "players.aguerd.stat2", value: "142" },
      { labelKey: "players.aguerd.stat3", value: "74%" }
    ]
  },
  {
    id: "riad",
    number: 15,
    positionKey: "squad.filter_df",
    club: "Crystal Palace",
    age: 22,
    caps: 10,
    goals: 1,
    photoColor: "from-red-600 to-emerald-800",
    imagePath: "players/riad.jpg",
    stats: [
      { labelKey: "players.riad.stat1", value: "81%" },
      { labelKey: "players.riad.stat2", value: "34" },
      { labelKey: "players.riad.stat3", value: "85%" }
    ]
  },
  {
    id: "diop",
    number: 6,
    positionKey: "squad.filter_df",
    club: "Fulham",
    age: 29,
    caps: 12,
    goals: 0,
    photoColor: "from-red-800 to-amber-900",
    imagePath: "players/diop.jpg",
    stats: [
      { labelKey: "players.diop.stat1", value: "79%" },
      { labelKey: "players.diop.stat2", value: "74%" },
      { labelKey: "players.diop.stat3", value: "86" }
    ]
  },
  {
    id: "salaheddine",
    number: 14,
    positionKey: "squad.filter_df",
    club: "PSV Eindhoven",
    age: 24,
    caps: 2,
    goals: 0,
    photoColor: "from-teal-600 to-emerald-800",
    imagePath: "players/salaheddine.jpg",
    stats: [
      { labelKey: "players.salaheddine.stat1", value: "14" },
      { labelKey: "players.salaheddine.stat2", value: "18" },
      { labelKey: "players.salaheddine.stat3", value: "89%" }
    ]
  },
  {
    id: "elouahdi",
    number: 20,
    positionKey: "squad.filter_df",
    club: "KRC Genk",
    age: 24,
    caps: 6,
    goals: 0,
    photoColor: "from-red-700 to-amber-800",
    imagePath: "players/elouahdi.jpg",
    stats: [
      { labelKey: "players.elouahdi.stat1", value: "34.5 km/h" },
      { labelKey: "players.elouahdi.stat2", value: "24" },
      { labelKey: "players.elouahdi.stat3", value: "78%" }
    ]
  },
  {
    id: "belammari",
    number: 13,
    positionKey: "squad.filter_df",
    club: "Al Ahly",
    age: 27,
    caps: 4,
    goals: 0,
    photoColor: "from-emerald-700 to-red-900",
    imagePath: "players/belammari.jpg",
    stats: [
      { labelKey: "players.belammari.stat1", value: "18" },
      { labelKey: "players.belammari.stat2", value: "84%" },
      { labelKey: "players.belammari.stat3", value: "15" }
    ]
  },
  {
    id: "halhal",
    number: 25,
    positionKey: "squad.filter_df",
    club: "KV Malines",
    age: 23,
    caps: 1,
    goals: 0,
    photoColor: "from-amber-600 to-teal-800",
    imagePath: "players/halhal.jpg",
    stats: [
      { labelKey: "players.halhal.stat1", value: "14" },
      { labelKey: "players.halhal.stat2", value: "72%" },
      { labelKey: "players.halhal.stat3", value: "91%" }
    ]
  },
  {
    id: "amrabat",
    number: 4,
    positionKey: "squad.filter_mf",
    club: "Real Betis",
    age: 29,
    caps: 62,
    goals: 0,
    photoColor: "from-amber-600 to-amber-900",
    imagePath: "players/amrabat.jpg",
    stats: [
      { labelKey: "players.amrabat.stat1", value: "12.8 km" },
      { labelKey: "players.amrabat.stat2", value: "194" },
      { labelKey: "players.amrabat.stat3", value: "91%" }
    ]
  },
  {
    id: "ounahi",
    number: 8,
    positionKey: "squad.filter_mf",
    club: "Girona FC",
    age: 26,
    caps: 34,
    goals: 4,
    photoColor: "from-teal-600 to-emerald-900",
    imagePath: "players/ounahi.jpg",
    stats: [
      { labelKey: "players.ounahi.stat1", value: "72%" },
      { labelKey: "players.ounahi.stat2", value: "48" },
      { labelKey: "players.ounahi.stat3", value: "98%" }
    ]
  },
  {
    id: "elkhannouss",
    number: 23,
    positionKey: "squad.filter_mf",
    club: "VfB Stuttgart",
    age: 22,
    caps: 21,
    goals: 1,
    photoColor: "from-teal-500 to-amber-700",
    imagePath: "players/elkhannouss.jpg",
    stats: [
      { labelKey: "players.elkhannouss.stat1", value: "68%" },
      { labelKey: "players.elkhannouss.stat2", value: "39" },
      { labelKey: "players.elkhannouss.stat3", value: "89%" }
    ]
  },
  {
    id: "saibari",
    number: 11,
    positionKey: "squad.filter_mf",
    club: "PSV Eindhoven",
    age: 25,
    caps: 15,
    goals: 2,
    photoColor: "from-red-600 to-teal-800",
    imagePath: "players/saibari.jpg",
    stats: [
      { labelKey: "players.saibari.stat1", value: "2" },
      { labelKey: "players.saibari.stat2", value: "76%" },
      { labelKey: "players.saibari.stat3", value: "68%" }
    ]
  },
  {
    id: "bouaddi",
    number: 16,
    positionKey: "squad.filter_mf",
    club: "LOSC Lille",
    age: 18,
    caps: 3,
    goals: 0,
    photoColor: "from-emerald-600 to-teal-800",
    imagePath: "players/bouaddi.jpg",
    stats: [
      { labelKey: "players.bouaddi.stat1", value: "92%" },
      { labelKey: "players.bouaddi.stat2", value: "24" },
      { labelKey: "players.bouaddi.stat3", value: "90%" }
    ]
  },
  {
    id: "elaynaoui",
    number: 18,
    positionKey: "squad.filter_mf",
    club: "AS Roma",
    age: 24,
    caps: 2,
    goals: 0,
    photoColor: "from-red-700 to-emerald-900",
    imagePath: "players/elaynaoui.jpg",
    stats: [
      { labelKey: "players.elaynaoui.stat1", value: "11.6 km" },
      { labelKey: "players.elaynaoui.stat2", value: "32" },
      { labelKey: "players.elaynaoui.stat3", value: "8" }
    ]
  },
  {
    id: "talbi",
    number: 24,
    positionKey: "squad.filter_mf",
    club: "Sunderland",
    age: 21,
    caps: 1,
    goals: 0,
    photoColor: "from-teal-600 to-amber-600",
    imagePath: "players/talbi.jpg",
    stats: [
      { labelKey: "players.talbi.stat1", value: "64%" },
      { labelKey: "players.talbi.stat2", value: "4" },
      { labelKey: "players.talbi.stat3", value: "33.8 km/h" }
    ]
  },
  {
    id: "elmourabet",
    number: 14,
    positionKey: "squad.filter_mf",
    club: "RC Strasbourg",
    age: 21,
    caps: 1,
    goals: 0,
    photoColor: "from-red-600 to-teal-800",
    imagePath: "players/elmourabet.jpg",
    stats: [
      { labelKey: "players.elmourabet.stat1", value: "2" },
      { labelKey: "players.elmourabet.stat2", value: "8" },
      { labelKey: "players.elmourabet.stat3", value: "88%" }
    ]
  },
  {
    id: "gessime",
    number: 26,
    positionKey: "squad.filter_mf",
    club: "RC Strasbourg",
    age: 21,
    caps: 1,
    goals: 0,
    photoColor: "from-emerald-700 to-amber-700",
    imagePath: "players/gessime.jpg",
    stats: [
      { labelKey: "players.gessime.stat1", value: "14" },
      { labelKey: "players.gessime.stat2", value: "34.2 km/h" },
      { labelKey: "players.gessime.stat3", value: "72%" }
    ]
  },
  {
    id: "diaz",
    number: 10,
    positionKey: "squad.filter_fw",
    club: "Real Madrid",
    age: 26,
    caps: 12,
    goals: 5,
    photoColor: "from-yellow-600 to-red-700",
    imagePath: "players/diaz.jpg",
    stats: [
      { labelKey: "players.diaz.stat1", value: "93/100" },
      { labelKey: "players.diaz.stat2", value: "0.42" },
      { labelKey: "players.diaz.stat3", value: "4.2" }
    ]
  },
  {
    id: "rahimi",
    number: 9,
    positionKey: "squad.filter_fw",
    club: "Al-Ain FC",
    age: 30,
    caps: 24,
    goals: 8,
    photoColor: "from-amber-500 to-emerald-800",
    imagePath: "players/rahimi.jpg",
    stats: [
      { labelKey: "players.rahimi.stat1", value: "64%" },
      { labelKey: "players.rahimi.stat2", value: "34.8 km/h" },
      { labelKey: "players.rahimi.stat3", value: "82" }
    ]
  },
  {
    id: "ezzalzouli",
    number: 17,
    positionKey: "squad.filter_fw",
    club: "Real Betis",
    age: 24,
    caps: 30,
    goals: 4,
    photoColor: "from-red-600 to-amber-800",
    imagePath: "players/ezzalzouli.jpg",
    stats: [
      { labelKey: "players.ezzalzouli.stat1", value: "14" },
      { labelKey: "players.ezzalzouli.stat2", value: "35.1 km/h" },
      { labelKey: "players.ezzalzouli.stat3", value: "4" }
    ]
  },
  {
    id: "elkaabi",
    number: 19,
    positionKey: "squad.filter_fw",
    club: "Olympiacos",
    age: 32,
    caps: 46,
    goals: 25,
    photoColor: "from-red-600 to-emerald-900",
    imagePath: "players/elkaabi.jpg",
    stats: [
      { labelKey: "players.elkaabi.stat1", value: "54%" },
      { labelKey: "players.elkaabi.stat2", value: "25" },
      { labelKey: "players.elkaabi.stat3", value: "33.2 km/h" }
    ]
  },
  {
    id: "amaimouni",
    number: 7,
    positionKey: "squad.filter_fw",
    club: "Eintracht Francfort",
    age: 21,
    caps: 1,
    goals: 0,
    photoColor: "from-emerald-700 to-teal-900",
    imagePath: "players/amaimouni.webp",
    stats: [
      { labelKey: "players.amaimouni.stat1", value: "0" },
      { labelKey: "players.amaimouni.stat2", value: "72%" },
      { labelKey: "players.amaimouni.stat3", value: "58%" }
    ]
  }
];

export const legendsData = [
  {
    id: "hadji",
    years: "1993 - 2002",
    capsKey: "legends.hadji.caps_val",
    distinctionKey: "legends.hadji.distinction_val"
  },
  {
    id: "naybet",
    years: "1990 - 2006",
    capsKey: "legends.naybet.caps_val",
    distinctionKey: "legends.naybet.distinction_val"
  },
  {
    id: "bassir",
    years: "1994 - 2002",
    capsKey: "legends.bassir.caps_val",
    distinctionKey: "legends.bassir.distinction_val"
  },
  {
    id: "zaki",
    years: "1979 - 1992",
    capsKey: "legends.zaki.caps_val",
    distinctionKey: "legends.zaki.distinction_val"
  }
];

export const coachData = {
  name: "Mohamed Ouahbi",
  roleKey: "staff.coach_role",
  philosophyKey: "staff.ouahbi.philosophy",
  bioKey: "staff.ouahbi.bio",
  imagePath: "staff/ouahbi.jpg",
  staff: [
    { name: "João Sacramento", roleKey: "staff.sacramento_role", imagePath: "staff/sacramento.jpg" },
    { name: "Omar Harrak", roleKey: "staff.harrak_role", imagePath: "staff/harrak.jpg" },
    { name: "Eduardo Dominguez", roleKey: "staff.dominguez_role", imagePath: "staff/dominguez.jpg" }
  ]
};

export const stadiumsData = [
  {
    name: "MetLife Stadium",
    cityKey: "stadiums.metlife.city",
    capacity: "82 500",
    descriptionKey: "stadiums.metlife.desc"
  },
  {
    name: "SoFi Stadium",
    cityKey: "stadiums.sofi.city",
    capacity: "70 200",
    descriptionKey: "stadiums.sofi.desc"
  },
  {
    name: "BC Place",
    cityKey: "stadiums.bcplace.city",
    capacity: "54 500",
    descriptionKey: "stadiums.bcplace.desc"
  },
  {
    name: "Estadio Azteca",
    cityKey: "stadiums.azteca.city",
    capacity: "87 500",
    descriptionKey: "stadiums.azteca.desc"
  }
];

export const matchesData = [
  {
    id: "match1",
    competitionKey: "matches.comp_qualifiers",
    opponentKey: "matches.opp_zambia",
    opponentFlag: "🇿🇲",
    date: "2024-06-07",
    venue: "Stade Adrar, Agadir",
    status: "played",
    score: "2 - 1",
    result: "win"
  },
  {
    id: "match2",
    competitionKey: "matches.comp_qualifiers",
    opponentKey: "matches.opp_congo",
    opponentFlag: "🇨🇬",
    date: "2024-06-11",
    venue: "Stade des Martyrs, Kinshasa",
    status: "played",
    score: "6 - 0",
    result: "win"
  },
  {
    id: "match3",
    competitionKey: "matches.comp_qualifiers",
    opponentKey: "matches.opp_niger",
    opponentFlag: "🇳🇪",
    date: "2025-03-15",
    venue: "Stade Seyni Kountché, Niamey",
    status: "played",
    score: "2 - 1",
    result: "win"
  },
  {
    id: "match4",
    competitionKey: "matches.comp_qualifiers",
    opponentKey: "matches.opp_mauritania",
    opponentFlag: "🇲🇷",
    date: "2025-03-19",
    venue: "Stade d'Honneur, Oujda",
    status: "played",
    score: "0 - 0",
    result: "draw"
  },
  {
    id: "match5",
    competitionKey: "matches.comp_worldcup",
    opponentKey: "matches.opp_tbd",
    opponentFlag: "❓",
    date: "2026-06-12",
    venue: "MetLife Stadium, New York/New Jersey",
    status: "upcoming",
    countdownTarget: "2026-06-12T20:00:00Z"
  },
  {
    id: "match6",
    competitionKey: "matches.comp_worldcup",
    opponentKey: "matches.opp_tbd",
    opponentFlag: "❓",
    date: "2026-06-18",
    venue: "SoFi Stadium, Los Angeles",
    status: "tbd"
  },
  {
    id: "match7",
    competitionKey: "matches.comp_worldcup",
    opponentKey: "matches.opp_tbd",
    opponentFlag: "❓",
    date: "2026-06-24",
    venue: "BC Place, Vancouver",
    status: "tbd"
  }
];
