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

const modifierWorks = '';
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

  const navBar = document.getElementById('navBar');
  navBar.style.paddingTop = '76px';

  sectionHeader.prepend(header);
  header.appendChild(texteHeader)
  header.appendChild(boutonHeader);

  const sectionWorks = document.querySelector('#sectionProjet');
  const modifierWorks = document.createElement('p');
  modifierWorks.id = 'ouvrir-modale';
  modifierWorks.innerHTML = '<a href="#modal"><i class="fa-solid fa-pen-to-square"></i>Modifier</a>';
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

export {token, projets, categories, genererListeProjets, modifierWorks};