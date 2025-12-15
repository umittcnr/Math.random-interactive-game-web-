// =======================================================
// ALGORİTMA BET - ANA DEĞİŞKENLER
// =======================================================

// Sabitler (Loto)
const MIN_NUMBER = 1;
const MAX_NUMBER = 49;
const NUM_TO_PICK = 6;
const COST_PER_GAME = 10; // Tüm oyunların maliyeti

// Durum Değişkenleri
let userSelectedNumbers = [];
let randomNumbers = [];
let currentBalance = 0; // Sanal Bakiye

// HTML Element Referansları (Genel)
const ageGate = document.getElementById('age-gate');
const balanceGate = document.getElementById('balance-gate'); 
const gameContainer = document.getElementById('game-container');
const verifyButton = document.getElementById('verify-button');
const ageInput = document.getElementById('age-input');
const kediDiyalog = document.querySelector('.kedi-diyalogu');
const currentBalanceSpan = document.getElementById('current-balance'); 
const balanceSelectButtons = document.querySelectorAll('.balance-select'); 

// HTML Element Referansları (Navigasyon)
const gameContents = document.querySelectorAll('.game-content');
const navButtons = document.querySelectorAll('.nav-btn');

// HTML Element Referansları (Loto Oyunu)
const selectionGrid = document.getElementById('user-selection-grid');
const playButton = document.getElementById('play-button');
const selectedCountSpan = document.getElementById('selected-count');
const resultArea = document.getElementById('result-area');
const resultMessage = document.getElementById('result-message');
const matchCountDisplay = document.getElementById('match-count-display');
const randomNumbersDisplay = document.getElementById('random-numbers-display');
const restartButton = document.getElementById('restart-button');

// HTML Element Referansları (Yazı Tura)
const flipChoices = document.querySelectorAll('.flip-choice');
const flipResultDisplay = document.getElementById('flip-result');

// HTML Element Referansları (Zar Oyunu)
const diceChoices = document.querySelectorAll('.dice-choice');
const diceResultDisplay = document.getElementById('dice-result');


// =======================================================
// YAŞ KONTROL MANTIĞI
// =======================================================
verifyButton.addEventListener('click', () => {
    const age = parseInt(ageInput.value);

    if (isNaN(age)) {
        kediDiyalog.textContent = "Sayı girmeyi de mi bilmiyorsun? Kod yazamazsın sen!";
        return;
    }

    if (age >= 18) {
        kediDiyalog.textContent = "Tamam, reşitsin. Şimdi cebinde ne kadar sanal para var?";
        
        // Animasyonlu geçiş
        ageGate.style.opacity = '0';
        setTimeout(() => {
            ageGate.classList.add('hidden');
            ageGate.classList.remove('active');
            balanceGate.classList.remove('hidden');
            // Fade in efekti eklenebilir
        }, 500);

    } else {
        kediDiyalog.textContent = "Yürü git bücür! Javada 'if(age < 18) return;' çalıştı!";
        document.body.style.backgroundColor = "darkred";
    }
});
// =======================================================
// YENİ: ENTER TUŞU İLE GİRİŞ MANTIĞI
// =======================================================

// Yaş giriş alanında Enter tuşuna basıldığında kontrolü tetikle
ageInput.addEventListener('keydown', (event) => {
    // Tuş kodu 13 (Enter) ise
    if (event.key === 'Enter') {
        // Tarayıcının varsayılan Enter davranışını (örneğin formu submit etme) engeller
        event.preventDefault(); 
        // verifyButton'ın click olayını manuel olarak tetikler
        verifyButton.click(); 
    }
});
// =======================================================
// BAKİYE SEÇİM MANTIĞI
// =======================================================
balanceSelectButtons.forEach(button => {
    button.addEventListener('click', () => {
        const amount = parseInt(button.getAttribute('data-amount'));
        currentBalance = amount;
        updateBalanceDisplay();
        
        balanceGate.classList.add('hidden');
        gameContainer.classList.remove('hidden');
    });
});

function updateBalanceDisplay() {
    currentBalanceSpan.textContent = currentBalance + " TL";
    if (currentBalance <= 0) {
        currentBalanceSpan.style.color = "red";
    } else {
        currentBalanceSpan.style.color = "lime";
    }
}

