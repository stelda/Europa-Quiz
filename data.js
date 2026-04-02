// ═══════════════════════════════════════════
// DRAPEAUX SVG
// Pour ajouter un pays : ajouter son SVG ici
// ═══════════════════════════════════════════

var SVG_FLAGS = {
  "France": '<svg viewBox="0 0 300 200"><rect x="0" width="100" height="200" fill="#002395"/><rect x="100" width="100" height="200" fill="#fff"/><rect x="200" width="100" height="200" fill="#ED2939"/></svg>',
  "Allemagne": '<svg viewBox="0 0 300 200"><rect y="0" width="300" height="67" fill="#000"/><rect y="67" width="300" height="67" fill="#DD0000"/><rect y="134" width="300" height="66" fill="#FFCC00"/></svg>',
  "Italie": '<svg viewBox="0 0 300 200"><rect x="0" width="100" height="200" fill="#009246"/><rect x="100" width="100" height="200" fill="#fff"/><rect x="200" width="100" height="200" fill="#CE2B37"/></svg>',
  "Espagne": '<svg viewBox="0 0 300 200"><rect width="300" height="50" fill="#c60b1e"/><rect y="50" width="300" height="100" fill="#ffc400"/><rect y="150" width="300" height="50" fill="#c60b1e"/></svg>',
  "Portugal": '<svg viewBox="0 0 300 200"><rect width="120" height="200" fill="#006600"/><rect x="120" width="180" height="200" fill="#FF0000"/><circle cx="120" cy="100" r="30" fill="#FFCC00"/><circle cx="120" cy="100" r="22" fill="#fff"/><circle cx="120" cy="100" r="18" fill="#003399"/></svg>',
  "Pays-Bas": '<svg viewBox="0 0 300 200"><rect y="0" width="300" height="67" fill="#AE1C28"/><rect y="67" width="300" height="67" fill="#fff"/><rect y="134" width="300" height="66" fill="#21468B"/></svg>',
  "Belgique": '<svg viewBox="0 0 300 200"><rect x="0" width="100" height="200" fill="#000"/><rect x="100" width="100" height="200" fill="#FAE042"/><rect x="200" width="100" height="200" fill="#ED2939"/></svg>',
  "Luxembourg": '<svg viewBox="0 0 300 200"><rect y="0" width="300" height="67" fill="#ED2939"/><rect y="67" width="300" height="67" fill="#fff"/><rect y="134" width="300" height="66" fill="#00A1DE"/></svg>',
  "Autriche": '<svg viewBox="0 0 300 200"><rect y="0" width="300" height="67" fill="#ED2939"/><rect y="67" width="300" height="67" fill="#fff"/><rect y="134" width="300" height="66" fill="#ED2939"/></svg>',
  "Irlande": '<svg viewBox="0 0 300 200"><rect x="0" width="100" height="200" fill="#169B62"/><rect x="100" width="100" height="200" fill="#fff"/><rect x="200" width="100" height="200" fill="#FF883E"/></svg>',
  "Suède": '<svg viewBox="0 0 300 200"><rect width="300" height="200" fill="#006AA7"/><rect x="90" width="40" height="200" fill="#FECC00"/><rect y="80" width="300" height="40" fill="#FECC00"/></svg>',
  "Danemark": '<svg viewBox="0 0 300 200"><rect width="300" height="200" fill="#C60C30"/><rect x="90" width="30" height="200" fill="#fff"/><rect y="85" width="300" height="30" fill="#fff"/></svg>',
  "Finlande": '<svg viewBox="0 0 300 200"><rect width="300" height="200" fill="#fff"/><rect x="85" width="40" height="200" fill="#003580"/><rect y="80" width="300" height="40" fill="#003580"/></svg>',
  "Pologne": '<svg viewBox="0 0 300 200"><rect y="0" width="300" height="100" fill="#fff"/><rect y="100" width="300" height="100" fill="#DC143C"/></svg>',
  "Grèce": '<svg viewBox="0 0 300 200"><rect width="300" height="200" fill="#0D5EAF"/><rect y="0" width="300" height="22" fill="#fff"/><rect y="44" width="300" height="22" fill="#fff"/><rect y="88" width="300" height="22" fill="#fff"/><rect y="133" width="300" height="22" fill="#fff"/><rect y="178" width="300" height="22" fill="#fff"/><rect width="111" height="110" fill="#0D5EAF"/><rect x="44" y="0" width="22" height="110" fill="#fff"/><rect y="44" width="111" height="22" fill="#fff"/></svg>',
  "Croatie": '<svg viewBox="0 0 300 200"><rect y="0" width="300" height="67" fill="#FF0000"/><rect y="67" width="300" height="67" fill="#fff"/><rect y="134" width="300" height="66" fill="#171796"/><rect x="120" y="25" width="60" height="60" fill="#FF0000" rx="4"/><rect x="130" y="35" width="16" height="16" fill="#fff"/><rect x="154" y="35" width="16" height="16" fill="#fff"/><rect x="142" y="51" width="16" height="16" fill="#FF0000"/><rect x="130" y="51" width="16" height="16" fill="#fff"/><rect x="154" y="51" width="16" height="16" fill="#fff"/></svg>',
  "Roumanie": '<svg viewBox="0 0 300 200"><rect x="0" width="100" height="200" fill="#002B7F"/><rect x="100" width="100" height="200" fill="#FCD116"/><rect x="200" width="100" height="200" fill="#CE1126"/></svg>',
  "Bulgarie": '<svg viewBox="0 0 300 200"><rect y="0" width="300" height="67" fill="#fff"/><rect y="67" width="300" height="67" fill="#00966E"/><rect y="134" width="300" height="66" fill="#D62612"/></svg>',
  "Hongrie": '<svg viewBox="0 0 300 200"><rect y="0" width="300" height="67" fill="#CE2939"/><rect y="67" width="300" height="67" fill="#fff"/><rect y="134" width="300" height="66" fill="#477050"/></svg>',
  "Tchéquie": '<svg viewBox="0 0 300 200"><rect y="0" width="300" height="100" fill="#fff"/><rect y="100" width="300" height="100" fill="#D7141A"/><polygon points="0,0 150,100 0,200" fill="#11457E"/></svg>',
  "Slovaquie": '<svg viewBox="0 0 300 200"><rect y="0" width="300" height="67" fill="#fff"/><rect y="67" width="300" height="67" fill="#0B4EA2"/><rect y="134" width="300" height="66" fill="#EE1C25"/><rect x="40" y="45" width="70" height="55" rx="6" fill="#EE1C25"/><rect x="48" y="68" width="54" height="8" fill="#fff"/><rect x="68" y="52" width="14" height="42" fill="#fff"/></svg>',
  "Slovénie": '<svg viewBox="0 0 300 200"><rect y="0" width="300" height="67" fill="#fff"/><rect y="67" width="300" height="67" fill="#003DA5"/><rect y="134" width="300" height="66" fill="#ED1C24"/><path d="M30,15 L60,55 L90,15Z" fill="#003DA5" stroke="#fff" stroke-width="3"/></svg>',
  "Estonie": '<svg viewBox="0 0 300 200"><rect y="0" width="300" height="67" fill="#0072CE"/><rect y="67" width="300" height="67" fill="#000"/><rect y="134" width="300" height="66" fill="#fff"/></svg>',
  "Lettonie": '<svg viewBox="0 0 300 200"><rect width="300" height="200" fill="#9E3039"/><rect y="80" width="300" height="40" fill="#fff"/></svg>',
  "Lituanie": '<svg viewBox="0 0 300 200"><rect y="0" width="300" height="67" fill="#FDB913"/><rect y="67" width="300" height="67" fill="#006A44"/><rect y="134" width="300" height="66" fill="#C1272D"/></svg>',
  "Malte": '<svg viewBox="0 0 300 200"><rect x="0" width="150" height="200" fill="#fff"/><rect x="150" width="150" height="200" fill="#CE0000"/><rect x="18" y="12" width="28" height="22" fill="#ccc" stroke="#888" stroke-width="2" rx="2"/></svg>',
  "Chypre": '<svg viewBox="0 0 300 200"><rect width="300" height="200" fill="#fff"/><ellipse cx="150" cy="85" rx="55" ry="30" fill="#D57800"/><line x1="120" y1="135" x2="130" y2="110" stroke="#4E7A27" stroke-width="5"/><line x1="180" y1="135" x2="170" y2="110" stroke="#4E7A27" stroke-width="5"/></svg>',
};

