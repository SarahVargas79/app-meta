const { select, input } = require('@inquirer/prompts') // Extraindo uma função ou código...

let meta = {
    value: 'Comer ao menos uma fruta diariamante',
    checked: false,
}

let metas = [meta]

const cadastrarMeta = async () => {
    const meta = await input({ message: "Escreva a meta: " })

    /*
        meta - Que for escrito vai ser colocado na meta
        lenght - Verifica se tem caractér, número de caractéres
        */
    if (meta.lenght == 0) {
        console.log('A meta não pode ser vazia.')
        return
    }
    // push - Colocar para dentro
    metas.push({ value: meta, checked: false })
}

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
                await cadastrarMeta()
                console.log(metas)
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