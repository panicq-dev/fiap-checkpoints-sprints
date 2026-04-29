def validar_ano(valor):
    try:
        ano = int(valor)
        if ano > 0:
            return ano
        else:
            print("Ano inválido.")
            return None
    except ValueError:
        print("Digite apenas números.")
        return None