// Fonction utilitaire pour générer le SVG d'un drapeau à une taille donnée
function getFlagSVG(country, size) {
  var s = size || 160;
  var h = Math.round(s * 2 / 3);
  if (SVG_FLAGS[country]) {
    return SVG_FLAGS[country].replace('<svg ', '<svg width="' + s + '" height="' + h + '" ');
  }
  return '<svg width="' + s + '" height="' + h + '" viewBox="0 0 300 200"><rect width="300" height="200" fill="#ccc" rx="10"/><text x="150" y="115" text-anchor="middle" font-size="80" fill="#666" font-family="Fredoka">' + country[0] + '</text></svg>';
}


// ═══════════════════════════════════════════
// PAYS & CAPITALES
// Pour ajouter un pays : ajouter ici + son SVG dans SVG_FLAGS
// ═══════════════════════════════════════════

var FLAGS = [
  { country: "France",     capital: "Paris",       hint: "Bleu, blanc, rouge (vertical)" },
  { country: "Allemagne",  capital: "Berlin",      hint: "Noir, rouge, or (horizontal)" },
  { country: "Italie",     capital: "Rome",        hint: "Vert, blanc, rouge (vertical)" },
  { country: "Espagne",    capital: "Madrid",      hint: "Rouge et jaune" },
  { country: "Portugal",   capital: "Lisbonne",    hint: "Vert et rouge" },
  { country: "Pays-Bas",   capital: "Amsterdam",   hint: "Rouge, blanc, bleu (horizontal)" },
  { country: "Belgique",   capital: "Bruxelles",   hint: "Noir, jaune, rouge (vertical)" },
  { country: "Luxembourg", capital: "Luxembourg",  hint: "Rouge, blanc, bleu clair" },
  { country: "Autriche",   capital: "Vienne",      hint: "Rouge, blanc, rouge" },
  { country: "Irlande",    capital: "Dublin",      hint: "Vert, blanc, orange" },
  { country: "Suède",      capital: "Stockholm",   hint: "Croix jaune sur fond bleu" },
  { country: "Danemark",   capital: "Copenhague",  hint: "Croix blanche sur fond rouge" },
  { country: "Finlande",   capital: "Helsinki",    hint: "Croix bleue sur fond blanc" },
  { country: "Pologne",    capital: "Varsovie",    hint: "Blanc en haut, rouge en bas" },
  { country: "Grèce",      capital: "Athènes",     hint: "Bandes bleues et blanches avec une croix" },
  { country: "Croatie",    capital: "Zagreb",       hint: "Rouge, blanc, bleu avec un écu à damiers" },
  { country: "Roumanie",   capital: "Bucarest",    hint: "Bleu, jaune, rouge (vertical)" },
  { country: "Bulgarie",   capital: "Sofia",       hint: "Blanc, vert, rouge" },
  { country: "Hongrie",    capital: "Budapest",    hint: "Rouge, blanc, vert" },
  { country: "Tchéquie",   capital: "Prague",      hint: "Blanc, rouge avec un triangle bleu" },
  { country: "Slovaquie",  capital: "Bratislava",  hint: "Blanc, bleu, rouge avec un écu" },
  { country: "Slovénie",   capital: "Ljubljana",   hint: "Blanc, bleu, rouge avec un blason" },
  { country: "Estonie",    capital: "Tallinn",     hint: "Bleu, noir, blanc" },
  { country: "Lettonie",   capital: "Riga",        hint: "Rouge foncé avec une bande blanche" },
  { country: "Lituanie",   capital: "Vilnius",     hint: "Jaune, vert, rouge" },
  { country: "Malte",      capital: "La Valette",  hint: "Blanc et rouge avec une croix" },
  { country: "Chypre",     capital: "Nicosie",     hint: "Fond blanc avec la carte de l'île en cuivre" },
];


