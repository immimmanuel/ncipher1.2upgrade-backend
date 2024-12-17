const axios = require('axios');

const convertCurrency = async (req, res) => {
    try {
        const { fromCurrency, toCurrency, amount } = req.body;

        if (!fromCurrency || !toCurrency || !amount || isNaN(amount)) {
            return res.status(400).json({ error: "Invalid input" });
        }

        const response = await axios.get(`${process.env.EXCHANGE_API_URL}/${fromCurrency}`, {
            params: { api_key: process.env.EXCHANGE_API_KEY },
        });

        const rates = response.data.rates;

        if (!rates[toCurrency]) {
            return res.status(400).json({ error: "Invalid target currency" });
        }

        const exchangeRate = rates[toCurrency];
        const convertedAmount = (amount * exchangeRate).toFixed(2);

        res.status(200).json({
            fromCurrency,
            toCurrency,
            amount,
            exchangeRate,
            convertedAmount,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to fetch exchange rates" });
    }
};

module.exports = { convertCurrency };
