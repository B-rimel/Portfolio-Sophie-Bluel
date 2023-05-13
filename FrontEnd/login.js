const getLoginFromAPI = await fetch ('http://localhost:5678/api/users/login');
    let loginCredential = getLoginFromAPI.json();

//Ces lignes récupèrent les info de connexion de l'utilisateur
const validerLogin = document.querySelector('.login-form');
validerLogin.addEventListener('submit')

// Création de l’objet du nouvel avis.

const avis = {
    email: event.target.querySelector("[name=e-mail").value,
    password: event.target.querySelector("[name=password]").value,
 };
 