// ═══════════════════════════════════════════
// MONUMENTS
// ═══════════════════════════════════════════

var MONUMENTS = [
  { name: "Tour Eiffel",              country: "France",    city: "Paris",       fact: "Construite en 1889 pour l'Exposition universelle. Mesure 330 mètres." },
  { name: "Colisée",                  country: "Italie",    city: "Rome",        fact: "Amphithéâtre romain pour 50 000 spectateurs, construit en 80 ap. J.-C." },
  { name: "Sagrada Família",          country: "Espagne",   city: "Barcelone",   fact: "Basilique conçue par Gaudí, en construction depuis 1882." },
  { name: "Acropole et Parthénon",    country: "Grèce",     city: "Athènes",     fact: "Temple dédié à Athéna, construit au 5e siècle av. J.-C." },
  { name: "Porte de Brandebourg",     country: "Allemagne", city: "Berlin",      fact: "Symbole de la réunification allemande en 1989." },
  { name: "Manneken Pis",             country: "Belgique",  city: "Bruxelles",   fact: "Petite statue-fontaine de bronze datant de 1619." },
  { name: "Petite Sirène",            country: "Danemark",  city: "Copenhague",  fact: "Statue inspirée du conte d'Andersen, installée en 1913." },
  { name: "Tour de Belém",            country: "Portugal",  city: "Lisbonne",    fact: "Tour du 16e siècle, symbole des Grandes Découvertes." },
  { name: "Atomium",                  country: "Belgique",  city: "Bruxelles",   fact: "Atome de fer agrandi 165 milliards de fois, construit en 1958." },
  { name: "Château de Prague",        country: "Tchéquie",  city: "Prague",      fact: "Le plus grand château ancien du monde, fondé au 9e siècle." },
  { name: "Tour penchée de Pise",     country: "Italie",    city: "Pise",        fact: "Campanile incliné à 3,97 degrés, commencé en 1173." },
  { name: "Château de Neuschwanstein",country: "Allemagne", city: "Bavière",     fact: "Château du roi Louis II, inspiration pour le château Disney." },
  { name: "Moulins de Kinderdijk",    country: "Pays-Bas",  city: "Kinderdijk",  fact: "19 moulins à vent du 18e siècle, patrimoine UNESCO." },
];


