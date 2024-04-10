const localStorage = window.localStorage;
let tarefaArrayLista = localStorage.getItem('tasksList') ? JSON.parse(localStorage.getItem('tasksList')) : [];
localStorage.setItem('tasksList', JSON.stringify(tarefaArrayLista));

class TarefaObj {
    constructor(id, descricao, status) {
        this.id = id;
        this.descricao = descricao;
        this.status = status;
    }
}

window.onload = function () {
    const dadosLocalStorage = JSON.parse(localStorage.getItem('tasksList'));
    dadosLocalStorage.forEach(item => {
        criaNovaTarefa(item, false)
    });
};

function addTask() {
    const novaTarefa = document.getElementById('input_nova_tarefa').value;
    if (novaTarefa == null || novaTarefa == '') {
        swal('OPS!, Enter the task description.', {
            button: {
                text: "OK",
            },
        });
        return;
    }
    const table = document.getElementById("table");
    let quantidade = table.children.length;
    let objTarefa = new TarefaObj();
    objTarefa.id = quantidade;
    objTarefa.descricao = novaTarefa;
    objTarefa.status = false;
    criaNovaTarefa(objTarefa, true);
};

function criaNovaTarefa(objTar, vemCadastrado) {
    let temItem = false;

    for (var i = 0; i < tarefaArrayLista.length; i++) {
        if (tarefaArrayLista[i].descricao.trim() == objTar.descricao.trim()) {
            temItem = true;
            break;
        }
    }
    const table = document.getElementById("table");
    let quantidade = table.children.length;
    if (!temItem) {
        let objTarefa = new TarefaObj();
        objTarefa.id = quantidade;
        objTarefa.descricao = objTar.descricao;
        objTarefa.status = false;
        tarefaArrayLista.push(objTarefa);
    } else if (temItem && vemCadastrado) {
        alert('OPS!, This task has already been registered.');
        return;
    }

    const novaTarefa = document.createElement('td');
    novaTarefa.innerText = objTar.descricao;
    const taskId = `tarefa_id_${quantidade}`;
    novaTarefa.id = taskId;
    novaTarefa.appendChild(criaInputCheckBoxTarefa(taskId));

    // Create two new cells
    var cellTextoTarefa = document.createElement("td");
    cellTextoTarefa.id = taskId;
    cellTextoTarefa.innerHTML = objTar.descricao;

    var cellCheckBox = document.createElement("td");
    var cellEditar = document.createElement("td");
    var cellDeletar = document.createElement("td");
    const rowId = `row_id_${quantidade}`;

    cellCheckBox.appendChild(criaInputCheckBoxTarefa(taskId));
    cellEditar.appendChild(criaButtonGeneric('Editar', 'btn_editar', `modalEdicaoTarefa('${taskId}')`));
    cellDeletar.appendChild(criaButtonGeneric('Deletar', 'btn_deletar', `deletarTarefa('${rowId}')`));

    var row = document.createElement("tr");
    row.id = rowId;
    row.appendChild(cellTextoTarefa);
    row.appendChild(cellCheckBox);
    row.appendChild(cellEditar);
    row.appendChild(cellDeletar);

    table.appendChild(row);// Adiciona a linha na tabela
    const inputNovaTarefa = document.getElementById('input_nova_tarefa');
    inputNovaTarefa.value = ''; // Limpa o input de tarefa
    document.getElementById("input_nova_tarefa").focus(); // Seta o foco no input

    const idInputChecked = `checkbox_${taskId}`;

    if (!objTar.status) {
        row.style = 'text-decoration: none;';
        document.getElementById(idInputChecked).checked = false;
    } else {
        row.style = 'text-decoration: line-through;';
        document.getElementById(idInputChecked).checked = true;
    }

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

    localStorage.setItem('tasksList', JSON.stringify(tarefaArrayLista))
}

function criaInputCheckBoxTarefa(taskId) {
    const inputTarefa = document.createElement('input');
    inputTarefa.id = `checkbox_${taskId}`;
    inputTarefa.type = 'checkbox';
    inputTarefa.setAttribute('onclick', `mudaEstadoTarefa('${taskId}')`);
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

function mudaEstadoTarefa(taskId) {
    const tarefa = document.getElementById(taskId).innerHTML;
    let indexItem = -1;
    let objTarefa = new TarefaObj();
    objTarefa.id = indexItem;
    objTarefa.descricao = tarefa;

    for (var i = 0; i < tarefaArrayLista.length; i++) {
        if (tarefaArrayLista[i].descricao.trim() == tarefa.trim()) {
            objTarefa.status = !tarefaArrayLista[i].status;
            indexItem = i;
            break;
        } else {
            objTarefa.status = tarefaArrayLista[i].status;
        }
    }
    let idRowSelected = taskId.replace('tarefa_id_', 'row_id_');
    const rowSelected = document.getElementById(idRowSelected);

    if (!objTarefa.status) {
        rowSelected.style = 'text-decoration: none;';
    } else {
        rowSelected.style = 'text-decoration: line-through;';
    }

    tarefaArrayLista.splice(indexItem, 1);
    tarefaArrayLista.push(objTarefa);
    localStorage.setItem('tasksList', JSON.stringify(tarefaArrayLista));
}

function modalEdicaoTarefa(taskId) {
    const taskSelected = document.getElementById(taskId).innerHTML;
    //let tarefaAlterada = prompt('Changing task', taskSelected);

    // Documentação do exemplo: https://sweetalert.js.org/guides/ AND https://sweetalert2.github.io/#examples
    swal({
        title: 'Changing task!',
        content: "input",
        content: {
            element: "input",
            attributes: {
                placeholder: "Please inform the task",
                value: taskSelected,
            },
        },
        closeModal: false,
        closeOnClickOutside: false,
        closeOnEsc: false,
        height: 250,
    }).then((newValue) => {
        if (newValue) {
            update(newValue, taskId)
        } else {
            swal('Observation!', 'This task has not changed.', "info");
        }
    });
}

function update(newValue, taskId) {
    document.getElementById(taskId).innerHTML = newValue;
    let indexItem = taskId.replace('tarefa_id_', '');
    let status = false;
    if (newValue != null) {
        for (var i = 0; i < tarefaArrayLista.length; i++) {
            if (tarefaArrayLista[i].descricao.trim() == newValue.trim()) {
                status = tarefaArrayLista[i].status;
                temItem = true;
                break;
            }
        }
        indexItem = (indexItem - 1);
        let objTarefa = new TarefaObj();
        objTarefa.id = indexItem;
        objTarefa.descricao = newValue;
        objTarefa.status = status;
        tarefaArrayLista.splice(indexItem, 1);
        tarefaArrayLista.push(objTarefa);
        localStorage.setItem('tasksList', JSON.stringify(tarefaArrayLista));
    }
}

function deletarTarefa(rowId) {
    var row = document.createElement("tr");
    var row = document.getElementById(rowId);
    swal({
        title: "Do you really want to delete this task?",
        icon: "info",
        buttons: ["Cancel", "Delete"],
        dangerMode: true,

    }).then((willDelete) => {
        if (willDelete) {
            const id = rowId.replace("row_id_", '')
            row.parentNode.removeChild(row);
            tarefaArrayLista.splice(id - 1, 1);
            localStorage.setItem('tasksList', JSON.stringify(tarefaArrayLista));
            swal("Task deleted successfully!", {
                icon: "warning",
                timer: 2000,
            });
        }
    });
}
