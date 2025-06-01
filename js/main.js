// Matrix Background Animation
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
const alphabet = katakana + latin + nums + symbols;
const fontSize = 16;
const columns = canvas.width / fontSize;
const rainDrops = [];
for (let x = 0; x < columns; x++) {
    rainDrops[x] = 1;
}
const draw = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px monospace';
    for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};
setInterval(draw, 30);
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Update date and time in footer
function updateDateTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const time = `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
    document.getElementById('current-date-time').textContent = `${day}/${month}/${year}   ${time}`;
}
updateDateTime();
setInterval(updateDateTime, 1000);

// Update timeline dates
function updateTimelineDates() {
    const now = new Date();
    const future = new Date(now);
    future.setDate(future.getDate() + 1);
    const past = new Date(now);
    past.setDate(past.getDate() - 1);

    const futureYear = document.getElementById('futureYear');
    const presentYear = document.getElementById('presentYear');
    const pastYear = document.getElementById('pastYear');

    if (futureYear) futureYear.textContent = future.getFullYear();
    if (presentYear) presentYear.textContent = now.getFullYear() + ' - Present';
    if (pastYear) pastYear.textContent = past.getFullYear();
}
updateTimelineDates();

// Animate skill bars with numbers counting up
function animateSkillBars() {
    const skills = [
        { id: 'data-analysis', value: 65 },
        { id: 'cybersecurity', value: 75 },
        { id: 'email-server', value: 99 },
        { id: 'troubleshooting', value: 100 },
        { id: 'cpanel', value: 40 },
        { id: 'whm', value: 60 },
        { id: 'whmcs', value: 60 },
        { id: 'networking', value: 80 },
        { id: 'payment-gateways', value: 36 },
        { id: 'linux-administration', value: 70 }
    ];

    skills.forEach(skill => {
        const progressBar = document.getElementById(`${skill.id}-progress`);
        const numberElement = document.getElementById(`${skill.id}-number`);
        if (!progressBar || !numberElement) return; // Skip if missing
        let current = 0;
        const increment = skill.value / 50;
        const animate = () => {
            current += increment;
            if (current > skill.value) current = skill.value;
            progressBar.style.width = `${current}%`;
            numberElement.textContent = `${Math.round(current)}%`;
            // Position number above the end of the fill
            const barWidth = progressBar.parentElement.offsetWidth;
            const percent = current / 100;
            const numberWidth = numberElement.offsetWidth || 32;
            let leftPx = barWidth * percent - numberWidth / 2;
            if (leftPx < 0) leftPx = 0;
            if (leftPx > barWidth - numberWidth) leftPx = barWidth - numberWidth;
            numberElement.style.left = `${leftPx}px`;
            if (current < skill.value) {
                requestAnimationFrame(animate);
            }
        };
        animate();
    });
}

// Animate stats counters
function animateCounters() {
    const performanceCounter = document.getElementById('performance-counter');
    const friendCounter = document.getElementById('friend-counter');
    const certificateCounter = document.getElementById('certificate-counter');
    
    const dataAnalysisBar = document.getElementById('data-analysis-bar');
    const cybersecurityBar = document.getElementById('cybersecurity-bar');
    const emailServerBar = document.getElementById('email-server-bar');
    
    // New counters
    const projectsCounter = document.getElementById('projects-counter');
    const hackathonsCounter = document.getElementById('hackathons-counter');
    const opensourceCounter = document.getElementById('opensource-counter');
    
    // Animate performance counter
    let performance = 0;
    const performanceInterval = setInterval(() => {
        performance++;
        performanceCounter.textContent = performance + '%';
        if (performance >= 100) {
            clearInterval(performanceInterval);
        }
    }, 20);
    
    // Animate friend counter
    let friends = 0;
    const friendInterval = setInterval(() => {
        friends++;
        friendCounter.textContent = friends;
        if (friends >= 1) {
            clearInterval(friendInterval);
        }
    }, 500);
    
    // Animate certificate counter
    let certificates = 0;
    const certificatesTarget = 30;
    const certificateInterval = setInterval(() => {
        certificates++;
        if (certificates < certificatesTarget) {
            certificateCounter.textContent = certificates;
        } else {
            certificateCounter.textContent = certificates + '+';
            clearInterval(certificateInterval);
        }
    }, 50);
    
    // Animate progress bars
    setTimeout(() => {
        if (dataAnalysisBar) {
            dataAnalysisBar.style.width = '65%';
            dataAnalysisBar.setAttribute('aria-valuenow', '65');
            const num = dataAnalysisBar.querySelector('.progress-number');
            if (num) num.textContent = '65% Data Analysis';
        }
        if (cybersecurityBar) {
            cybersecurityBar.style.width = '75%';
            cybersecurityBar.setAttribute('aria-valuenow', '75');
            const num = cybersecurityBar.querySelector('.progress-number');
            if (num) num.textContent = '75% Cybersecurity';
        }
        if (emailServerBar) {
            emailServerBar.style.width = '99%';
            emailServerBar.setAttribute('aria-valuenow', '99');
            const num = emailServerBar.querySelector('.progress-number');
            if (num) num.textContent = '99% Email Server Solutions';
        }
    }, 500);
    
    // Animate new counters
    // Projects Completed (300+)
    let projects = 0;
    const projectsTarget = 300;
    const projectsInterval = setInterval(() => {
        projects++;
        projectsCounter.textContent = projects + '+';
        if (projects >= projectsTarget) {
            clearInterval(projectsInterval);
        }
    }, 6);
    
    // Hackathons (3)
    let hackathons = 0;
    const hackathonsTarget = 3;
    const hackathonsInterval = setInterval(() => {
        hackathons++;
        hackathonsCounter.textContent = hackathons;
        if (hackathons >= hackathonsTarget) {
            clearInterval(hackathonsInterval);
        }
    }, 200);
    
    // Open Source (120+)
    let opensource = 0;
    const opensourceTarget = 120;
    const opensourceInterval = setInterval(() => {
        opensource++;
        opensourceCounter.textContent = opensource + '+';
        if (opensource >= opensourceTarget) {
            clearInterval(opensourceInterval);
        }
    }, 15);
}

// Typing effect for terminal
function startTypingEffect() {
    const texts = [
        "whoami",
        "sudo apt-get update",
        "ls -la ~/projects",
        "cat about.txt",
        "ping -c 3 kamrul.us",
        "ssh kamrul.us",
        "Mr.Kamrul61@Gmail.com",
        "+880165613145",
        "sudo apt-get update",
        "sudo apt-get install -y curl",
        "curl -sSL https://get.docker.com | sh",
        "sudo usermod -aG docker kamrul",
        "sudo systemctl start docker",
        "sudo systemctl enable docker",
        "sudo docker run -d -p 80:80 nginx",
        "sudo docker ps",
        "@elitekamrul"

    ];
    let currentText = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;
    function type() {
        isEnd = false;
        const text = texts[currentText];
        if (isDeleting) {
            document.getElementById('typing-text').textContent = text.substring(0, charIndex - 1);
            charIndex--;
        } else {
            document.getElementById('typing-text').textContent = text.substring(0, charIndex + 1);
            charIndex++;
        }
        if (!isDeleting && charIndex === text.length) {
            isEnd = true;
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            currentText = (currentText + 1) % texts.length;
            setTimeout(type, 500);
        } else {
            const timeout = isDeleting ? 100 : 200;
            setTimeout(type, timeout);
        }
    }
    setTimeout(type, 1000);
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', function() {
    startTypingEffect();
    updateTimelineDates();
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Wait for loader to finish, then start skill bars and counters
window.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        animateSkillBars();
        animateCounters();
    }, 5100); // 5s loader + 0.1s buffer
});

// Animated rotating roles for hero section with color cycling
(function() {
  const roles = [
    'Computer Science & Engineering Student',
    'Developer',
    'Ethical Hacker',
    'PROGRAMMER',
    'CYBERSECURITY ENTHUSIAST',
    'FREELANCER',
    'TECH LOVER',
    'LINUX USER',
    'OPEN SOURCE CONTRIBUTOR',
    'BUG HUNTER',
    'WEB DESIGNER',
    'IT SUPPORT SPECIALIST',
    'PROBLEM SOLVER',
    'LIFELONG LEARNER'
  ];
  const colors = [
    '#00ff41', // green
    '#00e0ff', // cyan
    '#ff00ea', // magenta
    '#ffae00', // orange
    '#a259ff', // purple
    '#ffe600', // yellow
    '#ff4b4b', // red
    '#00ff99', // light green
    '#36a2eb', // blue
    '#ff6384', // pink
    '#9966ff', // violet
    '#ff9800', // deep orange
    '#00ccff', // sky blue
    '#bfff00'  // lime
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const el = document.getElementById('animated-roles');
  function typeRole() {
    const currentRole = roles[roleIndex];
    // Set color for this role
    el.style.color = colors[roleIndex % colors.length];
    if (isDeleting) {
      el.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }
    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeRole, 500);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 100);
    } else {
      setTimeout(typeRole, isDeleting ? 30 : 50);
    }
  }
  if (el) setTimeout(typeRole, 300);
})(); 