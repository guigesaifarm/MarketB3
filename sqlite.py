import sqlite3

# Função para criar a tabela
def criar_tabela():
    conn = sqlite3.connect('acoes.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS cotacoes (
                    id INTEGER PRIMARY KEY,
                    acao TEXT,
                    cotacao REAL,
                    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
                )''')
    conn.commit()
    conn.close()

# Função para salvar cotação
def salvar_cotacao(acao, cotacao):
    conn = sqlite3.connect('acoes.db')
    c = conn.cursor()
    c.execute('''INSERT INTO cotacoes (acao, cotacao) VALUES (?, ?)''', (acao, cotacao))
    conn.commit()
    conn.close()
