document.addEventListener("DOMContentLoaded", () => {
    
    // 1. АВТОМАТИЧНЕ ПІДСВІЧУВАННЯ АКТИВНОГО ПУНКТУ МЕНЮ
    // Отримуємо назву поточного файлу (наприклад, 'about.html')
    let currentPage = window.location.pathname.split("/").pop();
    if (currentPage === "" || currentPage === "/") {
        currentPage = "index.html"; // Якщо це корінь сайту, вважаємо, що це index.html
    }

    // Перевіряємо всі посилання в десктопному та мобільному меню
    document.querySelectorAll('.desktop-nav a, .sidebar-menu a').forEach(link => {
        let linkHref = link.getAttribute('href');
        let linkPage = linkHref.split("/").pop();
        
        if (linkPage === "" || linkPage === "/") {
            linkPage = "index.html";
        }

        // Видаляємо клас active про всяк випадок
        link.classList.remove('active');
        
        // Порівнюємо поточну сторінку з посиланням (враховуючи чисті URL без .html)
        if (currentPage === linkPage || currentPage.replace('.html', '') === linkPage.replace('.html', '')) {
            link.classList.add('active');
        }
    });

    // 2. МОБІЛЬНЕ МЕНЮ (Сайдбар)
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const closeMenuBtn = document.getElementById('closeMenu');

    function toggleMenu() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    }

    if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', toggleMenu);

    // 3. ІНТЕРАКТИВНА КАРУСЕЛЬ (Акордеон для фото простору)
    const panels = document.querySelectorAll('.carousel-panel');
    panels.forEach(panel => {
        panel.addEventListener('click', () => {
            // Знімаємо клас active з усіх
            panels.forEach(p => p.classList.remove('active'));
            // Додаємо тому, на який клікнули
            panel.classList.add('active');
        });
    });

    // 4. АНІМАЦІЯ ПРИ СКРОЛІ (Intersection Observer)
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Запускаємо спостерігач з невеликою затримкою
    setTimeout(() => {
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 100);

    // 5. БАЗА ДАНИХ ОФІЦІЙНИХ ДОКУМЕНТІВ (Google Drive)
    const googleDriveDocs = {
        "statut": "https://drive.google.com/file/d/тут_ваше_посилання_на_статут",
        "licenzia": "https://drive.google.com/file/d/посилання",
        "structure": "https://drive.google.com/file/d/посилання",
        "koshtorys": "https://drive.google.com/file/d/посилання",
        "finance-zvit": "https://drive.google.com/file/d/посилання",
        "zakupivli": "https://prozorro.gov.ua/tender/search/",
        "dostupnist-info": "https://drive.google.com/file/d/1YNombvybqeQ9ZP6o2SZzgfxu0srV3-iN/view",
        "rules-1-4": "https://drive.google.com/file/d/посилання",
        "rules-5-11": "https://drive.google.com/file/d/посилання",
        "buling-plan": "https://drive.google.com/file/d/посилання",
        "stress-help": "https://drive.google.com/file/d/посилання",
        "mediation": "https://drive.google.com/file/d/посилання",
        "digital-rights": "https://drive.google.com/file/d/посилання",
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
            el.target = "_blank"; // Відкривати в новій вкладці
            el.rel = "noopener noreferrer"; // Безпека
        });
    });
});
