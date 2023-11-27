use eyre::Result;

pub async fn atualizar_oraculo(
    endereco_oraculo: ethers::types::Address,
    novo_valor: ethers::types::U256,
) -> Result<()> {
    dotenv::dotenv().ok();

    let rpc = dotenv::var("RPC").unwrap();
    let wallet = dotenv::var("SIGNER").unwrap();

    let signer = ethers::signers::LocalWallet::try_from(wallet)?;

    let signer_http = std::sync::Arc::try_from(
        ethers::middleware::SignerMiddleware::new_with_provider_chain(
            ethers::providers::Provider::try_from(rpc)?,
            signer,
        )
        .await?,
    )?;

    let instance = crate::contracts::BaseOraculo::new(endereco_oraculo, signer_http.clone());

    let tx = instance.setar_valor(novo_valor).tx;

    let pending_tx =
        match ethers::providers::Middleware::send_transaction(&signer_http, tx, None).await {
            Ok(tx) => tx,
            Err(e) => {
                println!("error: {e:?}");
                std::process::exit(1);
            }
        };

    let _receipt = match pending_tx.await {
        Ok(receipt) => receipt,
        Err(e) => {
            println!("error: {e:?}");
            std::process::exit(1);
        }
    };

    Ok(())
}
