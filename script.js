document.getElementById('form-acao').addEventListener('submit', function(event) {
    event.preventDefault();
    const acaoSelecionada = document.getElementById('acao').value;
    atualizarCotacao(acaoSelecionada);
});

function atualizarCotacao(acao) {
    const apiKey = 'qTHuTApotJasWqPqJydwmK';  // Sua chave real
    const url = `https://brapi.dev/api/quote/${acao}?token=${apiKey}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);  // Para verificar a estrutura dos dados retornados

            // Aqui você ajusta a estrutura de dados, assumindo que a resposta seja parecida com a estrutura acima.
            const timeSeries = data.data;  // Dados da resposta da API
            const labels = timeSeries.map(entry => entry.date);  // Extrair as datas (ou horários)
            const cotacao = timeSeries[0].price;  // A primeira cotação (exemplo, para exibir na página)

            // Atualiza a cotação na página
            document.getElementById('cotacao-valor').textContent = `R$ ${parseFloat(cotacao).toFixed(2)}`;

            // Prepara os dados para o gráfico
            const graficoData = {
                labels: labels,
                data: timeSeries.map(entry => entry.price)  // Preço de cada ação
            };

            // Atualiza o gráfico com os dados da API
            atualizarGrafico(graficoData);
        })
        .catch(error => {
            console.error('Erro ao obter cotação:', error);
        });
}

function atualizarGrafico(dadosGrafico) {
    const ctx = document.getElementById('grafico').getContext('2d');
    
    // Verifica se o gráfico já existe e se existe um contexto no canvas
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: dadosGrafico.labels,
                datasets: [{
                    label: 'Preço da Ação',
                    data: dadosGrafico.data,
                    borderColor: 'rgb(75, 192, 192)',
                    fill: false
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Hora'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Preço (R$)'
                        }
                    }
                }
            }
        });
    } else {
        console.error('Não foi possível obter o contexto do canvas');
    }
}