// ═══════════════════════════════════════════
// GASTRONOMIE
// ═══════════════════════════════════════════

var CUISINE = [
  { dish: "Croissant",        country: "France",    fact: "Viennoiserie emblématique, faite de pâte feuilletée." },
  { dish: "Pizza Margherita", country: "Italie",    fact: "Créée en 1889 à Naples : tomate, mozzarella, basilic." },
  { dish: "Paella",           country: "Espagne",   fact: "Plat de riz originaire de Valence." },
  { dish: "Bratwurst",        country: "Allemagne", fact: "Saucisse grillée populaire en Bavière et Thuringe." },
  { dish: "Gaufre",           country: "Belgique",  fact: "Gaufre de Bruxelles (légère) ou de Liège (sucrée)." },
  { dish: "Moussaka",         country: "Grèce",     fact: "Gratin d'aubergines, viande hachée et béchamel." },
  { dish: "Pastéis de nata",  country: "Portugal",  fact: "Petit flan pâtissier créé au monastère de Belém." },
  { dish: "Goulash",          country: "Hongrie",   fact: "Ragoût épicé au paprika, plat national hongrois." },
  { dish: "Smørrebrød",       country: "Danemark",  fact: "Tartine ouverte garnie de poisson, viande ou fromage." },
  { dish: "Köttbullar",       country: "Suède",     fact: "Boulettes de viande avec confiture d'airelles." },
  { dish: "Fish and chips",   country: "Irlande",   fact: "Poisson frit et frites, très populaire." },
  { dish: "Pierogi",          country: "Pologne",   fact: "Raviolis farcis (pommes de terre, fromage, viande)." },
  { dish: "Wiener Schnitzel", country: "Autriche",  fact: "Escalope de veau panée, plat national autrichien." },
  { dish: "Tapas",            country: "Espagne",   fact: "Petits plats variés à partager, tradition andalouse." },
];


// ═══════════════════════════════════════════
// PERSONNALITÉS CÉLÈBRES
// ═══════════════════════════════════════════

var PEOPLE = [
  { name: "Léonard de Vinci",       country: "Italie",           fact: "Peintre de la Joconde, inventeur et scientifique de la Renaissance." },
  { name: "Ludwig van Beethoven",   country: "Allemagne",        fact: "Compositeur devenu sourd qui a continué à composer." },
  { name: "Marie Curie",            country: "Pologne / France", fact: "Première femme Prix Nobel. A découvert le radium." },
  { name: "Pablo Picasso",          country: "Espagne",          fact: "Peintre et sculpteur, co-fondateur du cubisme." },
  { name: "Hans Christian Andersen",country: "Danemark",          fact: "Auteur de La Petite Sirène et Le Vilain Petit Canard." },
  { name: "Mozart",                 country: "Autriche",         fact: "Compositeur prodige né à Salzbourg." },
  { name: "Galilée",                country: "Italie",           fact: "Astronome qui a confirmé que la Terre tourne autour du Soleil." },
  { name: "Vincent van Gogh",       country: "Pays-Bas",         fact: "Peintre célèbre pour La Nuit étoilée et Les Tournesols." },
  { name: "Vasco de Gama",          country: "Portugal",         fact: "Explorateur de la route maritime vers l'Inde (1498)." },
  { name: "Les frères Grimm",       country: "Allemagne",        fact: "Auteurs de Cendrillon, Blanche-Neige, Hansel et Gretel." },
  { name: "Frédéric Chopin",        country: "Pologne",          fact: "Compositeur et pianiste virtuose romantique." },
  { name: "Aristote",               country: "Grèce",            fact: "Philosophe grec ancien, élève de Platon." },
];


