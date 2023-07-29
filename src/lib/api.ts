// Get .env variables
const API_KEY: string = import.meta.env.VITE_API_KEY;

// Types
interface JsonTicker {
	'1. symbol': string;
	'2. name': string;
	'3. type': string;
	'4. region': string;
	'5. marketOpen': string;
}

export interface Ticker {
	symbol: string;
	name: string;
	type: string;
	region: string;
	marketOpen: string;
}

interface JsonPrice {
	'1. open': string;
	'2. high': string;
	'3. low': string;
	'4. close': string;
	'5. volume': string;
}

export interface Price {
	open: string;
	high: string;
	low: string;
	close: string;
	volume: string;
}

// Api
export const searchTicker = async (query: string): Promise<Ticker[]> => {
	const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${API_KEY}`;
	const headers: Headers = new Headers({ 'User-Agent': 'request' });

	return new Promise((resolve, reject) => {
		fetch(url, { headers })
			.then((res) => {
				res
					.json()
					.then((json) => {
						// Convert
						const tickers: Ticker[] = json.bestMatches.map((jsonTicker: JsonTicker) => ({
							symbol: jsonTicker['1. symbol'],
							name: jsonTicker['2. name'],
							type: jsonTicker['3. type'],
							region: jsonTicker['4. region'],
							marketOpen: jsonTicker['5. marketOpen']
						}));
						// Return
						resolve(tickers);
					})
					.catch((err) => {
						reject(err);
					});
			})
			.catch((err) => {
				reject(err);
			});
	});
};

export const getTickerDaily = async (symbol: string): Promise<Price[]> => {
	const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;
	const headers: Headers = new Headers({ 'User-Agent': 'request' });

	return new Promise((resolve, reject) => {
		fetch(url, { headers })
			.then((res) => {
				res
					.json()
					.then((json) => {
						// Convert
						const prices: Price[] = Object.keys(json['Time Series (Daily)']).map((key) => {
							const jsonPrice: JsonPrice = json['Time Series (Daily)'][key];
							return {
								open: jsonPrice['1. open'],
								high: jsonPrice['2. high'],
								low: jsonPrice['3. low'],
								close: jsonPrice['4. close'],
								volume: jsonPrice['5. volume']
							};
						});
						// Return
						resolve(prices);
					})
					.catch((err) => {
						reject(err);
					});
			})
			.catch((err) => {
				reject(err);
			});
	});
};
