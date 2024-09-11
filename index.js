/*
meta - Objeto
isChecked: () => {} - Função
*/
let meta = {
    value: 'Começar a dormir mais cedo, no mínimo 6 horas por dia.',
    checked: false,
    log: (info) => {
        console.log(info)
    }
}

meta.value = "Não dormir mais no mínimo 6 horas"
meta.log(meta.value);


// function  // arrow function
const criarMeta = () => {}