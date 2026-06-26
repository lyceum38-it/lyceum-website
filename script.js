// ==========================================================================
// 1. SPA НАВІГАЦІЯ
// ==========================================================================
function navigate(targetId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    const targetScreen = document.getElementById(targetId);
    if(targetScreen) targetScreen.classList.add('active');
    
    document.querySelectorAll('.desktop-nav a').forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('onclick').includes(targetId)) link.classList.add('active');
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('sidebarOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener("DOMContentLoaded", () => {
    
    // --- Сайдбар Логіка ---
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    
    function toggleMenu() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    }
    menuToggle?.addEventListener('click', toggleMenu);
    document.getElementById('closeMenu')?.addEventListener('click', toggleMenu);
    overlay?.addEventListener('click', toggleMenu);
    
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            this.parentElement.classList.toggle('open');
        });
    });

    // ==========================================================================
    // 2. ІНТЕРАКТИВНІ АНІМАЦІЇ (Mousemove, Ripple)
    // ==========================================================================
    
    // Ambient Orbs (Lerp до курсора)
    const orb1 = document.querySelector('.orb-1');
    const orb2 = document.querySelector('.orb-2');
    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let orb1X = 0, orb1Y = 0, orb2X = 0, orb2Y = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX; mouseY = e.clientY;
    });

    function animateOrbs() {
        const targetX1 = (mouseX - window.innerWidth / 2) * 0.04;
        const targetY1 = (mouseY - window.innerHeight / 2) * 0.04;
        const targetX2 = (mouseX - window.innerWidth / 2) * -0.03;
        const targetY2 = (mouseY - window.innerHeight / 2) * -0.03;

        orb1X += (targetX1 - orb1X) * 0.02;
        orb1Y += (targetY1 - orb1Y) * 0.02;
        orb2X += (targetX2 - orb2X) * 0.02;
        orb2Y += (targetY2 - orb2Y) * 0.02;

        if (orb1) orb1.style.transform = `translate(${orb1X}px, ${orb1Y}px)`;
        if (orb2) orb2.style.transform = `translate(${orb2X}px, ${orb2Y}px)`;

        requestAnimationFrame(animateOrbs);
    }
    // Запускаємо тільки якщо не ввімкнено "reduce motion" в ОС
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        animateOrbs();
    }

    // Ripple ефект для кнопок
    document.querySelectorAll('.quick-link-btn, .btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x - size/2}px`;
            ripple.style.top = `${y - size/2}px`;
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ==========================================================================
    // 3. SCROLL АНІМАЦІЇ (Staggered Cards, Counters, Progress Line)
    // ==========================================================================
    
    // Staggered-анімація карток (.grid > .card)
    document.querySelectorAll('.grid').forEach(grid => {
        const cards = grid.querySelectorAll('.card, .bento-card');
        // Роздаємо inline затримку кожній картці у гріді
        cards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.15}s`;
        });
    });

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Активація базових reveal блоків та карток
                entry.target.classList.add('active');
                
                // Якщо це грід, активуємо всі картки всередині
                if(entry.target.classList.contains('grid')) {
                    entry.target.querySelectorAll('.card, .bento-card').forEach(c => c.classList.add('active'));
                }

                scrollObserver.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

    // Підписуємо всі гріди, прогрес-бари та звичайні reveal-елементи
    document.querySelectorAll('.grid, .reveal, .scroll-progress-line').forEach(el => scrollObserver.observe(el));

    // Анімація цифр (Counters)
    const counters = document.querySelectorAll('.count-up');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                let count = 0;
                const updateCount = () => {
                    const increment = target / 40; // швидкість рахунку
                    if (count < target) {
                        count += increment;
                        entry.target.innerText = Math.ceil(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCount();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));

    // ==========================================================================
    // 4. БАЗА ДАНИХ ОФІЦІЙНИХ ДОКУМЕНТІВ (Google Drive)
    // ==========================================================================
    const googleDriveDocs = {
        "statut": "https://drive.google.com/file/d/тут_статут",
        "licenzia": "https://drive.google.com/file/d/тут_ліцензія",
        "koshtorys": "https://drive.google.com/file/d/тут_кошторис",
        "dostupnist-info": "https://drive.google.com/file/d/1YNombvybqeQ9ZP6o2SZzgfxu0srV3-iN/view",
        "rules-1-4": "https://drive.google.com/file/d/посилання",
        "stress-help": "https://drive.google.com/file/d/посилання"
        // (Додайте усі ваші посилання)
    };

    Object.keys(googleDriveDocs).forEach(key => {
        const docElement = document.querySelector(`[data-doc="${key}"]`);
        if (docElement) {
            docElement.href = googleDriveDocs[key];
            docElement.target = "_blank"; 
            docElement.rel = "noopener noreferrer"; 
        }
    });
});
