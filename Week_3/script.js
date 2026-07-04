const goalInput = document.getElementById("goalInput");
const generateBtn = document.getElementById("generateBtn");
const taskContainer = document.getElementById("taskContainer");
const status = document.getElementById("status");

generateBtn.addEventListener("click", generateTasks);

goalInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        generateTasks();
    }
});

async function generateTasks() {
    const goal = goalInput.value.trim();

    if (!goal) {
        alert("Please enter a goal.");
        return;
    }

    taskContainer.innerHTML = "";
    status.textContent = "Generating your smart task plan...";
    generateBtn.disabled = true;
    generateBtn.textContent = "Generating...";

    try {
        const response = await fetch("/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ goal })
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || "Something went wrong.");
        }

        status.textContent = "";

        displayTasks(data.tasks);

    } catch (error) {
        console.error(error);

        status.textContent = "❌ Failed to generate tasks. Please try again.";

    } finally {
        generateBtn.disabled = false;
        generateBtn.textContent = "Generate Tasks";
    }
}

function displayTasks(tasks) {

    if (!tasks || tasks.length === 0) {
        taskContainer.innerHTML = "<p>No tasks were generated.</p>";
        return;
    }

    taskContainer.innerHTML = "";

    tasks.forEach((task, index) => {

        let priorityColor = "#28a745";

        if (task.priority.toLowerCase() === "high") {
            priorityColor = "#dc3545";
        } else if (task.priority.toLowerCase() === "medium") {
            priorityColor = "#ffc107";
        }

        const card = document.createElement("div");
        card.className = "task";

        card.innerHTML = `
            <h3>Step ${index + 1}: ${task.task}</h3>

            <p>
                <strong>Priority:</strong>
                <span style="color:${priorityColor};font-weight:bold;">
                    ${task.priority}
                </span>
            </p>

            <p>
                <strong>Estimated Time:</strong>
                ${task.estimated_time}
            </p>
        `;

        taskContainer.appendChild(card);
    });
}