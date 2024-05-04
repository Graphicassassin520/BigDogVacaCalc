document.getElementById('calculatorForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from submitting traditionally
    calculateCosts();
    updatePrintTitle();
});

function calculateCosts() {
    const name = document.getElementById('name').value.trim() || 'Guest';
    const days = parseInt(document.getElementById('days').value, 10) || 0;
    const costPerNight = parseFloat(document.getElementById('costPerNight').value) || 0;
    const foodPerDay = parseFloat(document.getElementById('foodPerDay').value) || 0;
    const entertainmentPerDay = parseFloat(document.getElementById('entertainmentPerDay').value) || 0;
    const inflationRate = parseFloat(document.getElementById('inflationRate').value) / 100;
    const spinnakerPrice = parseFloat(document.getElementById('spinnakerPrice').value) || 0;

    let yearlyCost = days * (costPerNight + foodPerDay + entertainmentPerDay);
    let cumulativeCost = yearlyCost;  // Set the first year's cost as initial cumulative cost
    let output = `<h2>${name}'s 30-Year Vacation Cost Projection</h2>
                  <p>Calculating costs for ${days} days each year, with daily costs of accommodation $${costPerNight.toFixed(2)}, food $${foodPerDay.toFixed(2)}, and entertainment $${entertainmentPerDay.toFixed(2)}, considering an annual inflation rate of ${(inflationRate * 100).toFixed(1)}%:</p><ul>`;

    // Display initial year and then every 5 years
    for (let year = 1; year <= 30; year++) {
        if (year === 1 || year % 5 === 0 || year === 30) {
            output += `<li>Year ${year}: Annual Cost: $${yearlyCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}, Monthly Cost: $${(yearlyCost / 12).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}, Cumulative Cost: $${cumulativeCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</li>`;
        }
        yearlyCost *= (1 + inflationRate);  // Apply inflation adjustment for next year
        cumulativeCost += yearlyCost;  // Update cumulative total
    }

    output += `</ul><p>Total projected cost over 30 years: $${cumulativeCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>`;

    if (spinnakerPrice > 0) {
        const yearsToPayOff = spinnakerPrice / cumulativeCost * 30;
        output += `<p>If you continue to vacation at this rate, you will pay off your Spinnaker ownership in approximately ${yearsToPayOff.toFixed(1)} years.</p>`;
    }

    document.getElementById('result').innerHTML = output;
}

function updatePrintTitle() {
    const name = document.getElementById('name').value.trim() || 'Guest';
    document.getElementById('printTitle').textContent = `${name}'s Vacation Plan`; // Update the print title dynamically
    document.getElementById('printTitle').style.display = 'block'; // Ensure visibility during printing
}