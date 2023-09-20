document.addEventListener("DOMContentLoaded", function() {
    
    var db = firebase.firestore();
    var user = firebase.auth().currentUser;

    window.agendarServico = function() {
        var data = document.getElementById("data").value;
        var horario = document.getElementById("horario").value;
        var tipoServico = document.getElementById("tipoServico").value;
        var buscarPet = document.getElementById("buscarPet").checked;

        if (user) {
            db.collection("agendamentos").add({
                data: data,
                horario: horario,
                tipoServico: tipoServico,
                buscarPet: buscarPet,
                userId: user.uid  
            })
            .then(function(docRef) {
                console.log("Agendamento realizado com ID: ", docRef.id);
                
                document.getElementById("agendamentoForm").reset();

                alert("Agendamento realizado com sucesso!");
            })
            .catch(function(error) {
                console.error("Erro ao agendar o serviço: ", error);
        
                alert("Erro ao realizar o agendamento. Por favor, tente novamente.");
            });
        } else {
            console.error("Nenhum usuário está logado. Não é possível agendar sem estar logado.");
            alert("Por favor, faça login para agendar um serviço.");
        }
    };
});