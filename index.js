const { select, input, checkbox } = require('@inquirer/prompts') // Extraindo uma função ou código...

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
    if (meta.length == 0) {
        console.log('A meta não pode ser vazia.')
        return
    }
    // push - Colocar para dentro
    metas.push({ value: meta, checked: false })
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: " Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar a etapa",
        choices: [...metas],
        instructions: false,
    })

    // Desmarcar meta(s)
    metas.forEach((m) => {
        m.checked = false
    })

    if (respostas.length == 0) {
        console.log("Nenhuma meta selecionada!")
        return
    }

    console.log('Meta(s) marcada(s) como concluída(s)')

    /*
    Para cada executa a função
    Lógica de marcar meta(s)
    */
    respostas.forEach((resposta) => {
        //find - cada uma, no caso metas
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if (realizadas.length == 0) {
        console.log('Não há metas realizadas :(')
        return
    }

    await select({
        message: "Metas Realizadas",
        choices: [...realizadas] // capta o novo array, o anterior, no caso realizadas é colocado no novo array
    })
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
                    name: "Metas realizadas",
                    value: "realizadas"
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
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "logout":
                console.log("Até a próxima!")
                return
        }
    }
}

start()