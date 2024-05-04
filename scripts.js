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

    let yearlyCost = (costPerNight + foodPerDay + entertainmentPerDay) * days;
    let totalCost = yearlyCost;
    let cumulativeCost = yearlyCost;

    let report = `<h2>${name}'s Vacation Costs Over Time</h2>`;
    report += `<ul>`;
    report += `<li>Year 1: $${yearlyCost.toFixed(2)}</li>`;

    for (let year = 5; year <= 30; year += 5) {
        let yearlyIncrease = yearlyCost * Math.pow((1 + inflationRate), 5);
        cumulativeCost += yearlyIncrease;
        report += `<li>Year ${year}: $${yearlyIncrease.toFixed(2)}</li>`;
    }

    report += `</ul>`;
    report += `<p>Total cost over 30 years: $${cumulativeCost.toFixed(2)}</p>`;

    if (spinnakerPrice > 0) {
        let yearsToPayOff = spinnakerPrice / cumulativeCost * 30;
        report += `<p>If you continue to vacation at this rate, you will have your Spinnaker ownership paid off in ${yearsToPayOff.toFixed(1)} years.</p>`;
    }

    document.getElementById('result').innerHTML = report;
}