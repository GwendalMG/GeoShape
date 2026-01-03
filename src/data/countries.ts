import countryShapes from "world-map-country-shapes";

export interface Country {
  id: string;
  name: string;
  nameFr: string;
  path: string;
  funFact: string;
  capital: string;
}

// Mapping of country codes to French names and fun facts
const countryNames: Record<string, { name: string; nameFr: string; funFact: string; capital: string }> = {
  // Europe
  FR: { name: "France", nameFr: "France", capital: "Paris", funFact: "Ce territoire hexagonal abrite la plus haute montagne d'Europe occidentale et compte plus de 400 variétés de fromages." },
  IT: { name: "Italy", nameFr: "Italie", capital: "Rome", funFact: "Cette botte célèbre possède plus de sites UNESCO que tout autre pays au monde." },
  DE: { name: "Germany", nameFr: "Allemagne", capital: "Berlin", funFact: "Neuf pays sont ses voisins, ce qui en fait le pays européen avec le plus de frontières terrestres." },
  ES: { name: "Spain", nameFr: "Espagne", capital: "Madrid", funFact: "Sa superficie inclut des îles volcaniques au large de l'Afrique et une enclave en terre africaine." },
  GB: { name: "United Kingdom", nameFr: "Royaume-Uni", capital: "Londres", funFact: "Cet archipel insulaire possède plus de 6 000 îles dont seulement 138 sont habitées." },
  PT: { name: "Portugal", nameFr: "Portugal", capital: "Lisbonne", funFact: "Le point le plus occidental du continent européen se trouve sur son territoire." },
  GR: { name: "Greece", nameFr: "Grèce", capital: "Athènes", funFact: "Plus de 6 000 îles et îlots composent ce territoire, mais seulement 227 sont habités." },
  SE: { name: "Sweden", nameFr: "Suède", capital: "Stockholm", funFact: "Ce territoire s'étire sur plus de 1 500 km du nord au sud et compte environ 100 000 lacs." },
  NO: { name: "Norway", nameFr: "Norvège", capital: "Oslo", funFact: "Son littoral déchiqueté est le deuxième plus long du monde après le Canada, avec plus de 100 000 km." },
  FI: { name: "Finland", nameFr: "Finlande", capital: "Helsinki", funFact: "Surnommé le pays aux mille lacs, il en compte en réalité plus de 188 000." },
  PL: { name: "Poland", nameFr: "Pologne", capital: "Varsovie", funFact: "Presque entièrement plat, 75% de son territoire se situe à moins de 200 mètres d'altitude." },
  NL: { name: "Netherlands", nameFr: "Pays-Bas", capital: "Amsterdam", funFact: "Plus de 25% de son territoire se trouve sous le niveau de la mer, protégé par des digues." },
  BE: { name: "Belgium", nameFr: "Belgique", capital: "Bruxelles", funFact: "Ce petit territoire a trois langues officielles et est bordé par quatre pays." },
  CH: { name: "Switzerland", nameFr: "Suisse", capital: "Berne", funFact: "Sans accès à la mer, ce territoire montagneux est traversé par le plus long tunnel ferroviaire du monde." },
  AT: { name: "Austria", nameFr: "Autriche", capital: "Vienne", funFact: "Les Alpes couvrent 62% de ce territoire enclavé au cœur de l'Europe." },
  IE: { name: "Ireland", nameFr: "Irlande", capital: "Dublin", funFact: "Cette île verte compte plus de moutons que d'habitants." },
  DK: { name: "Denmark", nameFr: "Danemark", capital: "Copenhague", funFact: "Ce royaume scandinave est composé d'une péninsule et de plus de 400 îles." },
  CZ: { name: "Czechia", nameFr: "Tchéquie", capital: "Prague", funFact: "Entièrement enclavé, ce territoire est traversé par deux grands fleuves européens." },
  HU: { name: "Hungary", nameFr: "Hongrie", capital: "Budapest", funFact: "Le plus grand lac thermal naturel d'Europe se trouve dans ce territoire sans littoral." },
  RO: { name: "Romania", nameFr: "Roumanie", capital: "Bucarest", funFact: "Les Carpates forment un grand arc au centre de ce territoire qui borde la mer Noire." },
  BG: { name: "Bulgaria", nameFr: "Bulgarie", capital: "Sofia", funFact: "Bordant la mer Noire, ce territoire est traversé par le massif des Balkans d'ouest en est." },
  HR: { name: "Croatia", nameFr: "Croatie", capital: "Zagreb", funFact: "Sa côte adriatique compte plus de 1 200 îles, dont seulement une cinquantaine sont habitées." },
  RS: { name: "Serbia", nameFr: "Serbie", capital: "Belgrade", funFact: "Ce territoire enclavé se situe au carrefour de l'Europe centrale et du sud-est." },
  SK: { name: "Slovakia", nameFr: "Slovaquie", capital: "Bratislava", funFact: "Les Carpates occupent la majeure partie de ce territoire sans accès à la mer." },
  UA: { name: "Ukraine", nameFr: "Ukraine", capital: "Kiev", funFact: "C'est le plus vaste pays entièrement situé en Europe, avec des steppes fertiles." },
  BY: { name: "Belarus", nameFr: "Biélorussie", capital: "Minsk", funFact: "Plus de 40% de ce territoire plat est couvert de forêts, dont la plus ancienne d'Europe." },
  LT: { name: "Lithuania", nameFr: "Lituanie", capital: "Vilnius", funFact: "Ce territoire balte possède une petite ouverture maritime sur la mer Baltique." },
  LV: { name: "Latvia", nameFr: "Lettonie", capital: "Riga", funFact: "Les forêts couvrent plus de la moitié de ce territoire balte parsemé de lacs." },
  EE: { name: "Estonia", nameFr: "Estonie", capital: "Tallinn", funFact: "Plus de 2 000 îles composent ce territoire baltique dont la capitale est médiévale." },
  IS: { name: "Iceland", nameFr: "Islande", capital: "Reykjavik", funFact: "Cette île volcanique au climat subpolaire se situe à cheval sur deux plaques tectoniques." },
  AL: { name: "Albania", nameFr: "Albanie", capital: "Tirana", funFact: "Ce petit territoire montagneux possède des côtes sur deux mers différentes." },
  MK: { name: "North Macedonia", nameFr: "Macédoine du Nord", capital: "Skopje", funFact: "Ce territoire enclavé tire son nom d'une région historique antique." },
  SI: { name: "Slovenia", nameFr: "Slovénie", capital: "Ljubljana", funFact: "Malgré sa petite taille, ce territoire possède à la fois des Alpes et un accès à l'Adriatique." },
  BA: { name: "Bosnia and Herzegovina", nameFr: "Bosnie-Herzégovine", capital: "Sarajevo", funFact: "Ce territoire présente une forme presque triangulaire avec un minuscule corridor vers la mer." },
  ME: { name: "Montenegro", nameFr: "Monténégro", capital: "Podgorica", funFact: "Son nom signifie \"montagne noire\", reflétant son relief très accidenté." },
  MD: { name: "Moldova", nameFr: "Moldavie", capital: "Chișinău", funFact: "Enclavé entre deux grands voisins, ce territoire est traversé par un affluent majeur." },
  
  // Asie
  JP: { name: "Japan", nameFr: "Japon", capital: "Tokyo", funFact: "Cet archipel volcanique compte plus de 6 800 îles dont quatre principales." },
  CN: { name: "China", nameFr: "Chine", capital: "Pékin", funFact: "Le troisième plus grand pays du monde possède 14 voisins frontaliers." },
  IN: { name: "India", nameFr: "Inde", capital: "New Delhi", funFact: "Cette immense péninsule triangulaire est bordée par trois mers différentes." },
  KR: { name: "South Korea", nameFr: "Corée du Sud", capital: "Séoul", funFact: "Cette péninsule montagneuse est entourée par trois mers et séparée en deux." },
  TH: { name: "Thailand", nameFr: "Thaïlande", capital: "Bangkok", funFact: "Sa forme rappelle une tête d'éléphant, avec un corps étiré vers le sud en péninsule." },
  VN: { name: "Vietnam", nameFr: "Vietnam", capital: "Hanoï", funFact: "Ce territoire en forme de S longe la mer sur plus de 3 000 km de côtes." },
  ID: { name: "Indonesia", nameFr: "Indonésie", capital: "Jakarta", funFact: "Le plus grand archipel du monde compte plus de 17 000 îles s'étirant sur trois fuseaux horaires." },
  PH: { name: "Philippines", nameFr: "Philippines", capital: "Manille", funFact: "Plus de 7 600 îles composent cet archipel volcanique du Pacifique." },
  MY: { name: "Malaysia", nameFr: "Malaisie", capital: "Kuala Lumpur", funFact: "Ce territoire est divisé en deux parties séparées par 650 km de mer." },
  SG: { name: "Singapore", nameFr: "Singapour", capital: "Singapour", funFact: "Cette cité-État insulaire est l'un des plus petits pays du monde." },
  PK: { name: "Pakistan", nameFr: "Pakistan", capital: "Islamabad", funFact: "Ce territoire englobe une partie du massif de l'Himalaya au nord." },
  BD: { name: "Bangladesh", nameFr: "Bangladesh", capital: "Dacca", funFact: "L'un des pays les plus densément peuplés au monde, traversé par un immense delta." },
  IR: { name: "Iran", nameFr: "Iran", capital: "Téhéran", funFact: "Ce vaste plateau désertique est encadré par deux chaînes montagneuses majeures." },
  IQ: { name: "Iraq", nameFr: "Irak", capital: "Bagdad", funFact: "Le berceau de la civilisation est traversé par deux fleuves légendaires." },
  SA: { name: "Saudi Arabia", nameFr: "Arabie Saoudite", capital: "Riyad", funFact: "La plus grande partie de la péninsule arabique est occupée par ce territoire désertique." },
  AE: { name: "United Arab Emirates", nameFr: "Émirats Arabes Unis", capital: "Abou Dabi", funFact: "Sept émirats forment cette fédération bordant le golfe Persique." },
  TR: { name: "Turkey", nameFr: "Turquie", capital: "Ankara", funFact: "Ce territoire s'étend sur deux continents, relié par le détroit du Bosphore." },
  IL: { name: "Israel", nameFr: "Israël", capital: "Jérusalem", funFact: "Ce petit territoire étroit borde la mer Méditerranée et le point le plus bas de la Terre." },
  KZ: { name: "Kazakhstan", nameFr: "Kazakhstan", capital: "Astana", funFact: "Le plus grand pays enclavé du monde possède des steppes à perte de vue." },
  UZ: { name: "Uzbekistan", nameFr: "Ouzbékistan", capital: "Tachkent", funFact: "Ce territoire doublement enclavé abrite des déserts et l'ancienne route de la soie." },
  AF: { name: "Afghanistan", nameFr: "Afghanistan", capital: "Kaboul", funFact: "Territoire montagneux et enclavé, surnommé le \"toit du monde\"." },
  NP: { name: "Nepal", nameFr: "Népal", capital: "Katmandou", funFact: "Enclavé dans l'Himalaya, ce territoire abrite 8 des 10 plus hauts sommets du monde." },
  LK: { name: "Sri Lanka", nameFr: "Sri Lanka", capital: "Colombo", funFact: "Cette île en forme de goutte possède des plages tout autour de son littoral." },
  MM: { name: "Myanmar", nameFr: "Myanmar", capital: "Naypyidaw", funFact: "Ce territoire s'étire du nord au sud sur plus de 2 000 km entre montagnes et mer." },
  KH: { name: "Cambodia", nameFr: "Cambodge", capital: "Phnom Penh", funFact: "Le plus grand lac d'eau douce d'Asie du Sud-Est occupe le centre de ce territoire." },
  LA: { name: "Laos", nameFr: "Laos", capital: "Vientiane", funFact: "Seul pays d'Asie du Sud-Est totalement enclavé, entouré par cinq voisins." },
  MN: { name: "Mongolia", nameFr: "Mongolie", capital: "Oulan-Bator", funFact: "Immense territoire enclavé entre deux géants, couvert de steppes et de désert." },
  
  // Océanie
  AU: { name: "Australia", nameFr: "Australie", capital: "Canberra", funFact: "Le plus grand pays-continent de l'Océanie, également la plus grande île du monde." },
  NZ: { name: "New Zealand", nameFr: "Nouvelle-Zélande", capital: "Wellington", funFact: "Deux îles principales forment ce territoire isolé aux antipodes de l'Europe." },
  PG: { name: "Papua New Guinea", nameFr: "Papouasie-Nouvelle-Guinée", capital: "Port Moresby", funFact: "Ce territoire occupe la moitié orientale d'une grande île tropicale." },
  FJ: { name: "Fiji", nameFr: "Fidji", capital: "Suva", funFact: "Plus de 300 îles volcaniques et coralliennes composent cet archipel du Pacifique Sud." },
  
  // Amérique du Nord
  US: { name: "United States", nameFr: "États-Unis", capital: "Washington", funFact: "Le quatrième plus grand pays du monde possède deux territoires non-contigus majeurs." },
  CA: { name: "Canada", nameFr: "Canada", capital: "Ottawa", funFact: "Le deuxième plus grand pays du monde partage la plus longue frontière terrestre avec un seul voisin." },
  MX: { name: "Mexico", nameFr: "Mexique", capital: "Mexico", funFact: "Ce territoire relie deux continents et sépare deux océans." },
  GT: { name: "Guatemala", nameFr: "Guatemala", capital: "Guatemala", funFact: "Ce territoire montagneux volcanique abrite des vestiges mayas légendaires." },
  HN: { name: "Honduras", nameFr: "Honduras", capital: "Tegucigalpa", funFact: "Bordé par deux océans, ce territoire possède la seule île en forme de cœur des Caraïbes." },
  NI: { name: "Nicaragua", nameFr: "Nicaragua", capital: "Managua", funFact: "Le plus grand pays d'Amérique centrale abrite deux immenses lacs." },
  CR: { name: "Costa Rica", nameFr: "Costa Rica", capital: "San José", funFact: "Malgré sa petite taille, ce territoire possède des côtes sur deux océans." },
  PA: { name: "Panama", nameFr: "Panama", capital: "Panama", funFact: "Le point le plus étroit entre deux continents est traversé par un canal célèbre." },
  CU: { name: "Cuba", nameFr: "Cuba", capital: "La Havane", funFact: "La plus grande île des Caraïbes s'étire sur plus de 1 200 km d'ouest en est." },
  JM: { name: "Jamaica", nameFr: "Jamaïque", capital: "Kingston", funFact: "Cette île montagneuse des Caraïbes est la troisième plus grande des Grandes Antilles." },
  HT: { name: "Haiti", nameFr: "Haïti", capital: "Port-au-Prince", funFact: "Ce territoire occupe le tiers ouest d'une île partagée avec un autre pays." },
  DO: { name: "Dominican Republic", nameFr: "République Dominicaine", capital: "Saint-Domingue", funFact: "Occupant les deux tiers est d'une île, ce territoire possède le point le plus haut des Caraïbes." },
  
  // Amérique du Sud
  BR: { name: "Brazil", nameFr: "Brésil", capital: "Brasília", funFact: "Le cinquième plus grand pays du monde occupe presque la moitié du continent sud-américain." },
  AR: { name: "Argentina", nameFr: "Argentine", capital: "Buenos Aires", funFact: "Ce territoire s'étire du nord au sud sur plus de 3 700 km jusqu'en Terre de Feu." },
  CL: { name: "Chile", nameFr: "Chili", capital: "Santiago", funFact: "Le pays le plus long et étroit du monde s'étend sur 4 300 km le long du Pacifique." },
  CO: { name: "Colombia", nameFr: "Colombie", capital: "Bogota", funFact: "Seul pays sud-américain avec des côtes sur deux océans." },
  PE: { name: "Peru", nameFr: "Pérou", capital: "Lima", funFact: "Ce territoire abrite trois régions distinctes: côte, montagne et jungle amazonienne." },
  VE: { name: "Venezuela", nameFr: "Venezuela", capital: "Caracas", funFact: "Les chutes les plus hautes du monde tombent d'un plateau de ce territoire." },
  EC: { name: "Ecuador", nameFr: "Équateur", capital: "Quito", funFact: "Ce territoire traverse son homonyme géographique et possède des îles volcaniques célèbres." },
  BO: { name: "Bolivia", nameFr: "Bolivie", capital: "La Paz", funFact: "L'un des deux pays enclavés du continent abrite le plus grand désert de sel du monde." },
  PY: { name: "Paraguay", nameFr: "Paraguay", capital: "Asuncion", funFact: "Sans accès à la mer, ce territoire est divisé en deux régions par un grand fleuve." },
  UY: { name: "Uruguay", nameFr: "Uruguay", capital: "Montevideo", funFact: "Le plus petit pays hispanophone d'Amérique du Sud est bordé par deux géants." },
  GY: { name: "Guyana", nameFr: "Guyana", capital: "Georgetown", funFact: "Seul pays anglophone d'Amérique du Sud, couvert à 80% par la forêt amazonienne." },
  SR: { name: "Suriname", nameFr: "Suriname", capital: "Paramaribo", funFact: "Le plus petit pays indépendant d'Amérique du Sud est couvert à 90% de forêt tropicale." },
  
  // Afrique
  EG: { name: "Egypt", nameFr: "Égypte", capital: "Le Caire", funFact: "Ce territoire désertique est traversé par le plus long fleuve du monde." },
  ZA: { name: "South Africa", nameFr: "Afrique du Sud", capital: "Pretoria", funFact: "Ce territoire possède trois capitales et entoure complètement un petit royaume montagneux." },
  MA: { name: "Morocco", nameFr: "Maroc", capital: "Rabat", funFact: "La pointe nord-ouest de l'Afrique se trouve à seulement 14 km de l'Europe." },
  DZ: { name: "Algeria", nameFr: "Algérie", capital: "Alger", funFact: "Le plus grand pays d'Afrique est couvert à 90% par le Sahara." },
  TN: { name: "Tunisia", nameFr: "Tunisie", capital: "Tunis", funFact: "Le point le plus septentrional d'Afrique se trouve dans ce territoire méditerranéen." },
  NG: { name: "Nigeria", nameFr: "Nigeria", capital: "Abuja", funFact: "Le pays le plus peuplé d'Afrique est traversé par un grand fleuve éponyme." },
  KE: { name: "Kenya", nameFr: "Kenya", capital: "Nairobi", funFact: "L'équateur traverse ce territoire qui abrite la Great Rift Valley." },
  ET: { name: "Ethiopia", nameFr: "Éthiopie", capital: "Addis-Abeba", funFact: "Seul pays africain jamais colonisé, ce plateau montagneux est le berceau de l'humanité." },
  GH: { name: "Ghana", nameFr: "Ghana", capital: "Accra", funFact: "Ce territoire côtier fut le premier pays d'Afrique subsaharienne à obtenir l'indépendance." },
  TZ: { name: "Tanzania", nameFr: "Tanzanie", capital: "Dodoma", funFact: "Ce territoire abrite le plus haut sommet d'Afrique et les trois plus grands lacs du continent." },
  UG: { name: "Uganda", nameFr: "Ouganda", capital: "Kampala", funFact: "Traversé par l'équateur, ce territoire enclavé possède la source du plus long fleuve du monde." },
  CI: { name: "Ivory Coast", nameFr: "Côte d'Ivoire", capital: "Yamoussoukro", funFact: "Ce territoire en forme de carré possède une lagune côtière spectaculaire." },
  CM: { name: "Cameroon", nameFr: "Cameroun", capital: "Yaoundé", funFact: "Sa forme triangulaire lui vaut le surnom d'\"Afrique en miniature\" pour sa diversité." },
  SN: { name: "Senegal", nameFr: "Sénégal", capital: "Dakar", funFact: "Le point le plus occidental du continent africain se trouve sur ce territoire atlantique." },
  MG: { name: "Madagascar", nameFr: "Madagascar", capital: "Antananarivo", funFact: "La quatrième plus grande île du monde s'est séparée de l'Afrique il y a 165 millions d'années." },
  AO: { name: "Angola", nameFr: "Angola", capital: "Luanda", funFact: "Ce territoire possède une enclave séparée du territoire principal par un corridor." },
  MZ: { name: "Mozambique", nameFr: "Mozambique", capital: "Maputo", funFact: "Ce territoire s'étire sur plus de 2 500 km le long de l'océan Indien." },
  ZW: { name: "Zimbabwe", nameFr: "Zimbabwe", capital: "Harare", funFact: "Ce territoire enclavé abrite les spectaculaires chutes Victoria sur sa frontière." },
  BW: { name: "Botswana", nameFr: "Botswana", capital: "Gaborone", funFact: "Territoire enclavé dont 70% est couvert par le désert du Kalahari." },
  NA: { name: "Namibia", nameFr: "Namibie", capital: "Windhoek", funFact: "Ce territoire désertique possède le plus ancien désert du monde sur sa côte." },
  ZM: { name: "Zambia", nameFr: "Zambie", capital: "Lusaka", funFact: "Sans accès à la mer, ce territoire en forme de papillon possède le plus grand barrage d'Afrique." },
  RW: { name: "Rwanda", nameFr: "Rwanda", capital: "Kigali", funFact: "Surnommé le pays aux mille collines, c'est l'un des plus petits territoires d'Afrique continentale." },
  ML: { name: "Mali", nameFr: "Mali", capital: "Bamako", funFact: "Ce territoire enclavé possède une célèbre cité du désert classée au patrimoine mondial." },
  NE: { name: "Niger", nameFr: "Niger", capital: "Niamey", funFact: "Plus de 80% de ce vaste territoire enclavé est couvert par le Sahara." },
  TD: { name: "Chad", nameFr: "Tchad", capital: "N'Djamena", funFact: "Ce territoire enclavé abrite un lac qui change de taille selon les saisons." },
  SO: { name: "Somalia", nameFr: "Somalie", capital: "Mogadiscio", funFact: "Sa forme en corne caractéristique lui donne son surnom géographique." },
  LY: { name: "Libya", nameFr: "Libye", capital: "Tripoli", funFact: "Le quatrième plus grand pays d'Afrique est le plus désertique au monde." },
  SD: { name: "Sudan", nameFr: "Soudan", capital: "Khartoum", funFact: "Troisième plus grand pays d'Afrique, traversé par le Nil et le désert de Nubie." },
  MW: { name: "Malawi", nameFr: "Malawi", capital: "Lilongwe", funFact: "Ce territoire étroit et enclavé est dominé par un immense lac sur toute sa longueur." },
  CD: { name: "Democratic Republic of the Congo", nameFr: "République Démocratique du Congo", capital: "Kinshasa", funFact: "Le deuxième plus grand pays d'Afrique possède le fleuve le plus profond du monde." },
  CG: { name: "Republic of the Congo", nameFr: "République du Congo", capital: "Brazzaville", funFact: "Ce territoire forestier est traversé par l'équateur et bordé par le grand fleuve éponyme." },
  GA: { name: "Gabon", nameFr: "Gabon", capital: "Libreville", funFact: "Couvert à 85% par la forêt équatoriale, ce territoire s'étend de part et d'autre de l'équateur." },
  CF: { name: "Central African Republic", nameFr: "République Centrafricaine", capital: "Bangui", funFact: "Comme son nom l'indique, ce territoire enclavé se situe au centre du continent." },
  BF: { name: "Burkina Faso", nameFr: "Burkina Faso", capital: "Ouagadougou", funFact: "Ce territoire sahélien enclavé signifie \"pays des hommes intègres\"." },
  BJ: { name: "Benin", nameFr: "Bénin", capital: "Porto-Novo", funFact: "Ce territoire étroit s'étire du nord au sud sur 700 km jusqu'au golfe de Guinée." },
  TG: { name: "Togo", nameFr: "Togo", capital: "Lomé", funFact: "L'un des plus petits pays d'Afrique, très étroit, coincé entre deux voisins plus grands." },
  MR: { name: "Mauritania", nameFr: "Mauritanie", capital: "Nouakchott", funFact: "Trois quarts de ce territoire sont couverts par le Sahara occidental." },
  GN: { name: "Guinea", nameFr: "Guinée", capital: "Conakry", funFact: "Surnommée le château d'eau de l'Afrique, plusieurs grands fleuves y prennent leur source." },
  SL: { name: "Sierra Leone", nameFr: "Sierra Leone", capital: "Freetown", funFact: "Ce petit territoire côtier doit son nom à la forme de ses montagnes." },
  LR: { name: "Liberia", nameFr: "Liberia", capital: "Monrovia", funFact: "Seul pays africain fondé par d'anciens esclaves américains, bordant l'Atlantique." },
  SS: { name: "South Sudan", nameFr: "Soudan du Sud", capital: "Djouba", funFact: "Le plus jeune pays du monde (2011) est enclavé au cœur de l'Afrique." },
  ER: { name: "Eritrea", nameFr: "Érythrée", capital: "Asmara", funFact: "Ce territoire possède plus de 350 îles dans la mer Rouge." },
  DJ: { name: "Djibouti", nameFr: "Djibouti", capital: "Djibouti", funFact: "Petit territoire stratégique où trois plaques tectoniques se rencontrent." },
  
  // Russie
  RU: { name: "Russia", nameFr: "Russie", capital: "Moscou", funFact: "Le plus vaste pays du monde s'étend sur deux continents et traverse 11 fuseaux horaires." },
  GE: { name: "Georgia", nameFr: "Géorgie", capital: "Tbilissi", funFact: "Le Caucase traverse ce territoire situé à la frontière entre Europe et Asie." },
  AM: { name: "Armenia", nameFr: "Arménie", capital: "Erevan", funFact: "Ce territoire montagneux et enclavé abrite le mont biblique légendaire." },
  AZ: { name: "Azerbaijan", nameFr: "Azerbaïdjan", capital: "Bakou", funFact: "Bordant la mer Caspienne, ce territoire possède une exclave séparée du territoire principal." },
};

