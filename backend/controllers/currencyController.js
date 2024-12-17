const axios = require('axios');
const router = express.Router();

let conversionHistory = []; // In-memory array to store history

const convertCurrency = async (req, res) => {
    const { fromCurrency, toCurrency, amount } = req.body;

    if (!fromCurrency || !toCurrency || !amount) {
        return res.status(400).json({ error: 'Invalid input. Please provide all fields.' });
    }
    
    try {
        const response = await axios.get(`${process.env.EXCHANGE_API_URL}/${fromCurrency}`, {
            params: { api_key: process.env.EXCHANGE_API_KEY },
        });
    
        const exchangeRate = response.data.conversion_rates[toCurrency];
        if (!exchangeRate) {
            return res.status(400).json({ error: 'Invalid currency code.' });
        }
    
        const convertedAmount = amount * exchangeRate;
    
        const conversion = {
            fromCurrency,
            toCurrency,
            amount,
            exchangeRate,
            convertedAmount,
            timestamp: new Date().toISOString(),
        };
    
        conversionHistory.push(conversion);
    
        res.json(conversion);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching exchange rates.' });
    }
};

const covertHistory = async (req, res) => {
    res.json(conversionHistory);
};

module.exports = { convertCurrency, covertHistory };
