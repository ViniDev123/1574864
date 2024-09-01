let currentAssetCounter = 0;
let nonCurrentAssetCounter = 0;
let currentLiabilityCounter = 0;
let nonCurrentLiabilityCounter = 0;
let equityCounter = 0;

function addCurrentAsset() {
    currentAssetCounter++;
    const tableBody = document.querySelector('#current-assets-table tbody');
    const row = document.createElement('tr');
    row.id = `current-asset-${currentAssetCounter}`;
    row.innerHTML = `
        <td><input type="text" placeholder="Descrição" /></td>
        <td><input type="number" placeholder="Valor" oninput="updateSummary()" /></td>
        <td><button class="btn" onclick="removeItem('current-asset-${currentAssetCounter}')">Remover</button></td>
    `;
    tableBody.appendChild(row);
    updateSummary();
}

function addNonCurrentAsset() {
    nonCurrentAssetCounter++;
    const tableBody = document.querySelector('#non-current-assets-table tbody');
    const row = document.createElement('tr');
    row.id = `non-current-asset-${nonCurrentAssetCounter}`;
    row.innerHTML = `
        <td><input type="text" placeholder="Descrição" /></td>
        <td><input type="number" placeholder="Valor" oninput="updateSummary()" /></td>
        <td><button class="btn" onclick="removeItem('non-current-asset-${nonCurrentAssetCounter}')">Remover</button></td>
    `;
    tableBody.appendChild(row);
    updateSummary();
}

function addCurrentLiability() {
    currentLiabilityCounter++;
    const tableBody = document.querySelector('#current-liabilities-table tbody');
    const row = document.createElement('tr');
    row.id = `current-liability-${currentLiabilityCounter}`;
    row.innerHTML = `
        <td><input type="text" placeholder="Descrição" /></td>
        <td><input type="number" placeholder="Valor" oninput="updateSummary()" /></td>
        <td><button class="btn" onclick="removeItem('current-liability-${currentLiabilityCounter}')">Remover</button></td>
    `;
    tableBody.appendChild(row);
    updateSummary();
}

function addNonCurrentLiability() {
    nonCurrentLiabilityCounter++;
    const tableBody = document.querySelector('#non-current-liabilities-table tbody');
    const row = document.createElement('tr');
    row.id = `non-current-liability-${nonCurrentLiabilityCounter}`;
    row.innerHTML = `
        <td><input type="text" placeholder="Descrição" /></td>
        <td><input type="number" placeholder="Valor" oninput="updateSummary()" /></td>
        <td><button class="btn" onclick="removeItem('non-current-liability-${nonCurrentLiabilityCounter}')">Remover</button></td>
    `;
    tableBody.appendChild(row);
    updateSummary();
}

function addEquity() {
    equityCounter++;
    const tableBody = document.querySelector('#equity-table tbody');
    const row = document.createElement('tr');
    row.id = `equity-${equityCounter}`;
    row.innerHTML = `
        <td><input type="text" placeholder="Descrição" /></td>
        <td><input type="number" placeholder="Valor" oninput="updateSummary()" /></td>
        <td><button class="btn" onclick="removeItem('equity-${equityCounter}')">Remover</button></td>
    `;
    tableBody.appendChild(row);
    updateSummary();
}

function removeItem(id) {
    document.getElementById(id).remove();
    updateSummary();
}

function updateSummary() {
    const currentAssetInputs = document.querySelectorAll('#current-assets-table input[type="number"]');
    const nonCurrentAssetInputs = document.querySelectorAll('#non-current-assets-table input[type="number"]');
    const currentLiabilityInputs = document.querySelectorAll('#current-liabilities-table input[type="number"]');
    const nonCurrentLiabilityInputs = document.querySelectorAll('#non-current-liabilities-table input[type="number"]');
    const equityInputs = document.querySelectorAll('#equity-table input[type="number"]');
    
    let totalCurrentAssets = 0;
    let totalNonCurrentAssets = 0;
    let totalCurrentLiabilities = 0;
    let totalNonCurrentLiabilities = 0;
    let totalEquity = 0;

    currentAssetInputs.forEach(input => totalCurrentAssets += parseFloat(input.value) || 0);
    nonCurrentAssetInputs.forEach(input => totalNonCurrentAssets += parseFloat(input.value) || 0);
    currentLiabilityInputs.forEach(input => totalCurrentLiabilities += parseFloat(input.value) || 0);
    nonCurrentLiabilityInputs.forEach(input => totalNonCurrentLiabilities += parseFloat(input.value) || 0);
    equityInputs.forEach(input => totalEquity += parseFloat(input.value) || 0);

    const totalAssets = totalCurrentAssets + totalNonCurrentAssets;
    const totalLiabilities = totalCurrentLiabilities + totalNonCurrentLiabilities;

    document.getElementById('total-assets').innerText = totalAssets.toFixed(2);
    document.getElementById('total-liabilities').innerText = totalLiabilities.toFixed(2);
    document.getElementById('total-equity').innerText = totalEquity.toFixed(2);
    document.getElementById('net-worth').innerText = (totalAssets - totalLiabilities).toFixed(2);
}

// Funções de adição, remoção e atualização já existentes...

// Função para salvar dados em um arquivo JSON
function saveData() {
    const data = {
        assets: {
            current: Array.from(document.querySelectorAll('#current-assets-table tbody tr')).map(row => ({
                description: row.querySelector('input[type="text"]').value,
                value: parseFloat(row.querySelector('input[type="number"]').value) || 0
            })),
            nonCurrent: Array.from(document.querySelectorAll('#non-current-assets-table tbody tr')).map(row => ({
                description: row.querySelector('input[type="text"]').value,
                value: parseFloat(row.querySelector('input[type="number"]').value) || 0
            }))
        },
        liabilities: {
            current: Array.from(document.querySelectorAll('#current-liabilities-table tbody tr')).map(row => ({
                description: row.querySelector('input[type="text"]').value,
                value: parseFloat(row.querySelector('input[type="number"]').value) || 0
            })),
            nonCurrent: Array.from(document.querySelectorAll('#non-current-liabilities-table tbody tr')).map(row => ({
                description: row.querySelector('input[type="text"]').value,
                value: parseFloat(row.querySelector('input[type="number"]').value) || 0
            }))
        },
        equity: Array.from(document.querySelectorAll('#equity-table tbody tr')).map(row => ({
            description: row.querySelector('input[type="text"]').value,
            value: parseFloat(row.querySelector('input[type="number"]').value) || 0
        }))
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'balanco_patrimonial.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Função para exportar dados para Excel
function exportToExcel() {
    const wb = XLSX.utils.book_new();
    
    // Função para adicionar uma planilha
    const addSheet = (name, tableId) => {
        const table = document.getElementById(tableId);
        const ws = XLSX.utils.table_to_sheet(table);
        XLSX.utils.book_append_sheet(wb, ws, name);
    };

    addSheet('Ativo Circulante', 'current-assets-table');
    addSheet('Ativo Não Circulante', 'non-current-assets-table');
    addSheet('Passivo Circulante', 'current-liabilities-table');
    addSheet('Passivo Não Circulante', 'non-current-liabilities-table');
    addSheet('Patrimônio Líquido', 'equity-table');
    
    XLSX.writeFile(wb, 'balanco_patrimonial.xlsx');
}

