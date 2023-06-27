const form = document.querySelector('.login-form');
form.addEventListener('submit', async (event) => {
   event.preventDefault();
   const userLoginCredential = {
      email: event.target.querySelector("[name=e-mail").value,
      password: event.target.querySelector("[name=password]").value,
   };
   console.log(userLoginCredential);

   const userLoginAPI = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userLoginCredential),
   }
   const response = await fetch('http://localhost:5678/api/users/login', userLoginAPI);
   const loginCommand = await response.json();
   if (response.ok) {
      window.sessionStorage.setItem('token', loginCommand.token);
      location.href = 'index.html';
   } else {
      alert('Vérifiez vos identifiants !');
   }
}
); 