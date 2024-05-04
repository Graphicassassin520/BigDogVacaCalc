function calculateIncome() {
    const location = document.getElementById("location").value;
    const season = document.getElementById("season").value;
    const room_size = document.getElementById("room_size").value;
    const nights = parseInt(document.getElementById("nights").value);
    const arp = document.getElementById("arp").value;

    // Basic validation to ensure all selections are made
    if (!location || !season || !room_size || isNaN(nights) || !arp) {
        document.getElementById("income_result").innerHTML = "<strong>Please fill in all fields.</strong>";
        return;
    }

    // Configuration of rates based on location and season
    const rates = {
        ormond_beach: {
            standard: { studio: 215, "1_bd": 315, "2_bd": 415 },
            event_week: { studio: 450, "1_bd": 1000, "2_bd": 1100 }
        },
        branson: {
            standard: { studio: 115, "1_bd": 215, "2_bd": 315 },
            event_week: { studio: 115, "1_bd": 215, "2_bd": 315 } // No change for event week in Branson, defaulting to standard rates
        }
    };

    // Calculate the nightly rate based on the selected options
    let nightly_rate = rates[location][season][room_size];
    let effective_nights = nights > 4 ? 5 : nights; // Apply the special calculation rule for more than 4 nights
    let total_income = nightly_rate * effective_nights;

    // Calculating projections for future earnings
    let projected_days_per_year = (nights > 4 ? 5 * 365 / 7 : nights * 365); // Adjust yearly projection based on number of nights
    let income_per_year = nightly_rate * projected_days_per_year;
    let income_10_years = income_per_year * 10;
    let income_20_years = income_per_year * 20;

    // Determine the ARP status text based on user selection
    let arp_text = arp === "yes" ? "13 Month Advance Priority Reservations" : "12 Month Advance Priority Reservations";

    // Display the results in the HTML
    document.getElementById("income_result").innerHTML = `
        <strong>Projected Rental Income: $${total_income.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong><br>
        Annual Projection: $${income_per_year.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}<br>
        10 Year Projection: $${income_10_years.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}<br>
        20 Year Projection: $${income_20_years.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}<br>
        ${arp_text}
    `;
}