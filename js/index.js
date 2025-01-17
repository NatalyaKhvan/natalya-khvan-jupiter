const body = document.querySelector('body');
const footer = document.createElement('footer');
body.appendChild(footer);

const today = new Date();
const thisYear = today.getFullYear();

const copyright = document.createElement('p');
copyright.innerHTML = `\u00A9 Natalya Khvan ${thisYear}`;
footer.appendChild(copyright);

const skills = ['JavaScript', 'Java', 'HTML', 'CSS', 'SQL', 'Selenium', 'CucumberBDD','JUnit','TestNG', 'JDBC', 'REST Assured Library', 'Postman','Github', 'Jira X-Ray'];
const skillsSection = document.querySelector('#Skills');
const skillList = skillsSection.querySelector('ul');
for (let i = 0; i<skills.length; i++){
    const skill =document.createElement('li');
    skill.innerText = skills[i];
    skillList.appendChild(skill);
}

const messageForm = document.querySelector('form[name="leave_message"]');

function toggleMessageSection() {
    const messageSection = document.querySelector('#messages');
    const messageList = messageSection.querySelector('ul');
    
    if (messageList.children.length === 0) {
        messageSection.style.display = 'none';
    } else {
        messageSection.style.display = 'block';
    }
}

messageForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const usersName = event.target.usersName.value;
    const usersEmail = event.target.usersEmail.value;
    const usersMessage = event.target.usersMessage.value;
    
    console.log(usersName);
    console.log(usersEmail);
    console.log(usersMessage);

    const messageSection = document.querySelector('#messages');
    const messageList = messageSection.querySelector('ul');
    const newMessage = document.createElement('li');
    newMessage.innerHTML = `<a href="mailto:${usersEmail}" title="Send email to ${usersName}">${usersName}</a>: <span>${usersMessage}</span>`;
    
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove';
    removeButton.type = 'button';

    removeButton.addEventListener('click', function() {
        const entry = removeButton.parentNode;
        entry.remove();
        toggleMessageSection();
    });

    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.type = 'button';

    editButton.addEventListener('click', function() {
        const currentMessage = newMessage.querySelector('span').innerText;
        const newMessageText = prompt('Edit your message:', currentMessage);
        
        if (newMessageText !== null) {
            newMessage.querySelector('span').innerText = newMessageText;
        }
    });

    newMessage.appendChild(removeButton);
    newMessage.appendChild(editButton);
    messageList.appendChild(newMessage);
    
    toggleMessageSection();
    event.target.reset();
});

toggleMessageSection();

const githubUsername = "NatalyaKhvan";

fetch(`https://api.github.com/users/${githubUsername}/repos`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(repositories => {
        console.log(repositories);

        const projectSection = document.getElementById("Projects");

        const projectList = projectSection.querySelector("ul");

        repositories.forEach(repo => {
            const project = document.createElement("li");

            const projectLink = document.createElement("a");
            projectLink.href = repo.html_url;
            projectLink.target ="_blank";
            projectLink.rel = "noopener noreferrer";
            projectLink.innerText = repo.name;
            project.appendChild(projectLink);
            projectList.appendChild(project);
        });

    })
    .catch(error => {
        console.error("Error fetching repositories:", error);

        const projectSection = document.getElementById("Projects");

        const errorMessage = document.createElement("p");
        errorMessage.innerText = "Could not load repositories. Please try again later.";
        projectSection.appendChild(errorMessage);
    });