// Get the shape data from the package
const shapesMap = new Map(
  countryShapes.map((c: { id: string; shape: string }) => [c.id, c.shape])
);

// Build countries array with real SVG paths from the package
export const countries: Country[] = Object.entries(countryNames)
  .filter(([code]) => shapesMap.has(code))
  .map(([code, data]) => ({
    id: code,
    name: data.name,
    nameFr: data.nameFr,
    path: shapesMap.get(code) as string,
    funFact: data.funFact,
    capital: data.capital,
  }));

export function getRandomCountries(count: number): Country[] {
  const shuffled = [...countries].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function normalizeAnswer(answer: string): string {
  return answer
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]/g, "")
    .trim();
}

// Calculate Levenshtein distance between two strings
function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;
  const dp: number[][] = [];

  for (let i = 0; i <= m; i++) {
    dp[i] = [i];
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,     // deletion
          dp[i][j - 1] + 1,     // insertion
          dp[i - 1][j - 1] + 1  // substitution
        );
      }
    }
  }

  return dp[m][n];
}

// Calculate similarity ratio (0 to 1)
function similarity(str1: string, str2: string): number {
  if (str1 === str2) return 1;
  if (str1.length === 0 || str2.length === 0) return 0;
  
  const maxLen = Math.max(str1.length, str2.length);
  const distance = levenshteinDistance(str1, str2);
  return 1 - distance / maxLen;
}