// ═══════════════════════════════════════════
// FAITS SUR L'UNION EUROPÉENNE
// ═══════════════════════════════════════════

var EU_FACTS = [
  { q: "En quelle année a été signé le traité de Rome ?",
    a: "1957", opts: ["1945","1957","1962","1951"],
    detail: "Signé le 25 mars 1957 par 6 pays fondateurs." },
  { q: "Combien d'étoiles sur le drapeau européen ?",
    a: "12", opts: ["27","12","15","6"],
    detail: "Toujours 12 étoiles, symbole de perfection et d'unité." },
  { q: "Quels sont les 6 pays fondateurs de la CEE ?",
    a: "France, Allemagne, Italie, Belgique, Pays-Bas, Luxembourg",
    opts: ["France, Allemagne, Italie, Belgique, Pays-Bas, Luxembourg","France, UK, Allemagne, Espagne, Italie, Portugal","France, Allemagne, Autriche, Pologne, Belgique, Suède","France, Italie, Grèce, Espagne, Portugal, Allemagne"],
    detail: "Les 6 fondateurs du Benelux + France, Allemagne, Italie." },
  { q: "Quelle est la devise de l'Union européenne ?",
    a: "Unie dans la diversité",
    opts: ["Liberté, Égalité, Fraternité","Unie dans la diversité","Paix et Prospérité","Ensemble pour toujours"],
    detail: "Devise officielle depuis 2000." },
  { q: "Quelle est la monnaie de la zone euro ?",
    a: "L'euro (€)", opts: ["Le franc","L'euro (€)","L'écu","Le mark"],
    detail: "Introduit en 2002, utilisé par 20 pays." },
  { q: "Où siège le Parlement européen ?",
    a: "Strasbourg", opts: ["Bruxelles","Strasbourg","Luxembourg","La Haye"],
    detail: "Le siège officiel est à Strasbourg." },
  { q: "Quel jour est la Journée de l'Europe ?",
    a: "Le 9 mai", opts: ["Le 1er janvier","Le 9 mai","Le 25 mars","Le 1er novembre"],
    detail: "Commémore la Déclaration Schuman de 1950." },
  { q: "Quel hymne utilise l'UE ?",
    a: "L'Ode à la Joie de Beethoven",
    opts: ["La Marseillaise","L'Ode à la Joie de Beethoven","Imagine de Lennon","Le Beau Danube bleu"],
    detail: "Hymne européen depuis 1985 (9e symphonie)." },
  { q: "Combien de pays membres dans l'UE ?",
    a: "27", opts: ["28","27","25","30"],
    detail: "27 depuis le Brexit (2020)." },
  { q: "Quel pays a quitté l'UE en 2020 ?",
    a: "Le Royaume-Uni", opts: ["La Norvège","La Suisse","Le Royaume-Uni","L'Islande"],
    detail: "Brexit : sortie le 31 janvier 2020." },
  { q: "Qu'est-ce que l'espace Schengen ?",
    a: "Zone sans contrôle aux frontières",
    opts: ["Zone sans contrôle aux frontières","La zone euro","L'ensemble de l'UE","Un programme étudiant"],
    detail: "Libre circulation entre 27 pays sans passeport." },
  { q: "Comment s'appelle le programme d'échange étudiant ?",
    a: "Erasmus", opts: ["Erasmus","Horizon","Comenius","Leonardo"],
    detail: "Programme Erasmus depuis 1987." },
];


// ═══════════════════════════════════════════
// CATÉGORIES (menu principal)
// ═══════════════════════════════════════════

var catData = [
  { id: "flags",     emoji: "🏴", title: "Drapeaux & Capitales", desc: "Reconnais les drapeaux et trouve les capitales" },
  { id: "monuments", emoji: "🏛️", title: "Monuments",           desc: "Les sites célèbres d'Europe" },
  { id: "cuisine",   emoji: "🍽️", title: "Gastronomie",         desc: "Les plats traditionnels" },
  { id: "people",    emoji: "🎨", title: "Personnalités",       desc: "Les personnages célèbres" },
  { id: "eu",        emoji: "⭐", title: "Union Européenne",    desc: "Histoire, symboles et institutions" },
  { id: "all",       emoji: "🌟", title: "Tout Mélangé",        desc: "Un mix de toutes les catégories !" },
];
