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
      const imageGrille = document.createElement('img');
      imageGrille.src = projet.imageUrl;
      const texteGrille = document.createElement('p');
      texteGrille.innerText = 'éditer';
      grillePremiereModale.appendChild(elementGrille);
      elementGrille.appendChild(imageGrille);
      elementGrille.appendChild(texteGrille);
  
    }
  }
  
  boutonModale.addEventListener('click', event => fenetreModale(projets));