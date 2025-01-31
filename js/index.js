// Add footer element
const body = document.querySelector("body");
const footer = document.createElement("footer");
body.appendChild(footer);

// Insert copyright text (current year and student's name) in footer
const today = new Date();
const thisYear = today.getFullYear();

const copyright = document.createElement("p");
copyright.innerHTML = `\u00A9 Natalya Khvan ${thisYear}`;
footer.appendChild(copyright);

// Add Skills section and list of skills using array
const skills = [
  "JavaScript",
  "Java",
  "HTML",
  "CSS",
  "SQL",
  "Selenium",
  "CucumberBDD",
  "JUnit",
  "TestNG",
  "JDBC",
  "REST Assured Library",
  "Postman",
  "Github",
  "Jira X-Ray",
];
const skillsSection = document.querySelector("#Skills");

const skillList = skillsSection.querySelector("ul");
for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement("li");
  skill.innerText = skills[i];
  skillList.appendChild(skill);
}

// Add Message form
const messageForm = document.querySelector('form[name="leave_message"]');

// Funtion to toggle the visibility of Messages section
function toggleMessageSection() {
  const messageSection = document.querySelector("#messages");
  const messageList = messageSection.querySelector("ul");

  // Display existing messages, hide the section if there are no messages
  if (messageList.children.length === 0) {
    messageSection.style.display = "none";
  } else {
    messageSection.style.display = "block";
  }
}

// Add a submit event listener to the message form
messageForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Retrieve user input values
  const usersName = event.target.usersName.value;
  const usersEmail = event.target.usersEmail.value;
  const usersMessage = event.target.usersMessage.value;

  // Log user input
  console.log(usersName);
  console.log(usersEmail);
  console.log(usersMessage);

  // Create a new message entry and append it to the Messages section
  const messageSection = document.querySelector("#messages");
  const messageList = messageSection.querySelector("ul");
  const newMessage = document.createElement("li");
  newMessage.innerHTML = `<a href="mailto:${usersEmail}" title="Send email to ${usersName}">${usersName}</a>: <span>${usersMessage}</span>`;

  // Add Remove button to delete the message
  const removeButton = document.createElement("button");
  removeButton.innerText = "Remove";
  removeButton.type = "button";

  removeButton.addEventListener("click", function () {
    const entry = removeButton.parentNode;
    entry.remove();
    toggleMessageSection();
  });

  // Add Edit button to modify the message content
  const editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.type = "button";

  editButton.addEventListener("click", function () {
    const currentMessage = newMessage.querySelector("span").innerText;
    const newMessageText = prompt("Edit your message:", currentMessage);

    if (newMessageText !== null) {
      newMessage.querySelector("span").innerText = newMessageText;
    }
  });

  // Append the buttons and the message to the list
  newMessage.appendChild(removeButton);
  newMessage.appendChild(editButton);
  messageList.appendChild(newMessage);

  // Update the visibility of Messages section
  toggleMessageSection();
  // Reset the form inputs
  event.target.reset();
});

// Initialize the visibility of Messages section
toggleMessageSection();

// Fetch and display repositories from GitHub
const githubUsername = "NatalyaKhvan";

fetch(`https://api.github.com/users/${githubUsername}/repos`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); // Parse the response JSON
  })
  .then((repositories) => {
    console.log(repositories); // Log repositories

    const projectSection = document.getElementById("Projects");

    const projectList = projectSection.querySelector("ul");

    // Iterate through the repositories and create a list of projects
    repositories.forEach((repo) => {
      const project = document.createElement("li");

      // Add a link to the repository
      const projectLink = document.createElement("a");
      projectLink.href = repo.html_url;
      projectLink.target = "_blank";
      projectLink.rel = "noopener noreferrer";
      projectLink.innerText = repo.name;
      project.appendChild(projectLink);

      // Display the creation date of the repository
      // Format the creation date
      const createdAt = new Date(repo.created_at);
      const options = { year: "numeric", month: "long" };
      const formattedDate = createdAt.toLocaleDateString(undefined, options);

      const creationDate = document.createElement("time");
      creationDate.setAttribute("datetime", repo.created_at);
      creationDate.innerText = `${formattedDate}`;
      creationDate.classList.add("projectDate");
      project.appendChild(creationDate);

      // Display the description of the repository
      projectList.appendChild(project);
      const description = document.createElement("p");
      if (repo.description) {
        description.innerText = `${repo.description}`;
        project.appendChild(description);
      } else {
        description.innerText = "No description provided.";
        project.appendChild(description);
      }
      project.classList.add("projectDescription");
    });
  })
  .catch((error) => {
    console.error("Error fetching repositories:", error);

    const projectSection = document.getElementById("Projects");

    const errorMessage = document.createElement("p");
    errorMessage.innerText =
      "Could not load repositories. Please try again later.";
    projectSection.appendChild(errorMessage);
  });
