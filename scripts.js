document.getElementById('calculatorForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the default form submission
    calculateCosts();
});

function calculateCosts() {
    const name = document.getElementById('name').value.trim() || 'Guest';
    const days = parseFloat(document.getElementById('days').value) || 0;
    const costPerNight = parseFloat(document.getElementById('costPerNight').value) || 0;
    const foodPerDay = parseFloat(document.getElementById('foodPerDay').value) || 0;
    const entertainmentPerDay = parseFloat(document.getElementById('entertainmentPerDay').value) || 0;
    const inflationRate = parseFloat(document.getElementById('inflationRate').value) / 100; // Convert percentage to decimal
    const spinnakerPrice = parseFloat(document.getElementById('spinnakerPrice').value) || 0;

    let initialYearlyCost = (costPerNight + foodPerDay + entertainmentPerDay) * days;
    let cumulativeCost = 0;
    let runningTotal = 0;

    let report = `<h2>${name}'s Vacation Costs Over Time</h2>`;
    report += `<p>If you vacation ${days} days and spend $${formatNumber(costPerNight)} per night on your hotel, spend $${formatNumber(foodPerDay)} per day on food, and $${formatNumber(entertainmentPerDay)} per day on entertainment, over the next 30 years you will spend:</p>`;
    report += `<ul>`;

    for (let year = 1; year <= 30; year++) {
        let annualCost = initialYearlyCost * Math.pow((1 + inflationRate), year - 1);
        let monthlyCost = annualCost / 12;
        runningTotal += annualCost;

        if (year % 5 === 0 || year === 1) {
            report += `<li>Year ${year}: Annual Cost: $${formatNumber(annualCost)}, Monthly Cost: $${formatNumber(monthlyCost)}, Cumulative Total: $${formatNumber(runningTotal)}</li>`;
        }
    }

    report += `</ul>`;
    report += `<p>Total cost over 30 years: $${formatNumber(runningTotal)}</p>`;

    let yearsToPayOffSpinnaker = spinnakerPrice / runningTotal * 30;
    if (spinnakerPrice > 0) {
        report += `<p>If you continue to vacation at this rate, you will have your Spinnaker ownership paid off in ${yearsToPayOffSpinnaker.toFixed(1)} years.</p>`;
    }

    document.getElementById('result').innerHTML = report;
}

function formatNumber(num) {
    return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}