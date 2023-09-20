

function onChangeEmail(){
    const email = form.email().value;
    form.erroEmailObrigatorio().style.display = email ? "none" : "block";

    form.erroEmailInvalido().style.display = validaEmail(email) ? "none" : "block";
    desabilitarBotaoRegistrar()
}

function onChangePassword(){
    const password = form.password().value;
    form.erroPasswordObrigatorio().style.display = password ? "none" : "block";
    form.erroPasswordTamanhoObrigatorio().style.display = password.length >= 6 ? "none" : "block";

    validarPasswordIguais();
    desabilitarBotaoRegistrar()
}

function onChangeConfirmPassword(){
    validarPasswordIguais();
    desabilitarBotaoRegistrar()
}

function validarPasswordIguais(){
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    form.confirmPasswordDiferente().style.display = password == confirmPassword ? "none" : "block";
}

function desabilitarBotaoRegistrar(){
    form.botaoRegistrar().disabled = !formEValido();
}

function formEValido(){
    const email = form.email().value;
    if (!email || !validaEmail(email)){
        return false;
    }
    const password = form.password().value;
    if (!password || password.length < 6){
        return false;
    }
    const confirmPassword = form.confirmPassword().value;
    if (password != confirmPassword){
        return false
    }
    return true;
}

function registrar() {

    const email = form.email().value;
    const password = form.password().value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            var user = userCredential.user;
            user.sendEmailVerification().then(() => {
                alert("Email de verificação enviado. Por favor, verifique sua caixa de entrada e confirme seu email antes de continuar.");
                window.location.href = 'principal.html';
            }).catch(error => {
                alert(mensagemErro(error));
            });
        })
        .catch(error => {
            alert(mensagemErro(error));
        })
}


function mensagemErro(error){
    if (error.code == "auth/email-already-in-use") {
        return "E-mail já está em uso";
    }
    return error.message;
}

function validaEmail(email){
    return /\S+@\S+\.\S+/.test(email);
}

const form = {
    confirmPassword: () => document.getElementById('confirmePassword'),
    confirmPasswordDiferente: () => document.getElementById("erro-password-diferente"),
    email: () => document.getElementById('email'),
    erroEmailInvalido: () => document.getElementById("erro-email-invalido"),
    erroEmailObrigatorio: () => document.getElementById("erro-email-obrigatorio"),
    password: () => document.getElementById('password'),
    erroPasswordTamanhoObrigatorio: () => document.getElementById("erro-tamanho-password-invalido"),
    erroPasswordObrigatorio: () => document.getElementById("erro-password-obrigatorio"),
    botaoRegistrar: () => document.getElementById("botao-registrar"),
}