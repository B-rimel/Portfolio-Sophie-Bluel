
async function createElements() {
  const response = await fetch('http://localhost:5678/api/works');
  let projets = await response.json();
  console.log(projets);
  for (let i = 0; i < projets.length; i++) {
    const liste = projets[i];
    const imageElement = document.createElement('img');
    imageElement.src = liste.imageUrl;
    const titreElement = document.createElement('h2');
    titreElement.innerHTML = liste.title;
    const ficheWorks = document.querySelector(".divWorks");
    ficheWorks.appendChild(imageElement);
    ficheWorks.appendChild(titreElement);
  }
}

createElements();
