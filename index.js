
function onChangeEmail(){
    desativarBotao();
    erroEmail();
}
function onChangePassword(){
    desativarBotao();
    erroPassword();
}
function emailEValido(){
    const email = form.email().value;
    if (!email) {
        return false
    }
    return validaEmail(email);
}

function passwordEValido(){
    const password = form.password().value;
    if (!password) {
        return false
    }
    return true;
}

function desativarBotao(){
    const emailValido = emailEValido();
    form.recuperarPassword().disabled = !emailValido;

    const passwordValido = passwordEValido();
    form.loginButton().disabled = !emailValido || !passwordValido;
}

function erroEmail(){
    const email = form.email().value;
    form.erroEmailObrigatorio().style.display = email ? "none" : "block";

    form.erroEmailInvalido().style.display = email ? "none" : "block";
}
function erroPassword(){
    const password = form.password().value;
    form.erroPasswordRequerido().style.display = password ? "none" : "block";
}

function login(){
    firebase.auth().signInWithEmailAndPassword(
        form.email().value, form.password().value
        ).then(response => {
            window.location.href = 'principal.html';
    }).catch(error => {
        mensagemErroLogin(error);
    });
}
function mensagemErroLogin(error){
    if (error.code == "auth/user-not-found"){
        return "Usuário não encontrado"
    }
    if (error.code == "auth/wrong-password"){
        return "Senha Inválida"
    }
    return error.message;
}
function registro(){
    window.location.href = 'cadastro.html';
}
function recuperarPassword(){
    firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
        alert('Email enviado com sucesso!')
    }).catch(error => {
        alert(mensagemErroLogin(error))
    })
}

const form = {
    email: () => document.getElementById('email'),
    erroEmailInvalido: () => document.getElementById('erro-email-invalido'),
    erroEmailObrigatorio: () => document.getElementById('erro-email-obrigatorio'),
    loginButton: () => document.getElementById('login-button'),
    password: () => document.getElementById('password'),
    erroPasswordRequerido: () => document.getElementById('password-requerido'),
    recuperarPassword: () => document.getElementById('recover-password-button')
}