## Nome dos integrantes do grupo:

| Integrantes | RM |
| --- | :---: |
| `Diego Rayhan Jalhium Machado` | 569129 |
| `Gabriel Almeida dos Santos` | 573690 |
| `Kaue Tsuyoshi Horoiwa` | 571192 |
| `Roberto Dantas Melo Filho` | 566716 |

## Turma: 1-ESPV
## Ano: 2026

## Objetivo 

Dando continuidade ao sistema de monitoramento desenvolvido para a Vinheria Agnello, esta segunda etapa expande as funcionalidades do projeto original, que contemplava apenas a leitura de luminosidade. Com base no feedback dos proprietários, foram incorporados novos requisitos para um controle ambiental mais completo.

O sistema passa a utilizar o sensor DHT11 para medir temperatura e umidade do ambiente em tempo real, além de um display LCD para exibir os valores coletados diretamente no local de armazenamento. Os dados apresentados no display correspondem à média de pelo menos 5 leituras consecutivas, atualizados a cada 5 segundos, garantindo maior precisão na leitura.

O sistema de alarme visual (LEDs verde, amarelo e vermelho) e sonoro (buzzer), já implementado para luminosidade, foi estendido para cobrir também as condições de temperatura e umidade. A faixa ideal de temperatura é entre 10°C e 15°C, e a de umidade entre 50% e 70%. Quando qualquer uma dessas grandezas — luminosidade, temperatura ou umidade — estiver fora dos limites estabelecidos, o sistema aciona os alertas correspondentes, informando tanto o status quanto o valor medido no display LCD.

## Descrição do desafio
### 1. Desenvolvimento do projeto

Nesta segunda etapa, o desafio central foi integrar múltiplos componentes funcionando ao mesmo tempo: o sensor DHT22 para leitura de temperatura e umidade, o sensor LDR para luminosidade, um display LCD com comunicação I2C, três LEDs, um buzzer e um botão físico para navegação entre telas.

Um dos primeiros passos foi aprender a instalar e utilizar a biblioteca Adafruit DHT Unified no IDE do Arduino, que abstrai a leitura do sensor por meio de eventos (sensors_event_t), diferente de bibliotecas mais simples. Também foi necessário configurar o LCD com o endereço I2C correto (0x27) e aprender a posicionar o cursor para exibir as informações em duas linhas.

Outro ponto de atenção foi a criação do sistema de navegação entre três telas: temperatura, umidade e luminosidade, controlado por um botão com INPUT_PULLUP, incrementando uma variável tela e voltando ao primeiro após a terceira tela. Gerenciar a lógica dos LEDs e do buzzer para três grandezas simultâneas, sem que os estados se sobrescrevam incorretamente, também exigiu cuidado na organização do código.

### 2. Como executar o projeto
Para executar o projeto, é necessário realizar a montagem do circuito conforme o esquema disponibilizado no link da simulação. Após a montagem, instale as bibliotecas LiquidCrystal_I2C e Adafruit DHT Unified no IDE do Arduino e faça o upload do código para a placa. Ajustes nos limites do LDR (LUZ_OK e LUZ_ALERTA) podem ser necessários dependendo das condições de iluminação do ambiente.

## Esquema de montagem
https://wokwi.com/projects/464585929244055553
<img width="1161" height="613" alt="CP2" src="https://github.com/user-attachments/assets/853a7602-08c7-441b-9668-a9b2b484b35c" />

