// ハンバーガーメニューバー
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

hamburger.addEventListener('click', () => {
  menu.classList.toggle('active');
  hamburger.classList.toggle('open');
});

// 検索、ジャンル分け
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.button-container button'); // ジャンルボタンを取得
    const cards = document.querySelectorAll('.card'); // カードを取得
    const searchInput = document.querySelector('header input[type="text"]'); // 検索バー要素を取得

    // ジャンルボタンによるフィルタリング
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const genre = button.getAttribute('data-genre'); // ボタンのジャンルを取得

            cards.forEach(card => {
                if (genre === 'all' || card.getAttribute('data-genre').includes(genre)) {
                    card.style.display = 'block'; // 一致するカードを表示
                } else {
                    card.style.display = 'none'; // 一致しないカードを非表示
                }
            });
        });
    });

    // 検索バーによるフィルタリング
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase(); // 入力された文字を小文字化

        cards.forEach(card => {
            const keywords = card.getAttribute('data-keywords').toLowerCase(); // data-keywordsを取得

            if (keywords.includes(searchTerm)) {
                card.style.display = 'block'; // 検索条件に一致した場合、カードを表示
            } else {
                card.style.display = 'none'; // 一致しない場合、カードを非表示
            }
        });
    });
});


