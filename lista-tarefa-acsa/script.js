
function adicionaTarefaNaLista() {
    // debugger - descomentar para acompanhar o fluxo da pagina
    // seleciona o elemento de input text que tem o texto da nova tarefa
    const novaTarefa = document.getElementById('input_nova_tarefa').value
    criaNovoItemDaLista(novaTarefa)
}

function criaNovoItemDaLista(textoDaTarefa) {
    // recupera a lista de tarefas
    const listaTarefas = document.getElementById('lista_de_tarefas')
    // guarda o tamanho da lista de tarefas
    let qtdTarefas   = listaTarefas.children.length

    // cria um novo elemento do tipo li (lista)
    const novoItem = document.createElement('li')

    // adiciona o texto digitado no texto da tarefa
    novoItem.innerText = textoDaTarefa
    // adiciona um ID no novo elemento
    novoItem.id = `tarefa_id_${qtdTarefas++}`

    novoItem.appendChild(criaInputCheckBoxTarefa(novoItem.id))

    listaTarefas.appendChild(novoItem)
}


function criaInputCheckBoxTarefa(idTarefa) {
    // cria o elemento de input
    const inputTarefa = document.createElement('input')
    // seta o elemento para ser do tipo checkbox
    inputTarefa.type = 'checkbox'
    // seta o onclick do input
    inputTarefa.setAttribute('onclick', `mudaEstadoTarefa('${idTarefa}')`)
    return inputTarefa
}

function mudaEstadoTarefa(idTarefa) {
    const tarefaSelecionada = document.getElementById(idTarefa)
    if (tarefaSelecionada.style.textDecoration == 'line-through') {
        tarefaSelecionada.style = 'text-decoration: none;'
    } else {
        tarefaSelecionada.style = 'text-decoration: line-through;'
    }    
}

/*
function newTask(){
    const localStorageKey = 'to-do-list';
    localStorage.setItem(localStorageKey, '{"name" : "Acsa" , "age" : 30 }');
    let input = document.getElementById('digite_nova_tarefa');

        //validação
        if(!input.value){
            alert('Digite algo para inserir em sua lista')
        }
        else{
            //incrementa no local storage 
            let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
            values.push({
                name: input.value
            })
            console.log(values)
        }
}*/