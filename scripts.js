document.getElementById('calculatorForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    calculateCosts();
});

function calculateCosts() {
    const name = document.getElementById('name').value.trim() || 'Guest';
    const days = parseInt(document.getElementById('days').value, 10) || 0;
    const costPerNight = parseFloat(document.getElementById('costPerNight').value) || 0;
    const foodPerDay = parseFloat(document.getElementById('foodPerDay').value) || 0;
    const entertainmentPerDay = parseFloat(document.getElementById('entertainmentPerDay').value) || 0;
    const inflationRate = parseFloat(document.getElementById('inflationRate').value) / 100 || 0;
    const spinnakerPrice = parseFloat(document.getElementById('spinnakerPrice').value) || 0;

    let yearlyCost = days * (costPerNight + foodPerDay + entertainmentPerDay);
    let cumulativeCost = yearlyCost;
    let report = `<h2>${name}'s 30 Year Vacation Plan</h2>`;
    report += `<p>Initial yearly cost based on your inputs is $${formatNumber(yearlyCost)}.</p>`;
    report += `<ul>`;

    for (let year = 1; year <= 30; year++) {
        if (year === 1 || year % 5 === 0) {
            report += `<li>Year ${year}: Total Cost: $${formatNumber(cumulativeCost)}</li>`;
        }
        yearlyCost *= (1 + inflationRate);
        cumulativeCost += yearlyCost;
    }

    report += `</ul>`;
    report += `<p style="font-size: 20px; font-weight: bold;">Total cost of vacations over 30 years: $${formatNumber(cumulativeCost)}</p>`;

    if (spinnakerPrice > 0) {
        const yearsToPayOffSpinnaker = spinnakerPrice / cumulativeCost * 30;
        report += `<p>If you continue to vacation at this rate, you will have your Spinnaker ownership paid off in ${yearsToPayOffSpinnaker.toFixed(1)} years.</p>`;
    }

    document.getElementById('result').innerHTML = report;
}

function formatNumber(num) {
    return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}