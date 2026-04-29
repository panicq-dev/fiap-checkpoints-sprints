from utils import validar_ano

livros = []

def cadastrar():
    titulo = input("Título do livro: ").strip()
    autor = input("Autor: ").strip()
    ano = validar_ano(input("Ano de publicação: "))

    if titulo and autor and ano:
        livros.append({"titulo": titulo, "autor": autor, "ano": ano})
        print(f"Livro '{titulo}' cadastrado com sucesso!")
    else:
        print("Dados inválidos. Tente novamente.")

def listar():
    if livros:
        print("\n--- Lista de Livros ---")
        for i, livro in enumerate(livros, start=1):
            print(f"{i}. {livro['titulo']} - {livro['autor']} ({livro['ano']})")
    else:
        print("Nenhum livro cadastrado.")

def buscar():
    termo = input("Digite parte do título: ").strip().lower()
    resultados = []  

    for livro in livros:
        if termo in livro['titulo'].lower():
            resultados.append(livro) 

    if resultados:
        print("\n--- Resultados da Busca ---")
        for l in resultados:
            print(f"{l['titulo']} - {l['autor']} ({l['ano']})")
    else:
        print("Nenhum livro encontrado.")

def remover():
    listar()
    if livros:
        try:
            indice = int(input("Digite o número do livro para remover: "))
            if 1 <= indice <= len(livros):
                removido = livros.pop(indice - 1)
                print(f"Livro '{removido['titulo']}' removido.")
            else:
                print("Número inválido.")
        except ValueError:
            print("Digite apenas números.")