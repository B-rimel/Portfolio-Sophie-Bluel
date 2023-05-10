//  Ces lignes appellent les projets et les catégories dans l'API
 const getWorksFromAPI = await fetch('http://localhost:5678/api/works');
  let projets = await getWorksFromAPI.json();

  const getProjectsFromAPI = await fetch('http://localhost:5678/api/categories');
  let categories = await getProjectsFromAPI.json();
  const listeCategories = categories.map(categories => categories.name);

// Ces lignes affichent tout les projets dans la page à partir de getWorksFromAPI
function genererListeProjets(){
  for (let i = 0; i < projets.length; i++) {
    const liste = projets[i];
    const figureElement = document.createElement('figure');
    const imageElement = document.createElement('img');
    imageElement.src = liste.imageUrl;
    const titreElement = document.createElement('figcaption');
    titreElement.innerHTML = liste.title;

    const ficheWorks = document.querySelector(".gallery");
    ficheWorks.appendChild(figureElement);
    figureElement.appendChild(imageElement);
    figureElement.appendChild(titreElement);
  }
}

genererListeProjets();




// Ces lignes ajoutent un bouton "toutes catégories" dans l'array de catégorie afin de l'avoir dans les boutons
  const toutesCategories = {
    id: '0',
    name: 'Tous',
  }
  categories.unshift(toutesCategories);
  console.log(categories);


// Ces lignes crééent les boutons de filtre
for (let i = 0; i < categories.length; i++) {
  const liste = categories[i];
  const corpsBouton = document.createElement('button');
  const texteBouton = document.createElement('p');
  texteBouton.innerHTML = liste.name;

  const boutonFiltre = document.querySelector("#filtres");
  boutonFiltre.appendChild(corpsBouton);
  corpsBouton.appendChild(texteBouton);
}

function triProjet(list, categories) {
  return listeCategories.filter((item) => item.categories === categories);
}
// Ces lignes servent à filtrer les projets par catégorie
document.getElementById('filtres').addEventListener('click', triProjet);
