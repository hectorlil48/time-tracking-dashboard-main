// Function to fetch JSON data and update the cards
async function fetchDataAndUpdateCards(timeframe) {
  try {
    // Fetch the JSON data
    const response = await fetch("data.json");
    const data = await response.json();

    // Update the cards based on the selected timeframe
    updateCards(data, timeframe);
  } catch (error) {
    console.error("Error fetching the data:", error);
  }
}

// Function to update cards based on selected timeframe
function updateCards(data, timeframe) {
  data.forEach((activity) => {
    const activityTitle = activity.title;

    // Replace spaces with hyphens and convert to lowercase for class matching
    const activityClass = activityTitle.toLowerCase().replace(/\s+/g, "-");

    const currentData = activity.timeframes[timeframe].current;
    const previousData = activity.timeframes[timeframe].previous;

    // Find the correct activity card
    const activityCard = document.querySelector(`.activity-${activityClass}`);

    if (activityCard) {
      // Update current and previous times
      activityCard.querySelector(
        ".current-time"
      ).textContent = `${currentData}hrs`;
      activityCard.querySelector(".previous-time").textContent = `Last ${
        timeframe.charAt(0).toUpperCase() + timeframe.slice(1)
      } - ${previousData}hrs`;
    } else {
      console.error(`No element found with class: .activity-${activityClass}`);
    }
  });
}

// Function to handle button clicks and set active class
function handleOptionClick(event) {
  if (event.target.classList.contains("btn")) {
    const selectedTimeframe = event.target.textContent.toLowerCase();

    // Remove the active class from all buttons
    document
      .querySelectorAll(".btn")
      .forEach((btn) => btn.classList.remove("active"));

    // Add active class to the clicked button
    event.target.classList.add("active");

    // Fetch and update cards with the selected timeframe
    fetchDataAndUpdateCards(selectedTimeframe);
  }
}

// Add event listeners to buttons
document
  .querySelector(".user-options")
  .addEventListener("click", handleOptionClick);

// Load "Daily" data by default when the page loads
window.addEventListener("DOMContentLoaded", () => {
  // Set "Daily" as the default active option
  fetchDataAndUpdateCards("daily");
});
