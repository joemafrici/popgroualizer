document.addEventListener("DOMContentLoaded", function() {
	const ctx = document.getElementById('populationChart').getContext('2d');
	const initialPopulationInput = document.getElementById('initialPopulation');
	const carryingCapacityInput = document.getElementById('carryingCapacity');
	const growthRateInput = document.getElementById('growthRate');
	const growthRateValue = document.getElementById('growthRateValue');

	let initialPopulation = parseInt(initialPopulationInput.value);
	let carryingCapacity = parseInt(carryingCapacityInput.value);
	let growthRate = parseFloat(growthRateInput.value);

	growthRateInput.addEventListener('input', function() {
		growthRate = parseFloat(growthRateInput.value);
		growthRateValue.textContent = growthRate;
		updateChart();
	});

	initialPopulationInput.addEventListener('change', function() {
		initialPopulation = parseInt(initialPopulationInput.value);
		updateChart();
	});

	carryingCapacityInput.addEventListener('change', function() {
		carryingCapacity = parseInt(carryingCapacityInput.value);
		updateChart();
	});

	function logisticGrowth(P0, r, K, t) {
		return K / (1 + ((K - P0) / P0) * Math.exp(-r * t));
	}

	function generateData(P0, r, K) {
		const data = [];
		for (let t = 0; t <= 100; t++) {
			data.push(logisticGrowth(P0, r, K, t));
		}
		return data;
	}

	const chart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: Array.from({ length: 101 }, (_, i) => i),
			datasets: [{
				label: 'Population Size',
				data: generateData(initialPopulation, growthRate, carryingCapacity),
				borderColor: 'rgba(75, 192, 192, 1)',
				borderWidth: 2,
				fill: false
			}]
		},
		options: {
			responsive: true,
			scales: {
				x: {
					title: {
						display: true,
						text: 'Time'
					}
				},
				y: {
					title: {
						display: true,
						text: 'Population Size'
					}
				}
			}
		}
	});

	function updateChart() {
		chart.data.datasets[0].data = generateData(initialPopulation, growthRate, carryingCapacity);
		chart.update();
	}
});

