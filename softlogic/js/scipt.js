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
function saveVehiculo() {
    const form = document.getElementById('vehiculoForm');
    if (form.checkValidity()) {
        closeModal('vehiculoModal');
        showSuccessMessage('Vehículo registrado exitosamente');
        form.reset();
        // Aquí iría la lógica para guardar en base de datos
    } else {
        form.reportValidity();
    }
}
function saveProveedor() {
    const form = document.getElementById('proveedorForm');
    if (form.checkValidity()) {
        closeModal('proveedorModal');
        showSuccessMessage('Proveedor registrado exitosamente');
        form.reset();
        // Aquí iría la lógica para guardar en base de datos
    } else {
        form.reportValidity();
    }
}

function saveEmpleado() {
    const form = document.getElementById('empleadoForm');
    if (form.checkValidity()) {
        closeModal('empleadoModal');
        showSuccessMessage('Empleado registrado exitosamente');
        form.reset();
        // Aquí iría la lógica para guardar en base de datos
    } else {
        form.reportValidity();
    }
}
function saveCita() {
    const form = document.getElementById('citaForm');
    if (form.checkValidity()) {
        closeModal('citaModal');
        showSuccessMessage('Cita agendada exitosamente. Cliente notificado.');
        form.reset();
        document.getElementById('vehiculosCita').disabled = true;
        // Aquí iría la lógica para guardar en base de datos
    } else {
        form.reportValidity();
    }
}
function saveFactura() {
    const form = document.getElementById('facturaForm');
    if (form.checkValidity()) {
        closeModal('facturaModal');
        showSuccessMessage('Factura generada exitosamente');
        form.reset();
        // Aquí iría la lógica para guardar en base de datos
    } else {
        form.reportValidity();
    }
}

function savePago() {
    const form = document.getElementById('pagoForm');
    if (form.checkValidity()) {
        closeModal('registrarPagoModal');
        showSuccessMessage('Pago registrado exitosamente. Factura marcada como pagada.');
        form.reset();
        // Aquí iría la lógica para actualizar estado de factura
    } else {
        form.reportValidity();
    }
}
// Función para mostrar reportes
function mostrarReporte(tipo) {
    // Ocultar todos los reportes
    document.getElementById('reporteVentas').style.display = 'none';
    document.getElementById('reporteInventario').style.display = 'none';
    document.getElementById('reporteClientes').style.display = 'none';
    
    // Mostrar el reporte seleccionado
    if (tipo === 'ventas') {
        document.getElementById('reporteVentas').style.display = 'block';
    } else if (tipo === 'inventario') {
        document.getElementById('reporteInventario').style.display = 'block';
    } else if (tipo === 'clientes') {
        document.getElementById('reporteClientes').style.display = 'block';
    } else if (tipo === 'servicios') {
        showSuccessMessage('Reporte de Servicios en construcción');
    } else if (tipo === 'empleados') {
        showSuccessMessage('Reporte de Empleados en construcción');
    } else if (tipo === 'proveedores') {
        showSuccessMessage('Reporte de Proveedores en construcción');
    }
    
    // Scroll al reporte
    setTimeout(() => {
        window.scrollTo({
            top: document.getElementById('reporteVentas').offsetTop - 100,
            behavior: 'smooth'
        });
    }, 100);
}
