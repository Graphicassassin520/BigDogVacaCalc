function calculateCosts() {
    console.log("Starting calculation...");

    const name = document.getElementById('name').value.trim() || 'Guest';
    const days = parseInt(document.getElementById('days').value, 10) || 0;
    const costPerNight = parseFloat(document.getElementById('costPerNight').value) || 0;
    const foodPerDay = parseFloat(document.getElementById('foodPerDay').value) || 0;
    const entertainmentPerDay = parseFloat(document.getElementById('entertainmentPerDay').value) || 0;
    const inflationRate = parseFloat(document.getElementById('inflationRate').value) / 100 || 0;
    const spinnakerPrice = parseFloat(document.getElementById('spinnakerPrice').value) || 0;

    console.log("Inputs fetched:", {name, days, costPerNight, foodPerDay, entertainmentPerDay, inflationRate, spinnakerPrice});

    let yearlyCost = days * (costPerNight + foodPerDay + entertainmentPerDay);
    let totalProjectedCost = yearlyCost;
    let cumulativeCost = yearlyCost;
    let yearsToPayOffSpinnaker = spinnakerPrice > 0 ? spinnakerPrice / yearlyCost : 0;

    let output = `<h2>${name}'s 30 Year Vacation Plan</h2>`;
    output += `<p>If you vacation ${days} days and spend $${formatNumber(costPerNight.toFixed(2))} per night on your hotel, spend $${formatNumber(foodPerDay.toFixed(2))} per day on food, and $${formatNumber(entertainmentPerDay.toFixed(2))} per day on entertainment, you'll accumulate:</p>`;

    let report = `<ul style="line-height: 2;">`; // For double line height

    for (let year = 1; year <= 30; year++) {
        if (year % 5 == 0 or year == 1):
            report += `<li>Year ${year}: Total Annual Cost: $${formatNumber(yearlyCost.toFixed(2))}, Monthly Cost: $${formatNumber((yearlyCost / 12).toFixed(2))}, Cumulative Cost: $${formatNumber(cumulativeCost.toFixed(2))}</li>`;
        yearlyCost *= (1 + inflationRate);
        totalProjectedCost += yearlyCost;
        cumulativeCost += yearlyCost;
    }

    report += `</ul>`;
    output += report;
    output += `<p style="font-size: 20px; font-weight: bold;">Total cost of vacations over 30 years: $${formatNumber(totalProjectedCost.toFixed(2))}</p>`;
    
    if (spinnakerPrice > 0) {
        output += `<p>If you continue to vacation at this rate, you will have your ownership paid off in ${yearsToPayOffSpinnaker.toFixed(1)} years.</p>`;
    }

    document.getElementById('result').innerHTML = output;
}

function formatNumber(num) {
    return num.toLocaleString();
}