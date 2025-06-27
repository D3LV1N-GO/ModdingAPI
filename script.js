document.addEventListener('DOMContentLoaded', async () => {
    // Загружаем контент
    const response = await fetch('content.md');
    const md = await response.text();
    
    // Преобразуем Markdown в HTML
    document.getElementById('content').innerHTML = marked.parse(md);
    
    // Подсвечиваем код и добавляем номера строк
    document.querySelectorAll('pre code').forEach(block => {
        // Сохраняем оригинальный код
        const originalCode = block.innerHTML;
        
        // Разбиваем на строки
        const lines = originalCode.split('\n');
        
        // Удаляем пустую последнюю строку
        if (lines.length > 0 && lines[lines.length - 1].trim() === '') {
            lines.pop();
        }
        
        // Создаём новую разметку с номерами строк
        let numberedCode = '';
        for (let i = 0; i < lines.length; i++) {
            numberedCode += `<span class="line">${lines[i]}</span>\n`;
        }
        
        // Обновляем содержимое
        block.innerHTML = numberedCode;
        
        // Подсвечиваем синтаксис
        hljs.highlightElement(block);
        
        // Добавляем обработчик для копирования кода
        addCopyButton(block);
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

function addCopyButton(codeBlock) {
    const container = codeBlock.closest('pre');
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.innerHTML = '📋';
    copyButton.title = 'Копировать код';
    
    copyButton.addEventListener('click', () => {
        const textToCopy = codeBlock.innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
            copyButton.innerHTML = '✓';
            setTimeout(() => {
                copyButton.innerHTML = '📋';
            }, 2000);
        });
    });
    
    container.style.position = 'relative';
    copyButton.style.position = 'absolute';
    copyButton.style.top = '10px';
    copyButton.style.right = '10px';
    copyButton.style.background = 'rgba(255, 77, 141, 0.2)';
    copyButton.style.border = 'none';
    copyButton.style.borderRadius = '4px';
    copyButton.style.color = 'var(--accent-light)';
    copyButton.style.padding = '5px 10px';
    copyButton.style.cursor = 'pointer';
    copyButton.style.transition = 'all 0.2s';
    copyButton.style.zIndex = '10';
    
    copyButton.addEventListener('mouseenter', () => {
        copyButton.style.background = 'rgba(255, 77, 141, 0.4)';
    });
    
    copyButton.addEventListener('mouseleave', () => {
        copyButton.style.background = 'rgba(255, 77, 141, 0.2)';
    });
    
    container.appendChild(copyButton);
}