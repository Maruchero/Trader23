<script lang="ts">
	import { searchTicker, type Ticker } from '$lib/api';

	let query: string;
	let typing = false;
	let timer: number;
	let tickers: Ticker[] = [];

	$: {
		if (query) {
			// When user types reset timer
			if (timer) clearTimeout(timer);
			// User is still typing
			typing = true;
			// Typing goes off in 500ms
			timer = setTimeout(() => {
				typing = false;
			}, 1000);
		}
	}

	$: {
		if (!typing) {
			if (query) {
				// Send API Call
				searchTicker(query).then((res: Ticker[]) => {
					console.log(res);
					tickers = res;
				});
			} else {
				tickers = [];
			}
		}
	}
</script>

<!-- HTML -->
<div class="relative w-3/5">
	<!-- Input for ticker -->
	<input
		type="text"
		placeholder="Type here"
		class="input input-bordered w-full max-w-full"
		bind:value={query}
	/>
	<!-- Select options -->
	<table class="absolute table bg-base-200 m-0 overflow-hidden">
		{#if tickers.length}
			<thead>
				<tr>
					<th>Symbol</th>
					<th>Name</th>
					<th>Type</th>
				</tr>
			</thead>
		{/if}
		<tbody>
			{#each tickers as ticker}
				<tr
					class="hover:bg-sky-700"
					on:click={() => {
						console.log(ticker.symbol);
					}}
				>
					<td class="overflow-hidden text-ellipsis">{ticker.symbol}</td>
					<td class="overflow-hidden text-ellipsis">{ticker.name}</td>
					<td class="overflow-hidden text-ellipsis">{ticker.type}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
