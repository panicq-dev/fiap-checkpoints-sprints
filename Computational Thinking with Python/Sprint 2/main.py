from menu import exibir_menu
from biblioteca import cadastrar, listar, buscar, remover

while True:
    exibir_menu()
    opcao = input("Escolha uma opção: ")

    if opcao == "1":
        cadastrar()
    elif opcao == "2":
        listar()
    elif opcao == "3":
        buscar()
    elif opcao == "4":
        remover()
    elif opcao == "5":
        print("Encerrando o sistema... Até logo!")
        break
    else:
        print("Opção inválida. Tente novamente.")