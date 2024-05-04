document.getElementById('calculatorForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission that refreshes the page
    calculateCosts();
});

function calculateCosts() {
    const name = document.getElementById('name').value.trim() || 'Guest';
    const days = parseInt(document.getElementById('days').value, 10) || 0;
    const costPerNight = parseFloat(document.getElementById('costPerNight').value) || 0;
    const foodPerDay = parseFloat(document.getElementById('foodPerDay').value) || 0;
    const entertainmentPerDay = parseFloat(document.getElementById('entertainmentPerDay').value) || 0;
    const inflationRate = parseFloat(document.getElementById('inflationRate').value) / 100; // convert percentage to decimal
    const spinnakerPrice = parseFloat(document.getElementById('spinnakerPrice').value) || 0;

    let initialYearlyCost = (costPerNight + foodPerDay + entertainmentPerDay) * days;
    let cumulativeCost = initialYearlyCost;
    let totalCumulativeCost = initialYearlyCost;

    let report = `<h2>${name}'s Vacation Costs Over Time</h2>`;
    report += `<p>If you vacation ${days} days and spend $${formatNumber(costPerNight)} per night, $${formatNumber(foodPerDay)} per day on food, and $${formatNumber(entertainmentPerDay)} per day on entertainment, here's your cost breakdown over 30 years:</p>`;
    report += `<ul>`;
    report += `<li>Year 1: Annual Cost: $${formatNumber(initialYearlyCost)}, Monthly: $${formatNumber(initialYearlyCost / 12)}</li>`;

    for (let year = 2; year <= 30; year++) {
        let annualCost = initialYearlyCost * Math.pow(1 + inflationRate, year - 1);
        let monthlyCost = annualCost / 12;
        totalCumulativeCost += annualCost;

        if (year % 5 === 0) {
            report += `<li>Year ${year} Total Vacation Cost: $${formatNumber(totalCumulativeCost)}, Annual: $${formatNumber(annualCost)}, Monthly: $${formatNumber(monthlyCost)}</li>`;
        }
    }

    report += `</ul>`;
    report += `<p>Total cost over 30 years: $${formatNumber(totalCumulativeCost)}</p>`;

    if (spinnakerPrice > 0) {
        let yearsToPayOffSpinnaker = (spinnakerPrice / totalCumulativeCost) * 30;
        report += `<p>If you continue to vacation at this rate, you will have your Spinnaker ownership paid off in ${yearsToPayOffSpinnaker.toFixed(1)} years.</p>`;
    }

    document.getElementById('result').innerHTML = report;
}

function formatNumber(num) {
    return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}