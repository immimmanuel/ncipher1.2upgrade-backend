import React, { useState } from 'react';
import axios from 'axios';
import History from './History';

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const handleConvert = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/convert', {
        fromCurrency,
        toCurrency,
        amount,
      });
      setResult(response.data);
      fetchHistory(); // Refresh history after conversion
    } catch (error) {
      alert(error.response?.data?.error || 'Error occurred during conversion');
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get('/api/history');
      setHistory(response.data);
    } catch (error) {
      alert('Error fetching history');
    }
  };

  return (
    <div className="currency-converter">
      <form onSubmit={handleConvert}>
        <div>
          <label>From Currency:</label>
          <input
            type="text"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value.toUpperCase())}
            placeholder="e.g., USD"
            required
          />
        </div>
        <div>
          <label>To Currency:</label>
          <input
            type="text"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value.toUpperCase())}
            placeholder="e.g., EUR"
            required
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g., 100"
            required
          />
        </div>
        <button type="submit">Convert</button>
      </form>

      {result && (
        <div className="result">
          <h3>Conversion Result:</h3>
          <p>{`${amount} ${fromCurrency} = ${result.convertedAmount.toFixed(
            2
          )} ${toCurrency}`}</p>
          <p>Exchange Rate: 1 {fromCurrency} = {result.exchangeRate.toFixed(2)} {toCurrency}</p>
        </div>
      )}

      <History history={history} fetchHistory={fetchHistory} />
    </div>
  );
};

export default CurrencyConverter;
