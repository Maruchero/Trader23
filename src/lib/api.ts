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
