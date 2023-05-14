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


console.log(userLoginCredential)

const userLoginAPI = {
   method: POST,
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify(userLoginCredential),
}

fetch('http://localhost:5678/api/users/login', userLoginAPI)
.then(response => response.json())
.then(data => {
  const token = data.token;
  localStorage.setItem('userToken', token);
  console.log(userToken);
})
.catch(error => console.error(error));

//  La méthode serait :
//  -Récupérer les données saisies (eventlistener)
//  -Envoyer ces données par la méthode POST :
//  verbe : POST;
//  body : Charge utile, qui serait les données;
//  header : content-type : application/json
// exemple :
// fetch("/pieces/1/avis", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: '{"commentaire": "Top produit !"}'
// });
