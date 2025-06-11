// auth.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Swiper
    var swiper = new Swiper(".home-slider", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: true,
        },
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
    });

    // Theme Toggler
    let themeToggler = document.querySelector('.theme-toggler');
    document.querySelector('.toggle-btn').onclick = () => {
        themeToggler.classList.toggle('active');
    };

    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.onclick = () => {
            let color = btn.style.background;
            document.querySelector(':root').style.setProperty('--main-color', color);
        };
    });

    // Auth System using Local Storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

    // Event System
    let events = JSON.parse(localStorage.getItem('events')) || [];
    
    // Initialize default events if empty
    if(events.length === 0) {
        events = [
            {
                id: 1,
                title: "Music Festival",
                date: "2023-12-15",
                category: "Music",
                location: "New York",
                description: "Annual music festival featuring top artists",
                image: "images/g-1.jpg",
                featured: true
            },
            // Add more default events as needed
        ];
        localStorage.setItem('events', JSON.stringify(events));
    }

    // Search and Filter Implementation
    const searchInput = document.getElementById('searchInput');
    if(searchInput) {
        searchInput.addEventListener('input', filterEvents);
    }

    // Navigation Links
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Update UI based on login status
    updateAuthUI();

    // Load initial events
    renderUpcomingEvents();
    renderFeaturedEvents();
});

// Auth Functions
function registerUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if(users.some(user => user.email === email)) {
        alert('User already exists!');
        return false;
    }
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
}

function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
    }
    return false;
}

function updateAuthUI() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const authLinks = document.getElementById('authLinks');
    
    if(currentUser) {
        authLinks.innerHTML = `
            <a href="#" onclick="logout()">Logout</a>
            <a href="#saved-events">Saved Events</a>
            <a href="#create-event">Create Event</a>
        `;
    } else {
        authLinks.innerHTML = `
            <a href="#login">Login</a>
            <a href="#signup">Signup</a>
        `;
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    updateAuthUI();
    window.location.reload();
}

// Event Functions
function createEvent(eventData) {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const newEvent = {
        id: Date.now(),
        ...eventData,
        featured: false
    };
    events.push(newEvent);
    localStorage.setItem('events', JSON.stringify(events));
    return newEvent;
}

function renderUpcomingEvents() {
    const serviceSection = document.querySelector('.service .box-container');
    const upcomingEvents = JSON.parse(localStorage.getItem('events')) || [];
    
    serviceSection.innerHTML = upcomingEvents.map(event => `
        <div class="box">
            <img src="${event.image}" alt="${event.title}">
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <p>Date: ${event.date}</p>
            <button class="btn" onclick="saveEvent(${event.id})">Save Event</button>
        </div>
    `).join('');
}

function renderFeaturedEvents() {
    const gallerySection = document.querySelector('.gallery .box-container');
    const featuredEvents = JSON.parse(localStorage.getItem('events')).filter(event => event.featured);
    
    gallerySection.innerHTML = featuredEvents.map(event => `
        <div class="box">
            <img src="${event.image}" alt="${event.title}">
            <h3 class="title">${event.title}</h3>
            <div class="icons">
                <a href="#" class="fas fa-heart"></a>
                <a href="#" class="fas fa-share"></a>
                <a href="#" class="fas fa-eye"></a>
            </div>
        </div>
    `).join('');
}

function filterEvents() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredEvents = events.filter(event => 
        event.title.toLowerCase().includes(searchTerm) ||
        event.location.toLowerCase().includes(searchTerm)
    );
    renderUpcomingEvents(filteredEvents);
}

function saveEvent(eventId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(!currentUser) {
        alert('Please login to save events!');
        return;
    }
    
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    if(!bookmarks.some(b => b.eventId === eventId && b.userId === currentUser.email)) {
        bookmarks.push({ userId: currentUser.email, eventId });
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
}

// Contact Form Handler
function handleContactForm(e) {
    e.preventDefault();
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    const feedback = JSON.parse(localStorage.getItem('feedback')) || [];
    feedback.push(formData);
    localStorage.setItem('feedback', JSON.stringify(feedback));
    alert('Thank you for your message!');
    e.target.reset();
}