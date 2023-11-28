use backend::tasks::atualizar_oraculo;
use backend::types::EntradaOraculos;

#[tokio::main]
async fn main() -> eyre::Result<()> {
    let mut oraculos_novos_valores: EntradaOraculos = todo!();

    // for (oraculo, novos_valores) in oraculos_novos_valores {
    //     match atualizar_oraculo::atualizar_oraculo(oraculo, novos_valores).await {
    //         Ok(()) => {
    //             println!("Oraculo {} atualizado com sucesso!", &oraculo);
    //         },
    //         Err(e) => {
    //             println!("Falha no oraculo {}: {e:?}", &oraculo)
    //         }
    //     }
    // }

    Ok(())
}
