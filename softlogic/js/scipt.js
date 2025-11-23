// Navigation
const menuItems = document.querySelectorAll('.menu-item');
const pageSections = document.querySelectorAll('.page-section');
const pageTitle = document.getElementById('pageTitle');
menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const page = item.getAttribute('data-page');
        navigateTo(page);
    });
});
function navigateTo(page) {
    // Update menu
    menuItems.forEach(item => item.classList.remove('active'));
    const activeMenuItem = document.querySelector(`[data-page="${page}"]`);
    if (activeMenuItem) {
        activeMenuItem.classList.add('active');
    }
    // Update content
    pageSections.forEach(section => section.classList.remove('active'));
    const activeSection = document.getElementById(page);
    if (activeSection) {
        activeSection.classList.add('active');
    }
    // Update title
    const titles = {
        'dashboard': 'Dashboard',
        'clientes': 'Gestión de Clientes',
        'vehiculos': 'Gestión de Vehículos',
        'proveedores': 'Gestión de Proveedores',
        'inventario': 'Gestión de Inventario',
        'empleados': 'Gestión de Empleados',
        'ordenes': 'Órdenes de Servicio',
        'citas': 'Gestión de Citas',
        'facturas': 'Facturación',
        'reportes': 'Reportes',
        'configuracion': 'Configuración'
    };
    pageTitle.textContent = titles[page] || 'Dashboard';
}
// Login
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('dashboardPage').classList.add('active');
});
// Modal functions
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}
function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}
// Close modal when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});
// Save functions with success messages
function saveCliente() {
    const form = document.getElementById('clienteForm');
    if (form.checkValidity()) {
        closeModal('clienteModal');
        showSuccessMessage('Cliente registrado exitosamente');
        form.reset();
    } else {
        form.reportValidity();
    }
}
function saveInventario() {
    const form = document.getElementById('inventarioForm');
    if (form.checkValidity()) {
        closeModal('inventarioModal');
        showSuccessMessage('Artículo registrado exitosamente');
        form.reset();
    } else {
        form.reportValidity();
    }
}
function saveOrden() {
    const form = document.getElementById('ordenForm');
    if (form.checkValidity()) {
        closeModal('ordenModal');
        showSuccessMessage('Orden de servicio creada exitosamente');
        form.reset();
    } else {
        form.reportValidity();
    }
}
function showSuccessMessage(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-success';
    alert.innerHTML = `✅ ${message}`;
    alert.style.position = 'fixed';
    alert.style.top = '20px';
    alert.style.right = '20px';
    alert.style.zIndex = '9999';
    alert.style.minWidth = '300px';
    alert.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.style.transition = 'opacity 0.3s';
        alert.style.opacity = '0';
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}