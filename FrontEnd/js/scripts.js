/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});
function formatarData(data) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const dataFormatada = new Date(data).toLocaleDateString('pt-BR', options);
    return dataFormatada;
}
// Função para carregar os dados da tabela
function loadTableData(data, tableType) {
    var tbody = document.getElementById("tableBody");
    var thead = document.getElementById("tableHead");
    

    if (tbody && thead) {
        tbody.innerHTML = ""; // Limpa o corpo da tabela
        thead.innerHTML = ""; // Limpa o cabeçalho da tabela

        var headerRow = thead.insertRow(0);


        var headers;
        if (tableType === 'clientes') {
            // Cabeçalho específico para clientes
            headers = ['Nome', 'Sobrenome', 'Email', 'Data de Cadastro', 'Salario'];
        } else if (tableType === 'fornecedores') {
            // Cabeçalho específico para fornecedores
            headers = ['Razão', 'Contato', 'CPF/CNPJ', 'Logradouro', 'Cidade', 'UF'];
        }

        for (var i = 0; i < headers.length; i++) {
            var headerCell = headerRow.insertCell(i);
            headerCell.textContent = headers[i];
        }

        for (var i = 0; i < data.length; i++) {
            var newRow = tbody.insertRow(tbody.rows.length);
            var cell1 = newRow.insertCell(0);
            var cell2 = newRow.insertCell(1);
            var cell3 = newRow.insertCell(2);
            var cell4 = newRow.insertCell(3);
            var cell5 = newRow.insertCell(4);
            var cell6 = newRow.insertCell(5);
            var cell7 = newRow.insertCell(6);

            if (tableType === 'clientes') {
                // Lógica específica para clientes
                cell1.innerHTML = data[i].nome;
                cell2.innerHTML = data[i].sobrenome;
                cell3.innerHTML = data[i].email;
                cell4.innerHTML = formatarData(data[i].data_cadastro);
                cell5.innerHTML = data[i].salario;
            } else if (tableType === 'fornecedores') {
                // Lógica específica para fornecedores
                cell1.innerHTML = data[i].razao;
                cell2.innerHTML = data[i].cpf_cnpj;
                cell3.innerHTML = data[i].contato;
                cell4.innerHTML = data[i].logradouro;
                cell5.innerHTML = data[i].cidade;
                cell6.innerHTML = data[i].uf;
            }

            // Adicionando ações às células finais
            if (tableType === 'fornecedores') {
                var actions = `<a href="perfil_Fornecedor.html?id_fornecedor=${data[i].id_fornecedor}">Perfil</a> |
                <a href="perfil_Fornecedor.html?id_fornecedor=${data[i].id_fornecedor}&delete=ok">Delete</a> |
                <a href="atualizar_fornecedor.html?id_fornecedor=${data[i].id_fornecedor}">Atualizar</a>`;
                // Adicione as ações à última célula
                cell7.innerHTML = actions;
            } else if (tableType === 'clientes') {
                var actions = `<a href="perfil_Cliente.html?id_cliente=${data[i].id_cliente}">Perfil</a> |
                <a href="perfil_Cliente.html?id_cliente=${data[i].id_cliente}&delete=ok">Delete</a> |
                <a href="atualizar_cliente.html?id_cliente=${data[i].id_cliente}">Atualizar</a>`;
                // Adicione as ações à última célula
                cell6.innerHTML = actions;
            }
        }
    } else {
        return 
    }
}

// Função para carregar dados com base no tipo de tabela (clientes ou fornecedores)
function loadTable(type) {
    localStorage.setItem('selectedTableType', type);
            // Requisição axios para obter dados
            var url = type === 'clientes' ? 'http://localhost:3013/clientes_all' : 'http://localhost:3013/fornecedores_all';

            axios.get(url)
                .then(res => {
                    console.log(type, res);
                    // Chame a função para carregar os dados da tabela com os dados obtidos
                    loadTableData(res.data, type);
                })
                .catch(error => {
                    console.error('Erro ao obter dados:', error);
                });
}

// Função para atualizar o título da tabela
function updateTableTitle(title) {
    var tableTitle = document.getElementById('tableTitle');
    if (tableTitle) {
        tableTitle.textContent = title;
    }
}

// Função para mostrar/ocultar seções com base no tipo

// Adicione os eventos de clique nos links
document.getElementById('sidenavAccordionFornecedores').addEventListener('click', function () {
    updateTableTitle('Fornecedores');
    loadTable('fornecedores');
    
});

document.getElementById('sidenavAccordionClientes').addEventListener('click', function () {
    updateTableTitle('Clientes');
    loadTable('clientes');
    
});


var selectedTableType = localStorage.getItem('selectedTableType');
if (selectedTableType) {
    updateTableTitle(selectedTableType.charAt(0).toUpperCase() + selectedTableType.slice(1));
    loadTable(selectedTableType);
} else {
    // Se não houver tipo armazenado, carregar a tabela de clientes por padrão
    updateTableTitle('Clientes');
    loadTable('clientes');
}



