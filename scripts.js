function calculateCosts() {
    const name = document.getElementById('name').value;
    const days = parseInt(document.getElementById('days').value, 10);
    const costPerNight = parseFloat(document.getElementById('costPerNight').value);
    const foodPerDay = parseFloat(document.getElementById('foodPerDay').value);
    const entertainmentPerDay = parseFloat(document.getElementById('entertainmentPerDay').value);
    const inflationRate = parseFloat(document.getElementById('inflationRate').value) / 100;
    const spinnakerPrice = parseFloat(document.getElementById('spinnakerPrice').value);

    let yearlyCost = days * (costPerNight + foodPerDay + entertainmentPerDay);
    let totalCost = yearlyCost;
    let cumulativeCost = yearlyCost;

    let report = `<h2>${name}'s Vacation Costs Over Time</h2>`;
    report += `<ul>`;
    report += `<li>Year 1: $${yearlyCost.toLocaleString()}</li>`;

    for (let year = 5; year <= 30; year += 5) {
        yearlyCost *= Math.pow(1 + inflationRate, 5);
        cumulativeCost += yearlyCost;
        report += `<li>Year ${year}: $${yearlyCost.toLocaleString()}</li>`;
    }