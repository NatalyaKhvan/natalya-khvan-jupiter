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