document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('services-container');
    const searchInput = document.getElementById('search-input');
    const sortButtons = document.querySelectorAll('.sorting button');
    const paginationContainer = document.querySelector('.pagination');

    // Получаем массив исходных карточек из твоего HTML
    const originalCards = Array.from(container.querySelectorAll('.service-card'));
    
    let filteredCards = [...originalCards];
    let currentPage = 1;
    const itemsPerPage = 2; // Выводим по 2 карточки на страницу для работы пагинации

    // Функция отрисовки элементов на странице
    function render() {
        container.innerHTML = '';
        
        // Пагинация: вырезаем нужный кусок массива
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedItems = filteredCards.slice(start, end);

        // Вставляем карточки текущей страницы обратно в контейнер
        paginatedItems.forEach(card => container.appendChild(card));

        // Обновляем кнопки пагинации
        updatePagination();
    }

    // Функция обновления кнопок пагинации
    function updatePagination() {
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(filteredCards.length / itemsPerPage);

        if (totalPages <= 1) return;

        // Кнопка Назад
        const prevBtn = document.createElement('button');
        prevBtn.className = 'page-btn prev-btn';
        prevBtn.innerHTML = '&laquo; Назад';
        prevBtn.disabled = currentPage === 1;
        prevBtn.onclick = () => { currentPage--; render(); };
        paginationContainer.appendChild(prevBtn);

        // Кнопки с номерами страниц
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = page-btn ${i === currentPage ? 'active' : ''};
            pageBtn.innerText = i;
            pageBtn.onclick = () => { currentPage = i; render(); };
            paginationContainer.appendChild(pageBtn);
        }

        // Кнопка Вперед
        const nextBtn = document.createElement('button');
        nextBtn.className = 'page-btn next-btn';
        nextBtn.innerHTML = 'Вперед &raquo;';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.onclick = () => { currentPage++; render(); };
        paginationContainer.appendChild(nextBtn);
    }

    // 1. ЖИВОЙ ПОИСК
    searchInput.addEventListener('input', (e) => {
        const text = e.target.value.toLowerCase().trim();
        
        filteredCards = originalCards.filter(card => {
            const title = card.getAttribute('data-title').toLowerCase();
            return title.includes(text);
        });

        currentPage = 1; // Возвращаемся на первую страницу при поиске
        render();
    });

    // 2. СОРТИРОВКА
    sortButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sortType = button.getAttribute('data-sort');

            if (sortType === 'price') {
                // Сортировка по цене (от меньшей к большей)
                filteredCards.sort((a, b) => {
                    return parseFloat(a.getAttribute('data-price')) - parseFloat(b.getAttribute('data-price'));
                });
            } else if (sortType === 'title') {
                // Сортировка по алфавиту
                filteredCards.sort((a, b) => {
                    return a.getAttribute('data-title').localeCompare(b.getAttribute('data-title'));
                });
            }

            render();
        });
    });

    // Первый запуск при загрузке страницы
    render();
});