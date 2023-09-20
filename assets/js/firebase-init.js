const firebaseConfig = {
    apiKey: "AIzaSyBD1ZxJZSpJq-eMbCpp2FkRNu49jOdisFo",
    authDomain: "pet-shop-3253d.firebaseapp.com",
    projectId: "pet-shop-3253d",
    storageBucket: "pet-shop-3253d.appspot.com",
    messagingSenderId: "13115973359",
    appId: "1:13115973359:web:e571cb2422cf140453c51a"
};
firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // Se o usuário já estiver logado E não estiver na página principal, redirecione-o.
      if (window.location.href.indexOf('principal.html') === -1) {
        window.location.href = 'principal.html';
      }
    }
  });
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // Usuário está logado, obtenha o email.
      const userEmail = user.email;
  
      // Exiba o email no elemento que você preparou.
      document.getElementById('userEmailDisplay').textContent = userEmail;
    } else {
      // Usuário não está logado, faça alguma ação, como redirecionar para a página de login.
    }
  });
  firebase.auth().onAuthStateChanged(function(user) {
    const userArea = document.getElementById('userArea');
    const userEmailDisplay = document.getElementById('userEmailDisplay');

    if (user) {
        // Usuário está logado.
        userArea.style.display = 'block';  // Mostra o div contendo o email e o botão de logout.
        userEmailDisplay.textContent = user.email;  // Atualiza o span com o email do usuário.
    } else {
        // Usuário não está logado.
        userArea.style.display = 'none';  // Esconde o div.
    }
});
document.getElementById('logoutButton').addEventListener('click', function() {
    firebase.auth().signOut().then(function() {
        // Logout bem-sucedido. Redirecionar ou atualizar a UI conforme necessário.
        window.location.href = 'index.html';  // Por exemplo, redirecionar para a página de login.
    }).catch(function(error) {
        // Ocorreu um erro no logout. Exiba uma mensagem de erro ou trate como quiser.
        console.error('Erro ao deslogar:', error);
    });
});