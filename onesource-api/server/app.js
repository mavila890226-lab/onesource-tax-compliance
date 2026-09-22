app.js
const API_BASE_URL = 'http://localhost:3000/api';

// ============================================
// FUNCIONES DE CARGA DE DATOS
// ============================================

async function loadDashboard() {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard`);
    const data = await response.json();
    
    document.getElementById('metric-jurisdictions').textContent = data.jurisdictions;
    document.getElementById('metric-compliance').textContent = data.complianceRate + '%';
    document.getElementById('metric-inactive').textContent = data.inactiveUsers;
    document.getElementById('metric-filings').textContent = data.pendingFilings;
    document.getElementById('last-update').textContent = new Date(data.lastUpdate).toLocaleString('es-ES');
    
    loadLatestTransactions();
    loadInactiveUsers();
    updateServerStatus(true);
  } catch (error) {
    console.error('Error cargando dashboard:', error);
    updateServerStatus(false);
  }
}

async function loadJurisdictions() {
  try {
    const response = await fetch(`${API_BASE_URL}/jurisdictions`);
    const jurisdictions = await response.json();
    
    const tbody = document.querySelector('#jurisdictions-table tbody');
    tbody.innerHTML = '';
    
    jurisdictions.forEach(j => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${j.flag}</td>
        <td>${j.name}</td>
        <td>${j.taxRate}%</td>
        <td><span class="status-badge ${j.status.toLowerCase().replace(' ', '-')}">${j.status}</span></td>
        <td>${j.activity}</td>
      `;
      tbody.appendChild(row);
    });
    
    updateServerStatus(true);
  } catch (error) {
    console.error('Error cargando jurisdicciones:', error);
    updateServerStatus(false);
  }
}

async function loadUsers() {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    const users = await response.json();
    
    const tbody = document.querySelector('#users-table tbody');
    tbody.innerHTML = '';
    
    users.forEach(u => {
      const row = document.createElement('tr');
      const statusClass = u.daysInactive > 10 ? 'inactive' : 'active';
      row.innerHTML = `
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.lastActivity}</td>
        <td><span class="status-badge ${statusClass}">${statusClass === 'inactive' ? 'Inactivo' : 'Activo'}</span></td>
        <td>${u.daysInactive} días</td>
        <td><button class="btn btn-small" onclick="reengageUser(${u.id})">Re-activar</button></td>
      `;
      tbody.appendChild(row);
    });
    
    updateServerStatus(true);
  } catch (error) {
    console.error('Error cargando usuarios:', error);
    updateServerStatus(false);
  }
}

async function loadTransactions() {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions`);
    const transactions = await response.json();
    
    const tbody = document.querySelector('#transactions-table tbody');
    tbody.innerHTML = '';
    
    transactions.forEach(t => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${t.date}</td>
        <td>$${t.amount.toLocaleString()}</td>
        <td>${t.jurisdiction}</td>
        <td>${t.type}</td>
        <td><span class="status-badge ${t.status.toLowerCase()}">${t.status}</span></td>
      `;
      tbody.appendChild(row);
    });
    
    updateServerStatus(true);
  } catch (error) {
    console.error('Error cargando transacciones:', error);
    updateServerStatus(false);
  }
}

