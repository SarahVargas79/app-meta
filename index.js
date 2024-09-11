const start = () => {
    let count = 1
    while (true) {
        let opcao = "cadastrar"
        switch (opcao) {
            case "cadastrar":
                console.log("Cadastro")
                break;
            case "listar":
                console.log("Lista")
                break;
            case "sair":
                return
            default:
                console.log("Opção Inválida!")
                break;
        }
    }
}

start()