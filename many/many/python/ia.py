import sys
import json

dados = json.loads(sys.stdin.read())

pergunta = dados["pergunta"]

# lógica simples (depois você pode trocar por IA)
resposta = f"Você perguntou: {pergunta}"

print(resposta)