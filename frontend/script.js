const API = "http://localhost:5000/api/tasks";

async function loadTasks() {
    const res = await fetch(API);
    const data = await res.json();

    const list = document.getElementById("list");
    list.innerHTML = "";

    data.forEach(task => {
        list.innerHTML += `
            <li>
                <b>${task.title}</b> - ${task.description} (${task.status})
                <button onclick="toggle('${task._id}', '${task.status}')">Toggle</button>
                <button onclick="removeTask('${task._id}')">Delete</button>
            </li>
        `;
    });
}

async function addTask() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    if (!title) {
        alert("Enter title");
        return;
    }

    await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
    });

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";

    loadTasks();
}

async function removeTask(id) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    loadTasks();
}

async function toggle(id, status) {
    const newStatus = status === "Pending" ? "Completed" : "Pending";

    await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
    });

    loadTasks();
}

loadTasks();
