// Відкриття та закриття бокового меню
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('sidebarOverlay').classList.toggle('active');
}

// Відкриття та закриття підменю (Акордеон)
function toggleSub(event) {
    event.preventDefault(); 
    let parentLi = event.target.closest('.has-children');
    parentLi.classList.toggle('open');
}
