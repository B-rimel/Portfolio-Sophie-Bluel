//  Ces lignes appellent les projets et les catégories dans l'API
 const getWorksFromAPI = await fetch('http://localhost:5678/api/works');
  let projets = await getWorksFromAPI.json();

  const getProjectsFromAPI = await fetch('http://localhost:5678/api/categories');
  let categories = await getProjectsFromAPI.json();

// Ces lignes affichent tout les projets dans la page à partir de getWorksFromAPI
function genererListeProjets(projets){
  const ficheWorks = document.querySelector(".gallery");
  ficheWorks.innerHTML='';
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


// Ces lignes crééent les boutons de filtre
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