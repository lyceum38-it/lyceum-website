document.addEventListener("DOMContentLoaded", () => {
    // Налаштування Intersection Observer для анімації появи (scroll reveal)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Додаємо клас для активації CSS анімації
                entry.target.classList.add('active');
                // Припиняємо спостереження після появи
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Знаходимо всі елементи з класом reveal і починаємо за ними стежити
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
});
