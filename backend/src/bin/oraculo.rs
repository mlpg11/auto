use backend::{tasks::atualizar_oraculo, types::EntradaOraculos};
use ethers::types::Address;
use reqwest;
use std::error::Error;

#[derive(serde::Serialize, serde::Deserialize, Debug)]
struct ApiResponse {
    value: Vec<DataPoint>,
}

#[derive(serde::Serialize, serde::Deserialize, Debug)]
struct DataPoint {
    VALVALOR: f64,
}

const BASE: u128 = 1e12 as u128;

#[tokio::main]
async fn main() -> eyre::Result<()> {
    let addresses = [
        // IPCA
        "0x0B32a3F8f5b7E5d315b9E52E640a49A89d89c820".parse::<Address>()?,
        // Taxa de juros
        "0xF357118EBd576f3C812c7875B1A1651a7f140E9C".parse::<Address>()?,
    ];

    let mut new_values: Vec<ethers::types::U256> = vec![];

    new_values.push(get_ipca().await?);
    new_values.push(get_juros().await?);

    let mut vec_inputs =
        vec![(addresses[0], new_values[0]), (addresses[1], new_values[1])];

    let entrada = EntradaOraculos { items: vec_inputs };

    let mut oraculos_novos_valores: EntradaOraculos = entrada;

    for (oraculo, novos_valores) in oraculos_novos_valores {
        match atualizar_oraculo::atualizar_oraculo(oraculo, novos_valores).await
        {
            Ok(()) => {
                println!("Oraculo {:?} atualizado com sucesso!", &oraculo);
            }
            Err(e) => {
                println!("Falha no oraculo {:?}: {e:?}", &oraculo)
            }
        }
    }

    Ok(())
}

async fn get_ipca() -> eyre::Result<ethers::types::U256> {
    let url = "http://ipeadata.gov.br/api/odata4/ValoresSerie(SERCODIGO='PRECOS_IPCAG')";

    let resp = reqwest::get(url).await?;
    let data = resp.text().await?;

    let api_response: ApiResponse = serde_json::from_str(&data)?;

    let mut ans: ethers::types::U256 = ethers::types::U256::from(0);

    if let Some(last_value) = api_response.value.last() {
        // Convertendo a porcentagem para um valor inteiro em relação à base
        // 1e12
        let value_as_integer = (last_value.VALVALOR * BASE as f64) as u128;

        // Convertendo para U256
        ans = ethers::types::U256::from(value_as_integer / 100);
    }

    Ok(ans)
}

async fn get_juros() -> eyre::Result<ethers::types::U256> {
    let url = "http://ipeadata.gov.br/api/odata4/ValoresSerie(SERCODIGO='BM366_TJOVER366')";

    let resp = reqwest::get(url).await?;
    let data = resp.text().await?;

    let api_response: ApiResponse = serde_json::from_str(&data)?;

    let mut ans: ethers::types::U256 = ethers::types::U256::from(0);

    if let Some(last_value) = api_response.value.last() {
        // Convertendo a porcentagem para um valor inteiro em relação à base
        // 1e12
        let value_as_integer = (last_value.VALVALOR * BASE as f64) as u128;

        // Convertendo para U256
        ans = ethers::types::U256::from(value_as_integer / 100);
    }

    Ok(ans)
}
