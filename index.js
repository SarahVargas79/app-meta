const { select, input, checkbox } = require('@inquirer/prompts') // Extraindo uma função ou código...

let mensagem = "Boas-vindas ao Fluxo de metas";

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
        mensagem = 'A meta não pode ser vazia.'
        return
    }
    // push - Colocar para dentro
    metas.push({ value: meta, checked: false })

    mensagem = "Meta cadastrada com sucesso!"
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
        mensagem = "Nenhuma meta selecionada!"
        return
    }

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

    mensagem = 'Meta(s) marcada(s) como concluída(s)'
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if (realizadas.length == 0) {
        mensagem = 'Não há metas realizadas :('
        return
    }

    await select({
        message: "Metas Realizadas: " + realizadas.length,
        choices: [...realizadas] // capta o novo array, o anterior, no caso realizadas é colocado no novo array
    })
}

const metasAbertas = async () => {
    /*
    se a op. for V a meta esp. entra nas abertas

    tocar [] - alongamento [x], está marc. ñ = falso
    diferente de true entra como meta aberta.
    */
    const abertas = metas.filter((meta) => {
        return meta.checked != true
    })

    if (abertas.length == 0) {
        mensagem = 'Não há metas abertas! :)'
        return
    }

    await select({
        message: "Metas Abertas: " + abertas.length,
        choices: [...abertas]
    })
}

const deletarMetas = async () => {

    // map - Executa a função para cada meta, return o que vai ser modificado. Passa por cada meta devolvendo novo array modificado.
    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false }
    })

    const itensADeletar = await checkbox({
        message: "Selecione item para deletar",
        choices: [...metasDesmarcadas],
        instructions: false,
    })

    if (itensADeletar.length == 0) {
        mensagem = "Nenhum item selecionado para deletar!"
        return
    }

    itensADeletar.forEach((item) => {
        // só fica na nova lista de metas o que não for marcado, separa o que ñ vai ser deletado dos que vão ser deletados
        metas = metas.filter((meta) => {
            /* 
            Tocar == Tocar (V) deleta da lista.
            Tocar == Fazer (N) é != mantém na lista
            */
            return meta.value != item
        })
    })

    mensagem = "Meta(s) deleta(s) com sucesso!"
}

const mostrarMensagem = () => {
    console.clear();

    if (mensagem != "") {
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

// Registra a função, iniciar função, começa a percorrer o while 
const start = async () => {
    /*
    await - aguardar, no caso seleção do usuário, para não percorrer tudo de uma vez só

    select é obrigatória ter uma mensagem para mostrar ao usuário, essa mensage é acompanhada do choice nececssário é opções
    */
    while (true) {
        mostrarMensagem()

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
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar metas",
                    value: "deletar"
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
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "deletar":
                await deletarMetas()
                break
            case "logout":
                console.log("Até a próxima!")
                return
        }
    }
}

start()