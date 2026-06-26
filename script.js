// SPA Routing (Навігація між сторінками)
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

// Функція для закриття бічного меню
function closeSidebar() {
    document.getElementById('sidebar').classList.remove('active');
    document.getElementById('sidebarOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener("DOMContentLoaded", () => {
    // Бічне меню та Акордеони
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

    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            this.parentElement.classList.toggle('open');
        });
    });

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

    // ==========================================================================
    // БАЗА ДАНИХ GOOGLE DRIVE (Автоматизація посилань)
    // Просто вставляйте сюди свої реальні посилання
    // ==========================================================================
    const googleDriveDocs = {
        // Установчі та фінансові документи
        "statut": "https://drive.google.com/file/d/тут_статут",
        "licenzia": "https://drive.google.com/file/d/тут_ліцензія",
        "koshtorys": "https://drive.google.com/file/d/тут_кошторис",
        "finance-zvit": "https://drive.google.com/file/d/тут_звіт",
        
        // Інклюзія та правила
        "dostupnist-info": "https://drive.google.com/file/d/1YNombvybqeQ9ZP6o2SZzgfxu0srV3-iN/view",
        "rules-1-4": "https://drive.google.com/file/d/посилання",
        "rules-5-11": "https://drive.google.com/file/d/посилання",
        
        // Протидія насильству: Психосоціальна підтримка
        "stress-help": "https://drive.google.com/file/d/посилання",
        "child-care": "https://drive.google.com/file/d/посилання",
        "child-rights": "https://drive.google.com/file/d/посилання",
        
        // Протидія насильству: Вирішення конфліктів
        "mediation": "https://drive.google.com/file/d/посилання",
        "mediation-book": "https://drive.google.com/file/d/посилання",
        "free-school": "https://drive.google.com/file/d/посилання",
        
        // Безпека в Інтернеті (Можна вставляти посилання на YouTube)
        "digital-rights": "https://drive.google.com/file/d/посилання",
        "digital-parents": "https://drive.google.com/file/d/посилання",
        "vid-1": "https://youtube.com/ваше_відео",
        "vid-2": "https://youtube.com/ваше_відео",
        "vid-3": "https://youtube.com/ваше_відео",
        "vid-4": "https://youtube.com/ваше_відео",
        "vid-5": "https://youtube.com/ваше_відео",
        "vid-6": "https://youtube.com/ваше_відео",

        // Освітній процес та вступ
        "osvitni-programy": "https://drive.google.com/file/d/посилання",
        "kriterii": "https://drive.google.com/file/d/посилання",
        "menu-food": "https://drive.google.com/file/d/посилання",
        "vstup-rules": "https://drive.google.com/file/d/посилання"
    };

    // Автоматична розстановка посилань по сайту
    Object.keys(googleDriveDocs).forEach(key => {
        const docElement = document.querySelector(`[data-doc="${key}"]`);
        if (docElement) {
            docElement.href = googleDriveDocs[key];
            docElement.target = "_blank"; 
            docElement.rel = "noopener noreferrer"; 
        }
    });
});
