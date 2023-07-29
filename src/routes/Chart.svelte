<script lang="ts">
	import { getTickerDaily, type Price } from '$lib/api';
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	export let symbol: string;

	let chart: HTMLCanvasElement;

	onMount(() => {
		const data = [
			{ year: 2010, count: 10 },
			{ year: 2011, count: 20 },
			{ year: 2012, count: 15 },
			{ year: 2013, count: 25 },
			{ year: 2014, count: 22 },
			{ year: 2015, count: 30 },
			{ year: 2016, count: 28 }
		];

		new Chart(chart, {
			type: 'bar',
			data: {
				labels: data.map((row) => row.year),
				datasets: [
					{
						label: 'Acquisitions by year',
						data: data.map((row) => row.count)
					}
				]
			}
		});
	});

	// Prices
	let prices: Price[] = [];
	getTickerDaily(symbol).then((res: Price[]) => {
		console.log(res);
	});
</script>

<canvas bind:this={chart} />