export function checkAnswer(answer: string, country: Country): boolean {
  const normalizedAnswer = normalizeAnswer(answer);
  const normalizedName = normalizeAnswer(country.name);
  const normalizedNameFr = normalizeAnswer(country.nameFr);

  // Exact match
  if (
    normalizedAnswer === normalizedName ||
    normalizedAnswer === normalizedNameFr
  ) {
    return true;
  }

  // Partial match (at least 4 characters and matches)
  if (normalizedAnswer.length >= 4) {
    if (
      normalizedName.startsWith(normalizedAnswer) ||
      normalizedNameFr.startsWith(normalizedAnswer)
    ) {
      return true;
    }
    if (
      normalizedAnswer.startsWith(normalizedName) ||
      normalizedAnswer.startsWith(normalizedNameFr)
    ) {
      return true;
    }
  }

  // Fuzzy matching with Levenshtein distance
  // More lenient thresholds for better typo tolerance
  const similarityEn = similarity(normalizedAnswer, normalizedName);
  const similarityFr = similarity(normalizedAnswer, normalizedNameFr);
  
  // More lenient thresholds based on answer length
  // Longer answers: 0.75 (was 0.85), shorter: 0.65 (was 0.75)
  // This allows for more typos while still being accurate
  let threshold: number;
  if (normalizedAnswer.length >= 8) {
    threshold = 0.75; // Very lenient for long answers
  } else if (normalizedAnswer.length >= 5) {
    threshold = 0.70; // Lenient for medium answers
  } else if (normalizedAnswer.length >= 4) {
    threshold = 0.65; // More lenient for short answers
  } else {
    threshold = 0.60; // Very lenient for very short answers
  }
  
  if (similarityEn >= threshold || similarityFr >= threshold) {
    return true;
  }

  return false;
}
