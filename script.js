// Particle Background
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouse = { x: null, y: null };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (mouse.x && mouse.y) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 150) {
                this.speedX += dx / 8000;
                this.speedY += dy / 8000;
            }
        }
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = '#3489d3';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const numberOfParticles = Math.floor((canvas.width * canvas.height) / 9500);
    for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
    }
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 110) {
                ctx.strokeStyle = `rgba(52, 211, 153, ${1 - distance / 110})`;
                ctx.lineWidth = 0.7;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    connectParticles();
    requestAnimationFrame(animateParticles);
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
});

// Typing Animation
const texts = [
    "Aspiring Web Developer",
    "Tailwind CSS Enthusiast",
    "Building Modern Websites",
    "From Colombo, Sri Lanka",
    "Passionate Problem Solver",
    "Creating Beautiful UIs"
];

let textIndex = 0, charIndex = 0, isDeleting = false;
const typingElement = document.getElementById('typing-text');

function type() {
    const currentText = texts[textIndex];
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 1400);
        return;
    }
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        setTimeout(type, 600);
        return;
    }
    setTimeout(type, isDeleting ? 40 : 70);
}

// Project Modal + Other JS (same as before)
const projects = [
    { title: "Personal Portfolio", image: "🌐", description: "Responsive portfolio with Tailwind, animations, and interactive modal.", tech: ["Tailwind", "JavaScript"], liveLink: "index.html" },
    { title: "Task Manager", image: "📱", description: "Task app with add, edit, delete and localStorage.", tech: ["Tailwind", "JS"], liveLink: "#" },
    { title: "Fashion Store", image: "🛒", description: "Modern e-commerce landing page with product showcase.", tech: ["Tailwind"], liveLink: "#" }
];

function showProjectModal(index) {
    const p = projects[index];
    document.getElementById('modal-title').textContent = p.title;
    document.getElementById('modal-image').innerHTML = `<span>${p.image}</span>`;
    document.getElementById('modal-description').textContent = p.description;

    const techContainer = document.getElementById('modal-tech');
    techContainer.innerHTML = p.tech.map(t => `<span class="text-xs bg-zinc-800 px-3 py-1.5 rounded-xl">${t}</span>`).join('');

    document.getElementById('modal-live-link').href = p.liveLink;
    const modal = document.getElementById('project-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

document.getElementById('project-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeModal();
});

// Mobile, Theme, Smooth Scroll, Form
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

function updateThemeIcon() {
    themeToggle.innerHTML = html.classList.contains('dark')
        ? `<i class="fa-solid fa-sun text-lg"></i>`
        : `<i class="fa-solid fa-moon text-lg"></i>`;
}

function applyTheme(theme) {
    if (theme === 'dark') {
        html.classList.add('dark');
        html.classList.remove('light');
    } else {
        html.classList.remove('dark');
        html.classList.add('light');
    }
    updateThemeIcon();
    localStorage.setItem('theme', theme);
}

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme === 'light' || savedTheme === 'dark'
        ? savedTheme
        : (prefersDark ? 'dark' : 'light');
    applyTheme(theme);
}

mobileBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

themeToggle.addEventListener('click', () => {
    const nextTheme = html.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(nextTheme);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        mobileMenu.classList.add('hidden');
    });
});

// Web3Forms Contact Form Handler
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const submitText = document.getElementById('submit-text');
    const originalText = submitText.textContent;
    
    submitBtn.disabled = true;
    submitText.textContent = 'Sending...';
    submitBtn.innerHTML = '<span id="submit-text">Sending...</span> <i class="fas fa-spinner fa-spin ml-2"></i>';
    
    try {
        const formData = new FormData(e.target);
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('✅ Message sent successfully! I\'ll get back to you soon.');
            e.target.reset();
            submitText.textContent = originalText;
            submitBtn.innerHTML = `<span id="submit-text">${originalText}</span> <i class="fas fa-paper-plane ml-2"></i>`;
        } else {
            alert('❌ There was an error sending your message. Please try again.');
            submitText.textContent = originalText;
            submitBtn.innerHTML = `<span id="submit-text">${originalText}</span> <i class="fas fa-paper-plane ml-2"></i>`;
        }
    } catch (error) {
        console.error('Error:', error);
        alert('❌ Network error. Please check your connection and try again.');
        submitText.textContent = originalText;
        submitBtn.innerHTML = `<span id="submit-text">${originalText}</span> <i class="fas fa-paper-plane ml-2"></i>`;
    } finally {
        submitBtn.disabled = false;
    }
});


// Dynamic Year Update
function updateYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Skills Animation
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Initialize
window.addEventListener('load', () => {
    initTheme();
    resizeCanvas();
    initParticles();
    animateParticles();
    setTimeout(type, 800);
    updateYear(); // Update year on page load
});