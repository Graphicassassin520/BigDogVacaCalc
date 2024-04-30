function calculateCosts() {
    const name = document.getElementById('name').value.trim() || 'Guest'; // Clean input, defaulting to 'Guest' if empty
    const days = parseInt(document.getElementById('days').value, 10) || 0;
    const costPerNight = parseFloat(document.getElementById('costPerNight').value) || 0;
    const foodPerDay = parsefloat(document.getElementById('foodPerDay').value) || 0;
    const entertainmentPerDay = parsefloat(document.getElementById('entertainmentPerDay').value) || 0;
    const inflationRate = parsefloat(document.getElementById('inflationRate').value) / 100 || 0;
    const spinnakerPrice = parsefloat(document.getElementById('spinnakerPrice').value) || 0; // New input for Spinnaker price

    let yearlyCost = days * (costPerNight + foodPerDay + entertainmentPerDay);
    let totalProjectedCost = yearlyCost; // Accumulate total cost over 30 years
    let cumulativeCost = yearlyCost; // To keep track of cumulative cost
    let yearsToPayOffSpinnaker = spinnakerPrice > 0 ? spinnakerPrice / yearlyCost : 0; // Calculate years to pay off Spinnaker

    // Start the output with the user's name and a brief of the vacation plan
    let output = `<h2>${name}'s 30 Year Vacation Plan</h2>`;
    output += `<p>If you vacation ${days} days and spend $${formatNumber(costPerNight.toFixed(2))} per night on your hotel, spend $${formatNumber(foodPerDay.toFixed(2))} per day on food, and $${formatNumber(entertainmentPerDay.toFixed(2))} per day on entertainment, you will spend:</p>`;
    
    // Begin the detailed breakdown list
    let report = `<ul>`;
    report += `<li>Year 1: Total Annual Cost: $${formatNumber(yearlyCost.toFixed(2))}, Monthly Cost: $${formatNumber((yearlyCost / 12).toFixed(2))}, Cumulative Cost: $${formatNumber(cumulativeCost.toFixed(2))}</li>`;

    for (let year = 2; year <= 30; year++) {
        yearlyCost *= (1 + inflationRate); // Apply inflation rate annually
        totalProjectedCost += yearlyCost; // Add each year's cost to the total projection
        cumulativeCost += yearlyCost; // Track cumulative cost

        if (year % 5 === 0 || year === 30) { // Display results every 5 years and in the 30th year
            report += `<li style='margin-bottom: 20px;'>Year ${year}: Total Annual Cost: $${formatNumber(yearlyCost.toFixed(2))}, Monthly Cost: $${formatNumber((yearlyCost / 12).toFixed(2))}, Cumulative Cost: $${formatNumber(cumulativeCost.toFixed(2))}</li>`;
        }
        if (spinnakerPrice > 0 && yearsToPayOffSpinnaker < 1) { // Check if Spinnaker can be paid off
            yearsToPayOffSpinnaker = year;
        }
    }

    report += `</ul>`;
    // Append a summary of the total cost over 30 years
    report += `<p style="font-size: 20px; font-weight: bold;">In the next 30 years, you will spend: $${formatNumber(totalProjectedCost.toFixed(2))}</p>`;

    // Append information about paying off the Spinnaker
    if (spinnakerPrice > 0) {
        report += `<p>If you continue to vacation the same way, you will pay off your Spinnaker ownership in ${Math.ceil(yearsToPayOffSpinnaker)} years.</p>`;
    }

    // Compare Spinnaker price to 30-year projected cost and display savings
    const savings = totalProjectedCost - spinnakerPrice;
    if (savings > 0) {
        report += `<p style="font-weight: bold;">Total savings by owning a Spinnaker compared to 30 years of vacationing: $${formatNumber(savings.toFixed(2))}</p>`;
    }

    document.getElementById('result').innerHTML = output + report;
}

// Helper function to format numbers with commas for thousands
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
