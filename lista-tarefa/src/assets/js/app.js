const localStorage = window.localStorage;
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : []
localStorage.setItem('items', JSON.stringify(itemsArray))
const data = JSON.parse(localStorage.getItem('items'))

data.forEach(item => {
    criaNovaTarefa(item, false)
});

function adicionarTarefa() {
    const novaTarefa = document.getElementById('input_nova_tarefa').value;
    criaNovaTarefa(novaTarefa, true);
};

function criaNovaTarefa(textoTarefa, vemCadastrado) {
    let temItem = false;
    console.log('Verificando item');
    for (var i = 0; i < itemsArray.length; i++) {
        if (itemsArray[i].trim() == textoTarefa.trim()) {
            temItem = true;
            break;
        }
    }
    if (!temItem) {
        itemsArray.push(textoTarefa);
    } else if (temItem && vemCadastrado) {
        alert('OPS!, Essa tarefa já foi cadastra.');
        return;
    }
    const table = document.getElementById("table");
    let quantidade = table.children.length;
    const novaTarefa = document.createElement('td');
    novaTarefa.innerText = textoTarefa;
    const idTarefa = `tarefa_id_${quantidade}`;
    novaTarefa.id = idTarefa;
    novaTarefa.appendChild(criaInputCheckBoxTarefa(idTarefa));

    // Create a new row
    var row = document.createElement("tr");
    // Create two new cells
    var cellTextoTarefa = document.createElement("td");
    cellTextoTarefa.id = idTarefa;
    cellTextoTarefa.innerHTML = textoTarefa;

    var cellCheckBox = document.createElement("td");
    var cellEditar = document.createElement("td");
    var cellDeletar = document.createElement("td");
    const rowId = `row_id_${quantidade}`;

    cellCheckBox.appendChild(criaInputCheckBoxTarefa(idTarefa));
    cellEditar.appendChild(criaButtonGeneric('Editar', 'btn_editar', `alterarTarefa('${idTarefa}')`));
    cellDeletar.appendChild(criaButtonGeneric('Deletar', 'btn_deletar', `deletarTarefa('${rowId}')`));

    // Adiciona as celulas na linha atual
    row.id = rowId;
    row.appendChild(cellTextoTarefa);
    row.appendChild(cellCheckBox);
    row.appendChild(cellEditar);
    row.appendChild(cellDeletar);
    row.style

    // Append the row to the table
    table.appendChild(row);// Adiciona a linha na tabela
    const inputNovaTarefa = document.getElementById('input_nova_tarefa');
    inputNovaTarefa.value = ''; // Limpa o input de tarefa
    document.getElementById("input_nova_tarefa").focus(); // Seta o foco no input

    var linhasTabela = document.getElementsByTagName("tr");
    for (var i = 0; i < linhasTabela.length; i++) {
        if (i == 0) continue;// Não pinta o cabeçalho da tabela
        if ((i) % 2 == 0) {
            linhasTabela[i].className = "styleOne";
        }
        else {
            linhasTabela[i].className = "styleTwo";
        }
    }

    localStorage.setItem('items', JSON.stringify(itemsArray))
}

function criaInputCheckBoxTarefa(idTarefa) {
    const inputTarefa = document.createElement('input');
    inputTarefa.type = 'checkbox';
    inputTarefa.setAttribute('onclick', `mudaEstadoTarefa('${idTarefa}')`);
    return inputTarefa;
}

function criaButtonGeneric(nome, className, funcao) {
    var button = document.createElement('input');
    button.id = "buttonEditar";
    button.type = "button";
    button.value = nome;
    button.className = `btn_generic ${className}`;
    button.setAttribute('onclick', funcao);
    return button;
}

function mudaEstadoTarefa(idTarefa) {
    const tarefaSelecionada = document.getElementById(idTarefa)
    if (tarefaSelecionada.style.textDecoration == 'line-through') {
        tarefaSelecionada.style = 'text-decoration: none;'
    } else {
        tarefaSelecionada.style = 'text-decoration: line-through;'
    }
}

function alterarTarefa(idTarefa) {
    const tarefaSelecionada = document.getElementById(idTarefa).innerHTML;
    let tarefaAlterada = prompt('Alterando tarefa', tarefaSelecionada);
    if (tarefaAlterada != null) {
        document.getElementById(idTarefa).innerHTML = tarefaAlterada;
        let indexItem = -1;
        for (var i = 0; i < itemsArray.length; i++) {
            if (itemsArray[i].trim() == tarefaAlterada.trim()) {
                temItem = true;
                indexItem = i;
                break;
            }
        }

        itemsArray.splice(indexItem, 1);

        itemsArray.push(tarefaAlterada);
        localStorage.setItem('items', JSON.stringify(itemsArray))
    }

}

function deletarTarefa(rowId) {
    var row = document.createElement("tr");
    var row = document.getElementById(rowId);
    if (confirm("Deseja conformar essa ação?")) {
        row.parentNode.removeChild(row);
        console.log(`Deletando tarefa: ${rowId}`);
    }
    else {
        console.log('Ação abortada tarefa');
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