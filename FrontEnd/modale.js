const getWorksFromAPI = await fetch('http://localhost:5678/api/works');
let projets = await getWorksFromAPI.json();

const getProjectsFromAPI = await fetch('http://localhost:5678/api/categories');
let categories = await getProjectsFromAPI.json();

const token = sessionStorage.getItem('token');


const sectionWorks = document.querySelector('#sectionProjet');
const modifierWorks = document.createElement('p');
modifierWorks.innerHTML = '<a href="#modal"><i class="fa-solid fa-pen-to-square"></i>Modifier</a>';
sectionWorks.appendChild(modifierWorks);
// function fenetreModale(projets) {
//   const modaleWorks = document.querySelector('main');

//   const modaleWrapper = document.createElement('aside');
//   modaleWrapper.id = 'modale-wrapper';
//   modaleWorks.appendChild(modaleWrapper);

//   const modale = document.createElement('div');
//   modale.id = 'modale-fenetre';
//   modaleWrapper.appendChild(modale);
//   modale.addEventListener('click', stopPropagation);
//   function stopPropagation(e) {
//     e.stopPropagation();
//   }

//   const titrePremiereModale = document.createElement('h1');
//   titrePremiereModale.innerText = 'Galerie photo';
//   modale.appendChild(titrePremiereModale);

//   const grillePremiereModale = document.createElement('div');
//   grillePremiereModale.id = 'grille-modale';
//   modale.appendChild(grillePremiereModale);

//   const controlesModale = document.createElement('div');
//   controlesModale.id = 'controles-modale';
//   modale.appendChild(controlesModale);


//   const boutonDeuxiemeModale = document.createElement('button');
//   boutonDeuxiemeModale.innerText = 'Ajouter une photo';
//   controlesModale.appendChild(boutonDeuxiemeModale);
//   boutonDeuxiemeModale.addEventListener('click', event => fenetreModale2(modale, boutonFermer));

//   const boutonSupprimerGalerie = document.createElement('p');
//   boutonSupprimerGalerie.innerText = 'Supprimer la galerie';
//   boutonSupprimerGalerie.id = 'bouton-supprimer';
//   controlesModale.appendChild(boutonSupprimerGalerie);

//   const boutonFermer = document.createElement('i');
//   boutonFermer.className = 'fas fa-xmark';
//   modale.appendChild(boutonFermer);
//   boutonFermer.addEventListener('click', event => modaleWrapper.remove());
//   modaleWrapper.addEventListener('click', event => modaleWrapper.remove());



//   //Cette boucle affiche les projets dans la modale
const boutonModale2 = document.querySelector('#bouton-suivant');
boutonModale2.addEventListener('click', event => deuxiemeModale());

function fermerModale() {
  const boutonFermer = document.querySelector('#bouton-fermer');
  const modaleWrapper = document.querySelector('#modale-wrapper');

  boutonFermer.addEventListener('click', event => {
    modaleWrapper.style.display = 'none';
  });

  modaleWrapper.addEventListener('click', event => {
    if (event.target === modaleWrapper) {
      modaleWrapper.style.display = 'none';
    }
  });
}

fermerModale();
function afficherModale() {
  const fenetreModale1 = document.querySelector('.modale1');
  fenetreModale1.style.display = 'flex';
}

function deuxiemeModale() {
  const fenetreModale1 = document.querySelector('.modale1');
  const fenetreModale2 = document.querySelector('.modale2');
  fenetreModale1.style.display = 'none';
  fenetreModale2.style.display = 'flex';
}


modifierWorks.addEventListener('click', afficherModale);

const grilleWorks = document.querySelector('#grille-works');

function genererListeProjets(projets){
for (const projet of projets) {
  const figureGrille = document.createElement('figure');
  figureGrille.dataset.id = projet.id;
  grilleWorks.appendChild(figureGrille);
  figureGrille.id = 'figure-grille';

  const imageGrille = document.createElement('img');
  imageGrille.src = projet.imageUrl;
  figureGrille.appendChild(imageGrille);

  const texteGrille = document.createElement('figcaption');
  texteGrille.innerText = 'éditer';
  figureGrille.appendChild(texteGrille);

  const divBoutons = document.createElement('div');
  divBoutons.id = 'boutons-modale';
  figureGrille.appendChild(divBoutons);

  const boutonEditer = document.createElement('p');
  boutonEditer.innerHTML = '<i class="fa-solid fa-arrows-up-down-left-right"></i>';
  divBoutons.appendChild(boutonEditer);
  boutonEditer.style.display = 'none';
  
  const boutonSupprimer = document.createElement('p');
  boutonSupprimer.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  divBoutons.appendChild(boutonSupprimer);

  figureGrille.addEventListener('mouseover', event => {
    boutonEditer.style.display = 'block';
  });

  figureGrille.addEventListener('mouseout', event => {
    boutonEditer.style.display = 'none';
  });

    boutonSupprimer.addEventListener('click', function (event) {
      const projetASupprimer = event.target.closest('#figure-grille');
      const projetId = projetASupprimer.dataset.id;
      fetch(`http://localhost:5678/api/works/${projetId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then((response) => {
          if (response.ok) {
            projetASupprimer.remove();
            const index = projets.findIndex(projet => projet.id == projetId);
            projets.splice(index, 1);
            genererListeProjets(projets);
          }
          else {
            alert("Une erreur s'est produite lors de la suppression du projet");
          }
        })
    })
  };
}

function supprimerProjet(){
  
}
genererListeProjets(projets);





// boutonModale.addEventListener('click', event => fenetreModale(projets));

// function fenetreModale2(modale, boutonFermer) {
//   modale.innerHTML = ''; //Cette ligne supprime les éléments de la modale



//   const containerBoutons = document.createElement('div');
//   modale.appendChild(containerBoutons);
//   const boutonPrecedent = document.createElement('i');
//   boutonPrecedent.className = 'fa-solid fa-arrow-left';
//   containerBoutons.appendChild(boutonPrecedent);
//   containerBoutons.appendChild(boutonFermer);
//   boutonPrecedent.addEventListener('click', function() {
//     viderModale();
//     fenetreModale(projets);
//   });

//   const titreDeuxiemeModale = document.createElement('h1');
//   titreDeuxiemeModale.innerText = 'Ajout photo';
//   modale.appendChild(titreDeuxiemeModale);

//   function viderModale(modaleWrapper) {
//     modale.remove();
//     fenetreModale(projets);
//   }
// }