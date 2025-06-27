document.addEventListener('DOMContentLoaded', async () => {
    // Загружаем контент
    const response = await fetch('content.md');
    const md = await response.text();
    
    // Преобразуем Markdown в HTML
    document.getElementById('content').innerHTML = marked.parse(md);
    
    // Подсвечиваем код
    document.querySelectorAll('pre code').forEach(block => {
        hljs.highlightElement(block);
        // Добавляем номер строк для блоков кода
        const lines = block.innerHTML.split('\n').length - 1;
        block.innerHTML = `<span class="line-numbers">${Array(lines).fill(0).map((_, i) => `<span>${i+1}</span>`).join('\n')}</span>\n${block.innerHTML}`;
    });
    
    // Обновляем номер страницы при прокрутке
    window.addEventListener('scroll', updatePageCounter);
    updatePageCounter();
    
    // Добавляем плавную прокрутку для заголовков
    document.querySelectorAll('h1, h2, h3, h4').forEach(header => {
        header.style.cursor = 'pointer';
        header.addEventListener('click', () => {
            window.scrollTo({
                top: header.offsetTop - 30,
                behavior: 'smooth'
            });
        });
    });
});

function updatePageCounter() {
    const content = document.querySelector('.book-content');
    const scrollPercentage = window.scrollY / 
        (content.scrollHeight - window.innerHeight);
    
    // Рассчитываем "страницу" (1 страница = высота экрана)
    const totalPages = Math.ceil(content.scrollHeight / window.innerHeight);
    const currentPage = Math.floor(scrollPercentage * totalPages) + 1;
    
    document.querySelector('.page-counter').innerHTML = 
        `Modding API by DЗLV!N<br>Страница ${currentPage} из ${totalPages}<br>Special thx: .exe`;
}