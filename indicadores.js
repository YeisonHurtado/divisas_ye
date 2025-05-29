// Función para obtener datos de la API
async function obtenerIndicadores() {
    const apiKey = '2f5e847ac1f40262343e9e1c';

    const indicadoresConfig = [
        {
            nombre: 'Dólar TRM',
            getValor: (rates) => rates.COP
        },
        {
            nombre: 'Euro TRM',
            getValor: (rates) => rates.COP / rates.EUR
        },
        {
            nombre: 'Libra Esterlina TRM',
            getValor: (rates) => rates.COP / rates.GBP
        },
        {
            nombre: 'Yen Japonés TRM',
            getValor: (rates) => rates.COP / rates.JPY
        },
        {
            nombre: 'Franco Suizo TRM',
            getValor: (rates) => rates.COP / rates.CHF
        }
    ];

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
        const data = await response.json();
        const rates = data.conversion_rates;

        const indicadores = indicadoresConfig.map(indicador => ({
            nombre: indicador.nombre,
            valor: `$${indicador.getValor(rates).toFixed(2)}`
        }));

        const tbody = document.querySelector('#indicadores tbody');
        tbody.innerHTML = '';

        indicadores.forEach(indicador => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${indicador.nombre}</td><td>${indicador.valor}</td>`;
            tbody.appendChild(row);
        });

    } catch (error) {
        console.error('Error al obtener los indicadores:', error);
    }
}


// Llamar a la función al cargar la página
window.onload = obtenerIndicadores;
