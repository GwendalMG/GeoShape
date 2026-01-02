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
  FR: { name: "France", nameFr: "France", capital: "Paris", funFact: "Avec plus de 89 millions de touristes par an, c'est le pays le plus visité au monde !" },
  IT: { name: "Italy", nameFr: "Italie", capital: "Rome", funFact: "Plus de 50 sites classés au patrimoine mondial de l'UNESCO, un record mondial !" },
  DE: { name: "Germany", nameFr: "Allemagne", capital: "Berlin", funFact: "Plus de 20 000 châteaux recensés, dont le célèbre Neuschwanstein qui a inspiré Disney !" },
  ES: { name: "Spain", nameFr: "Espagne", capital: "Madrid", funFact: "La Tomatina : un festival où 150 000 tomates sont lancées chaque année par les participants !" },
  GB: { name: "United Kingdom", nameFr: "Royaume-Uni", capital: "Londres", funFact: "Big Ben n'est pas le nom de la tour mais de la cloche de 13,5 tonnes à l'intérieur !" },
  PT: { name: "Portugal", nameFr: "Portugal", capital: "Lisbonne", funFact: "Le passeport a été inventé ici en 1414, c'est le plus vieux système de passeport au monde !" },
  GR: { name: "Greece", nameFr: "Grèce", capital: "Athènes", funFact: "Plus de 6 000 îles composent ce territoire, mais seulement 227 sont habitées !" },
  SE: { name: "Sweden", nameFr: "Suède", capital: "Stockholm", funFact: "Aucune guerre depuis 1814, soit plus de 200 ans de paix !" },
  NO: { name: "Norway", nameFr: "Norvège", capital: "Oslo", funFact: "Les prisonniers peuvent voter et ont accès à des cellules avec TV et salle de bain !" },
  FI: { name: "Finland", nameFr: "Finlande", capital: "Helsinki", funFact: "Plus de 3 millions de saunas pour 5,5 millions d'habitants, soit presque 1 sauna par foyer !" },
  PL: { name: "Poland", nameFr: "Pologne", capital: "Varsovie", funFact: "Marie Curie, née ici, est la seule personne à avoir gagné un Nobel dans deux sciences différentes !" },
  NL: { name: "Netherlands", nameFr: "Pays-Bas", capital: "Amsterdam", funFact: "Plus de vélos (22,9 millions) que d'habitants (17,4 millions) !" },
  BE: { name: "Belgium", nameFr: "Belgique", capital: "Bruxelles", funFact: "220 000 tonnes de chocolat produites par an, soit 22 kg par personne !" },
  CH: { name: "Switzerland", nameFr: "Suisse", capital: "Berne", funFact: "Assez de bunkers pour abriter 114% de la population en cas de guerre !" },
  AT: { name: "Austria", nameFr: "Autriche", capital: "Vienne", funFact: "Le plus ancien zoo du monde, le Tiergarten Schönbrunn, ouvert en 1752 !" },
  IE: { name: "Ireland", nameFr: "Irlande", capital: "Dublin", funFact: "Aucun serpent n'a jamais vécu ici - la légende dit que Saint Patrick les a chassés !" },
  DK: { name: "Denmark", nameFr: "Danemark", capital: "Copenhague", funFact: "Le drapeau national le plus ancien encore utilisé, depuis 1219 !" },
  CZ: { name: "Czechia", nameFr: "Tchéquie", capital: "Prague", funFact: "Consommation record de bière : 142 litres par personne par an !" },
  HU: { name: "Hungary", nameFr: "Hongrie", capital: "Budapest", funFact: "Le Rubik's Cube a été inventé ici par Ernő Rubik en 1974 !" },
  RO: { name: "Romania", nameFr: "Roumanie", capital: "Bucarest", funFact: "Le château de Bran est associé au comte Dracula de Bram Stoker !" },
  BG: { name: "Bulgaria", nameFr: "Bulgarie", capital: "Sofia", funFact: "Ici, hocher la tête signifie 'non' et secouer la tête signifie 'oui' !" },
  HR: { name: "Croatia", nameFr: "Croatie", capital: "Zagreb", funFact: "La cravate a été inventée ici - le mot vient de 'Croate' !" },
  RS: { name: "Serbia", nameFr: "Serbie", capital: "Belgrade", funFact: "Nikola Tesla, inventeur du courant alternatif, était d'origine serbe !" },
  SK: { name: "Slovakia", nameFr: "Slovaquie", capital: "Bratislava", funFact: "Plus de châteaux et manoirs par habitant que n'importe quel autre pays !" },
  UA: { name: "Ukraine", nameFr: "Ukraine", capital: "Kiev", funFact: "Le plus grand pays entièrement situé en Europe avec 603 628 km² !" },
  BY: { name: "Belarus", nameFr: "Biélorussie", capital: "Minsk", funFact: "Abrite la plus ancienne forêt primaire d'Europe, Białowieża, vieille de 8000 ans !" },
  LT: { name: "Lithuania", nameFr: "Lituanie", capital: "Vilnius", funFact: "Le taux de montgolfières par habitant le plus élevé au monde !" },
  LV: { name: "Latvia", nameFr: "Lettonie", capital: "Riga", funFact: "La capitale possède la plus grande collection d'Art Nouveau au monde avec plus de 800 bâtiments !" },
  EE: { name: "Estonia", nameFr: "Estonie", capital: "Tallinn", funFact: "Skype a été créé ici en 2003, révolutionnant les communications !" },
  IS: { name: "Iceland", nameFr: "Islande", capital: "Reykjavik", funFact: "Aucune armée depuis 1869, c'est le pays le plus pacifique au monde !" },
  AL: { name: "Albania", nameFr: "Albanie", capital: "Tirana", funFact: "Plus de 750 000 bunkers construits pendant la guerre froide, soit 1 pour 4 habitants !" },
  MK: { name: "North Macedonia", nameFr: "Macédoine du Nord", capital: "Skopje", funFact: "Mère Teresa est née dans la capitale en 1910 !" },
  SI: { name: "Slovenia", nameFr: "Slovénie", capital: "Ljubljana", funFact: "60% du territoire est couvert de forêts, l'un des taux les plus élevés d'Europe !" },
  BA: { name: "Bosnia and Herzegovina", nameFr: "Bosnie-Herzégovine", capital: "Sarajevo", funFact: "Le tunnel de l'espoir faisait 800 mètres sous l'aéroport pendant le siège !" },
  ME: { name: "Montenegro", nameFr: "Monténégro", capital: "Podgorica", funFact: "Le nom signifie 'Montagne Noire' en italien vénitien !" },
  MD: { name: "Moldova", nameFr: "Moldavie", capital: "Chișinău", funFact: "La plus grande cave à vin du monde : 200 km de galeries souterraines !" },
  
  // Asie
  JP: { name: "Japan", nameFr: "Japon", capital: "Tokyo", funFact: "Plus de 5,5 millions de distributeurs automatiques, soit 1 pour 23 personnes, un record mondial !" },
  CN: { name: "China", nameFr: "Chine", capital: "Pékin", funFact: "La Grande Muraille mesure 21 196 km, soit plus de la moitié du tour de la Terre (40 075 km) !" },
  IN: { name: "India", nameFr: "Inde", capital: "New Delhi", funFact: "Plus de 1,4 milliard d'habitants et 22 langues officielles reconnues par la constitution !" },
  KR: { name: "South Korea", nameFr: "Corée du Sud", capital: "Séoul", funFact: "Selon le calendrier traditionnel, les nouveau-nés ont 1 an dès la naissance !" },
  TH: { name: "Thailand", nameFr: "Thaïlande", capital: "Bangkok", funFact: "Le vrai nom de la capitale compte 168 lettres, le nom de capitale le plus long au monde !" },
  VN: { name: "Vietnam", nameFr: "Vietnam", capital: "Hanoï", funFact: "2e plus grand exportateur de café au monde, avec 1,8 million de tonnes par an !" },
  ID: { name: "Indonesia", nameFr: "Indonésie", capital: "Jakarta", funFact: "17 508 îles composent ce territoire, le plus grand archipel du monde !" },
  PH: { name: "Philippines", nameFr: "Philippines", capital: "Manille", funFact: "Nommé d'après le roi Philippe II d'Espagne en 1543 par l'explorateur Ruy López de Villalobos !" },
  MY: { name: "Malaysia", nameFr: "Malaisie", capital: "Kuala Lumpur", funFact: "Les tours Petronas de 452 mètres étaient les plus hautes du monde de 1998 à 2004 !" },
  SG: { name: "Singapore", nameFr: "Singapour", capital: "Singapour", funFact: "Il est illégal de vendre ou mâcher du chewing-gum depuis 1992, sauf usage médical !" },
  PK: { name: "Pakistan", nameFr: "Pakistan", capital: "Islamabad", funFact: "Le K2, 2e plus haute montagne du monde, culmine à 8 611 mètres d'altitude !" },
  BD: { name: "Bangladesh", nameFr: "Bangladesh", capital: "Dacca", funFact: "Produit 5% des vêtements vendus dans le monde, employant 4 millions de personnes !" },
  IR: { name: "Iran", nameFr: "Iran", capital: "Téhéran", funFact: "Le backgammon, le polo et les échecs persans ont été inventés ici il y a plus de 3000 ans !" },
  IQ: { name: "Iraq", nameFr: "Irak", capital: "Bagdad", funFact: "Berceau de l'écriture il y a 5000 ans dans l'ancienne Mésopotamie, entre le Tigre et l'Euphrate !" },
  SA: { name: "Saudi Arabia", nameFr: "Arabie Saoudite", capital: "Riyad", funFact: "Aucun fleuve permanent sur le territoire, seulement des oueds temporaires !" },
  AE: { name: "United Arab Emirates", nameFr: "Émirats Arabes Unis", capital: "Abou Dabi", funFact: "Le plus grand centre commercial du monde avec 1200 boutiques sur 1,1 million de m² !" },
  TR: { name: "Turkey", nameFr: "Turquie", capital: "Ankara", funFact: "Istanbul est la seule ville au monde à cheval sur deux continents : l'Europe et l'Asie !" },
  IL: { name: "Israel", nameFr: "Israël", capital: "Jérusalem", funFact: "Le seul pays au monde où le nombre d'arbres a augmenté au 20e siècle, passant de 2% à 8% de couverture !" },
  KZ: { name: "Kazakhstan", nameFr: "Kazakhstan", capital: "Astana", funFact: "Le plus grand pays enclavé du monde avec 2,7 millions de km², sans accès à la mer !" },
  UZ: { name: "Uzbekistan", nameFr: "Ouzbékistan", capital: "Tachkent", funFact: "Samarkand est l'une des plus anciennes villes habitées au monde, fondée il y a 2700 ans !" },
  AF: { name: "Afghanistan", nameFr: "Afghanistan", capital: "Kaboul", funFact: "Le buzkashi, sport national, se joue à cheval avec une carcasse de chèvre de 50 kg !" },
  NP: { name: "Nepal", nameFr: "Népal", capital: "Katmandou", funFact: "8 des 14 sommets de plus de 8000 mètres se trouvent ici, dont l'Everest (8 848 m) !" },
  LK: { name: "Sri Lanka", nameFr: "Sri Lanka", capital: "Colombo", funFact: "Plus grand exportateur de thé au monde avec 340 000 tonnes par an !" },
  MM: { name: "Myanmar", nameFr: "Myanmar", capital: "Naypyidaw", funFact: "Plus de 10 000 temples bouddhistes à Bagan, construits entre le 11e et 13e siècle !" },
  KH: { name: "Cambodia", nameFr: "Cambodge", capital: "Phnom Penh", funFact: "Angkor Wat est le plus grand monument religieux du monde, s'étendant sur 162 hectares !" },
  LA: { name: "Laos", nameFr: "Laos", capital: "Vientiane", funFact: "Le pays le plus bombardé de l'histoire par habitant : 2 millions de tonnes de bombes pendant la guerre du Vietnam !" },
  MN: { name: "Mongolia", nameFr: "Mongolie", capital: "Oulan-Bator", funFact: "Le pays le moins densément peuplé : seulement 2 habitants par km² sur 1,5 million de km² !" },
  
  // Océanie
  AU: { name: "Australia", nameFr: "Australie", capital: "Canberra", funFact: "Plus large que la Lune : 4000 km de largeur contre 3400 km de diamètre pour la Lune !" },
  NZ: { name: "New Zealand", nameFr: "Nouvelle-Zélande", capital: "Wellington", funFact: "10 moutons pour chaque habitant, soit 5 millions d'habitants pour 50 millions de moutons !" },
  PG: { name: "Papua New Guinea", nameFr: "Papouasie-Nouvelle-Guinée", capital: "Port Moresby", funFact: "Plus de 800 langues différentes sont parlées, soit 12% des langues du monde !" },
  FJ: { name: "Fiji", nameFr: "Fidji", capital: "Suva", funFact: "333 îles composent cet archipel, mais seulement 110 sont habitées par 900 000 personnes !" },
  
  // Amérique du Nord
  US: { name: "United States", nameFr: "États-Unis", capital: "Washington", funFact: "L'Alaska a été acheté à la Russie en 1867 pour 7,2 millions de dollars, soit 2 cents l'hectare !" },
  CA: { name: "Canada", nameFr: "Canada", capital: "Ottawa", funFact: "Plus de 2 millions de lacs, soit 20% des réserves d'eau douce de la planète !" },
  MX: { name: "Mexico", nameFr: "Mexique", capital: "Mexico", funFact: "Le chocolat, le piment et la vanille ont été introduits dans le monde depuis ce territoire !" },
  GT: { name: "Guatemala", nameFr: "Guatemala", capital: "Guatemala", funFact: "La barre chocolatée a été inventée ici au 19e siècle par les Mayas !" },
  HN: { name: "Honduras", nameFr: "Honduras", capital: "Tegucigalpa", funFact: "La 2e plus grande barrière de corail au monde s'étend sur 1000 km de côtes !" },
  NI: { name: "Nicaragua", nameFr: "Nicaragua", capital: "Managua", funFact: "Le seul pays d'Amérique avec des lacs contenant des requins d'eau douce, le lac Nicaragua !" },
  CR: { name: "Costa Rica", nameFr: "Costa Rica", capital: "San José", funFact: "5% de la biodiversité mondiale sur seulement 0,03% de la surface terrestre, soit 500 000 espèces !" },
  PA: { name: "Panama", nameFr: "Panama", capital: "Panama", funFact: "Le canal a économisé 15 000 km aux navires depuis 1914, évitant le passage du Cap Horn !" },
  CU: { name: "Cuba", nameFr: "Cuba", capital: "La Havane", funFact: "Le seul pays où 60 000 voitures américaines des années 50 roulent encore quotidiennement !" },
  JM: { name: "Jamaica", nameFr: "Jamaïque", capital: "Kingston", funFact: "Usain Bolt, détenteur du record du 100m (9,58s), est né ici !" },
  HT: { name: "Haiti", nameFr: "Haïti", capital: "Port-au-Prince", funFact: "Premier pays à abolir l'esclavage en 1804, après la seule révolte d'esclaves réussie de l'histoire !" },
  DO: { name: "Dominican Republic", nameFr: "République Dominicaine", capital: "Saint-Domingue", funFact: "Le plus haut sommet des Caraïbes culmine à 3098 mètres : le Pico Duarte !" },
  
  // Amérique du Sud
  BR: { name: "Brazil", nameFr: "Brésil", capital: "Brasília", funFact: "Le seul pays d'Amérique du Sud où l'on parle portugais, avec 215 millions d'habitants !" },
  AR: { name: "Argentina", nameFr: "Argentine", capital: "Buenos Aires", funFact: "La rue la plus large du monde : l'Avenida 9 de Julio fait 140 mètres de large avec 14 voies !" },
  CL: { name: "Chile", nameFr: "Chili", capital: "Santiago", funFact: "S'étend sur 4 300 km du nord au sud, mais seulement 177 km d'est en ouest, comme un long ruban !" },
  CO: { name: "Colombia", nameFr: "Colombie", capital: "Bogota", funFact: "2e pays le plus biodiversifié au monde avec 10% de la biodiversité mondiale sur 0,7% de la surface terrestre !" },
  PE: { name: "Peru", nameFr: "Pérou", capital: "Lima", funFact: "Le Machu Picchu a été construit au 15e siècle sans utiliser de roue ni de fer, à 2430 m d'altitude !" },
  VE: { name: "Venezuela", nameFr: "Venezuela", capital: "Caracas", funFact: "La plus haute chute d'eau du monde : Salto Ángel culmine à 979 mètres, 15 fois plus haut que les chutes du Niagara !" },
  EC: { name: "Ecuador", nameFr: "Équateur", capital: "Quito", funFact: "Nommé d'après la ligne de l'équateur qui traverse le pays, situé à 0° de latitude !" },
  BO: { name: "Bolivia", nameFr: "Bolivie", capital: "La Paz", funFact: "La capitale la plus haute du monde à 3640 mètres d'altitude, dans les Andes !" },
  PY: { name: "Paraguay", nameFr: "Paraguay", capital: "Asuncion", funFact: "100% de l'électricité provient de l'hydroélectricité grâce au barrage d'Itaipú !" },
  UY: { name: "Uruguay", nameFr: "Uruguay", capital: "Montevideo", funFact: "A remporté la première Coupe du Monde de football en 1930, organisée dans la capitale !" },
  GY: { name: "Guyana", nameFr: "Guyana", capital: "Georgetown", funFact: "Le seul pays d'Amérique du Sud où l'anglais est la langue officielle, héritage colonial !" },
  SR: { name: "Suriname", nameFr: "Suriname", capital: "Paramaribo", funFact: "93% du territoire est couvert de forêt tropicale, le taux de couverture forestière le plus élevé au monde !" },
  
  // Afrique
  EG: { name: "Egypt", nameFr: "Égypte", capital: "Le Caire", funFact: "La Grande Pyramide de Gizeh était la plus haute structure du monde pendant 3 800 ans, jusqu'en 1311 !" },
  ZA: { name: "South Africa", nameFr: "Afrique du Sud", capital: "Pretoria", funFact: "11 langues officielles reconnues, dont le zoulou, l'afrikaans et l'anglais !" },
  MA: { name: "Morocco", nameFr: "Maroc", capital: "Rabat", funFact: "La plus ancienne université du monde encore en activité : l'Université Al Quaraouiyine, fondée en 859 !" },
  DZ: { name: "Algeria", nameFr: "Algérie", capital: "Alger", funFact: "Le plus grand pays d'Afrique avec 2,38 millions de km², soit 4 fois la France !" },
  TN: { name: "Tunisia", nameFr: "Tunisie", capital: "Tunis", funFact: "Carthage était une superpuissance rivale de Rome il y a 2200 ans, détruite en 146 av. J.-C. !" },
  NG: { name: "Nigeria", nameFr: "Nigeria", capital: "Abuja", funFact: "Le pays le plus peuplé d'Afrique avec plus de 220 millions d'habitants, soit 1 Africain sur 6 !" },
  KE: { name: "Kenya", nameFr: "Kenya", capital: "Nairobi", funFact: "Berceau des coureurs de fond : 80% des médailles olympiques en course longue distance depuis 1980 !" },
  ET: { name: "Ethiopia", nameFr: "Éthiopie", capital: "Addis-Abeba", funFact: "Le seul pays africain à n'avoir jamais été colonisé, résistant à l'invasion italienne en 1896 !" },
  GH: { name: "Ghana", nameFr: "Ghana", capital: "Accra", funFact: "2e plus grand producteur de cacao au monde avec 800 000 tonnes par an, après la Côte d'Ivoire !" },
  TZ: { name: "Tanzania", nameFr: "Tanzanie", capital: "Dodoma", funFact: "Le plus haut sommet d'Afrique culmine à 5895 mètres : le Kilimandjaro, volcan endormi !" },
  UG: { name: "Uganda", nameFr: "Ouganda", capital: "Kampala", funFact: "Abrite la moitié des gorilles de montagne encore vivants, soit environ 400 individus !" },
  CI: { name: "Ivory Coast", nameFr: "Côte d'Ivoire", capital: "Yamoussoukro", funFact: "Plus grand producteur de cacao au monde avec 40% de la production mondiale, soit 2 millions de tonnes !" },
  CM: { name: "Cameroon", nameFr: "Cameroun", capital: "Yaoundé", funFact: "Surnommé 'l'Afrique en miniature' pour sa diversité : désert, savane, forêt tropicale et montagnes !" },
  SN: { name: "Senegal", nameFr: "Sénégal", capital: "Dakar", funFact: "Le rallye Paris-Dakar s'est terminé ici pendant 30 ans, de 1979 à 2008 !" },
  MG: { name: "Madagascar", nameFr: "Madagascar", capital: "Antananarivo", funFact: "90% des espèces animales et végétales n'existent nulle part ailleurs, dont 100 espèces de lémuriens !" },
  AO: { name: "Angola", nameFr: "Angola", capital: "Luanda", funFact: "2e plus grand producteur de pétrole d'Afrique avec 1,4 million de barils par jour !" },
  MZ: { name: "Mozambique", nameFr: "Mozambique", capital: "Maputo", funFact: "Le seul pays dont le nom contient toutes les voyelles : a, e, i, o, u !" },
  ZW: { name: "Zimbabwe", nameFr: "Zimbabwe", capital: "Harare", funFact: "Les chutes Victoria sont 2 fois plus hautes que les chutes du Niagara : 108 mètres de hauteur !" },
  BW: { name: "Botswana", nameFr: "Botswana", capital: "Gaborone", funFact: "Abrite le plus grand nombre d'éléphants d'Afrique avec 130 000 individus, soit 1/3 de la population mondiale !" },
  NA: { name: "Namibia", nameFr: "Namibie", capital: "Windhoek", funFact: "Le désert du Namib est le plus ancien désert du monde, formé il y a 55 millions d'années !" },
  ZM: { name: "Zambia", nameFr: "Zambie", capital: "Lusaka", funFact: "Les chutes Victoria créent un arc-en-ciel permanent visible à 40 km de distance !" },
  RW: { name: "Rwanda", nameFr: "Rwanda", capital: "Kigali", funFact: "Le pays le plus propre d'Afrique grâce à l'interdiction des sacs plastiques depuis 2008 !" },
  ML: { name: "Mali", nameFr: "Mali", capital: "Bamako", funFact: "Tombouctou était un centre intellectuel majeur au 15e siècle avec 180 écoles coraniques et 25 000 étudiants !" },
  NE: { name: "Niger", nameFr: "Niger", capital: "Niamey", funFact: "Le taux de natalité le plus élevé au monde : 7 enfants par femme en moyenne !" },
  TD: { name: "Chad", nameFr: "Tchad", capital: "N'Djamena", funFact: "Le lac Tchad a perdu 90% de sa superficie en 50 ans, passant de 25 000 km² à 2 500 km² !" },
  SO: { name: "Somalia", nameFr: "Somalie", capital: "Mogadiscio", funFact: "La plus longue côte d'Afrique continentale s'étend sur 3 025 km le long de l'océan Indien !" },
  LY: { name: "Libya", nameFr: "Libye", capital: "Tripoli", funFact: "Composé à 90% de désert du Sahara, avec seulement 1% de terres arables !" },
  SD: { name: "Sudan", nameFr: "Soudan", capital: "Khartoum", funFact: "Plus de pyramides que l'Égypte : 255 pyramides contre 138, construites par les rois de Kouch !" },
  MW: { name: "Malawi", nameFr: "Malawi", capital: "Lilongwe", funFact: "Le lac Malawi contient plus de 1000 espèces de poissons, plus que tous les lacs d'Europe réunis !" },
  CD: { name: "Democratic Republic of the Congo", nameFr: "République Démocratique du Congo", capital: "Kinshasa", funFact: "Le fleuve Congo est le 2e plus grand au monde avec 4700 km, après l'Amazone !" },
  CG: { name: "Republic of the Congo", nameFr: "République du Congo", capital: "Brazzaville", funFact: "Abrite une forêt tropicale avec 400 espèces de mammifères, dont gorilles et éléphants de forêt !" },
  GA: { name: "Gabon", nameFr: "Gabon", capital: "Libreville", funFact: "88% du territoire est couvert de forêt tropicale, soit 22 millions d'hectares !" },
  CF: { name: "Central African Republic", nameFr: "République Centrafricaine", capital: "Bangui", funFact: "Située au centre géographique exact de l'Afrique, à l'intersection des lignes médianes !" },
  BF: { name: "Burkina Faso", nameFr: "Burkina Faso", capital: "Ouagadougou", funFact: "Le nom signifie 'pays des hommes intègres' en mooré et dioula, langues locales !" },
  BJ: { name: "Benin", nameFr: "Bénin", capital: "Porto-Novo", funFact: "Le vaudou est une religion officielle avec 4 millions de pratiquants, soit 40% de la population !" },
  TG: { name: "Togo", nameFr: "Togo", capital: "Lomé", funFact: "L'un des plus petits pays d'Afrique avec seulement 56 785 km², soit la taille de la Croatie !" },
  MR: { name: "Mauritania", nameFr: "Mauritanie", capital: "Nouakchott", funFact: "L'un des derniers pays à avoir aboli l'esclavage en 1981, soit 116 ans après les États-Unis !" },
  GN: { name: "Guinea", nameFr: "Guinée", capital: "Conakry", funFact: "Possède les plus grandes réserves de bauxite au monde avec 7,4 milliards de tonnes, soit 25% des réserves mondiales !" },
  SL: { name: "Sierra Leone", nameFr: "Sierra Leone", capital: "Freetown", funFact: "Le diamant le plus pur jamais trouvé (969,8 carats) provient d'ici : l'Étoile de Sierra Leone !" },
  LR: { name: "Liberia", nameFr: "Liberia", capital: "Monrovia", funFact: "Fondé par d'anciens esclaves américains en 1847, nommé d'après la liberté (liberty) !" },
  SS: { name: "South Sudan", nameFr: "Soudan du Sud", capital: "Djouba", funFact: "Le plus jeune pays du monde, indépendant depuis 2011 après un référendum avec 98,83% de oui !" },
  ER: { name: "Eritrea", nameFr: "Érythrée", capital: "Asmara", funFact: "La capitale est entièrement Art Déco avec 400 bâtiments classés au patrimoine de l'UNESCO !" },
  DJ: { name: "Djibouti", nameFr: "Djibouti", capital: "Djibouti", funFact: "Le lac Assal est le point le plus bas d'Afrique à -155 mètres sous le niveau de la mer !" },
  
  // Russie
  RU: { name: "Russia", nameFr: "Russie", capital: "Moscou", funFact: "S'étend sur 11 fuseaux horaires et 17,1 millions de km², le plus grand pays du monde !" },
  GE: { name: "Georgia", nameFr: "Géorgie", capital: "Tbilissi", funFact: "Considéré comme le berceau du vin avec 8000 ans de tradition viticole, le plus ancien au monde !" },
  AM: { name: "Armenia", nameFr: "Arménie", capital: "Erevan", funFact: "Premier pays à adopter le christianisme comme religion d'État en 301, avant l'Empire romain !" },
  AZ: { name: "Azerbaijan", nameFr: "Azerbaïdjan", capital: "Bakou", funFact: "La capitale est connue comme 'la ville des vents' avec des vents violents jusqu'à 40 m/s !" },
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
  // Accept if similarity is >= 0.85 (allows for small typos)
  const similarityEn = similarity(normalizedAnswer, normalizedName);
  const similarityFr = similarity(normalizedAnswer, normalizedNameFr);
  
  // For longer answers (>= 5 chars), use 0.85 threshold
  // For shorter answers (4 chars), use 0.75 threshold (more lenient)
  const threshold = normalizedAnswer.length >= 5 ? 0.85 : 0.75;
  
  if (similarityEn >= threshold || similarityFr >= threshold) {
    return true;
  }

  return false;
}
