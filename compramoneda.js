// Arreglos iniciales
const clientes = [
    { tipoDoc: "CC", numDoc: 123456, nombre: "Jeison Hurtado" },
    { tipoDoc: "CE", numDoc: 789012, nombre: "Melissa Ordoñez" },
    { tipoDoc: "NIT", numDoc: 345678, nombre: "Empresa SAS" }
];

const tiposDocumento = [
    { codigo: "CC", nombre: "Cédula de Ciudadanía" },
    { codigo: "CE", nombre: "Cédula de Extranjería" },
    { codigo: "NIT", nombre: "NIT Empresarial" }
];

const monedas = [
    { codigo: "USD", nombre: "Dólar", tasaCompra: 4025 },
    { codigo: "EUR", nombre: "Euro", tasaCompra: 4200 },
    { codigo: "GBP", nombre: "Libra Esterlina", tasaCompra: 5000 }
];

// Variables globales


function init() {
    cargarListas();
    cargarFechaHora();
    validarDiaHabil();
    setInterval(actualizarHora, 1000);

    // Event listeners
    document.getElementById("numDoc").addEventListener("change", buscarCliente);
    document.getElementById("moneda").addEventListener("change", actualizarTasa);
    document.getElementById("cantidad").addEventListener("input", calcularValor);
}

function cargarListas() {
    // Cargar tipos de documento
    const selTipoDoc = document.getElementById("tipoDoc");
    tiposDocumento.forEach(tipo => {
        let option = new Option(tipo.nombre, tipo.codigo);
        selTipoDoc.add(option);
    });

    // Cargar monedas
    const selMoneda = document.getElementById("moneda");
    monedas.forEach(moneda => {
        let option = new Option(moneda.nombre, moneda.codigo);
        selMoneda.add(option);
    });
}

function cargarFechaHora() {
    const fecha = new Date();
    document.getElementById("fecha").value = fecha.toLocaleDateString();
    document.getElementById("hora").value = fecha.toLocaleTimeString();
}

function actualizarHora() {
    document.getElementById("hora").value = new Date().toLocaleTimeString();
}

function validarDiaHabil() {
    const fecha = new Date();
    const diaSemana = fecha.getDay();

    // Si es domingo (0) o sábado (6)
    if (diaSemana === 0 || diaSemana === 6) {
        alert("No se pueden realizar transacciones hoy. La página se cerrará.");
        setTimeout(() => {
            window.location.href = "index.html"; // Redirección segura
        }, 2000); // Espera 2 segundos antes de redirigir
    }
}

function buscarCliente() {
    const tipoDoc = document.getElementById("tipoDoc").value;
    const numDoc = document.getElementById("numDoc").value;
    const cliente = clientes.find(c => c.tipoDoc === tipoDoc && c.numDoc == numDoc);

    if (cliente) {
        document.getElementById("nombreCliente").value = cliente.nombre;
    } else {
        alert("Cliente Inexistente");
        document.getElementById("nombreCliente").value = "";
    }
}

function actualizarTasa() {
    const codMoneda = document.getElementById("moneda").value;
    const moneda = monedas.find(m => m.codigo === codMoneda);
    document.getElementById("tasa").value = moneda ? moneda.tasaCompra : "";
    calcularValor();
}

function calcularValor() {
    const tasa = parseFloat(document.getElementById("tasa").value) || 0;
    const cantidad = parseFloat(document.getElementById("cantidad").value) || 0;
    document.getElementById("valorPagar").value = (tasa * cantidad).toFixed(2);
}

// Guardar en localStorage
function guardarCompra() {
    const clienteNombre = document.getElementById('nombreCliente').value;
    const tipoDoc = document.getElementById('tipoDoc').value;
    const numDoc = document.getElementById('numDoc').value;

    if (!clienteNombre) {
        alert("Primero valide el cliente antes de guardar");
        return;
    }

    const transaccion = {
        fecha: document.getElementById('fecha').value,
        hora: document.getElementById('hora').value,
        cliente: clienteNombre,
        documento: `${tipoDoc}-${numDoc}`,
        moneda: document.getElementById('moneda').options[document.getElementById('moneda').selectedIndex].text,
        cantidad: document.getElementById('cantidad').value,
        total: document.getElementById('valorPagar').value
    };

    let historial = JSON.parse(localStorage.getItem('transacciones')) || [];
    historial.push(transaccion);
    localStorage.setItem('transacciones', JSON.stringify(historial));

    alert('Compra registrada en el historial!');
    limpiarFormulario();
}

// Limpiar formulario
function limpiarFormulario() {
    document.getElementById('formCompra').reset();
    document.getElementById('nombreCliente').value = '';
    document.getElementById('tasa').value = '';
    document.getElementById('valorPagar').value = '';
}