document.getElementById('calculatorForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent default form submission
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
    let totalCost = initialYearlyCost;

    for (let year = 2; year <= 30; year++) {
        let yearlyCost = initialYearlyCost * Math.pow(1 + inflationRate, year - 1);
        cumulativeCost += yearlyCost;
    }

    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<h2>${name}'s Vacation Plan</h2>
                           <p>For ${days} days of vacation per year, with a daily cost of accommodation at $${costPerNight}, food at $${foodPerDay}, and entertainment at $${entertainmentPerDay}, considering an annual inflation rate of ${inflationRate * 100}%:</p>
                           <ul>
                             <li>Initial Yearly Cost: $${initialYearlyCost.toFixed(2)}</li>
                             <li>Total Cost over 30 years: $${cumulativeCost.toFixed(2)}</li>
                           </ul>`;

    if (spinnakerPrice > 0) {
        let yearsToPayOff = spinnakerPrice / cumulativeCost * 30;
        resultDiv.innerHTML += `<p>You will pay off your Spinnaker investment in ${yearsToPayOff.toFixed(1)} years if you continue at these rates.</p>`;
    }
}

function updatePrintTitle() {
    const name = document.getElementById('name').value.trim() || 'Guest';
    const printTitle = document.getElementById('printTitle');
    printTitle.style.display = 'block'; // Ensure the print title is visible for printing
    printTitle.textContent = `${name}'s Vacation Plan`; // Update text dynamically based on user input
}