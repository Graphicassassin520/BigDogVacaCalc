document.getElementById('calculatorForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent default form submission
    calculateCosts();
});

function calculateCosts() {
    const name = document.getElementById('name').value.trim() || 'Guest';
    const days = parseInt(document.getElementById('days').value, 10) || 0;
    const costPerNight = parseFloat(document.getElementById('costPerNight').value) || 0;
    const foodPerDay = parseFloat(document.getElementById('foodPerDay').value) || 0;
    const entertainmentPerDay = parseFloat(document.getElementById('entertainmentPerDay').value) || 0;
    const inflationRate = parseFloat(document.getElementById('inflationRate').value) / 100;
    const spinnakerPrice = parseFloat(document.getElementById('spinnakerPrice').value) || 0;

    let initialYearlyCost = days * (costPerNight + foodPerDay + entertainmentPerDay);
    let cumulativeCost = initialYearlyCost;

    let report = `<h2>${name}'s Detailed Vacation Costs Over 30 Years</h2>`;
    report += `<p>Starting with an annual vacation cost of $${initialYearlyCost.toFixed(2)}, considering an inflation rate of ${(inflationRate * 100).toFixed(1)}%, here are the details:</p><ul>`;

    for (let year = 1; year <= 30; year++) {
        if (year === 1 || year % 5 === 0) {
            let yearlyCost = initialYearlyCost * Math.pow(1 + inflationRate, year - 1);
            let monthlyCost = yearlyCost / 12;
            cumulativeCost += yearlyCost;
            report += `<li>Year ${year}: Annual Cost: $${yearlyCost.toFixed(2)}, Monthly Cost: $${monthlyCost.toFixed(2)}, Cumulative Cost: $${cumulativeCost.toFixed(2)}</li>`;
        }
    }

    report += `</ul>`;
    let yearsToPayOffSpinnaker = spinnakerPrice / cumulativeCost * 30;
    report += `<p>Total cost over 30 years: $${cumulativeCost.toFixed(2)}</p>`;
    report += `<p>If you continue to vacation at this rate, you will have your Spinnaker ownership paid off in ${yearsToPayOffSpinnaker.toFixed(1)} years.</p>`;

    document.getElementById('result').innerHTML = report;
}

