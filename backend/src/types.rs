pub type AutoSigner = std::sync::Arc<
    ethers::middleware::SignerMiddleware<
        ethers::providers::Provider<ethers::providers::Http>,
        ethers::signers::LocalWallet,
    >,
>;

pub struct EntradaOraculos {
    items: Vec<(ethers::types::Address, ethers::types::U256)>,
}

impl IntoIterator for EntradaOraculos {
    type IntoIter = std::vec::IntoIter<Self::Item>;
    type Item = (ethers::types::Address, ethers::types::U256);

    fn into_iter(self) -> Self::IntoIter {
        self.items.into_iter()
    }
}
