
async function createElements() {
  const response = await fetch('http://localhost:5678/api/works');
  let projets = await response.json();
  console.log(projets);
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

createElements();


async function createButtons() {
  const response = await fetch('http://localhost:5678/api/categories');
  let categories = await response.json();
  console.log(categories);
  for (let i = 0; i < categories.length; i++) {
    const liste = categories[i];
    const corpsBouton = document.createElement('button');
    const texteBouton = document.createElement('p');
    texteBouton.innerHTML = liste.name;

    const boutonFiltre = document.querySelector(".filtres");
    boutonFiltre.appendChild(corpsBouton);
    corpsBouton.appendChild(texteBouton);
    }
}

createButtons();