const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));

// Datos simulados
const jurisdictions = [
  { id: 1, name: 'California', flag: '🇺🇸', taxRate: 7.25, status: 'Compliant', activity: 'High' },
  { id: 2, name: 'Texas', flag: '🇺🇸', taxRate: 6.25, status: 'Compliant', activity: 'High' },
  { id: 3, name: 'New York', flag: '🇺🇸', taxRate: 8.875, status: 'Compliant', activity: 'High' },
  { id: 4, name: 'Ontario', flag: '🇨🇦', taxRate: 13, status: 'Compliant', activity: 'High' },
  { id: 5, name: 'Mexico', flag: '🇲🇽', taxRate: 16, status: 'Compliant', activity: 'High' },
  { id: 6, name: 'Brazil', flag: '🇧🇷', taxRate: 18, status: 'At Risk', activity: 'High' },
  { id: 7, name: 'UK', flag: '🇬🇧', taxRate: 20, status: 'In Review', activity: 'Medium' },
  { id: 8, name: 'Germany', flag: '🇩🇪', taxRate: 19, status: 'Compliant', activity: 'Medium' },
  { id: 9, name: 'France', flag: '🇫🇷', taxRate: 20, status: 'Compliant', activity: 'Low' },
  { id: 10, name: 'Singapore', flag: '🇸🇬', taxRate: 8, status: 'Compliant', activity: 'High' }
];

const users = [
  { id: 1, name: 'John Davis', email: 'john.davis@company.com', lastActivity: '2026-09-15', daysInactive: 6 },
  { id: 2, name: 'Maria López', email: 'maria.lopez@company.com', lastActivity: '2026-09-12', daysInactive: 9 },
  { id: 3, name: 'Emma Chen', email: 'emma.chen@company.com', lastActivity: '2026-09-10', daysInactive: 11 },
  { id: 4, name: 'Robert Smith', email: 'robert.smith@company.com', lastActivity: '2026-09-08', daysInactive: 13 }
];

const transactions = [
  { id: 1, date: '2026-09-21', amount: 15000, jurisdiction: 'California', type: 'Sales', status: 'Completed' },
  { id: 2, date: '2026-09-20', amount: 8500, jurisdiction: 'Texas', type: 'Purchase', status: 'Completed' },
  { id: 3, date: '2026-09-19', amount: 22000, jurisdiction: 'Ontario', type: 'Sales', status: 'Pending' },
  { id: 4, date: '2026-09-18', amount: 5200, jurisdiction: 'Mexico', type: 'Purchase', status: 'Completed' }
];

const filings = [
  { id: 1, jurisdiction: 'California', dueDate: '2026-09-30', type: 'Monthly', amount: 5000, status: 'Pending' },
  { id: 2, jurisdiction: 'Texas', dueDate: '2026-10-15', type: 'Quarterly', amount: 12000, status: 'Pending' },
  { id: 3, jurisdiction: 'Ontario', dueDate: '2026-09-25', type: 'Monthly', amount: 8000, status: 'Overdue' }
];

// Rutas API
app.get('/api/jurisdictions', (req, res) => {
  res.json(jurisdictions);
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/api/transactions', (req, res) => {
  res.json(transactions);
});

app.get('/api/filings', (req, res) => {
  res.json(filings);
});

app.get('/api/dashboard', (req, res) => {
  res.json({
    jurisdictions: jurisdictions.length,
    complianceRate: 92,
    inactiveUsers: users.length,
    pendingFilings: filings.filter(f => f.status === 'Pending').length,
    lastUpdate: new Date().toISOString()
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor ONESOURCE ejecutándose en http://localhost:${PORT}`);
  console.log(`📊 Dashboard disponible en http://localhost:${PORT}`);
});
