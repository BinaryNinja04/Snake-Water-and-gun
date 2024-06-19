        const msg_text = document.querySelector(".msg");
        const score1 = document.querySelector("#score_1");
        const score2 = document.querySelector("#score_2");
        const user = document.querySelector(".user");
        const card1 = user.querySelector(".card_1");
        const card2 = user.querySelector(".card_2");
        const card3 = user.querySelector(".card_3");
        const card1_text = card1.querySelector(".card-text_1");
        const card2_text = card2.querySelector(".card-text_2");
        const card3_text = card3.querySelector(".card-text_3");
        let userScore = 0;
        let compScore = 0;
        msg_text.classList.add('hidden1');

        function disableUserButtons() {
            card1_text.disabled = true;
            card2_text.disabled = true;
            card3_text.disabled = true;
        }

        function enableUserButtons() {
            card1_text.disabled = false;
            card2_text.disabled = false;
            card3_text.disabled = false;
        }

        function logic(selectedCard, cpu_text) {
            const text = selectedCard.querySelector('button').textContent.toLowerCase();

            if (text === 'snake' && cpu_text.toLowerCase() === 'gun') {
                compScore += 10;
                score2.textContent = compScore;
            } else if (text === 'snake' && cpu_text.toLowerCase() === 'water') {
                userScore += 10;
                score1.textContent = userScore;
            } else if (text === 'water' && cpu_text.toLowerCase() === 'gun') {
                userScore += 10;
                score1.textContent = userScore;
            } else if (text === 'water' && cpu_text.toLowerCase() === 'snake') {
                compScore += 10;
                score2.textContent = compScore;
            } else if (text === 'gun' && cpu_text.toLowerCase() === 'snake') {
                userScore += 10;
                score1.textContent = userScore;
            } else if (text === 'gun' && cpu_text.toLowerCase() === 'water') {
                compScore += 10;
                score2.textContent = compScore;
            } else {
            }

            // Check if the game should be stopped
            if (userScore >= 50 || compScore >= 50) {
                disableUserButtons();
                msg_text.textContent = userScore >= 50 ? 'You Win!!' : 'You Loseeee!!';
                msg_text.classList.remove('hidden1');
                setTimeout(() => {
                    userScore = 0;
                    compScore = 0;
                    score1.textContent = userScore;
                    score2.textContent = compScore;
                    enableUserButtons();
                    msg_text.classList.add('hidden1');
                }, 5000);
            }
        }

        function brain(event) {
            const cpu = Math.floor(Math.random() * 3);
            const cpu_card = document.querySelector('.card_4');
            const cpu_text = cpu_card.querySelector('.card-text_4');
            const cpu_image = cpu_card.querySelector('.card-img-top');

            if (cpu === 0) {
                cpu_text.textContent = 'Snake';
                cpu_image.src = 'images/Cute-green-snake-cartoon-on-transparent-background-PNG.png';
            } else if (cpu === 1) {
                cpu_text.textContent = 'Water';
                cpu_image.src = 'images/pngegg.png';
            } else {
                cpu_text.textContent = 'Gun';
                cpu_image.src = 'images/halloween-gun-retro-cartoon-778bbb.webp';
            }

            const selectedCard = event.currentTarget.parentNode;
            const userCards = document.querySelectorAll('.user > div');
            userCards.forEach(card => {
                if (card !== selectedCard) {
                    card.classList.add('hidden');
                }
            });

            logic(selectedCard, cpu_text.textContent);

            setTimeout(() => {
                userCards.forEach(card => {
                    card.classList.remove('hidden');
                });
                cpu_text.textContent = "comp's turn";
                cpu_image.src = 'images/pngtree-cartoon-cute-yellow-question-mark-question-sticker-variety-decorative-pattern-png-image_7175415.png'; // Set the original image path
            }, 2000);
        }

        card1_text.addEventListener('click', brain);
        card2_text.addEventListener('click', brain);
        card3_text.addEventListener('click', brain);