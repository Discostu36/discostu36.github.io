document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("text-input");
    const addButton = document.getElementById("add-button");
    const resultDiv = document.getElementById("result");

    addButton.addEventListener("click", () => {
        const inputText = inputField.value;
        const totalMinutes = calculateTotalTime(inputText);
        
        if (totalMinutes !== null) {
            resultDiv.innerHTML = `
                <p><strong>Total Time:</strong> ${formatTime(totalMinutes)}</p>
                <p><strong>In Minutes:</strong> ${totalMinutes} min</p>
                <p><strong>In Hours:</strong> ${(totalMinutes / 60).toFixed(2)} h</p>
            `;
        } else {
            resultDiv.innerHTML = `<p style="color: red;">Invalid input format. Please enter time ranges like "12:00-13:30".</p>`;
        }
    });
});

function calculateTotalTime(input) {
    const timeRanges = input.match(/\d{1,2}:\d{2}-\d{1,2}:\d{2}/g);
    if (!timeRanges) return null;

    let totalMinutes = 0;
    
    for (const range of timeRanges) {
        const [start, end] = range.split("-").map(parseTime);
        if (start === null || end === null) return null;
        totalMinutes += end - start;
    }
    return totalMinutes;
}

function parseTime(timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
        return null;
    }
    return hours * 60 + minutes;
}

function formatTime(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}:${minutes} h`;
}
