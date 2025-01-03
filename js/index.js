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