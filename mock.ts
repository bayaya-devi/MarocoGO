import type { Destination, Experience, Provider, Reservation, Message } from '../types';

const u=(id:string,w=1400)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=82`;
export const destinations:Destination[]=[
 {slug:'marrakech',name:'Marrakech',region:'Marrakech-Safi',tagline:'La ville rouge.',image:u('photo-1597212618440-806262de4f6b'),description:'Jardins, médina, artisanat et lumière ocre : une ville qui se découvre par contrastes.',tags:['Culture','Gastronomie','Médina']},
 {slug:'fes',name:'Fès',region:'Fès-Meknès',tagline:'La mémoire vivante.',image:u('photo-1553603227-2358aabe821e'),description:'Une médina labyrinthique, des savoir-faire anciens et une profondeur culturelle unique.',tags:['Patrimoine','Artisanat','Culture']},
 {slug:'chefchaouen',name:'Chefchaouen',region:'Tanger-Tétouan-Al Hoceïma',tagline:'Bleu, calme, montagne.',image:u('photo-1539020140153-e479b8c22e70'),description:'Une escale apaisée dans le Rif, entre ruelles bleues et reliefs.',tags:['Montagne','Photo','Détente']},
 {slug:'essaouira',name:'Essaouira',region:'Marrakech-Safi',tagline:'Le vent et l’Atlantique.',image:u('photo-1548018560-c7196548e84d'),description:'Remparts, océan, art et douceur de vivre dans une ville à taille humaine.',tags:['Mer','Culture','Surf']},
 {slug:'agadir',name:'Agadir',region:'Souss-Massa',tagline:'Soleil côté Atlantique.',image:u('photo-1577147443647-81856d5151af'),description:'Plages, lumière, balades et accès privilégié au Souss.',tags:['Mer','Détente','Famille']},
 {slug:'tanger',name:'Tanger',region:'Tanger-Tétouan-Al Hoceïma',tagline:'Entre deux mers.',image:u('photo-1518684079-3c830dcef090'),description:'Une ville ouverte, maritime et créative à la porte du détroit.',tags:['Mer','Culture','City break']},
 {slug:'merzouga',name:'Merzouga',region:'Drâa-Tafilalet',tagline:'Le silence du désert.',image:u('photo-1500530855697-b586d89ba3ee'),description:'Dunes, horizons infinis et nuits sous les étoiles.',tags:['Désert','Aventure','Nature']},
 {slug:'rabat',name:'Rabat',region:'Rabat-Salé-Kénitra',tagline:'Élégance atlantique.',image:u('photo-1579606032821-4e6161c81bd3'),description:'Capitale paisible, patrimoine, jardins et rivage.',tags:['Culture','Mer','Ville']},
 {slug:'casablanca',name:'Casablanca',region:'Casablanca-Settat',tagline:'L’énergie du Maroc.',image:u('photo-1578895101408-1a36b834405b'),description:'Architecture, business, océan et nouvelles adresses.',tags:['Ville','Design','Gastronomie']},
 {slug:'ouarzazate',name:'Ouarzazate',region:'Drâa-Tafilalet',tagline:'Portes du grand Sud.',image:u('photo-1539650116574-75c0c6d73f6e'),description:'Kasbahs, cinéma et paysages minéraux.',tags:['Désert','Cinéma','Patrimoine']},
 {slug:'ifrane',name:'Ifrane',region:'Fès-Meknès',tagline:'Fraîcheur du Moyen Atlas.',image:u('photo-1500534314209-a25ddb2bd429'),description:'Forêts, lacs et escapades nature.',tags:['Nature','Montagne','Famille']},
 {slug:'dakhla',name:'Dakhla',region:'Dakhla-Oued Ed-Dahab',tagline:'Lagune et grand large.',image:u('photo-1507525428034-b723cf961d3e'),description:'Une destination d’espace, de glisse et de déconnexion.',tags:['Mer','Kitesurf','Nature']}
];
export const experiences:Experience[]=[
 {slug:'atelier-tajine',title:'Atelier tajine avec une cuisinière locale',city:'Marrakech',category:'Gastronomie',price:390,rating:4.9,image:u('photo-1547592180-85f173990554'),duration:'3 h'},
 {slug:'medina-fes',title:'Fès, médina et artisans',city:'Fès',category:'Culture',price:280,rating:4.8,image:u('photo-1548018560-c7196548e84d'),duration:'4 h'},
 {slug:'desert-sunset',title:'Coucher de soleil sur les dunes',city:'Merzouga',category:'Désert',price:450,rating:4.9,image:u('photo-1500530855697-b586d89ba3ee'),duration:'5 h'},
 {slug:'surf-essaouira',title:'Initiation au surf sur l’Atlantique',city:'Essaouira',category:'Aventure',price:320,rating:4.7,image:u('photo-1502680390469-be75c86b636f'),duration:'2 h'},
 {slug:'rif-hike',title:'Randonnée douce dans le Rif',city:'Chefchaouen',category:'Nature',price:260,rating:4.8,image:u('photo-1464822759023-fed622ff2c3b'),duration:'4 h'},
 {slug:'rabat-design',title:'Rabat moderne & patrimoine',city:'Rabat',category:'Culture',price:240,rating:4.6,image:u('photo-1518684079-3c830dcef090'),duration:'3 h'}
];
export const providers:Provider[]=[
 {slug:'riad-azur',name:'Riad Azur',city:'Marrakech',category:'Riad',rating:4.9,reviews:182,image:u('photo-1578683010236-d716f9a3f461'),description:'Un riad calme au cœur de la médina, patio lumineux et terrasse panoramique.',priceLabel:'À partir de 980 DH'},
 {slug:'table-atlas',name:'La Table de l’Atlas',city:'Fès',category:'Restaurant',rating:4.8,reviews:329,image:u('photo-1552566626-52f8b828add9'),description:'Cuisine marocaine contemporaine, produits locaux et service soigné.',priceLabel:'Menu dès 220 DH'},
 {slug:'atlas-guide',name:'Atlas Guide',city:'Marrakech',category:'Guide',rating:4.9,reviews:94,image:u('photo-1534528741775-53994a69daeb'),description:'Guidage privé en français, anglais et arabe, avec itinéraires personnalisés.',priceLabel:'Dès 350 DH'},
 {slug:'ocean-house',name:'Ocean House',city:'Essaouira',category:'Hébergement',rating:4.7,reviews:141,image:u('photo-1566073771259-6a8506099945'),description:'Adresse lumineuse proche de l’océan, chambres calmes et petit déjeuner local.',priceLabel:'À partir de 760 DH'},
 {slug:'dune-motion',name:'Dune Motion',city:'Merzouga',category:'Activité',rating:4.9,reviews:118,image:u('photo-1539650116574-75c0c6d73f6e'),description:'Expériences désert en petits groupes et bivouacs premium.',priceLabel:'Dès 450 DH'},
 {slug:'rif-roots',name:'Rif Roots',city:'Chefchaouen',category:'Guide',rating:4.8,reviews:77,image:u('photo-1526772662000-3f88f10405ff'),description:'Balades culturelles et randonnées dans le Rif.',priceLabel:'Dès 280 DH'}
];
export const reservations:Reservation[]=[
 {id:'R-1048',guest:'Sofia Martin',service:'Suite Patio — 2 nuits',date:'09 oct. 2026',status:'Confirmée',total:'2 120 DH'},
 {id:'R-1049',guest:'Yanis Dupont',service:'Dîner découverte',date:'09 oct. 2026',status:'Nouvelle',total:'440 DH'},
 {id:'R-1050',guest:'Lina Weber',service:'Visite privée médina',date:'10 oct. 2026',status:'À venir',total:'700 DH'},
 {id:'R-1051',guest:'Karim El Mansouri',service:'Suite Terrasse — 1 nuit',date:'11 oct. 2026',status:'Nouvelle',total:'1 180 DH'}
];
export const messages:Message[]=[
 {id:'m1',name:'Sofia Martin',preview:'Bonjour, notre arrivée est prévue vers 18h…',time:'10:42',unread:true},
 {id:'m2',name:'Lina Weber',preview:'Merci pour les informations sur le point de rendez-vous.',time:'Hier'},
 {id:'m3',name:'Yanis Dupont',preview:'Est-il possible d’ajouter une personne ?',time:'Hier',unread:true}
];
