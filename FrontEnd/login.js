//Ces lignes récupèrent les info de connexion de l'utilisateur
const validerLogin = document.querySelector('.login-form');
validerLogin.addEventListener('submit', (userLogin) => {
   userLogin.preventDefault();
   const userLoginCredential = {
      email: userLogin.target.querySelector("[name=e-mail").value,
      password: userLogin.target.querySelector("[name=password]").value,
   };
   console.log(userLoginCredential);
});


console.log(userLoginCredential);

const userLoginAPI = {
   method: POST,
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify(userLoginCredential),
}

// fetch('http://localhost:5678/api/users/login', userLoginAPI)
// .then(response => response.json())
// if (response.hasOwnProperty("token")) {
//    console.log('Le token existe');
// }

// else {
//    console.log('Le token n\'existe pas.');
// }

fetch('http://localhost:5678/api/users/login', userLoginAPI)
  .then(response => response.json())
  .then(data => {
    if (data.hasOwnProperty("token")) {
      console.log('Le token existe');
    } else {
      console.log('Le token n\'existe pas.');
    }
  })