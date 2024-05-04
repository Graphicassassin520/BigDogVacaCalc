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
    const inflationRate = parseFloat(document.getElementById('inflationRate').value) / 100; // Convert percentage to decimal
    const spinnakerPrice = parseFloat(document.getElementById('spinnakerPrice').value) || 0;

    let initialYearlyCost = days * (costPerNight + foodPerDay + entertainmentPerDay);
    let cumulativeCost = initialYearlyCost; // Initial year cost for cumulative calculations
    let totalProjectedCost = initialYearlyCost; // Total cost projection over 30 years

    let output = `<h2>${name}'s 30-Year Vacation Cost Projection</h2>`;
    output += `<p>If you vacation ${days} days each year, with daily costs of accommodation $${costPerNight.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}, food $${foodPerDay.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}, and entertainment $${entertainmentPerDay.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}, considering an annual inflation rate of ${(inflationRate * 100).toFixed(1)}%:</p>`;
    output += `<ul>`;

    for (let year = 1; year <= 30; year++) {
        initialYearlyCost *= (1 + inflationRate); // Apply inflation rate annually
        totalProjectedCost += initialYearlyCost; // Accumulate total cost over 30 years
        if (year % 5 === 0 || year === 30) { // Display results every 5 years and in the 30th year
            cumulativeCost += initialYearlyCost;
            output += `<li>Year ${year}: Annual Cost: $${initialYearlyCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}, Monthly Cost: $${(initialYearlyCost / 12).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}, Cumulative Cost: $${cumulativeCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</li>`;
        }
    }

    output += `</ul>`;
    output += `<p>Total projected cost over 30 years: $${totalProjectedCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>`;

    if (spinnakerPrice > 0) {
        const yearsToPayOff = spinnakerPrice / totalProjectedCost * 30;
        output += `<p>If you maintain these vacation habits, you will pay off your Spinnaker ownership in approximately ${yearsToPayOff.toFixed(1)} years.</p>`;
    }

    document.getElementById('result').innerHTML = output;
}

function updatePrintTitle() {
    const name = document.getElementById('name').value.trim() || 'Guest';
    document.getElementById('printTitle').textContent = `${name}'s Vacation Plan`; // Dynamically update the print title
    document.getElementById('printTitle').style.display = 'block'; // Ensure visibility during printing
}