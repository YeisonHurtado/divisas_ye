async function obtenerTasas() {
    const apiKey = '2f5e847ac1f40262343e9e1c'; // Reemplázala con tu clave real

    // Lista de monedas a mostrar (código ISO y nombre legible)
    const monedas = [
        { codigo: 'USD', nombre: 'DÓLAR' },
        { codigo: 'EUR', nombre: 'EURO' },
        { codigo: 'GBP', nombre: 'LIBRA ESTERLINA' },
        { codigo: 'JPY', nombre: 'YEN JAPONÉS' },
        { codigo: 'CHF', nombre: 'FRANCO SUIZO' },
        { codigo: 'CAD', nombre: 'DÓLAR CANADIENSE' }
    ];

    const tbody = document.querySelector('#tasas tbody');
    tbody.innerHTML = '';

    for (const moneda of monedas) {
        try {
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${moneda.codigo}`);
            const data = await response.json();

            const tasaCOP = data.conversion_rates.COP;
            const compra = (tasaCOP * 0.98).toFixed(0);
            const venta = (tasaCOP * 1.02).toFixed(0);

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${moneda.nombre}</td>
                <td>$${compra}</td>
                <td>$${venta}</td>
            `;
            tbody.appendChild(row);
        } catch (error) {
            console.error(`Error al obtener tasa de ${moneda.codigo}:`, error);
        }
    }
}

window.onload = obtenerTasas;
