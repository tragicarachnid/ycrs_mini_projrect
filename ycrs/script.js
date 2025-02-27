//search classes
function searchClasses() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let classCards = document.querySelectorAll(".class-card");

  classCards.forEach(card => {
      let title = card.querySelector("h3").innerText.toLowerCase();
      let category = card.querySelector(".category").innerText.toLowerCase();
      let description = card.querySelector(".description").innerText.toLowerCase();

      if (title.includes(input) || category.includes(input) || description.includes(input)) {
          card.style.display = "block";
      } else {
          card.style.display = "none";
      }
  });
}

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let fullname = document.getElementById("fullname").value;
    let contact = document.getElementById("contact").value;
    let email = document.getElementById("email").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;

    if (fullname === "" || contact === "") {
        alert("Please fill out all required fields!");
        return;
    }

    alert("Thank you, " + fullname + "! Your message has been sent successfully.");
    
    // Reset form after submission
    document.getElementById("contactForm").reset();
});

