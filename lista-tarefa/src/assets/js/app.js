let counter = 0;

function adicionarTarefa() {
    const novaTarefa = document.getElementById('input_nova_tarefa').value;
    criaNovaTarefa(novaTarefa);
};

function criaNovaTarefa(textoTarefa) {
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
    cellEditar.appendChild(criaInputButtonEditarTarefa(idTarefa));
    cellDeletar.appendChild(criaInputButtonDeletarTarefa(rowId));

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
        if ((i) % 2 == 0)
            linhasTabela[i].style.background = "#A9A9A9";
        else
            linhasTabela[i].style.background = "lightgrey";
    }

    counter++;
}

function criaInputCheckBoxTarefa(idTarefa) {
    const inputTarefa = document.createElement('input');
    inputTarefa.type = 'checkbox';
    inputTarefa.setAttribute('onclick', `mudaEstadoTarefa('${idTarefa}')`);
    return inputTarefa;
}

function criaInputButtonEditarTarefa(idTarefa) {
    var btnEdit = document.createElement('input');
    btnEdit.id = "buttonEditar";
    btnEdit.type = "button";
    btnEdit.value = 'Editar';
    btnEdit.className = "btn_generic btn_editar";
    btnEdit.setAttribute('onclick', `alterarTarefa('${idTarefa}')`);
    return btnEdit;
}

function criaInputButtonDeletarTarefa(rowId) {
    var btnDelet = document.createElement('input');
    btnDelet.id = "buttonDeletar";
    btnDelet.type = "button";
    btnDelet.value = 'Deletar';
    btnDelet.className = "btn_generic btn_deletar";
    btnDelet.setAttribute('onclick', `deletarTarefa('${rowId}')`);
    return btnDelet;
}

function mudaEstadoTarefa(idTarefa) {
    const tarefaSelecionada = document.getElementById(idTarefa);
    if (tarefaSelecionada.style.textDecoration == 'line-through') {
        tarefaSelecionada.style = 'text-decoration: none;'
    } else {
        tarefaSelecionada.style = 'text-decoration: line-through;'
    }
}

function alterarTarefa(idTarefa) {
    const tarefaSelecionada = document.getElementById(idTarefa);
    if (tarefaSelecionada.style.textDecoration == 'line-through') {
        tarefaSelecionada.style = 'text-decoration: none;'
    } else {
        tarefaSelecionada.style = 'text-decoration: line-through;'
    }
}

function deletarTarefa(rowId) {
    var row = document.createElement("tr");
    var row = document.getElementById(rowId);
    row.parentNode.removeChild(row);
    alert(`Deletando tarefa: ${rowId}`);
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