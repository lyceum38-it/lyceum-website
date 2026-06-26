document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. FULLSCREEN MENU LOGIC
    // ==========================================================================
    const menuToggle = document.getElementById('menuToggle');
    const fullscreenMenu = document.getElementById('fullscreenMenu');
    const header = document.querySelector('.main-header');

    function toggleMenu() {
        const isActive = fullscreenMenu.classList.contains('active');
        if (isActive) {
            fullscreenMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.querySelector('.menu-text').innerText = 'Меню';
            document.body.style.overflow = '';
            header.style.mixBlendMode = window.innerWidth > 900 ? 'difference' : 'normal';
        } else {
            fullscreenMenu.classList.add('active');
            menuToggle.classList.add('active');
            menuToggle.querySelector('.menu-text').innerText = 'Закрити';
            document.body.style.overflow = 'hidden';
            header.style.mixBlendMode = 'normal'; // Щоб текст було видно на світлому фоні меню
            header.style.color = 'var(--primary-navy)';
            document.querySelectorAll('.hamburger span').forEach(s => s.style.background = 'var(--primary-navy)');
        }
    }

    menuToggle.addEventListener('click', toggleMenu);

    // ==========================================================================
    // 2. SPA PAGE TRANSITION (Шторка)
    // ==========================================================================
    window.navigate = function(targetId) {
        const overlay = document.getElementById('pageTransition');
        
        // Крок 1: Опускаємо шторку
        overlay.classList.add('active');
        
        // Крок 2: Чекаємо поки шторка перекриє екран, міняємо контент
        setTimeout(() => {
            // Ховаємо всі сторінки
            document.querySelectorAll('.screen').forEach(screen => {
                screen.classList.remove('active');
            });
            
            // Показуємо нову
            const targetScreen = document.getElementById(targetId);
            if(targetScreen) targetScreen.classList.add('active');
            
            // Скролимо нагору
            window.scrollTo({ top: 0, behavior: 'instant' });
            
            // Закриваємо меню, якщо воно відкрите
            if(fullscreenMenu.classList.contains('active')) {
                toggleMenu();
            }

            // Крок 3: Піднімаємо шторку назад (або опускаємо далі)
            setTimeout(() => {
                overlay.classList.remove('active');
                
                // Перезапускаємо Observer для нових елементів на екрані
                initScrollAnimations();
                
            }, 100); // Невелика затримка перед відкриттям

        }, 600); // 600ms - час анімації шторки в CSS
    };

    // ==========================================================================
    // 3. SCROLL REVEAL ANIMATIONS (Intersection Observer)
    // ==========================================================================
    let observer;

    function initScrollAnimations() {
        if (observer) observer.disconnect(); // Очищаємо старий

        const options = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Анімуємо тільки 1 раз
                }
            });
        }, options);

        // Знаходимо всі елементи для анімації на ПОТОЧНОМУ активному екрані
        const activeScreen = document.querySelector('.screen.active');
        if (activeScreen) {
            activeScreen.querySelectorAll('.fade-up-element, .clip-reveal-element').forEach(el => {
                el.classList.remove('is-visible'); // Скидаємо перед спостереженням
                observer.observe(el);
            });
        }
    }

    // Запуск при першому завантаженні
    setTimeout(initScrollAnimations, 100);

    // ==========================================================================
    // 4. БАЗА ДАНИХ ОФІЦІЙНИХ ДОКУМЕНТІВ (Google Drive)
    // ==========================================================================
    const googleDriveDocs = {
        // Установчі та фінансові
        "statut": "https://drive.google.com/file/d/тут_статут",
        "licenzia": "https://drive.google.com/file/d/тут_ліцензія",
        "structure": "https://drive.google.com/file/d/тут_структура",
        "koshtorys": "https://drive.google.com/file/d/тут_кошторис",
        "finance-zvit": "https://drive.google.com/file/d/тут_звіт",
        "zakupivli": "https://prozorro.gov.ua/tender/search/", 
        
        // Інклюзія та правила
        "dostupnist-info": "https://drive.google.com/file/d/1YNombvybqeQ9ZP6o2SZzgfxu0srV3-iN/view",
        
        // Протидія насильству
        "stress-help": "https://drive.google.com/file/d/посилання",
        "child-care": "https://drive.google.com/file/d/посилання",
        "mediation": "https://drive.google.com/file/d/посилання",
        "digital-rights": "https://drive.google.com/file/d/посилання",
        "vid-1": "https://youtube.com/ваше_відео",
        "vid-2": "https://youtube.com/ваше_відео",

        // Навчання та вступ
        "osvitni-programy": "https://drive.google.com/file/d/посилання",
        "kriterii": "https://drive.google.com/file/d/посилання",
        "menu-food": "https://drive.google.com/file/d/посилання",
        "vstup-rules": "https://drive.google.com/file/d/посилання"
    };

    // Розподіл посилань
    Object.keys(googleDriveDocs).forEach(key => {
        // Шукаємо всі посилання (бо одне посилання може бути на різних екранах)
        const docElements = document.querySelectorAll(`[data-doc="${key}"]`);
        docElements.forEach(el => {
            el.href = googleDriveDocs[key];
            el.target = "_blank"; 
            el.rel = "noopener noreferrer"; 
        });
    });
});
