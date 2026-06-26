document.addEventListener('DOMContentLoaded', () => {
    // --- 1. ЛОГИКА ГАЛЕРЕИ (ПРОСМОТР В УВЕЛИЧЕННОМ ВИДЕ) ---
    const mainPreview = document.getElementById('main-preview');
    const thumbs = document.querySelectorAll('#thumbs-container .thumb');

    if (mainPreview && thumbs.length > 0) {
        thumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                // Убираем рамку активности со всех миниатюр
                thumbs.forEach(t => t.classList.remove('active'));
                // Добавляем рамку текущей миниатюре
                thumb.classList.add('active');
                
                // Берём ссылку на большую картинку из атрибута data-full
                const fullImgUrl = thumb.getAttribute('data-full');
                
                // Плавно подменяем картинку в главном окне
                mainPreview.style.opacity = '0.3';
                setTimeout(() => {
                    mainPreview.setAttribute('src', fullImgUrl);
                    mainPreview.style.opacity = '1';
                }, 150);
            });
        });
    }

    // --- 2. ЛОГИКА ОТЗЫВОВ (LOCALSTORAGE) ---
    const reviewsList = document.getElementById('reviews-list');
    const commentForm = document.getElementById('comment-form');
    const authorInput = document.getElementById('author-input');
    const textInput = document.getElementById('text-input');

    if (commentForm && reviewsList && authorInput && textInput) {
        const initialReviews = [
            { name: "Анна К.", text: "Потрясающая работа фотографа! Фотографии получились космическими.", date: "12.05.2026" },
            { name: "Михаил Т.", text: "Все четко, вовремя и профессионально. Рекомендую TSAR-Photo!", date: "28.04.2026" }
        ];

        let reviews = JSON.parse(localStorage.getItem('studio_reviews'));
        if (!reviews) {
            reviews = initialReviews;
            localStorage.setItem('studio_reviews', JSON.stringify(reviews));
        }

        function displayReviews() {
            reviewsList.innerHTML = '';
            reviews.forEach(rev => {
                const card = document.createElement('div');
                card.className = 'review-card';
                card.innerHTML = `
                    <h4>${rev.name}</h4>
                    <p>${rev.text}</p>
                    <div class="review-date">${rev.date}</div>
                `;
                reviewsList.appendChild(card);
            });
        }

        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const today = new Date().toLocaleDateString('ru-RU');
            const newReview = {
                name: authorInput.value.trim(),
                text: textInput.value.trim(),
                date: today
            };

            reviews.push(newReview);
            localStorage.setItem('studio_reviews', JSON.stringify(reviews));
            
            displayReviews();
            commentForm.reset();
        });

        displayReviews();
    } else {
        console.warn("Предупреждение: Элементы формы отзывов не найдены на этой странице.");
    }
});