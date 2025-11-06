const firebaseConfig = {
  apiKey: "AIzaSyAgNajROlqOmH4v7xKq-9lPU0RmF3HUgPQ",
  authDomain: "pwa-login-5e4fc.firebaseapp.com",
  projectId: "pwa-login-5e4fc",
  storageBucket: "pwa-login-5e4fc.appspot.com",
  messagingSenderId: "320818289995",
  appId: "1:320818289995:web:cb8a8b7cd8f2185739dcce"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Gerenciador de autenticação
class AuthManager {
  constructor(authInstance) {
    this.auth = authInstance;
  }

  cadastrar(email, senha) {
    return this.auth.createUserWithEmailAndPassword(email, senha);
  }

  logar(email, senha) {
    return this.auth.signInWithEmailAndPassword(email, senha);
  }

  deslogar() {
    return this.auth.signOut();
  }

  verificarUsuario(callback) {
    return this.auth.onAuthStateChanged(callback);
  }
}

const authManager = new AuthManager(auth);

// CADASTRO
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("registerEmail").value;
    const senha = document.getElementById("registerPassword").value;
    const msg = document.getElementById("registerMessage");

    msg.textContent = "Cadastrando...";

    authManager.cadastrar(email, senha)
      .then(() => {
        msg.style.color = "green";
        msg.textContent = "Cadastro feito com sucesso!";
        setTimeout(() => window.location.href = "index.html", 1500);
      })
      .catch(err => {
        msg.style.color = "red";
        msg.textContent = "Erro: " + err.message;
      });
  });
}

// LOGIN
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const senha = document.getElementById("loginPassword").value;
    const msg = document.getElementById("loginMessage");

    msg.textContent = "Entrando...";

    authManager.logar(email, senha)
      .then(() => {
        msg.style.color = "green";
        msg.textContent = "Login realizado!";
        setTimeout(() => window.location.href = "profile.html", 1000);
      })
      .catch(err => {
        msg.style.color = "red";
        msg.textContent = "Erro: " + err.message;
      });
  });
}

// PERFIL
const userEmail = document.getElementById("userEmail");
const logoutBtn = document.getElementById("logoutBtn");

if (userEmail && logoutBtn) {
  authManager.verificarUsuario(user => {
    if (user) {
      userEmail.textContent = `Você está logado como: ${user.email}`;
    } else {
      window.location.href = "index.html";
    }
  });

  logoutBtn.addEventListener("click", () => {
    authManager.deslogar().then(() => window.location.href = "index.html");
  });
}