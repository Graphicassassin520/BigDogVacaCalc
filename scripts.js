document.getElementById('calculatorForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from submitting in the traditional way
    calculateCosts();
    updatePrintTitle();
});

function calculateCosts() {
    const name = document.getElementById('name').value.trim() || 'Guest';
    const days = parseInt(document.getElementById('days').value, 10) || 0;
    const costPerNight = parseFloat(document.getElementById('costPerNight').value) || 0;
    const foodPerDay = parseFloat(document.getElementById('foodPerDay').value) || 0;
    const entertainmentPerDay = parseFloat(document.getElementById('entertainmentPerDay').value) || 0;
    const inflationRate = parseFloat(document.getElementById('inflationRate').value) / 100; // Convert percentage to decimal
    const spinnakerPrice = parseFloat(document.getElementById('spinnakerPrice').value) || 0;

    let initialYearlyCost = days * (costPerNight + foodPerDay + entertainmentPerDay);
    let cumulativeCost = initialYearlyCost; // Initial year cost for cumulative calculations
    let totalProjectedCost = initialYearlyCost; // Total cost projection over 30 years

    let output = `<h2>${name}'s 30-Year Vacation Cost Projection</h2>`;
    output += `<p>If you vacation ${days} days each year, with daily costs of accommodation $${costPerNight.toFixed(2)}, food $${foodPerDay.toFixed(2)}, and entertainment $${entertainmentPerDay.toFixed(2)}, considering an annual inflation rate of ${(inflationRate * 100).toFixed(1)}%:</p>`;
    output += `<ul>`;

    // Loop to calculate costs for each year up to 30 years
    for (let year = 1; year <= 30; year++) {
        initialYearlyCost *= (1 + inflationRate); // Apply inflation rate annually
        totalProjectedCost += initialYearlyCost; // Accumulate total cost over 30 years
        if (year % 5 === 0 || year === 30) { // Display results every 5 years and in the 30th year
            cumulativeCost += initialYearlyCost;
            output += `<li>Year ${year}: Annual Cost: $${initialYearlyCost.toFixed(2)}, Monthly Cost: $${(initialYearlyCost / 12).toFixed(2)}, Cumulative Cost: $${cumulativeCost.toFixed(2)}</li>`;
        }
    }

    output += `</ul>`;
    output += `<p>Total projected cost over 30 years: $${totalProjectedCost.toFixed(2)}</p>`;

    if (spinnakerPrice > 0) {
        let yearsToPayOff = spinnakerPrice / totalProjectedCost * 30;
        output += `<p>If you continue to vacation at this rate, you will pay off your Spinnaker ownership in ${yearsToPayOff.toFixed(1)} years.</p>`;
    }

    document.getElementById('result').innerHTML = output;
}

function updatePrintTitle() {
    const name = document.getElementById('name').value.trim() || 'Guest';
    const printTitle = document.getElementById('printTitle');
    printTitle.textContent = `${name}'s Vacation Plan`; // Dynamically update the print title
    printTitle.style.display = 'block'; // Ensure the print title is visible for printing
}