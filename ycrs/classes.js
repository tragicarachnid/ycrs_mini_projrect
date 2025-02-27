document.addEventListener("DOMContentLoaded", () => {
    const classGrid = document.getElementById("classGrid");
    const searchBar = document.getElementById("searchBar");
    const typeFilter = document.getElementById("typeFilter");
    const timeFilter = document.getElementById("timeFilter");

    let classData = [];

    // Fetch class data from JSON
    fetch("classes.json")
        .then(response => response.json())
        .then(data => {
            classData = data;
            displayClasses(classData);
        });

    // Function to display classes
    function displayClasses(classes) {
        classGrid.innerHTML = "";
        classes.forEach(cls => {
            const classCard = document.createElement("div");
            classCard.classList.add("class-card");
            classCard.innerHTML = `
                <img src="prenatal.jpg" alt="${cls.name}">
                <h3>${cls.name}</h3>
                <p><strong>Instructor:</strong> ${cls.instructor}</p>
                <p><strong>Time:</strong> ${cls.time}</p>
                <p><strong>Type:</strong> ${cls.type}</p>
                <p><strong>Description:</strong> ${cls.description}</p>
                <p><strong>Slots Left:</strong> ${cls.slots}</p>
                <div id="googleEnrollButton">enroll</div>

            `;
            classGrid.appendChild(classCard);
        });
    }

    // Filter and search function
    function filterClasses() {
        const search = searchBar.value.toLowerCase();
        const type = typeFilter.value;
        const time = timeFilter.value;

        const filtered = classData.filter(cls => 
            (cls.name.toLowerCase().includes(search)) &&
            (type === "" || cls.type === type) &&
            (time === "" || cls.time === time)
        );

        displayClasses(filtered);
    }

    searchBar.addEventListener("input", filterClasses);
    typeFilter.addEventListener("change", filterClasses);
    timeFilter.addEventListener("change", filterClasses);

    // Placeholder enroll function
    window.enroll = (id) => {
        alert("You have enrolled in class ID: " + id);
    };
});

window.enroll = (id) => {
    let enrolledClasses = JSON.parse(localStorage.getItem("enrolledClasses")) || [];
    
    if (!enrolledClasses.includes(id)) {
        enrolledClasses.push(id);
        localStorage.setItem("enrolledClasses", JSON.stringify(enrolledClasses));
        alert("You have successfully enrolled in this class!");
    } else {
        alert("You are already enrolled in this class.");
    }
};

// Store user login state
let user = null;

// Google Sign-In callback function
function handleCredentialResponse(response) {
    const data = jwt_decode(response.credential); // Decode JWT Token
    user = {
        name: data.name,
        email: data.email,
        picture: data.picture
    };

    // Store user info in local storage
    localStorage.setItem("user", JSON.stringify(user));

    // Show user info (Optional)
    document.getElementById("user-info").innerHTML = `
        <img src="${user.picture}" alt="User Image">
        <p>Welcome, ${user.name}!</p>
    `;
}

// Check if user is already logged in
window.onload = function () {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        user = JSON.parse(storedUser);
        document.getElementById("user-info").innerHTML = `<p>Welcome, ${user.name}!</p>`;
    }
};

// Function to force login before enrolling
function enroll(classId) {
    if (!user) {
        alert("Please sign in with Google before enrolling.");
        return;
    }

    // Proceed with enrollment after login
    fetch("enroll.php", {
        method: "POST",
        body: JSON.stringify({ class_id: classId, user_name: user.name, email: user.email }),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch(error => console.error("Error:", error));
}

