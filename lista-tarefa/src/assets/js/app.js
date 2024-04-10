const localStorage = window.localStorage;
let tarefaArrayLista = localStorage.getItem('listTarefas') ? JSON.parse(localStorage.getItem('listTarefas')) : [];
localStorage.setItem('listTarefas', JSON.stringify(tarefaArrayLista));

class TarefaObj {
    constructor(id, descricao, status) {
        this.id = id;
        this.descricao = descricao;
        this.status = status;
    }
}

window.onload = function () {
    const dadosLocalStorage = JSON.parse(localStorage.getItem('listTarefas'));
    dadosLocalStorage.forEach(item => {
        criaNovaTarefa(item, false)
    });
};

function adicionarTarefa() {
    const novaTarefa = document.getElementById('input_nova_tarefa').value;
    if (novaTarefa == null || novaTarefa == '') {
        swal('OPS!, Innforme a descrição da tarefa.', {
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
        alert('OPS!, Essa tarefa já foi cadastrada.');
        return;
    }

    const novaTarefa = document.createElement('td');
    novaTarefa.innerText = objTar.descricao;
    const idTarefa = `tarefa_id_${quantidade}`;
    novaTarefa.id = idTarefa;
    novaTarefa.appendChild(criaInputCheckBoxTarefa(idTarefa));

    // Create a new row
    var row = document.createElement("tr");
    // Create two new cells
    var cellTextoTarefa = document.createElement("td");
    cellTextoTarefa.id = idTarefa;
    cellTextoTarefa.innerHTML = objTar.descricao;

    var cellCheckBox = document.createElement("td");
    var cellEditar = document.createElement("td");
    var cellDeletar = document.createElement("td");
    const rowId = `row_id_${quantidade}`;

    cellCheckBox.appendChild(criaInputCheckBoxTarefa(idTarefa));
    cellEditar.appendChild(criaButtonGeneric('Editar', 'btn_editar', `modalEdicaoTarefa('${idTarefa}')`));
    cellDeletar.appendChild(criaButtonGeneric('Deletar', 'btn_deletar', `deletarTarefa('${rowId}')`));

    // Adiciona as celulas na linha atual
    row.id = rowId;
    row.appendChild(cellTextoTarefa);
    row.appendChild(cellCheckBox);
    row.appendChild(cellEditar);
    row.appendChild(cellDeletar);

    // Append the row to the table
    table.appendChild(row);// Adiciona a linha na tabela
    const inputNovaTarefa = document.getElementById('input_nova_tarefa');
    inputNovaTarefa.value = ''; // Limpa o input de tarefa
    document.getElementById("input_nova_tarefa").focus(); // Seta o foco no input

    const idInputChecked = `checkbox_${idTarefa}`;

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

    localStorage.setItem('listTarefas', JSON.stringify(tarefaArrayLista))
}

function criaInputCheckBoxTarefa(idTarefa) {
    const inputTarefa = document.createElement('input');
    inputTarefa.id = `checkbox_${idTarefa}`;
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
    const tarefa = document.getElementById(idTarefa).innerHTML;
    row_id_3

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
    let idRowSelected = idTarefa.replace('tarefa_id_', 'row_id_');
    const rowSelected = document.getElementById(idRowSelected);

    if (!objTarefa.status) {
        rowSelected.style = 'text-decoration: none;';
    } else {
        rowSelected.style = 'text-decoration: line-through;';
    }

    tarefaArrayLista.splice(indexItem, 1);
    tarefaArrayLista.push(objTarefa);
    localStorage.setItem('listTarefas', JSON.stringify(tarefaArrayLista));
}

function modalEdicaoTarefa(idTarefa) {
    const inputValue = document.getElementById(idTarefa).innerHTML;
    //let tarefaAlterada = prompt('Alterando tarefa', tarefaSelecionada);

    // Documentação do exemplo: https://sweetalert.js.org/guides/ AND https://sweetalert2.github.io/#examples
    swal({
        title: 'Alterando tarefa!',
        content: "input",
        content: {
            element: "input",
            attributes: {
                placeholder: "POr favor informe a tarefa",
                value: inputValue,
            },
        },
        closeModal: false,
        closeOnClickOutside: false,
        closeOnEsc: false,
        height: 250,
    }).then((newValue) => {
        if (newValue) {
            update(newValue, idTarefa)
        } else {
            swal('Observação!', 'Não teve alteração nessa tarefa.', "info");
        }
    });
}

function update(newValue, idTarefa) {
    document.getElementById(idTarefa).innerHTML = newValue;
    let indexItem = idTarefa.replace('tarefa_id_', '');
    let status = false;
    if (newValue != null) {
        for (var i = 0; i < tarefaArrayLista.length; i++) {
            status = tarefaArrayLista[i].status;
            if (tarefaArrayLista[i].descricao.trim() == newValue.trim()) {
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
        localStorage.setItem('listTarefas', JSON.stringify(tarefaArrayLista));
    }
}

function deletarTarefa(rowId) {
    var row = document.createElement("tr");
    var row = document.getElementById(rowId);
    swal({
        title: "Deseja realmente desejar essa tarefa?",
        icon: "info",
        buttons: ["Cancelar", "Excluir"],
        dangerMode: true,

    }).then((willDelete) => {
        if (willDelete) {
            const id = rowId.replace("row_id_", '')
            row.parentNode.removeChild(row);
            tarefaArrayLista.splice(id - 1, 1);
            localStorage.setItem('listTarefas', JSON.stringify(tarefaArrayLista));
            swal("Tarefa excluida com sucesso!", {
                icon: "warning",
                timer: 2000,
            });
        }
    });
}
