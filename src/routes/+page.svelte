<script>
  import Chart from './Chart.svelte';
import Search from './Search.svelte';

	let symbol = "AAPL";
</script>

<div class="flex flex-col items-center py-5">
	<Search />
	<Chart {symbol}></Chart>
</div>
