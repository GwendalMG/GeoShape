import countryShapes from "world-map-country-shapes";

export interface Country {
  id: string;
  name: string;
  nameFr: string;
  path: string;
  funFact: string;
  difficulty: 'TRES_FACILE' | 'FACILE' | 'DIFFICILE';
}

// Mapping of country codes to French names and fun facts
const countryNames: Record<string, { name: string; nameFr: string; funFact: string; capital: string; difficulty: 'TRES_FACILE' | 'FACILE' | 'DIFFICILE' }> = {
  // Europe
  FR: { name: "France", nameFr: "France", capital: "Paris", funFact: "Ce territoire hexagonal abrite la plus haute montagne d'Europe occidentale et compte plus de 400 variétés de fromages." , difficulty: "TRES_FACILE" },
  IT: { name: "Italy", nameFr: "Italie", capital: "Rome", funFact: "Cette botte célèbre possède plus de sites UNESCO que tout autre pays au monde." , difficulty: "FACILE" },
  DE: { name: "Germany", nameFr: "Allemagne", capital: "Berlin", funFact: "Neuf pays sont ses voisins, ce qui en fait le pays européen avec le plus de frontières terrestres." , difficulty: "TRES_FACILE" },
  ES: { name: "Spain", nameFr: "Espagne", capital: "Madrid", funFact: "Sa superficie inclut des îles volcaniques au large de l'Afrique et une enclave en terre africaine." , difficulty: "TRES_FACILE" },
  GB: { name: "United Kingdom", nameFr: "Royaume-Uni", capital: "Londres", funFact: "Cet archipel insulaire possède plus de 6 000 îles dont seulement 138 sont habitées." , difficulty: "FACILE" },
  PT: { name: "Portugal", nameFr: "Portugal", capital: "Lisbonne", funFact: "Le point le plus occidental du continent européen se trouve sur son territoire." , difficulty: "FACILE" },
  GR: { name: "Greece", nameFr: "Grèce", capital: "Athènes", funFact: "Plus de 6 000 îles et îlots composent ce territoire, mais seulement 227 sont habités." , difficulty: "TRES_FACILE" },
  SE: { name: "Sweden", nameFr: "Suède", capital: "Stockholm", funFact: "Ce territoire s'étire sur plus de 1 500 km du nord au sud et compte environ 100 000 lacs." , difficulty: "FACILE" },
  NO: { name: "Norway", nameFr: "Norvège", capital: "Oslo", funFact: "Son littoral déchiqueté est le deuxième plus long du monde après le Canada, avec plus de 100 000 km." , difficulty: "FACILE" },
  FI: { name: "Finland", nameFr: "Finlande", capital: "Helsinki", funFact: "Surnommé le pays aux mille lacs, il en compte en réalité plus de 188 000." , difficulty: "FACILE" },
  PL: { name: "Poland", nameFr: "Pologne", capital: "Varsovie", funFact: "Presque entièrement plat, 75% de son territoire se situe à moins de 200 mètres d'altitude." , difficulty: "FACILE" },
  NL: { name: "Netherlands", nameFr: "Pays-Bas", capital: "Amsterdam", funFact: "Plus de 25% de son territoire se trouve sous le niveau de la mer, protégé par des digues." , difficulty: "TRES_FACILE" },
  BE: { name: "Belgium", nameFr: "Belgique", capital: "Bruxelles", funFact: "Ce petit territoire a trois langues officielles et est bordé par quatre pays." , difficulty: "FACILE" },
  CH: { name: "Switzerland", nameFr: "Suisse", capital: "Berne", funFact: "Sans accès à la mer, ce territoire montagneux est traversé par le plus long tunnel ferroviaire du monde." , difficulty: "FACILE" },
  AT: { name: "Austria", nameFr: "Autriche", capital: "Vienne", funFact: "Les Alpes couvrent 62% de ce territoire enclavé au cœur de l'Europe." , difficulty: "FACILE" },
  IE: { name: "Ireland", nameFr: "Irlande", capital: "Dublin", funFact: "Cette île verte compte plus de moutons que d'habitants." , difficulty: "TRES_FACILE" },
  DK: { name: "Denmark", nameFr: "Danemark", capital: "Copenhague", funFact: "Ce royaume scandinave est composé d'une péninsule et de plus de 400 îles." , difficulty: "FACILE" },
  CZ: { name: "Czechia", nameFr: "République tchèque", capital: "Prague", funFact: "Entièrement enclavé, ce territoire est traversé par deux grands fleuves européens." , difficulty: "FACILE" },
  HU: { name: "Hungary", nameFr: "Hongrie", capital: "Budapest", funFact: "Le plus grand lac thermal naturel d'Europe se trouve dans ce territoire sans littoral." , difficulty: "FACILE" },
  RO: { name: "Romania", nameFr: "Roumanie", capital: "Bucarest", funFact: "Les Carpates forment un grand arc au centre de ce territoire qui borde la mer Noire." , difficulty: "FACILE" },
  BG: { name: "Bulgaria", nameFr: "Bulgarie", capital: "Sofia", funFact: "Bordant la mer Noire, ce territoire est traversé par le massif des Balkans d'ouest en est." , difficulty: "FACILE" },
  HR: { name: "Croatia", nameFr: "Croatie", capital: "Zagreb", funFact: "Sa côte adriatique compte plus de 1 200 îles, dont seulement une cinquantaine sont habitées." , difficulty: "FACILE" },
  RS: { name: "Serbia", nameFr: "Serbie", capital: "Belgrade", funFact: "Ce territoire enclavé se situe au carrefour de l'Europe centrale et du sud-est." , difficulty: "FACILE" },
  SK: { name: "Slovakia", nameFr: "Slovaquie", capital: "Bratislava", funFact: "Les Carpates occupent la majeure partie de ce territoire sans accès à la mer.", difficulty: "DIFFICILE" },
  UA: { name: "Ukraine", nameFr: "Ukraine", capital: "Kiev", funFact: "C'est le plus vaste pays entièrement situé en Europe, avec des steppes fertiles." , difficulty: "TRES_FACILE" },
  BY: { name: "Belarus", nameFr: "Biélorussie", capital: "Minsk", funFact: "Plus de 40% de ce territoire plat est couvert de forêts, dont la plus ancienne d'Europe." , difficulty: "FACILE" },
  LT: { name: "Lithuania", nameFr: "Lituanie", capital: "Vilnius", funFact: "Ce territoire balte possède une petite ouverture maritime sur la mer Baltique.", difficulty: "DIFFICILE" },
  LV: { name: "Latvia", nameFr: "Lettonie", capital: "Riga", funFact: "Les forêts couvrent plus de la moitié de ce territoire balte parsemé de lacs.", difficulty: "DIFFICILE" },
  EE: { name: "Estonia", nameFr: "Estonie", capital: "Tallinn", funFact: "Plus de 2 000 îles composent ce territoire baltique dont la capitale est médiévale." , difficulty: "DIFFICILE" },
  IS: { name: "Iceland", nameFr: "Islande", capital: "Reykjavik", funFact: "Cette île volcanique au climat subpolaire se situe à cheval sur deux plaques tectoniques." , difficulty: "FACILE" },
  AL: { name: "Albania", nameFr: "Albanie", capital: "Tirana", funFact: "Ce petit territoire montagneux possède des côtes sur deux mers différentes." , difficulty: "DIFFICILE" },
  MK: { name: "North Macedonia", nameFr: "Macédoine du Nord", capital: "Skopje", funFact: "Ce territoire enclavé tire son nom d'une région historique antique.", difficulty: "FACILE" },
  SI: { name: "Slovenia", nameFr: "Slovénie", capital: "Ljubljana", funFact: "Malgré sa petite taille, ce territoire possède à la fois des Alpes et un accès à l'Adriatique.", difficulty: "FACILE" },
  BA: { name: "Bosnia and Herzegovina", nameFr: "Bosnie-Herzégovine", capital: "Sarajevo", funFact: "Ce territoire présente une forme presque triangulaire avec un minuscule corridor vers la mer." , difficulty: "DIFFICILE" },
  ME: { name: "Montenegro", nameFr: "Monténégro", capital: "Podgorica", funFact: "Son nom signifie \"montagne noire\", reflétant son relief très accidenté.", difficulty: "FACILE" },
  MD: { name: "Moldova", nameFr: "Moldavie", capital: "Chișinău", funFact: "Enclavé entre deux grands voisins, ce territoire est traversé par un affluent majeur.", difficulty: "FACILE" },
  
  // Asie
  JP: { name: "Japan", nameFr: "Japon", capital: "Tokyo", funFact: "Cet archipel volcanique compte plus de 6 800 îles dont quatre principales." , difficulty: "FACILE" },
  CN: { name: "China", nameFr: "Chine", capital: "Pékin", funFact: "Le troisième plus grand pays du monde possède 14 voisins frontaliers." , difficulty: "FACILE" },
  IN: { name: "India", nameFr: "Inde", capital: "New Delhi", funFact: "Cette immense péninsule triangulaire est bordée par trois mers différentes." , difficulty: "TRES_FACILE" },
  KR: { name: "South Korea", nameFr: "Corée du Sud", capital: "Séoul", funFact: "Cette péninsule montagneuse est entourée par trois mers et séparée en deux." , difficulty: "FACILE" },
  TH: { name: "Thailand", nameFr: "Thaïlande", capital: "Bangkok", funFact: "Sa forme rappelle une tête d'éléphant, avec un corps étiré vers le sud en péninsule." , difficulty: "FACILE" },
  VN: { name: "Vietnam", nameFr: "Vietnam", capital: "Hanoï", funFact: "Ce territoire en forme de S longe la mer sur plus de 3 000 km de côtes." , difficulty: "FACILE" },
  ID: { name: "Indonesia", nameFr: "Indonésie", capital: "Jakarta", funFact: "Le plus grand archipel du monde compte plus de 17 000 îles s'étirant sur trois fuseaux horaires." , difficulty: "FACILE" },
  PH: { name: "Philippines", nameFr: "Philippines", capital: "Manille", funFact: "Plus de 7 600 îles composent cet archipel volcanique du Pacifique." , difficulty: "FACILE" },
  MY: { name: "Malaysia", nameFr: "Malaisie", capital: "Kuala Lumpur", funFact: "Ce territoire est divisé en deux parties séparées par 650 km de mer." , difficulty: "FACILE" },
  SG: { name: "Singapore", nameFr: "Singapour", capital: "Singapour", funFact: "Cette cité-État insulaire est l'un des plus petits pays du monde.", difficulty: "FACILE" },
  PK: { name: "Pakistan", nameFr: "Pakistan", capital: "Islamabad", funFact: "Ce territoire englobe une partie du massif de l'Himalaya au nord." , difficulty: "FACILE" },
  BD: { name: "Bangladesh", nameFr: "Bangladesh", capital: "Dacca", funFact: "L'un des pays les plus densément peuplés au monde, traversé par un immense delta." , difficulty: "FACILE" },
  IR: { name: "Iran", nameFr: "Iran", capital: "Téhéran", funFact: "Ce vaste plateau désertique est encadré par deux chaînes montagneuses majeures." , difficulty: "FACILE" },
  IQ: { name: "Iraq", nameFr: "Irak", capital: "Bagdad", funFact: "Le berceau de la civilisation est traversé par deux fleuves légendaires." , difficulty: "FACILE" },
  SA: { name: "Saudi Arabia", nameFr: "Arabie Saoudite", capital: "Riyad", funFact: "La plus grande partie de la péninsule arabique est occupée par ce territoire désertique." , difficulty: "FACILE" },
  AE: { name: "United Arab Emirates", nameFr: "Émirats Arabes Unis", capital: "Abou Dabi", funFact: "Sept émirats forment cette fédération bordant le golfe Persique." , difficulty: "FACILE" },
  TR: { name: "Turkey", nameFr: "Turquie", capital: "Ankara", funFact: "Ce territoire s'étend sur deux continents, relié par le détroit du Bosphore." , difficulty: "FACILE" },
  IL: { name: "Israel", nameFr: "Israël", capital: "Jérusalem", funFact: "Ce petit territoire étroit borde la mer Méditerranée et le point le plus bas de la Terre.", difficulty: "FACILE" },
  KZ: { name: "Kazakhstan", nameFr: "Kazakhstan", capital: "Astana", funFact: "Le plus grand pays enclavé du monde possède des steppes à perte de vue." , difficulty: "FACILE" },
  UZ: { name: "Uzbekistan", nameFr: "Ouzbékistan", capital: "Tachkent", funFact: "Ce territoire doublement enclavé abrite des déserts et l'ancienne route de la soie.", difficulty: "DIFFICILE" },
  AF: { name: "Afghanistan", nameFr: "Afghanistan", capital: "Kaboul", funFact: "Territoire montagneux et enclavé, surnommé le \"toit du monde\"." , difficulty: "DIFFICILE" },
  NP: { name: "Nepal", nameFr: "Népal", capital: "Katmandou", funFact: "Enclavé dans l'Himalaya, ce territoire abrite 8 des 10 plus hauts sommets du monde." , difficulty: "TRES_FACILE" },
  LK: { name: "Sri Lanka", nameFr: "Sri Lanka", capital: "Colombo", funFact: "Cette île en forme de goutte possède des plages tout autour de son littoral." , difficulty: "FACILE" },
  MM: { name: "Myanmar", nameFr: "Birmanie", capital: "Naypyidaw", funFact: "Ce territoire s'étire du nord au sud sur plus de 2 000 km entre montagnes et mer." , difficulty: "FACILE" },
  KH: { name: "Cambodia", nameFr: "Cambodge", capital: "Phnom Penh", funFact: "Le plus grand lac d'eau douce d'Asie du Sud-Est occupe le centre de ce territoire." , difficulty: "FACILE" },
  LA: { name: "Laos", nameFr: "Laos", capital: "Vientiane", funFact: "Seul pays d'Asie du Sud-Est totalement enclavé, entouré par cinq voisins." , difficulty: "FACILE" },
  MN: { name: "Mongolia", nameFr: "Mongolie", capital: "Oulan-Bator", funFact: "Immense territoire enclavé entre deux géants, couvert de steppes et de désert." , difficulty: "FACILE" },
  
  // Océanie
  AU: { name: "Australia", nameFr: "Australie", capital: "Canberra", funFact: "Le plus grand pays-continent de l'Océanie, également la plus grande île du monde." , difficulty: "TRES_FACILE" },
  NZ: { name: "New Zealand", nameFr: "Nouvelle-Zélande", capital: "Wellington", funFact: "Deux îles principales forment ce territoire isolé aux antipodes de l'Europe." , difficulty: "FACILE" },
  PG: { name: "Papua New Guinea", nameFr: "Papouasie-Nouvelle-Guinée", capital: "Port Moresby", funFact: "Ce territoire occupe la moitié orientale d'une grande île tropicale." , difficulty: "DIFFICILE" },
  FJ: { name: "Fiji", nameFr: "Fidji", capital: "Suva", funFact: "Plus de 300 îles volcaniques et coralliennes composent cet archipel du Pacifique Sud." , difficulty: "FACILE" },
  
  // Amérique du Nord
  US: { name: "United States", nameFr: "États-Unis", capital: "Washington", funFact: "Le quatrième plus grand pays du monde possède deux territoires non-contigus majeurs." , difficulty: "TRES_FACILE" },
  CA: { name: "Canada", nameFr: "Canada", capital: "Ottawa", funFact: "Le deuxième plus grand pays du monde partage la plus longue frontière terrestre avec un seul voisin." , difficulty: "TRES_FACILE" },
  MX: { name: "Mexico", nameFr: "Mexique", capital: "Mexico", funFact: "Ce territoire relie deux continents et sépare deux océans." , difficulty: "FACILE" },
  GT: { name: "Guatemala", nameFr: "Guatemala", capital: "Guatemala", funFact: "Ce territoire montagneux volcanique abrite des vestiges mayas légendaires." , difficulty: "DIFFICILE" },
  HN: { name: "Honduras", nameFr: "Honduras", capital: "Tegucigalpa", funFact: "Bordé par deux océans, ce territoire possède la seule île en forme de cœur des Caraïbes." , difficulty: "FACILE" },
  NI: { name: "Nicaragua", nameFr: "Nicaragua", capital: "Managua", funFact: "Le plus grand pays d'Amérique centrale abrite deux immenses lacs." , difficulty: "DIFFICILE" },
  CR: { name: "Costa Rica", nameFr: "Costa Rica", capital: "San José", funFact: "Malgré sa petite taille, ce territoire possède des côtes sur deux océans." , difficulty: "FACILE" },
  PA: { name: "Panama", nameFr: "Panama", capital: "Panama", funFact: "Le point le plus étroit entre deux continents est traversé par un canal célèbre." , difficulty: "FACILE" },
  CU: { name: "Cuba", nameFr: "Cuba", capital: "La Havane", funFact: "La plus grande île des Caraïbes s'étire sur plus de 1 200 km d'ouest en est." , difficulty: "FACILE" },
  JM: { name: "Jamaica", nameFr: "Jamaïque", capital: "Kingston", funFact: "Cette île montagneuse des Caraïbes est la troisième plus grande des Grandes Antilles." , difficulty: "DIFFICILE" },
  HT: { name: "Haiti", nameFr: "Haïti", capital: "Port-au-Prince", funFact: "Ce territoire occupe le tiers ouest d'une île partagée avec un autre pays." , difficulty: "FACILE" },
  DO: { name: "Dominican Republic", nameFr: "République Dominicaine", capital: "Saint-Domingue", funFact: "Occupant les deux tiers est d'une île, ce territoire possède le point le plus haut des Caraïbes." , difficulty: "DIFFICILE" },
  
  // Amérique du Sud
  BR: { name: "Brazil", nameFr: "Brésil", capital: "Brasília", funFact: "Le cinquième plus grand pays du monde occupe presque la moitié du continent sud-américain." , difficulty: "TRES_FACILE" },
  AR: { name: "Argentina", nameFr: "Argentine", capital: "Buenos Aires", funFact: "Ce territoire s'étire du nord au sud sur plus de 3 700 km jusqu'en Terre de Feu." , difficulty: "FACILE" },
  CL: { name: "Chile", nameFr: "Chili", capital: "Santiago", funFact: "Le pays le plus long et étroit du monde s'étend sur 4 300 km le long du Pacifique." , difficulty: "TRES_FACILE" },
  CO: { name: "Colombia", nameFr: "Colombie", capital: "Bogota", funFact: "Seul pays sud-américain avec des côtes sur deux océans." , difficulty: "FACILE" },
  PE: { name: "Peru", nameFr: "Pérou", capital: "Lima", funFact: "Ce territoire abrite trois régions distinctes: côte, montagne et jungle amazonienne." , difficulty: "FACILE" },
  VE: { name: "Venezuela", nameFr: "Venezuela", capital: "Caracas", funFact: "Les chutes les plus hautes du monde tombent d'un plateau de ce territoire." , difficulty: "DIFFICILE" },
  EC: { name: "Ecuador", nameFr: "Équateur", capital: "Quito", funFact: "Ce territoire traverse son homonyme géographique et possède des îles volcaniques célèbres." , difficulty: "FACILE" },
  BO: { name: "Bolivia", nameFr: "Bolivie", capital: "La Paz", funFact: "L'un des deux pays enclavés du continent abrite le plus grand désert de sel du monde." , difficulty: "DIFFICILE" },
  PY: { name: "Paraguay", nameFr: "Paraguay", capital: "Asuncion", funFact: "Sans accès à la mer, ce territoire est divisé en deux régions par un grand fleuve." , difficulty: "FACILE" },
  UY: { name: "Uruguay", nameFr: "Uruguay", capital: "Montevideo", funFact: "Le plus petit pays hispanophone d'Amérique du Sud est bordé par deux géants." , difficulty: "FACILE" },
  GY: { name: "Guyana", nameFr: "Guyana", capital: "Georgetown", funFact: "Seul pays anglophone d'Amérique du Sud, couvert à 80% par la forêt amazonienne.", difficulty: "FACILE" },
  SR: { name: "Suriname", nameFr: "Suriname", capital: "Paramaribo", funFact: "Le plus petit pays indépendant d'Amérique du Sud est couvert à 90% de forêt tropicale.", difficulty: "DIFFICILE" },
  
  // Afrique
  EG: { name: "Egypt", nameFr: "Égypte", capital: "Le Caire", funFact: "Ce territoire désertique est traversé par le plus long fleuve du monde." , difficulty: "FACILE" },
  ZA: { name: "South Africa", nameFr: "Afrique du Sud", capital: "Pretoria", funFact: "Ce territoire possède trois capitales et entoure complètement un petit royaume montagneux." , difficulty: "TRES_FACILE" },
  MA: { name: "Morocco", nameFr: "Maroc", capital: "Rabat", funFact: "La pointe nord-ouest de l'Afrique se trouve à seulement 14 km de l'Europe." , difficulty: "TRES_FACILE" },
  DZ: { name: "Algeria", nameFr: "Algérie", capital: "Alger", funFact: "Le plus grand pays d'Afrique est couvert à 90% par le Sahara." , difficulty: "TRES_FACILE" },
  TN: { name: "Tunisia", nameFr: "Tunisie", capital: "Tunis", funFact: "Le point le plus septentrional d'Afrique se trouve dans ce territoire méditerranéen." , difficulty: "FACILE" },
  NG: { name: "Nigeria", nameFr: "Nigeria", capital: "Abuja", funFact: "Le pays le plus peuplé d'Afrique est traversé par un grand fleuve éponyme." , difficulty: "FACILE" },
  KE: { name: "Kenya", nameFr: "Kenya", capital: "Nairobi", funFact: "L'équateur traverse ce territoire qui abrite la Great Rift Valley." , difficulty: "FACILE" },
  ET: { name: "Ethiopia", nameFr: "Éthiopie", capital: "Addis-Abeba", funFact: "Seul pays africain jamais colonisé, ce plateau montagneux est le berceau de l'humanité." , difficulty: "FACILE" },
  GH: { name: "Ghana", nameFr: "Ghana", capital: "Accra", funFact: "Ce territoire côtier fut le premier pays d'Afrique subsaharienne à obtenir l'indépendance." , difficulty: "DIFFICILE" },
  TZ: { name: "Tanzania", nameFr: "Tanzanie", capital: "Dodoma", funFact: "Ce territoire abrite le plus haut sommet d'Afrique et les trois plus grands lacs du continent." , difficulty: "FACILE" },
  UG: { name: "Uganda", nameFr: "Ouganda", capital: "Kampala", funFact: "Traversé par l'équateur, ce territoire enclavé possède la source du plus long fleuve du monde." , difficulty: "DIFFICILE" },
  CI: { name: "Ivory Coast", nameFr: "Côte d'Ivoire", capital: "Yamoussoukro", funFact: "Ce territoire en forme de carré possède une lagune côtière spectaculaire." , difficulty: "FACILE" },
  CM: { name: "Cameroon", nameFr: "Cameroun", capital: "Yaoundé", funFact: "Sa forme triangulaire lui vaut le surnom d'\"Afrique en miniature\" pour sa diversité." , difficulty: "DIFFICILE" },
  SN: { name: "Senegal", nameFr: "Sénégal", capital: "Dakar", funFact: "Le point le plus occidental du continent africain se trouve sur ce territoire atlantique." , difficulty: "FACILE" },
  MG: { name: "Madagascar", nameFr: "Madagascar", capital: "Antananarivo", funFact: "La quatrième plus grande île du monde s'est séparée de l'Afrique il y a 165 millions d'années." , difficulty: "FACILE" },
  AO: { name: "Angola", nameFr: "Angola", capital: "Luanda", funFact: "Ce territoire possède une enclave séparée du territoire principal par un corridor." , difficulty: "FACILE" },
  MZ: { name: "Mozambique", nameFr: "Mozambique", capital: "Maputo", funFact: "Ce territoire s'étire sur plus de 2 500 km le long de l'océan Indien." , difficulty: "DIFFICILE" },
  ZW: { name: "Zimbabwe", nameFr: "Zimbabwe", capital: "Harare", funFact: "Ce territoire enclavé abrite les spectaculaires chutes Victoria sur sa frontière." , difficulty: "DIFFICILE" },
  BW: { name: "Botswana", nameFr: "Botswana", capital: "Gaborone", funFact: "Territoire enclavé dont 70% est couvert par le désert du Kalahari." , difficulty: "DIFFICILE" },
  NA: { name: "Namibia", nameFr: "Namibie", capital: "Windhoek", funFact: "Ce territoire désertique possède le plus ancien désert du monde sur sa côte." , difficulty: "FACILE" },
  ZM: { name: "Zambia", nameFr: "Zambie", capital: "Lusaka", funFact: "Sans accès à la mer, ce territoire en forme de papillon possède le plus grand barrage d'Afrique." , difficulty: "DIFFICILE" },
  RW: { name: "Rwanda", nameFr: "Rwanda", capital: "Kigali", funFact: "Surnommé le pays aux mille collines, c'est l'un des plus petits territoires d'Afrique continentale.", difficulty: "DIFFICILE" },
  ML: { name: "Mali", nameFr: "Mali", capital: "Bamako", funFact: "Ce territoire enclavé possède une célèbre cité du désert classée au patrimoine mondial." , difficulty: "FACILE" },
  NE: { name: "Niger", nameFr: "Niger", capital: "Niamey", funFact: "Plus de 80% de ce vaste territoire enclavé est couvert par le Sahara." , difficulty: "FACILE" },
  TD: { name: "Chad", nameFr: "Tchad", capital: "N'Djamena", funFact: "Ce territoire enclavé abrite un lac qui change de taille selon les saisons." , difficulty: "DIFFICILE" },
  SO: { name: "Somalia", nameFr: "Somalie", capital: "Mogadiscio", funFact: "Sa forme en corne caractéristique lui donne son surnom géographique." , difficulty: "FACILE" },
  LY: { name: "Libya", nameFr: "Libye", capital: "Tripoli", funFact: "Le quatrième plus grand pays d'Afrique est le plus désertique au monde." , difficulty: "FACILE" },
  SD: { name: "Sudan", nameFr: "Soudan", capital: "Khartoum", funFact: "Troisième plus grand pays d'Afrique, traversé par le Nil et le désert de Nubie." , difficulty: "FACILE" },
  MW: { name: "Malawi", nameFr: "Malawi", capital: "Lilongwe", funFact: "Ce territoire étroit et enclavé est dominé par un immense lac sur toute sa longueur.", difficulty: "FACILE" },
  CD: { name: "Democratic Republic of the Congo", nameFr: "République Démocratique du Congo", capital: "Kinshasa", funFact: "Le deuxième plus grand pays d'Afrique possède le fleuve le plus profond du monde." , difficulty: "FACILE" },
  CG: { name: "Republic of the Congo", nameFr: "République du Congo", capital: "Brazzaville", funFact: "Ce territoire forestier est traversé par l'équateur et bordé par le grand fleuve éponyme." , difficulty: "DIFFICILE" },
  GA: { name: "Gabon", nameFr: "Gabon", capital: "Libreville", funFact: "Couvert à 85% par la forêt équatoriale, ce territoire s'étend de part et d'autre de l'équateur." , difficulty: "FACILE" },
  CF: { name: "Central African Republic", nameFr: "République Centrafricaine", capital: "Bangui", funFact: "Comme son nom l'indique, ce territoire enclavé se situe au centre du continent.", difficulty: "FACILE" },
  BF: { name: "Burkina Faso", nameFr: "Burkina Faso", capital: "Ouagadougou", funFact: "Ce territoire sahélien enclavé signifie \"pays des hommes intègres\".", difficulty: "DIFFICILE" },
  BJ: { name: "Benin", nameFr: "Bénin", capital: "Porto-Novo", funFact: "Ce territoire étroit s'étire du nord au sud sur 700 km jusqu'au golfe de Guinée.", difficulty: "FACILE" },
  TG: { name: "Togo", nameFr: "Togo", capital: "Lomé", funFact: "L'un des plus petits pays d'Afrique, très étroit, coincé entre deux voisins plus grands.", difficulty: "DIFFICILE" },
  MR: { name: "Mauritania", nameFr: "Mauritanie", capital: "Nouakchott", funFact: "Trois quarts de ce territoire sont couverts par le Sahara occidental." , difficulty: "FACILE" },
  GN: { name: "Guinea", nameFr: "Guinée", capital: "Conakry", funFact: "Surnommée le château d'eau de l'Afrique, plusieurs grands fleuves y prennent leur source." , difficulty: "FACILE" },
  SL: { name: "Sierra Leone", nameFr: "Sierra Leone", capital: "Freetown", funFact: "Ce petit territoire côtier doit son nom à la forme de ses montagnes." , difficulty: "DIFFICILE" },
  LR: { name: "Liberia", nameFr: "Liberia", capital: "Monrovia", funFact: "Seul pays africain fondé par d'anciens esclaves américains, bordant l'Atlantique." , difficulty: "DIFFICILE" },
  SS: { name: "South Sudan", nameFr: "Soudan du Sud", capital: "Djouba", funFact: "Le plus jeune pays du monde (2011) est enclavé au cœur de l'Afrique." , difficulty: "DIFFICILE" },
  ER: { name: "Eritrea", nameFr: "Érythrée", capital: "Asmara", funFact: "Ce territoire possède plus de 350 îles dans la mer Rouge." , difficulty: "FACILE" },
  DJ: { name: "Djibouti", nameFr: "Djibouti", capital: "Djibouti", funFact: "Petit territoire stratégique où trois plaques tectoniques se rencontrent.", difficulty: "DIFFICILE" },
  
  // Russie
  RU: { name: "Russia", nameFr: "Russie", capital: "Moscou", funFact: "Le plus vaste pays du monde s'étend sur deux continents et traverse 11 fuseaux horaires." , difficulty: "TRES_FACILE" },
  GE: { name: "Georgia", nameFr: "Géorgie", capital: "Tbilissi", funFact: "Le Caucase traverse ce territoire situé à la frontière entre Europe et Asie." , difficulty: "FACILE" },
  AM: { name: "Armenia", nameFr: "Arménie", capital: "Erevan", funFact: "Ce territoire montagneux et enclavé abrite le mont biblique légendaire.", difficulty: "FACILE" },
  AZ: { name: "Azerbaijan", nameFr: "Azerbaïdjan", capital: "Bakou", funFact: "Bordant la mer Caspienne, ce territoire possède une exclave séparée du territoire principal." , difficulty: "DIFFICILE" },
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
    difficulty: data.difficulty || 'FACILE', // Default to FACILE if not specified
  }));

