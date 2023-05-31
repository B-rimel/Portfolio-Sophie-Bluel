function fenetreModale(projets) {
  const modaleWorks = document.querySelector('main');


  const modaleWrapper = document.createElement('aside');
  modaleWrapper.id = 'modale-wrapper';
  modaleWorks.appendChild(modaleWrapper);

  const fenetreModale = document.createElement('div');
  fenetreModale.id = 'modale-fenetre';
  modaleWrapper.appendChild(fenetreModale);
  fenetreModale.addEventListener('click', stopPropagation);
  function stopPropagation(e){
    e.stopPropagation();
  }

  const titrePremiereModale = document.createElement('h1');
  titrePremiereModale.innerText = 'Galerie photo';
  fenetreModale.appendChild(titrePremiereModale);

  const grillePremiereModale = document.createElement('div');
  grillePremiereModale.id = 'grille-modale';
  fenetreModale.appendChild(grillePremiereModale);

  const boutonFermer = document.createElement('i');
  boutonFermer.className = 'fas fa-xmark';
  fenetreModale.appendChild(boutonFermer);
  boutonFermer.addEventListener('click', event => modaleWrapper.remove());
  modaleWrapper.addEventListener('click', event => modaleWrapper.remove());




  for (const projet of projets) {
    const elementGrille = document.createElement('div');
    elementGrille.dataset.id = projet.id;
    elementGrille.id = 'element-grille';
    const imageGrille = document.createElement('img');
    imageGrille.src = projet.imageUrl;
    const texteGrille = document.createElement('p');
    texteGrille.innerText = 'éditer';
    grillePremiereModale.appendChild(elementGrille);
    elementGrille.appendChild(imageGrille);
    elementGrille.appendChild(texteGrille);

    const divBoutons = document.createElement('div');
    divBoutons.id = 'boutons-modale';
    elementGrille.appendChild(divBoutons);

    const boutonEditer = document.createElement('p');
    boutonEditer.innerHTML = '<i class="fa-solid fa-arrows-up-down-left-right"></i>';
    divBoutons.appendChild(boutonEditer);
    boutonEditer.style.display = 'none';
    
    elementGrille.addEventListener('mouseover', function(event) {
      boutonEditer.style.display = 'block';
    });
    
    elementGrille.addEventListener('mouseleave', function(event) {
      boutonEditer.style.display = 'none';
    });
    

    const boutonSupprimer = document.createElement('p');
    boutonSupprimer.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    divBoutons.appendChild(boutonSupprimer);


    boutonSupprimer.addEventListener('click', function(event){
      const projetASupprimer = event.target.closest('#element-grille');
      const projetId = projetASupprimer.dataset.id;
      fetch(`http://localhost:5678/api/works/${projetId}`, {
        method: 'DELETE',
        headers: {'Authorization': `Bearer ${token}`}
      }).then(fenetreModale(projets));
    })
  }
}

// boutonModale.addEventListener('click', event => fenetreModale(projets));