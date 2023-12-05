import React, { useState } from 'react';
import './SimulateBar.css';

function SimulateBar({ onSimulate }) {
    const [simulacao, setSimulacao] = useState({
        valorInicial: 0,
        valorMensal: 0,
        tempoInvestimento: 0
    });

    const handleChange = (e) => {
        const value = e.target.type === 'range' ? parseInt(e.target.value, 10) : e.target.value;
        const newSimulacao = {
            ...simulacao,
            [e.target.name]: value < 0 ? 0 : value // Impede valores negativos
        };

        setSimulacao(newSimulacao);

        // Chama a função do componente pai com os novos valores
        onSimulate(newSimulacao);
    };

    const handleBlur = () => {
        // Garante que os valores não fiquem vazios
        setSimulacao({
            ...simulacao,
            valorInicial: simulacao.valorInicial || 0,
            valorMensal: simulacao.valorMensal || 0,
            tempoInvestimento: simulacao.tempoInvestimento || 0
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSimulate(simulacao);
    };

    return (
        <form onSubmit={handleSubmit} className="simulate-bar">
            <div className="form-group" id="1">
                <label htmlFor="valorInicial">Valor Inicial</label>
                <div className="ig">
                    <input type="number" name="valorInicial" value={simulacao.valorInicial} onChange={handleChange} id="valorInicial" />
                    <p className="roxo">ETH</p>
                </div>
            </div>

            <div className="form-group" id="1">
                <label htmlFor="valorMensal">Valor Mensal</label>
                <div className="ig">
                    <input type="number" name="valorMensal" value={simulacao.valorMensal} onChange={handleChange} id="valorMensal" />
                    <p className="roxo">ETH</p>
                </div>
            </div>

            <div className="form-group" id="2">
                <label htmlFor="tempoInvestimento">Meses de Investimento</label>
                <div className="ig">
                    <input 
                        type="range" 
                        name="tempoInvestimento" 
                        id="tempoInvestimento" 
                        min="1" 
                        max="360" 
                        value={simulacao.tempoInvestimento} 
                        onChange={handleChange} 
                    />
                    <input 
                        type="number"
                        name="tempoInvestimento" 
                        id="tempoInvestimentoNumber" 
                        min="1" 
                        max="360" 
                        value={simulacao.tempoInvestimento} 
                        onChange={handleChange}
                        onBlur={handleBlur} 
                        className="month-input"
                    />
                </div>
            </div>
            
            
        </form>
    );
}

export default SimulateBar;