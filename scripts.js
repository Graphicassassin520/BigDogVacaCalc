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

    let initialYearlyCost = days * (costPerNight + foodPerDay + entertainmentPerDay);
    let cumulativeCost = initialYearlyCost;
    let output = `<h2>${name}'s 30 Year Vacation Plan</h2>
                  <p>If you vacation ${days} days each year, with daily costs of accommodation $${costPerNight.toFixed(2)}, food $${foodPerDay.toFixed(2)}, and entertainment $${entertainmentPerDay.toFixed(2)}, considering an annual inflation rate of ${inflationRate * 100}%:</p><ul>`;

    for (let year = 1; year <= 30; year++) {
        initialYearlyCost *= (1 + inflationRate);  // Apply inflation rate annually
        cumulativeCost += initialYearlyCost;  // Add each year's cost to the cumulative projection
        if (year === 1 || year % 5 === 0 || year === 30) { // Display results for the 1st year, every 5 years, and the 30th year
            output += `<li>Year ${year}: Annual Cost: $${initialYearlyCost.toFixed(2)}, Monthly Cost: $${(initialYearlyCost / 12).toFixed(2)}, Cumulative Cost: $${cumulativeCost.toFixed(2)}</li>`;
        }
    }

    output += `</ul>`;
    output += `<p>In the next 30 years, you will spend a total of $${cumulativeCost.toFixed(2)}</p>`;

    if (spinnakerPrice > 0) {
        const yearsToPayOff = spinnakerPrice / cumulativeCost * 30;
        output += `<p>If you continue to vacation this way, you will pay off your Spinnaker ownership in ${yearsToPayOff.toFixed(1)} years.</p>`;
    }

    document.getElementById('result').innerHTML = output;
}

function updatePrintTitle() {
    const name = document.getElementById('name').value.trim() || 'Guest';
    document.getElementById('printTitle').textContent = `${name}'s Vacation Plan`; // Update the print title dynamically
    document.getElementById('printTitle').style.display = 'block'; // Ensure the print title is visible
}