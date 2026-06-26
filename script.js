// SPA НАВІГАЦІЯ
function navigate(targetId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    const targetScreen = document.getElementById(targetId);
    if(targetScreen) {
        targetScreen.classList.add('active');
    }
    
    document.querySelectorAll('.desktop-nav a').forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('onclick').includes(targetId)) {
            link.classList.add('active');
        }
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('sidebarOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener("DOMContentLoaded", () => {
    
    // Мобільне меню
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    function toggleMenu() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    }

    menuToggle.addEventListener('click', toggleMenu);
    document.getElementById('closeMenu').addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Інтерактивна карусель (Акордеон)
    const panels = document.querySelectorAll('.carousel-panel');
    panels.forEach(panel => {
        panel.addEventListener('click', () => {
            removeActiveClasses();
            panel.classList.add('active');
        });
    });

    function removeActiveClasses() {
        panels.forEach(panel => {
            panel.classList.remove('active');
        });
    }

    // Анімація при скролі
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
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

    // БАЗА ДАНИХ ОФІЦІЙНИХ ДОКУМЕНТІВ (Google Drive)
    const googleDriveDocs = {
        // Установчі та фінансові документи
        "statut": "https://drive.google.com/file/d/тут_ваше_посилання_на_статут",
        "licenzia": "https://drive.google.com/file/d/посилання",
        "structure": "https://drive.google.com/file/d/посилання",
        "koshtorys": "https://drive.google.com/file/d/посилання",
        "finance-zvit": "https://drive.google.com/file/d/посилання",
        "zakupivli": "https://prozorro.gov.ua/tender/search/",
        
        // Інклюзія та правила
        "dostupnist-info": "https://drive.google.com/file/d/1YNombvybqeQ9ZP6o2SZzgfxu0srV3-iN/view",
        "rules-1-4": "https://drive.google.com/file/d/посилання",
        "rules-5-11": "https://drive.google.com/file/d/посилання",
        
        // ПРОТИДІЯ НАСИЛЬСТВУ ТА БУЛІНГУ
        "buling-plan": "https://drive.google.com/file/d/посилання",
        "stress-help": "https://drive.google.com/file/d/посилання",
        "mediation": "https://drive.google.com/file/d/посилання",
        "digital-rights": "https://drive.google.com/file/d/посилання",

        // Освітній процес та вступ
        "osvitni-programy": "https://drive.google.com/file/d/посилання",
        "kriterii": "https://drive.google.com/file/d/посилання",
        "menu-food": "https://drive.google.com/file/d/посилання",
        "vstup-rules": "https://drive.google.com/file/d/посилання"
    };

    // Автоматична розстановка посилань по сайту
    Object.keys(googleDriveDocs).forEach(key => {
        const docElements = document.querySelectorAll(`[data-doc="${key}"]`);
        docElements.forEach(el => {
            el.href = googleDriveDocs[key];
            el.target = "_blank"; 
            el.rel = "noopener noreferrer"; 
        });
    });
});
