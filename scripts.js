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
    const inflationRate = parseFloat(document.getElementById('inflationRate').value) / 100;
    const spinnakerPrice = parseFloat(document.getElementById('spinnakerPrice').value) || 0;

    let yearlyCost = days * (costPerNight + foodPerDay + entertainmentPerDay);
    let totalProjectedCost = yearlyCost;

    // Apply inflation rate
    for (let year = 2; year <= 30; year++) {
        yearlyCost *= (1 + inflationRate);
        totalProjectedCost += yearlyCost;
    }

    // Display results
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<h2>${name}'s 30-Year Vacation Cost Projection</h2>
                           <p>Calculating costs for ${days} days per year with inflation rate of ${(inflationRate * 100).toFixed(2)}%:</p>
                           <ul>
                             <li>Annual cost in the first year: $${yearlyCost.toFixed(2)}</li>
                             <li>Total cost over 30 years: $${totalProjectedCost.toFixed(2)}</li>
                           </ul>`;

    if (spinnakerPrice > 0) {
        const yearsToPayOff = spinnakerPrice / totalProjectedCost * 30;
        resultDiv.innerHTML += `<p>If you maintain these vacation habits, you will pay off your Spinnaker ownership in approximately ${yearsToPayOff.toFixed(1)} years.</p>`;
    }
}

function updatePrintTitle() {
    const name = document.getElementById('name').value.trim() || 'Guest';
    const printTitle = document.getElementById('printTitle');
    printTitle.style.display = 'block'; // Make sure the print title is visible when printing
    printTitle.textContent = `${name}'s Vacation Plan`; // Update the title dynamically based on the user's input
}