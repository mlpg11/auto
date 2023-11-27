use backend::tasks::atualizar_oraculo;
use eyre::Result;

#[tokio::main]
async fn main() -> Result<()> {
    match atualizar_oraculo::atualizar_oraculo("0x000000".parse().unwrap(), 100u64.into()).await {
        Ok(_) => println!("ok"),
        Err(e) => println!("error: {:?}", e),
    }

    Ok(())
}