async function loadFilings() {
  try {
    const response = await fetch(`${API_BASE_URL}/filings`);
    const filings = await response.json();
    
    const tbody = document.querySelector('#filings-table tbody');
    tbody.innerHTML = '';
    
    filings.forEach(f => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${f.jurisdiction}</td>
        <td>${f.dueDate}</td>
        <td>${f.type}</td>
        <td>$${f.amount.toLocaleString()}</td>
        <td><span class="status-badge ${f.status.toLowerCase()}">${f.status}</span></td>
        <td><button class="btn btn-small" onclick="submitFiling(${f.id})">Enviar</button></td>
      `;
      tbody.appendChild(row);
    });
    
    updateServerStatus(true);
  } catch (error) {
    console.error('Error cargando filings:', error);
    updateServerStatus(false);
  }
}

async function loadLatestTransactions() {
  try {
    const response = await fetch(`${API_BASE_URL}/transactions`);
    const transactions = await response.json();
    
    const tbody = document.querySelector('#latest-transactions tbody');
    tbody.innerHTML = '';
    
    transactions.slice(0, 4).forEach(t => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${t.date}</td>
        <td>$${t.amount.toLocaleString()}</td>
        <td>${t.jurisdiction}</td>
        <td>${t.type}</td>
        <td><span class="status-badge ${t.status.toLowerCase()}">${t.status}</span></td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error('Error cargando últimas transacciones:', error);
  }
}

async function loadInactiveUsers() {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    const users = await response.json();
    
    const tbody = document.querySelector('#inactive-users-table tbody');
    tbody.innerHTML = '';
    
    users.filter(u => u.daysInactive > 5).forEach(u => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.lastActivity}</td>
        <td>${u.daysInactive} días</td>
        <td><button class="btn btn-small" onclick="reengageUser(${u.id})">Re-activar</button></td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error('Error cargando usuarios inactivos:', error);
  }
}

// ============================================
// FUNCIONES DE BÚSQUEDA
// ============================================

function setupSearch() {
  document.getElementById('search-jurisdictions')?.addEventListener('keyup', filterTable);
  document.getElementById('search-users')?.addEventListener('keyup', filterTable);
  document.getElementById('search-transactions')?.addEventListener('keyup', filterTable);
  document.getElementById('search-filings')?.addEventListener('keyup', filterTable);
}

function filterTable(e) {
  const searchTerm = e.target.value.toLowerCase();
  const tableId = e.target.id.replace('search-', '') + '-table';
  const table = document.getElementById(tableId);
  
  if (!table) return;
  
  const rows = table.querySelectorAll('tbody tr');
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(searchTerm) ? '' : 'none';
  });
}

// ============================================
// FUNCIONES DE EXPORTACIÓN
// ============================================

async function exportData(type) {
  try {
    const response = await fetch(`${API_BASE_URL}/${type}`);
    const data = await response.json();
    
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Error exportando datos:', error);
    alert('Error al exportar datos');
  }
}

function loadCSV() {
  const fileInput = document.getElementById('csv-upload');
  const file = fileInput.files[0];
  
  if (!file) {
    alert('Por favor selecciona un archivo CSV');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = (e) => {
    const csv = e.target.result;
    console.log('CSV cargado:', csv);
    alert('Archivo CSV cargado correctamente');
  };
  reader.readAsText(file);
}

// ============================================
// FUNCIONES DE ACCIÓN
// ============================================

function reengageUser(userId) {
  alert(`Usuario ${userId} re-activado`);
  loadUsers();
}

function submitFiling(filingId) {
  alert(`Filing ${filingId} enviado`);
  loadFilings();
}

function updateServerStatus(isOnline) {
  const statusIndicator = document.getElementById('status-indicator');
  const statusText = document.getElementById('status-text');
  const serverStatus = document.getElementById('server-status');
  
  if (isOnline) {
    statusIndicator.classList.add('online');
    statusIndicator.classList.remove('offline');
    statusText.textContent = 'Conectado';
    serverStatus.textContent = 'En línea';
  } else {
    statusIndicator.classList.remove('online');
    statusIndicator.classList.add('offline');
    statusText.textContent = 'Desconectado';
    serverStatus.textContent = 'Fuera de línea';
  }
}

// ============================================
// NAVEGACIÓN DE TABS
// ============================================

function setupTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remover clase active de todos los botones
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Remover clase active de todos los contenidos
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });
      
      // Mostrar el contenido seleccionado
      const tabName = button.getAttribute('data-tab');
      const tabContent = document.getElementById(tabName);
      if (tabContent) {
        tabContent.classList.add('active');
        
        // Cargar datos según la pestaña
        if (tabName === 'dashboard') loadDashboard();
        else if (tabName === 'jurisdictions') loadJurisdictions();
        else if (tabName === 'users') loadUsers();
        else if (tabName === 'transactions') loadTransactions();
        else if (tabName === 'filings') loadFilings();
      }
    });
  });
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  setupSearch();
  loadDashboard();
});