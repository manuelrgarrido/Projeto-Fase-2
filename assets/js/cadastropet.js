document.addEventListener("DOMContentLoaded", function() {
    
    var db = firebase.firestore();
    var user = firebase.auth().currentUser;

    window.cadastrarAnimal = function() {
        var nome = document.getElementById("nome").value;
        var tipo = document.getElementById("tipo").value;
        var raca = document.getElementById("raca").value;
        var temperamento = document.getElementById("temperamento").value;

        // Verificando se o usuário está logado
        if (user) {
            db.collection("animais").add({
                nome: nome,
                tipo: tipo,
                raca: raca,
                temperamento: temperamento,
                ownerId: user.uid  // incluindo o ID do dono (usuário logado) aqui
            })
            .then(function(docRef) {
                console.log("Documento escrito com ID: ", docRef.id);
                
                document.getElementById("animalForm").reset();

                alert("Animal cadastrado com sucesso!");
            })
            .catch(function(error) {
                console.error("Erro ao adicionar o documento: ", error);
        
                alert("Erro ao cadastrar o animal. Por favor, tente novamente.");
            });
        } else {
            console.error("Nenhum usuário está logado. Não é possível cadastrar o pet sem associá-lo a um usuário.");
            alert("Por favor, faça login para cadastrar seu pet.");
        }
    };
});