document.getElementById('form-acao').addEventListener('submit', function(event) {
    event.preventDefault();
    const acaoSelecionada = document.getElementById('acao').value;
    atualizarCotacao(acaoSelecionada);
});

function atualizarCotacao(acao) {
    fetch(`/cotacao/${acao}`)
        .then(response => response.json())
        .then(data => {
            // Atualiza a cotação na página
            document.getElementById('cotacao-valor').textContent = `R$ ${data.cotacao.toFixed(2)}`;
            
            // Atualiza o gráfico
            atualizarGrafico(data.grafico);
        });
}

// Atualiza as informações a cada 30 segundos
setInterval(() => {
    const acaoSelecionada = document.getElementById('acao').value;
    atualizarCotacao(acaoSelecionada);
}, 30000);

function atualizarGrafico(dadosGrafico) {
    const ctx = document.getElementById('grafico').getContext('2d');
    const grafico = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dadosGrafico.labels,
            datasets: [{
                label: 'Preço da Ação',
                data: dadosGrafico.data,
                borderColor: 'rgb(75, 192, 192)',
                fill: false
            }]
        }
    });
}


function atualizarCotacao(acao) {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${acao}&interval=5min&apikey=YOUR_API_KEY`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const timeSeries = data['Time Series (5min)'];
            const labels = Object.keys(timeSeries);
            const cotacao = timeSeries[labels[0]]['4. close'];

            // Atualiza a cotação na página
            document.getElementById('cotacao-valor').textContent = `R$ ${parseFloat(cotacao).toFixed(2)}`;

            // Atualiza o gráfico com os dados da API
            const graficoData = {
                labels: labels,
                data: labels.map(label => parseFloat(timeSeries[label]['4. close'])),
            };
            atualizarGrafico(graficoData);
        });
}
