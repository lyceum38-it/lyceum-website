// ==========================================================================
// 1. ГЛОБАЛЬНА ФУНКЦІЯ НАВІГАЦІЇ (SPA Routing)
// Дозволяє перемикатися між екранами без перезавантаження сторінки
// ==========================================================================
function navigate(targetId) {
    // Ховаємо всі екрани
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Показуємо потрібний екран
    const targetScreen = document.getElementById(targetId);
    if(targetScreen) {
        targetScreen.classList.add('active');
    }
    
    // Оновлюємо активний стан у верхньому меню
    document.querySelectorAll('.desktop-nav a').forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('onclick').includes(targetId)) {
            link.classList.add('active');
        }
    });
    
    // Плавний скрол нагору сторінки при перемиканні
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Функція для закриття бічного меню після вибору пункту
function closeSidebar() {
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('sidebarOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

// ==========================================================================
// 2. ІНІЦІАЛІЗАЦІЯ ПІСЛЯ ЗАВАНТАЖЕННЯ СТОРІНКИ
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    
    // --- Логіка бічного меню ---
    const menuToggle = document.getElementById('menuToggle');
    const closeMenuBtn = document.getElementById('closeMenu');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    function toggleMenu() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    }

    menuToggle.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Акордеон для пунктів бічного меню
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const parentLi = this.parentElement;
            parentLi.classList.toggle('open');
        });
    });

    // --- Анімація плавної появи елементів під час скролу ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 100);

    // ==========================================================================
    // 3. БАЗА ДАНИХ ОФІЦІЙНИХ ДОКУМЕНТІВ (Google Drive)
    // Вставляйте сюди посилання на ваші PDF/Docs. 
    // ==========================================================================
    const googleDriveDocs = {
        // Прозорість
        "statut": "https://drive.google.com/file/d/тут_ваше_посилання_на_статут",
        "structure": "https://drive.google.com/file/d/посилання",
        "licenzia": "https://drive.google.com/file/d/посилання",
        "koshtorys": "https://drive.google.com/file/d/посилання",
        "finance-zvit": "https://drive.google.com/file/d/посилання",
        "zakupivli": "https://prozorro.gov.ua/tender/search/", // Або лінк на ваш тендерний кабінет
        
        // Булінг та правила
        "buling-plan": "https://drive.google.com/file/d/посилання",
        "buling-zayava": "https://drive.google.com/file/d/посилання",
        "vstup-rules": "https://drive.google.com/file/d/посилання",
        
        // Освітній процес
        "osvitni-programy": "https://drive.google.com/file/d/посилання",
        "kriterii": "https://drive.google.com/file/d/посилання",
        "menu-food": "https://drive.google.com/file/d/посилання"
    };

    // Автоматична розстановка посилань по сайту
    Object.keys(googleDriveDocs).forEach(key => {
        const docElement = document.querySelector(`[data-doc="${key}"]`);
        if (docElement) {
            docElement.href = googleDriveDocs[key];
            docElement.target = "_blank"; // Відкриває документ у новій вкладці
            docElement.rel = "noopener noreferrer"; // Безпековий стандарт
        }
    });
});
