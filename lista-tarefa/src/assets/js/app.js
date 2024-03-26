
function adicionarTarefa() {
    const novaTarefa = document.getElementById('input_nova_tarefa').value;
    criaNovaTarefa(novaTarefa);
};

function criaNovaTarefa(textoTarefa) {
    const listaTarefas = document.getElementById('lista_de_tarefas');
    let quantidade = listaTarefas.children.length;
    const novoItem = document.createElement('li');
    novoItem.innerText = textoTarefa;
    novoItem.id = `tarefa_id_${quantidade}`;
    novoItem.appendChild(criaInputCheckBoxTarefa(novoItem.id));

    listaTarefas.appendChild(novoItem);
    console.log(`Tarefa adicionada: ${textoTarefa}`);
}

function criaInputCheckBoxTarefa(idTarefa) {
    const inputTarefa = document.createElement('input');
    inputTarefa.type = 'checkbox';
    inputTarefa.setAttribute('onclick', `mudaEstadoTarefa('${idTarefa}')`);
    return inputTarefa;
}

function mudaEstadoTarefa(idTarefa) {
    const tarefaSelecionada = document.getElementById(idTarefa);
    if (tarefaSelecionada.style.textDecoration == 'line-through') {
        tarefaSelecionada.style = 'text-decoration: none;'
    } else {
        tarefaSelecionada.style = 'text-decoration: line-through;'
    }
}

function adicionaListaTarefaLocalStorage() {
    const localStorage = window.localStorage;
    let tarefas = localStorage.getItem('lista_tarefas');
    console.log(`Metodo onload adicionaListaTarefaLocalStorage: ${tarefas}`);
    if (tarefas) {
        // implementar a logica de salvar cada tarefa aqui
        localStorage.setItem('lista_tarefas', tarefas)
    } else {
        // se existir tarefas, então le do localStorage
        // exemplo de leitura localStorage.getItem('lista_tarefas')
        // monta no HTML
    }
}