from flask import Flask, jsonify
import requests

app = Flask(__name__)

# Função para buscar a cotação de uma ação
def obter_cotacao(acao):
    url = f"https://brapi.dev/api/quote/acao?token=qTHuTApotJasWqPqJydwmK"  # URL de exemplo, substitua pela API real
    response = requests.get(url)
    data = response.json()
    cotacao = data['cotacao']  # ajuste conforme a resposta da API

    # Gerar dados para o gráfico (aqui, apenas um exemplo simples)
    grafico = {
        'labels': ["10:00", "10:30", "11:00", "11:30", "12:00"],
        'data': [cotacao, cotacao + 1, cotacao - 0.5, cotacao + 0.2, cotacao]
    }

    return {'cotacao': cotacao, 'grafico': grafico}

@app.route('/cotacao/<acao>')
def cotacao(acao):
    dados = obter_cotacao(acao)
    return jsonify(dados)

if __name__ == '__main__':
    app.run(debug=True)
