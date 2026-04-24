## Nome dos integrantes do grupo:
- Diego Rayhan - rm569129
- Gabriel Almeida - rm573690
- Kaue Tsuyoshi - rm571192
- Roberto Dantas - rm566716

## Turma: 1-ESPV
## Ano: 2026

## Objetivo
Vocês foram contratados pela Vinheria Agnello para desenvolver um sistema de monitoramento a ser instalado no ambiente em que os vinhos são armazenados. O dono a Vinheria informou que a qualidade do vinho é influenciada diretamente pelas condições de temperatura, umidade e luminosidade do ambiente. Neste primeiro momento, você propôs ao dono da Vinheria um projeto em etapas, de modo que seu 1° desafio é:

Elaborar um sistema usando Arduino que faça a captura das informações de luminosidade do ambiente. Para isso pesquise sobre o LDR. Verifique como eles funcionam e como poderiam ser usados no projeto.

De posse dos dados coletados, implemente um sistema de alarme, utilizando LEDs, para sinalizar quando o a ambiente estiver OK, ou quando alguma grandeza estiver fora dos limites estipulados. Use um LED verde para indicar que está OK, um LED amarelo para indica que está em níveis de alerta e um LED Vermelho para indicar que tem algum problema.

Quando a luminosidade estiver em nível de alerta, deve soar uma buzina (buzzer) por 3 segundos. A buzina volta a soar caso a luminosidade permaneça em nível de alerta.

## Descrição do desafio
### Desenvolvimento do projeto
Enfrentamos alguns desafios durante o desenvolvimento, tais como a regulagem da luminosidade necessaria para soar o alarme e o led amarelo

### Como executar o projeto
Para executar o projeto, é necessario fazer a montagem do circuito disponibilizado, tambem se da necessario uma regulagem do sensor LDR.

### Esquema de montagem
https://www.tinkercad.com/things/6IUS10Zkxw0/editel?returnTo=%2Fdashboard&sharecode=QXQTiaANeu-kN4Gw2MQI60Xs3a0v1MToB0qx0jS21FM

## Codigo Utilizado:
```
// Definição de variaveis:
#define ledRed 2 
#define ledYellow 3 
#define ledGreen 4 
#define buzzer 5
#define LDR A5 

#define LUZ_OK 400    
#define LUZ_ALERTA 600 

void setup() { 
  // Definição de entrada/saidas
  pinMode(ledRed, OUTPUT); 
  pinMode(ledYellow, OUTPUT); 
  pinMode(ledGreen, OUTPUT); 
  pinMode(buzzer, OUTPUT); 
  pinMode(LDR, INPUT); 
  Serial.begin(9600); 
} 

void loop() { 
  // Leitura de luminosidade
  int ldrValue = analogRead(LDR);

  // Retorno no Serial Monitor
  Serial.print("Luminosidade (LDR): ");
  Serial.println(ldrValue);

  // Apaga todos os LEDs e buzzer
  digitalWrite(ledRed, LOW);
  digitalWrite(ledYellow, LOW);
  digitalWrite(ledGreen, LOW);
  digitalWrite(buzzer, LOW);

  // Se a leitura atual for menor que o Adequado, luz verde
  if (ldrValue <= LUZ_OK) {
    digitalWrite(ledGreen, HIGH);
    Serial.println("Status: OK - Ambiente adequado");
  } 
  // Se a leitura atual for maior que o Adequado E menor que o Alta luz amarela
  else if (ldrValue > LUZ_OK && ldrValue < LUZ_ALERTA) {
    digitalWrite(ledYellow, HIGH);
    Serial.println("Status: ALERTA - Luminosidade elevada");
  }
  // Se nenhuma das opções acima, Alta luz vermelha + ativação de buzzer
  else { 
    digitalWrite(ledRed, HIGH);
    Serial.println("Status: PROBLEMA - Luminosidade alta!");

    // Buzzer toca por 3 segundos, desliga e reinicia loop apos delay
    digitalWrite(buzzer, HIGH);
    delay(3000);
    digitalWrite(buzzer, LOW);
  }

  delay(500);
}
```
## Pré-requisitos:
Para realizar o projeto foram necessarios os seguintes componentes:
- 1 Arduino Uno (ou algum arduino de preferência)
- 1 Protoboard (LDR)
- 1 Sensor de luminosidade LDR
- 2 Resistores de 100Ω
- 1 Resistor de 150MΩ
- 1 Resistor de 10MΩ
- 1 Buzzer

## Video Explicativo:
[Link do video](https://drive.google.com/file/d/1NBU92YThez_kSoO8i5OBjXzET8F2a2cY/view?usp=sharing)
