//  Ces lignes appellent les projets et les catégories dans l'API
const getWorksFromAPI = await fetch('http://localhost:5678/api/works');
let projets = await getWorksFromAPI.json();

const getProjectsFromAPI = await fetch('http://localhost:5678/api/categories');
let categories = await getProjectsFromAPI.json();

const token = sessionStorage.getItem('token');
console.log(token);
// Ces lignes affichent tout les projets dans la page à partir de getWorksFromAPI
function genererListeProjets(projets) {
  const ficheWorks = document.querySelector(".gallery");
  ficheWorks.innerHTML = '';
  for (const projet of projets) {
    // const liste = projet;
    const figureElement = document.createElement('figure');
    const imageElement = document.createElement('img');
    imageElement.src = projet.imageUrl;
    const titreElement = document.createElement('figcaption');
    titreElement.innerHTML = projet.title;

    ficheWorks.appendChild(figureElement);
    figureElement.appendChild(imageElement);
    figureElement.appendChild(titreElement);
  }
}

genererListeProjets(projets);



// Ces lignes ajoutent un bouton "toutes catégories" dans l'array de catégorie afin de l'avoir dans les boutons
const toutesCategories = {
  id: 0,
  name: 'Tous',
}
categories.unshift(toutesCategories);
console.log(categories);


// Ces lignes crééent les boutons de filtre, seulement si l'utilisateur n'est pas connecté
if (!token) {
  for (const category of categories) {
    const bouton = document.createElement('button');
    bouton.textContent = category.name;

    const boutonFiltre = document.querySelector("#filtres");
    boutonFiltre.appendChild(bouton);

    bouton.addEventListener('click', event => {
      let filtered = category.id === 0 ? projets : projets.filter(projet => category.id === projet.categoryId);
      genererListeProjets(filtered);
    })
  }
}

// Ces lignes affichent un bouton modifier dans la section introduction si l'utilisateur est connecté
if (token) {
  const sectionHeader = document.querySelector('header');
  const header = document.createElement('div');
  header.id = 'headerLogin';
  const texteHeader = document.createElement('p');
  texteHeader.id = 'boutonModif';
  texteHeader.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>Mode édition';
  const boutonHeader = document.createElement('button');
  boutonHeader.innerHTML = 'Publier les changements';

  sectionHeader.prepend(header);
  header.appendChild(texteHeader)
  header.appendChild(boutonHeader);

  const sectionIntro = document.querySelector('#sectionIntroduction');
  const modifierPhoto = document.createElement('p');
  modifierPhoto.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>Modifier';
  modifierPhoto.id = 'boutonModif';
  sectionIntro.appendChild(modifierPhoto);

  const sectionWorks = document.querySelector('#sectionProjet');
  const modifierWorks = document.createElement('p');
  modifierWorks.id = 'boutonModale';
  modifierWorks.innerHTML = '<a href="#modal"><i class="fa-solid fa-pen-to-square"></i>Modifier</a>';
  modifierWorks.id = 'boutonModif';
  sectionWorks.appendChild(modifierWorks);
}

// Ces lignes changent le texte "login" en "logout" si l'utilisateur est connecté
const boutonLogin = document.querySelector('#bouton_login');
if (token) {
  boutonLogin.innerText = 'logout'
}
else {
  boutonLogin.innerText = 'login';
}


//Ces lignes affichent la modale 

//Ces lignes affichent les projets dans la modale
// function fenetreModale1(projets){
//   const modaleWorks = document.querySelector("#modale1");
//   modaleWorks.innerHTML='';
//     for (const projet of projets) {
//     // const liste = projet;
//     const wrapperElement = document.createElement('div');
//     wrapperElement.id= 'works-editer';
//     const imageElement = document.createElement('img');
//     imageElement.src = projet.imageUrl;
//     const titreElement = document.createElement('p');
//     titreElement.innerText = 'éditer';
//     modaleWorks.appendChild(wrapperElement);
//     wrapperElement.appendChild(imageElement);
//     wrapperElement.appendChild(titreElement);

//   }
// }


function fenetreModale(projets) {
  const modaleWorks = document.querySelector('main');


  const modaleWrapper = document.createElement('aside');
  modaleWrapper.id = 'modale-wrapper';
  modaleWorks.appendChild(modaleWrapper);

  const fenetreModale = document.createElement('div');
  fenetreModale.id = 'modale-fenetre';
  modaleWrapper.appendChild(fenetreModale);

  const titrePremiereModale = document.createElement('h1');
  titrePremiereModale.innerText = 'Galerie photo';
  fenetreModale.appendChild(titrePremiereModale);

  const grillePremiereModale = document.createElement('div');
  grillePremiereModale.id = 'grille-modale';
  fenetreModale.appendChild(grillePremiereModale);

    const boutonFermer = document.createElement('i');
    boutonFermer.className = 'fas fa-xmark';
    fenetreModale.appendChild(boutonFermer);
  for (const projet of projets) {

    const elementGrille = document.createElement('div');
    const imageGrille = document.createElement('img');
      imageGrille.src = projet.imageUrl;
    const texteGrille = document.createElement('p');
      texteGrille.innerText = 'éditer';
    grillePremiereModale.appendChild(elementGrille);
    elementGrille.appendChild(imageGrille);
    elementGrille.appendChild(texteGrille);


  }
}

fenetreModale(projets);