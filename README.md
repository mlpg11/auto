# AUTO - Título Tokenizados

# AutoTransfer - Desafio 1
## Oferta Pública, Mercado Secundário e Transferência e Gerenciamento de Títulos Tokenizados

Por meio da tecnologia blockchain e tokens ERC-20 na Ethereum, o Tesouro Direto pode emitir títulos públicos tokenizados disponibilizados na plataforma AUTO. A plataforma permite aquisições diretamente do Tesouro ou via mercado secundário, por meio de uma interface simplificada e visualmente intuitiva. Ela habilita a compra de frações de títulos, eliminando a barreira do investimento mínimo e permitindo a participação de investidores internacionais. O gerenciamento de ativos é facilitado por uma página de controle que exibe detalhes sobre rentabilidade e opções de resgate ou troca. A simulação de investimentos proporciona uma previsão de retornos para auxiliar na decisão de compra. Além disso, o Portal da Transparência oferece visibilidade completa das transações, reforçando a confiança na segurança dos investimentos na blockchain.

# AutoTrack - Desafio 3

AutoTrack se destaca por utilizar tecnologias inovadoras como a Web3, com ênfase na rede Mainnet Ethereum. Esta rede descentralizada garante a imutabilidade e a longevidade das informações. Aproveitamos ao máximo esta tecnologia com nosso processo de tokenização, conduzido por especialistas, que desenvolvem códigos otimizados, econômicos e ricos em dados. Essas informações podem ser facilmente acessadas através de um RPC na rede Ethereum Mainnet. NOSSO AGREGADOR - PORTAL DE TRANSFERÊNCIA: Um aspecto chave do AutoTrack é o nosso agregador, o Portal de Transferência. Este agregador foi cuidadosamente desenvolvido para coletar, organizar e apresentar os dados das transações de forma clara e acessível. Com ele, garantimos que a informação seja não apenas transparente, mas também de fácil interpretação e uso. O Portal de Transferência é mais do que um simples repositório de dados; é uma ferramenta que transforma números em insights valiosos, ajudando na tomada de decisões.

# AutoInfo - Desafio 4

A solução AutoInfo utiliza a tecnologia blockchain, especificamente na Ethereum, para criar títulos públicos como tokens ERC-20. Estes tokens possuem rentabilidade automatizada, baseada em seu tipo. Utilizando oráculos, a solução integra indicadores econômicos essenciais para a precificação e cálculos de rentabilidade diretamente na blockchain. Além disso, a AutoInfo coleta e disponibiliza todos os dados transacionais referentes aos tokens através de uma API, implementada por uma interface de usuário amigável e ágil para análises mais dinâmicas e detalhadas.

## Executando o código
```
npm install                  #instala as dependencias globais
cd auto-front                #navega até a pasta do front-end
npm install                  #instala as dependencias locais 
npm start para começar       #inicia o servidor localhost na posta 3000
```
## Páginas

Coleção de componentes aninhados para interação com usuário, nossas páginas:

### Explorar 

![image](https://github.com/mlpg11/auto/assets/105249607/c7526066-5d1a-4c95-8a93-3e862287432c)

### Meus tokens

![image](https://github.com/mlpg11/auto/assets/105249607/ca296f17-2723-4df5-974f-57a7c6be2c0e)

### Simular

![image](https://github.com/mlpg11/auto/assets/105249607/a6d1eaa9-6a8b-4b60-bafd-39fe212d1e5b)


### Transparência

![image](https://github.com/mlpg11/auto/assets/105249607/bade741a-8cee-4375-b53f-ca1afd1bb0f4)

## Componentes

Dentro da pasta auto-front/src/components temos os principais objetos visuais do site, exemplos:

### Header

![image](https://github.com/mlpg11/auto/assets/105249607/7d5b2d68-9c97-4e33-ade7-d5d1fbaa834f)

### Card

![image](https://github.com/mlpg11/auto/assets/105249607/558ee2a0-aec7-4df2-a707-cb89d4f984bd)

### Modal de compra

![image](https://github.com/mlpg11/auto/assets/105249607/c03e7d1a-9f3f-4107-be5c-bb2a3d6598b1)

## Ferramentas e Tecnologias

### FrontEnd
- React
- CSS
- Ethers

### BackEnd
- Solidity
- JavaScript
- Rust
- Ethers rs
- Docker
- Railway
- Foundry (Forge, Anvil e Cast)

## Titulos tokenizados

https://github.com/mlpg11/auto/tree/main/contracts/src/ERC20Tokens

## Frontend

https://github.com/mlpg11/auto/tree/main/auto-front/src

## Oraculos

### Parte de Solidity: https://github.com/mlpg11/auto/tree/main/contracts/src/oraculos

### Automação em Rust: https://github.com/mlpg11/auto/blob/main/backend/src/bin/oraculo.rs

## Sistema live na Testnet Anvil fork da Ethereum Mainnet, colocada em produção utilizando Anvil + Docker + Railway

  * PF29:  0x8Aed6FE10dF3d6d981B101496C9c7245AE65cAEc
  * IPCA29:  0x5f246ADDCF057E0f778CD422e20e413be70f9a0c
  * IPCA35:  0xaD82Ecf79e232B0391C5479C7f632aA1EA701Ed1
  * IPCA45:  0x4Dd5336F3C0D70893A7a86c6aEBe9B953E87c891
  * PF26:  0x91A1EeE63f300B8f41AE6AF67eDEa2e2ed8c3f79
  * RENDA30:  0xBe6Eb4ACB499f992ba2DaC7CAD59d56DA9e0D823
  * RENDA35:  0x54287AaB4D98eA51a3B1FBceE56dAf27E04a56A6
  * RENDA40:  0xE401FBb0d6828e9f25481efDc9dd18Da9E500983
  * SL29:  0xb6aA91E8904d691a10372706e57aE1b390D26353   
  * SL26:  0x10537D7bD661C9c34F547b38EC662D6FD482Ae95 
  * IpcaOraculo:  0x90E75f390332356426B60FB440DF23f860F6A113
  * TaxaDeJurosOraculo:  0x59c7D03d2E9893FB7bAa89dA50a9452e1e9B8b90 

  * RPC: Omitido por questões de segurança

## Equipe
- Gustavo Villar Marinatto
- Mateus Leite Pinheiro Gomes
- Tiago de Paula Dantas da Silva
