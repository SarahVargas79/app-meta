const { select } = require('@inquirer/prompts') // Extraindo uma função ou código...

// Registra a função, iniciar função, começa a percorrer o while 
const start = async () => {
    /*
    await - aguardar, no caso seleção do usuário, para não percorrer tudo de uma vez só

    select é obrigatória ter uma mensagem para mostrar ao usuário, essa mensage é acompanhada do choice nececssário é opções
    */
    while (true) {

        const opcao = await select({
            message: "Menu >",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Logout",
                    value: "logout"
                }
            ]
        })

        switch (opcao) {
            case "cadastrar":
                console.log("Cadastro")
                break
            case "listar":
                console.log("Lista")
                break
            case "logout":
                console.log("Até a próxima")
                return
        }
    }
}

start()