// =======================================================
// NAVİGASYON MANTIĞI
// =======================================================
navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Aktif butonu güncelle
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // İçeriği değiştir
        const gameType = btn.getAttribute('data-game');
        gameContents.forEach(content => {
            if (content.id === `${gameType}-game`) {
                content.classList.remove('hidden');
                content.classList.add('active');
            } else {
                content.classList.add('hidden');
                content.classList.remove('active');
            }
        });
    });
});


// =======================================================
// LOTO OYUN MANTIĞI
// =======================================================

// Izgarayı Oluştur
function createGrid() {
    selectionGrid.innerHTML = '';
    for (let i = MIN_NUMBER; i <= MAX_NUMBER; i++) {
        const btn = document.createElement('div');
        btn.classList.add('number-btn');
        btn.textContent = i;
        btn.addEventListener('click', () => toggleNumber(i, btn));
        selectionGrid.appendChild(btn);
    }
}

function toggleNumber(num, btnElement) {
    if (userSelectedNumbers.includes(num)) {
        userSelectedNumbers = userSelectedNumbers.filter(n => n !== num);
        btnElement.classList.remove('selected');
    } else {
        if (userSelectedNumbers.length < NUM_TO_PICK) {
            userSelectedNumbers.push(num);
            btnElement.classList.add('selected');
        } else {
            alert("Maksimum 6 sayı seçebilirsin!");
        }
    }
    updateUI();
}

function updateUI() {
    selectedCountSpan.textContent = `${userSelectedNumbers.length}/${NUM_TO_PICK}`;
    playButton.disabled = userSelectedNumbers.length !== NUM_TO_PICK || currentBalance < COST_PER_GAME;
}

playButton.addEventListener('click', () => {
    if (currentBalance >= COST_PER_GAME) {
        currentBalance -= COST_PER_GAME;
        updateBalanceDisplay();
        playGame();
    } else {
        alert("Bakiye Yetersiz!");
    }
});

function playGame() {
    // Rastgele Sayı Üretimi (Algoritma)
    randomNumbers = [];
    while (randomNumbers.length < NUM_TO_PICK) {
        const r = Math.floor(Math.random() * MAX_NUMBER) + 1;
        if (!randomNumbers.includes(r)) {
            randomNumbers.push(r);
        }
    }

    // Arayüz Güncelleme
    document.getElementById('selection-area').classList.add('hidden');
    resultArea.classList.remove('hidden');
    restartButton.classList.remove('hidden');
    
    displayResults();
}

function displayResults() {
    randomNumbersDisplay.innerHTML = '';
    let matchCount = 0;

    // Sonuçları Göster
    randomNumbers.forEach(num => {
        const ball = document.createElement('div');
        ball.classList.add('result-ball');
        ball.textContent = num;
        
        if (userSelectedNumbers.includes(num)) {
            ball.classList.add('match');
            matchCount++;
        }
        
        randomNumbersDisplay.appendChild(ball);
    });

    matchCountDisplay.textContent = `Eşleşen Sayı Adedi: ${matchCount}`;

    // Ödül Mantığı
    let reward = 0;
    let message = "";
    
    switch(matchCount) {
        case 6: reward = 200; message = "BÜYÜK İKRAMİYE! ALGORİTMAYI HACKLEDİN!"; break;
        case 5: reward = 50; message = "Çok yaklaştın!"; break;
        case 4: reward = 25; message = "Güzel tahmin."; break;
        case 3: reward = 10; message = "Amorti (gibi)."; break;
        case 2: 
        case 1: reward = 5; message = "Zararın yarısı döndü."; break;
        default: message = "Algoritma kazandı, sen kaybettin.";
    }

    if (reward > 0) {
        currentBalance += reward;
        resultMessage.style.color = "lime";
        resultMessage.textContent = `${message} Kazanç: +${reward} TL`;
    } else {
        resultMessage.style.color = "red";
        resultMessage.textContent = message;
    }
    
    updateBalanceDisplay();
}

restartButton.addEventListener('click', () => {
    userSelectedNumbers = [];
    randomNumbers = [];
    createGrid();
    document.getElementById('selection-area').classList.remove('hidden');
    resultArea.classList.add('hidden');
    updateUI();
});

// Başlat
createGrid();


