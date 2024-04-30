function calculateCosts() {
    console.log("Starting calculation...");

    const name = document.getElementById('name').value.trim() || 'Guest';
    const days = parseInt(document.getElementById('days').value, 10) || 0;
    const costPerNight = parseFloat(document.getElementById('costPerNight').value) || 0;
    const foodPerDay = parseFloat(document.getElementById('foodPerDay').value) || 0;
    const entertainmentPerDay = parsefloat(document.getElementById('entertainmentPerDay').value) || 0;
    const inflationRate = parsefloat(document.getElementById('inflationRate').value) / 100 || 0;
    const spinnakerPrice = parsefloat(document.getElementById('spinnakerPrice').value) || 0;

    console.log("Inputs fetched:", {name, days, costPerNight, foodPerDay, entertainmentPerDay, inflationRate, spinnakerPrice});

    let yearlyCost = days * (costPerNight + foodPerDay + entertainmentPerDay);
    let totalProjectedCost = yearlyCost;
    let cumulativeCost = yearlyCost;
    let yearsToPayOffSpinnaker = spinnakerPrice > 0 ? spinnakerPrice / yearlyCost : 0;

    let output = `<h2>${name}'s 30 Year Vacation Plan</h2>`;
    output += `<p>If you vacation ${days} days and spend $${formatNumber(costPerNight.toFixed(2))} per night on your hotel, spend $${formatNumber(foodPerDay.toFixed(2))} per day on food, and $${formatNumber(entertainmentPerDay.toFixed(2))} per day on entertainment, you will spend:</p>`;

    let report = `<ul>`;
    report += `<li>Year 1: Total Annual Cost: $${formatNumber(yearlyCost.toFixed(2))}, Monthly Cost: $${formatNumber((yearlyCost / 12).toFixed(2))}, Cumulative Cost: $${formatNumber(cumulativeCost.toFixed(2))}</li>`;

    for (let year = 2; year <= 30; year++) {
        yearlyCost *= (1 + inflationRate);
        totalProjectedCost += yearlyCost;
        cumulativeCost += yearlyCost;

        if (year % 5 === 0 || year === 30) {
            report += `<li style='margin-bottom: 20px;'>Year ${year}: Total Annual Cost: $${formatNumber(yearlyCost.toFixed(2))}, Monthly Cost: $${formatNumber((yearlyCost / 12).toFixed(2))}, Cumulative Cost: $${formatNumber(cumulativeCost.toFixed(2))}</li>`;
        }
        if (spinnakerPrice > 0 && yearsToPayOffSpinnaker < 1) {
            yearsToPayOffSpinnaker = year;
        }
    }

    report += `</ul>`;
    report += `<p style=\"font-size: 20px; font-weight: bold;\">In the next 30 years, you will spend: $${formatNumber(totalProjectedCost.toFixed(2))}</p>`;

    if (spinnakerPrice > 0) {
        report += `<p>If you continue to vacation the same way, you will pay off your Spinnaker ownership in ${Math.ceil(yearsToPayOffSpinnaker)} years.</p>`;
        const savings = totalProjectedCost - spinnakerPrice;
        if (savings > 0) {
            report += `<p style=\"font-weight: bold;\">Total savings by owning a Spinnaker compared to 30 years of vacationing: $${formatNumber(savings.toFixed(2))}</p>`;
        }
    }

    console.log("Calculation complete.");

    document.getElementById('result').innerHTML = output + report;
}

// Helper function to format numbers with commas for thousands
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
