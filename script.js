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
