document.addEventListener('DOMContentLoaded', async () => {
    // Загружаем контент
    const response = await fetch('content.md');
    const md = await response.text();
    
    // Преобразуем Markdown в HTML
    document.getElementById('content').innerHTML = marked.parse(md);
    
    // Подсвечиваем код
    document.querySelectorAll('pre code').forEach(block => {
        hljs.highlightElement(block);
    });
    
    // Обновляем номер страницы при прокрутке
    window.addEventListener('scroll', updatePageCounter);
    updatePageCounter();
});

function updatePageCounter() {
    const content = document.querySelector('.book-content');
    const scrollPercentage = window.scrollY / 
        (content.scrollHeight - window.innerHeight);
    
    // Рассчитываем "страницу" (1 страница = высота экрана)
    const page = Math.floor(scrollPercentage * 
        (content.scrollHeight / window.innerHeight)) + 1;
    
    document.getElementById('current-page').textContent = page;
}