// Get difficulty limits based on total rounds
// Augmenter les limites pour avoir plus de pays difficiles
function getDifficultyLimits(totalRounds: number): { min: number; max: number } {
  if (totalRounds <= 10) return { min: 2, max: 4 };
  if (totalRounds <= 20) return { min: 3, max: 6 };
  if (totalRounds <= 30) return { min: 4, max: 8 };
  return { min: 6, max: 12 };
}

export function getRandomCountries(count: number, excludeIds: string[] = []): Country[] {
  if (count <= 0 || countries.length === 0) {
    return [];
  }
  
  // Filter out excluded countries
  let availableCountries = countries.filter(c => !excludeIds.includes(c.id));
  
  // If all countries have been used, reset and allow all countries again
  if (availableCountries.length === 0) {
    availableCountries = countries;
  }
  
  // Separate available countries by difficulty
  const tresFacile = availableCountries.filter(c => c.difficulty === 'TRES_FACILE');
  const facile = availableCountries.filter(c => c.difficulty === 'FACILE');
  const difficile = availableCountries.filter(c => c.difficulty === 'DIFFICILE');
  
  // Safety check: ensure we have countries in each category
  if (tresFacile.length === 0 && facile.length === 0 && difficile.length === 0) {
    // Fallback: just return random countries
    const shuffled = [...availableCountries].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }
  
  // Get difficulty limits for this session
  const limits = getDifficultyLimits(count);
  const numDifficile = Math.floor(Math.random() * (limits.max - limits.min + 1)) + limits.min;
  
  // Calculate distribution: 70% FACILE, 10% TRES_FACILE, 20% DIFFICILE (with limits)
  // Réduire TRES_FACILE et augmenter DIFFICILE
  const targetDifficile = Math.min(numDifficile, Math.floor(count * 0.2), difficile.length);
  const targetTresFacile = Math.min(Math.floor(count * 0.1), tresFacile.length);
  const targetFacile = Math.max(0, count - targetDifficile - targetTresFacile);
  
  // Shuffle each category
  const shuffledTresFacile = [...tresFacile].sort(() => Math.random() - 0.5);
  const shuffledFacile = [...facile].sort(() => Math.random() - 0.5);
  const shuffledDifficile = [...difficile].sort(() => Math.random() - 0.5);
  
  // Select countries from each category
  const selected: Country[] = [];
  if (targetDifficile > 0 && shuffledDifficile.length > 0) {
    selected.push(...shuffledDifficile.slice(0, targetDifficile));
  }
  if (targetTresFacile > 0 && shuffledTresFacile.length > 0) {
    selected.push(...shuffledTresFacile.slice(0, targetTresFacile));
  }
  if (targetFacile > 0 && shuffledFacile.length > 0) {
    selected.push(...shuffledFacile.slice(0, Math.min(targetFacile, shuffledFacile.length)));
  }
  
  // If we don't have enough countries, fill with random ones
  if (selected.length < count) {
    const remaining = count - selected.length;
    const allOther = availableCountries.filter(c => !selected.some(s => s.id === c.id));
    const shuffled = [...allOther].sort(() => Math.random() - 0.5);
    selected.push(...shuffled.slice(0, remaining));
  }
  
  // Shuffle the final selection to mix difficulties
  return selected.sort(() => Math.random() - 0.5).slice(0, count);
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

  // Special handling for Papouasie-Nouvelle-Guinée
  if (country.id === 'PG') {
    const papouasieVariants = [
      'papouasie',
      'nouvelleguinee',
      'nouvelleguinee',
      'papouasienouvelleguinee',
      'papouasienouvelleguinee'
    ];
    const normalized = normalizedAnswer.replace(/[^a-z]/g, '');
    if (papouasieVariants.some(v => normalized.includes(v) || v.includes(normalized))) {
      return true;
    }
    // Also check if it's just "papouasie" or "nouvelleguinee"
    if (normalized === 'papouasie' || normalized === 'nouvelleguinee' || normalized.startsWith('papouasie') || normalized.startsWith('nouvelleguinee')) {
      return true;
    }
  }

  // Special handling for Myanmar/Birmanie
  if (country.id === 'MM') {
    const myanmarVariants = ['myanmar', 'birmanie'];
    const normalized = normalizedAnswer.replace(/[^a-z]/g, '');
    if (myanmarVariants.some(v => normalized === v || normalized.includes(v))) {
      return true;
    }
  }

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
