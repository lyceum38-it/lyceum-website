document.addEventListener("DOMContentLoaded", () => {
    
// 1. АВТОМАТИЧНЕ ПІДСВІЧУВАННЯ АКТИВНОГО МЕНЮ
    let currentPage = window.location.pathname.split("/").pop() || "index.html";
    
    document.querySelectorAll('.desktop-nav a, .sidebar-menu a').forEach(link => {
        let linkHref = link.getAttribute('href');
        
        // Відкидаємо ".html" від посилань та назви сторінки для коректного порівняння 
        // Це дозволяє скрипту працювати як локально, так і з Vercel cleanUrls
        let cleanLink = linkHref.replace('.html', '');
        let cleanPage = currentPage.replace('.html', '');
        
        if (cleanLink === cleanPage) {
            link.classList.add('active');
        }
    });

    // 2. МОБІЛЬНЕ МЕНЮ
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

    // 3. ІНТЕРАКТИВНА КАРУСЕЛЬ
    const panels = document.querySelectorAll('.carousel-panel');
    panels.forEach(panel => {
        panel.addEventListener('click', () => {
            panels.forEach(p => p.classList.remove('active'));
            panel.classList.add('active');
        });
    });

    // 4. АНІМАЦІЯ ПРИ СКРОЛІ
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 5. GOOGLE DRIVE DOCS
    const googleDriveDocs = {
        "statut": "https://drive.google.com/file/d/тут_ваше_посилання",
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

    Object.keys(googleDriveDocs).forEach(key => {
        const docElements = document.querySelectorAll(`[data-doc="${key}"]`);
        docElements.forEach(el => {
            el.href = googleDriveDocs[key];
            el.target = "_blank";
            el.rel = "noopener noreferrer";
        });
    });
});