// =======================================================
// YAZI TURA MANTIĞI
// =======================================================
flipChoices.forEach(btn => {
    btn.addEventListener('click', () => {
        if (currentBalance < COST_PER_GAME) {
            alert("Bakiye yetersiz!");
            return;
        }

        currentBalance -= COST_PER_GAME;
        updateBalanceDisplay();

        const userChoice = btn.getAttribute('data-choice');
        const randomVal = Math.random();
        const result = randomVal < 0.5 ? 'Yazı' : 'Tura';
        
        let win = (userChoice === result);
        let winAmount = win ? 20 : 0;
        
        if (win) currentBalance += winAmount;
        updateBalanceDisplay();

        flipResultDisplay.innerHTML = `
            <p>Seçim: ${userChoice} | Sonuç: <strong>${result}</strong></p>
            <p style="color: ${win ? 'lime' : 'red'}">${win ? 'KAZANDIN! (+20 TL)' : 'KAYBETTİN!'}</p>
        `;
    });
});


// =======================================================
// ZAR OYUNU MANTIĞI
// =======================================================
diceChoices.forEach(btn => {
    btn.addEventListener('click', () => {
        if (currentBalance < COST_PER_GAME) {
            alert("Bakiye yetersiz!");
            return;
        }
        
        // Butonları kilitle
        diceChoices.forEach(b => b.disabled = true);
        
        const userChoice = btn.getAttribute('data-choice'); // Küçük, Ortalama, Büyük
        
        // Oynat
        playDiceGame(userChoice);
    });
});

function initializeDiceGame() {
    diceResultDisplay.innerHTML = '';
    diceChoices.forEach(btn => btn.disabled = false);
}

function playDiceGame(userChoice) {
    currentBalance -= COST_PER_GAME;
    updateBalanceDisplay();

    // 2 Zar at
    const roll1 = Math.floor(Math.random() * 6) + 1;
    const roll2 = Math.floor(Math.random() * 6) + 1;
    const total = roll1 + roll2;

    // Kategoriyi Belirle
    let algorithmCategory = "";
    let winAmount = 0;

    if (total >= 2 && total <= 6) {
        algorithmCategory = "Küçük";
        winAmount = 25; // Daha az olasılık, daha yüksek ödül
    } else if (total === 7) {
        algorithmCategory = "Ortalama";
        winAmount = 15; // En yüksek olasılık, en düşük ödül
    } else {
        algorithmCategory = "Büyük";
        winAmount = 25;
    }

    const isWinner = (userChoice === algorithmCategory);

    if (isWinner) {
        currentBalance += winAmount;
    }
    updateBalanceDisplay();

    let message = `<p class="result-text">Seçiminiz: <strong>${userChoice}</strong>. Algoritma Atışı: Zar 1 (${roll1}) + Zar 2 (${roll2}) = <strong>${total}</strong> (${algorithmCategory}).</p>`;
    
    if (isWinner) {
        message += `<p class='win-message' style='color: lime;'>KAZANDIN! Olasılık Hesabı Doğru! (+${winAmount} TL)</p>`;
    } else {
        message += `<p class='lose-message' style='color: red;'>KAYBETTİN! Algoritma beklentini kırdı. (-10 TL)</p>`;
    }
    
    diceResultDisplay.innerHTML = message;
    diceChoices.forEach(btn => btn.disabled = true);

    const restartBtn = document.createElement('button');
    restartBtn.classList.add('casino-btn', 'restart-mini');
    restartBtn.textContent = 'TEKRAR ZAR AT!';
    restartBtn.addEventListener('click', initializeDiceGame);
    diceResultDisplay.appendChild(restartBtn);
}


// =======================================================
// MODAL MANTIĞI (GÜNCELLENDİ)
// =======================================================

const howItWorksBtn = document.getElementById('how-it-works-btn');
const infoModal = document.getElementById('info-modal');
const closeBtnPhysical = document.querySelector('.close-btn-physical'); // YENİ BUTON

howItWorksBtn.addEventListener('click', () => {
    infoModal.classList.remove('hidden');
});

// Yeni buton için dinleyici
if (closeBtnPhysical) {
    closeBtnPhysical.addEventListener('click', () => {
        infoModal.classList.add('hidden');
    });
}

// Dışarı tıklayınca kapanma
window.addEventListener('click', (event) => {
    if (event.target === infoModal) {
        infoModal.classList.add('hidden');
    }
});