## Codigo Utilizado:
```
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

#define ledVermelho 7
#define ledAmarelo 8
#define ledVerde 9
#define buzzer 10
#define DHTPIN 11
#define botao 12
#define LDR A0

#define col 16
#define lin 2
#define ende 0x27

#define DHTTYPE DHT22

DHT_Unified dht(DHTPIN, DHTTYPE);
LiquidCrystal_I2C lcd(ende, col, lin);

// Luz
#define LUZ_OK 400
#define LUZ_ALERTA 700

// Temperatura
#define TEMP_MIN 10
#define TEMP_MAX 15

// Umidade
#define UMD_MIN 50
#define UMD_MAX 70

int tela = 0;

float mediaTemp = 0;
float mediaUmidade = 0;

unsigned long tempoAnterior = 0;

void setup() {

  pinMode(ledVerde, OUTPUT);
  pinMode(ledAmarelo, OUTPUT);
  pinMode(ledVermelho, OUTPUT);
  pinMode(buzzer, OUTPUT);

  pinMode(botao, INPUT_PULLUP);

  // ligar o lcd
  lcd.init();
  lcd.backlight();

  // ligar o dht
  dht.begin();

  Serial.begin(9600);
}

void loop() {
  digitalWrite(ledVerde, LOW);
  digitalWrite(ledAmarelo, LOW);
  digitalWrite(ledVermelho, LOW);
  digitalWrite(buzzer, LOW);


  // Leitura dos componentes


  sensors_event_t event;

  // Leitura da temperatura
  dht.temperature().getEvent(&event);
  float temperatura = event.temperature;

  // Leitura da umidade
  dht.humidity().getEvent(&event);
  float umidade = event.relative_humidity;

  // Leitura da luminosidade
  int luminosidade = analogRead(LDR);


  // Média de 5 segundos

  // variáveis
  static float somaTemp = 0;
  static float somaUmidade = 0;
  static int contador = 0;


  somaTemp += temperatura;
  somaUmidade += umidade;

  contador++; // somar até 5

  // média
  if (contador >= 5) {

    mediaTemp = somaTemp / 5.0;
    mediaUmidade = somaUmidade / 5.0;

    somaTemp = 0;
    somaUmidade = 0;

    contador = 0;
  }

  // Luz


  if (luminosidade <= LUZ_OK) { // Se o ambiente estiver escuro, acender led verde.

    digitalWrite(ledVermelho, HIGH);
    digitalWrite(buzzer, HIGH);

  } else if (luminosidade > LUZ_OK && luminosidade <= LUZ_ALERTA) { // Se o ambiente estiver a meia luz, acender led amarelo.

    digitalWrite(ledAmarelo, HIGH);

  } else { // Se o ambiente estiver claro, acender led vermelho e ligar o buzzer.

    digitalWrite(ledVerde, HIGH);
  }

  
  // Temperatura


  bool tempAlta = false;
  bool tempBaixa = false;

  if (mediaTemp > TEMP_MAX) { // Se a temperatura estiver alta, acender led amarelo e ligar o buzzer.

    tempAlta = true;

    digitalWrite(ledAmarelo, HIGH);
    digitalWrite(buzzer, HIGH);

  } else if (mediaTemp < TEMP_MIN) { // Se a temperatura estiver baixa, acender led amarelo e ligar o buzzer.

    tempBaixa = true;

    digitalWrite(ledAmarelo, HIGH);
    digitalWrite(buzzer, HIGH);
  }


  // Umidade
  

  bool umidadeAlta = false;
  bool umidadeBaixa = false;

  if (mediaUmidade > UMD_MAX) { // Se a umidade estiver acima da média, acender led vermelho e ligar o buzzer.

    umidadeAlta = true;

    digitalWrite(ledVermelho, HIGH);
    digitalWrite(buzzer, HIGH);

  } else if (mediaUmidade < UMD_MIN) { // Se a umidade estiver abaixo da média, acender led vermelho e ligar o buzzer.

    umidadeBaixa = true;

    digitalWrite(ledVermelho, HIGH);
    digitalWrite(buzzer, HIGH);
  } 


  // Trocar de tela usando botão

  if (digitalRead(botao) == LOW) {
    tela++; 

    if (tela > 2) {
      tela = 0;
    }

    delay(300);

    lcd.clear();
  }

  // TELA TEMPERATURA
  if (tela == 0) {

    if (tempAlta) { // Se a temperatura estiver alta, avisar no lcd.
      lcd.clear();

      lcd.setCursor(0, 0);
      lcd.print("Temp. ALTA");

    } else if (tempBaixa) { // Se a temperatura estiver baixa, avisar no lcd.
      lcd.clear();

      lcd.setCursor(0, 0);
      lcd.print("Temp. BAIXA");

    } else { 
      lcd.clear();

      lcd.setCursor(0, 0);
      lcd.print("Temperatura OK");
    }

    lcd.setCursor(0, 1); 
    lcd.print(mediaTemp); // printar média da temperatura 
    lcd.print((char)223); // printar °
    lcd.print("C");
  }

  // TELA UMIDADE
  else if (tela == 1) { 

    if (umidadeAlta) { // Se a umidade estiver acima da média, avisar no lcd.
      lcd.clear();

      lcd.setCursor(0, 0);
      lcd.print("Umidade ALTA");

    } else if (umidadeBaixa) { // Se a umidade estiver abaixo da média, avisar no lcd.
      lcd.clear();

      lcd.setCursor(0, 0);
      lcd.print("Umidade BAIXA");

    } else {
      lcd.clear();

      lcd.setCursor(0, 0);
      lcd.print("Umidade OK");
    }

    lcd.setCursor(0, 1);
    lcd.print(mediaUmidade); // printar média da umidade
    lcd.print("%"); // printar unidade de medida 
  }

  // TELA LUMINOSIDADE
  else {
    
    if (luminosidade <= LUZ_OK) { // Se a luz estiver escura, avisar no lcd.
      lcd.clear();

      lcd.setCursor(0, 0);
      lcd.print("Muito claro");

    } else if (luminosidade <= LUZ_ALERTA) { // Se a luz estiver a meia luz, avisar no lcd.
      lcd.clear();

      lcd.setCursor(0, 0);
      lcd.print("Meia Luz");

    } else { // Se a luz estiver claro, avisar no lcd.
      lcd.clear();
      
      lcd.setCursor(0, 0);
      lcd.print("Ambiente ideal");
    }

    lcd.setCursor(0, 1);
    lcd.print("Luz: "); 
    lcd.print(luminosidade); // printar valor da luminosidade atual.
  }

  delay(1000);
}
```

## Pré-requisitos:
Para realizar o projeto foram necessarios os seguintes componentes:
- 1 Arduino Uno (ou algum arduino de preferência)
- 1 Protoboard (LDR)
- 1 Sensor de luminosidade LDR
- 1 Sensor de temperatura e umidade DHT22 ou DHT11 
- 1 Buzzer
- 1 LCD 16x2 (I2C)
- 4 Resistores de 1000Ω
- 17 Jumpers 

## Video Explicativo: