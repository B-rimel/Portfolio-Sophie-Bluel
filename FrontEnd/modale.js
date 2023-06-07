const getWorksFromAPI = await fetch('http://localhost:5678/api/works');
let projets = await getWorksFromAPI.json();

const getProjectsFromAPI = await fetch('http://localhost:5678/api/categories');
let categories = await getProjectsFromAPI.json();

const token = sessionStorage.getItem('token');


const sectionWorks = document.querySelector('#sectionProjet');
const modifierWorks = document.createElement('p');
modifierWorks.innerHTML = '<a href="#modal"><i class="fa-solid fa-pen-to-square"></i>Modifier</a>';
sectionWorks.appendChild(modifierWorks);

const boutonModale2 = document.querySelector('#bouton-suivant');
boutonModale2.addEventListener('click', event => deuxiemeModale());



function afficherModale() {
  const fenetreModale1 = document.querySelector('.modale1');
  fenetreModale1.style.display = 'flex';
}

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

function deuxiemeModale() {
  const fenetreModale1 = document.querySelector('.modale1');
  const fenetreModale2 = document.querySelector('.modale2');
  fenetreModale1.style.display = 'none';
  fenetreModale2.style.display = 'flex';
}


modifierWorks.addEventListener('click', afficherModale);

const grilleWorks = document.querySelector('#grille-works');

function genererListeProjets(projets) {
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

function supprimerProjet() {

}
genererListeProjets(projets);

for (const category of categories) {
  const menuElement = document.createElement('option');
  menuElement.textContent = category.name;
  const menu = document.querySelector('select');
  menu.appendChild(menuElement);
}

let imgOk = false;
let titleOk = false;
let categoryOk = false;
const boutonEnvoyer = document.getElementById('bouton-envoyer');
boutonEnvoyer.disabled = true;
console.log(boutonEnvoyer);

const inputImage = document.getElementById('input-photo');
inputImage.addEventListener('change', (event) => {
  let file = event.target.files[0];
  const tailleMaximum = 2048 * 2048;

  if (file && file.size <= tailleMaximum) {
    imgOk = true;
    let UrlImage = URL.createObjectURL(file);
    console.log(UrlImage);
    console.log(imgOk);
  }

  else {
    alert('Le fichier est trop gros');
    URL.revokeObjectURL(file);
    inputImage.value = '';
  }


});


  const champTitre = document.getElementById('input-texte');
  const contenuTitre = champTitre.value;
  const champCategorie = document.getElementById('categorie');
  const contenuCategorie = champCategorie.value;
  champTitre.addEventListener('change', event => {
    titleOk = true;
    console.log(titleOk);
  });
  champCategorie.addEventListener('change', event => { 
    categoryOk = true;
    console.log(categoryOk);
  });

  if (imgOk === true || titleOk === true || categoryOk === true) {
    console.log(imgOk);
    console.log(titleOk);
    console.log(categoryOk);

    boutonEnvoyer.disabled = false;
    boutonEnvoyer.style.color = '#1D6154';
  }


const formulaireWork = document.getElementById('input-form');
const dataFormulaire = new FormData(formulaireWork);
dataFormulaire.append('image', UrlImage);

