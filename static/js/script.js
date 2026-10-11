
const introScreen = document.getElementById("introScreen");
const letterScreen = document.getElementById("letterScreen");
const memoriesScreen = document.getElementById("memoriesScreen");
const envelope = document.getElementById("openEnvelope");
const letterText = document.getElementById("letterText");
const song = document.getElementById("birthdaySong");

let typingTimers = [];
let isTyping = false;
let typingSession = 0;

// TEKS FINAL — dipertahankan sesuai teks yang kamu kirim.
const paragraphs = [
`Happy birthday to my bestieeeee, 🥳🫶🏻
Happy birthday ddee synggg, alhamdulillah ayna dde nambah umur, semoga di umur anu sekarang, semua hal baik selaludtaang ka dde, semua aku disemogakan ku dde bisa satu" Jadi kenyataan, semoga doa anu ku dde dipanjatkn ku Allah th di kabulkn. Kuahi di doakeun dde sing sehat, panjang umur na, rezekinya lancar, dimudahkan sagala urusanana, nu pasti mh dde sing selalu seneng bahagia di manapun dde berasal, aminnnnnnnn`,

`Jujur nya abi mah bersyukur pisan bisa kenal dde, punya sahabat kos dde, malahan mah lebih ti sahabat. Makasiii pisan dde uda selalu aya buat abi, makasii uda jadi bagian ti hidup abi, makasi oge karena salami ieu dde uda berbagi bnyak hal jengabi. Ti awal cerita anu penting ampe hal anu random nu tt penting oge jadi seru, mungkin buat nu lain mah semua hal th kek biasa aja, tapi buat abi mah hal hal kecil kayak gitu th justru jadi hal nu berharga pisan. Alhamdulillah abi seneng bisa punya seseorang anu bisa diajak semuanya tanpa mikir kumaha caranya jadi org lain. Sedihhh bari nangis ngetik ieu 😭
Ddeee, kgnnn😭😭😭`,

`Di hari ulang tahun dde ayna, abi mh kur hyg dde tau kalo dde th berharga pisan, tong pernah mikir boh dde th ngrasa kurang cukup baik, ngrasa kudu harus selalu jadi orang anu kuat, jg tong pernh ngebandingin diri dde jg nu lain, da setiap org ge punya waktu masing", termasuk dde. Kalo misal ayna aya sesuatu anu belum kacapai ku dde, bukn brrti dde th gagal, kalo hidup dde masi blom sesuai jg nu ku dde dipikahoyong bukan brrti dde th moal bisa nyampe ke sana, sokk pelan" , nikmatin prosesnya, tong terlalu keras ka diri dde, da dde th uda berusaha sejauh ieu th patut di banggakeun, abi harap dde lbisa lebih syng ka diri dde, sama kos dde berusaha syg ka org" Di sekitar ddee.`,

`Semoga di umur dde sekarang, dde makin dewasa, makin kuat, makin sabar, makin bahagia. Semoga dde selalu dikelilingi ku orang-orang nu tulus nu sayang ka dde, nu ngahargaan ka dde, anu tt bikin dde ngerasa sendiri. Abi oge berharap semoga semua keinginan dde satu per satu bisa kacapai, apapun anu ayna ku dd diperjuangin semoga semuanya dikasih jalanan terbaik. Semoga setiap usaha kamu th hnteu jadi sia", semoga setiap langkah dde selalu dipermudah. Aminnnn, pokoknya abi do'ain anu terbaik buat dde, sekarang ampe selamanya.`,

`Makasiii pisannn karna uda jadi sahabat anu punya tempat tersendiri di hidup abi. Abi ge tau kita th hntt selalu sempurna, mungkin aya kala na kita th renggang hela, sibuk sama urusan masing", gak bisa ada wae setiap waktu, tapi abi berharap pisan persahabatan arurabg bisa bertahan lama, semoga arurabg hntt kur jadi sahabatan ayna ngko, tapi ampe nnti, ampe punya kehidupan masing" Biar bisa cerita semua h anu ku kita uda lewatin, semoga nnti Arab masih bisa ketawa" Bareng, saling support, saling nemenin di setiap fase hidup arrg.`,

`Skali lgi happy birthday yaaa, makasiii uda ada disini, uda jadi salah satu orang anu kuahi disyukuri, semoga hari ayna dde dikelilingi bnyak doa baik, kebahagiaan, tong lupa jaga kesehatan na, kalo ada masalah, semoga dde selalu dikasi kekuatan buat nyelesain na.`,

`I wish you all the happiness in the world, ddeee. Love you so muchhhhh, semoga kita bisa terus jadi sahabat ampe tua nnti, ampe punya bnyak cerita baru anu bisa kita kenang bareng". pokoknya hari ayna dde harus bahagia. Its's your special day, so enjoy every litle thing and make the best memories. Love you always ddeeee🫶🏻🥳.`
];

// Menghentikan proses mengetik yang masih berjalan
function stopTyping() {
  typingSession++;

  typingTimers.forEach(timer => clearTimeout(timer));
  typingTimers = [];

  isTyping = false;
}

// Efek mesin tik
function renderLetter() {
  stopTyping();

  const currentSession = typingSession;

  letterText.innerHTML = "";
  isTyping = true;

  let paragraphIndex = 0;

  function typeParagraph() {
    if (currentSession !== typingSession) return;

    if (paragraphIndex >= paragraphs.length) {
      isTyping = false;
      return;
    }

    const p = document.createElement("p");
    p.className = "typing-text";
    letterText.appendChild(p);

    const currentText = paragraphs[paragraphIndex];
    let charIndex = 0;

    function typeCharacter() {
      if (currentSession !== typingSession) return;

      if (charIndex < currentText.length) {
        p.textContent += currentText.charAt(charIndex);
        charIndex++;

        // Kecepatan mengetik
        const timer = setTimeout(typeCharacter, 18);
        typingTimers.push(timer);
      } else {
        paragraphIndex++;

        const timer = setTimeout(typeParagraph, 450);
        typingTimers.push(timer);
      }
    }

    typeCharacter();
  }

  typeParagraph();
}

// Navigasi antartampilan
function showScreen(screen) {
  [introScreen, letterScreen, memoriesScreen].forEach(element => {
    element.classList.add("hidden");
  });

  screen.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  burstHearts(12);
}

// Putar lagu setelah pengguna mengklik amplop
async function playMusic() {
  song.volume = 0.5;

  try {
    await song.play();
  } catch (error) {
    console.log(
      "Lagu belum bisa diputar. Periksa file MP3:",
      error
    );
  }
}

// Amplop dibuka
envelope.addEventListener("click", async () => {
  if (envelope.classList.contains("opened")) return;

  envelope.classList.add("opened");
  burstHearts(30);

  // Mencoba memulai lagu saat pengguna berinteraksi
  playMusic();

  setTimeout(() => {
    showScreen(letterScreen);
    renderLetter();
  }, 600);
});

// Tombol melihat kenangan
document.getElementById("memoriesButton")
  .addEventListener("click", () => {
    stopTyping();
    showScreen(memoriesScreen);
  });

// Kembali membaca surat
document.getElementById("backToLetter")
  .addEventListener("click", () => {
    showScreen(letterScreen);

    if (!isTyping) {
      renderLetter();
    }
  });

// Kembali ke amplop
document.getElementById("backToEnvelope")
  .addEventListener("click", () => {
    stopTyping();

    envelope.classList.remove("opened");
    showScreen(introScreen);
  });

// Animasi hati beterbangan
const heartSymbols = [
  "♥", "♡", "❤", "💗", "💕", "💖", "୨୧", "✧"
];

function createHeart() {
  const heart = document.createElement("span");

  heart.className = "heart-float";
  heart.textContent =
    heartSymbols[
      Math.floor(Math.random() * heartSymbols.length)
    ];

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 12 + Math.random() * 20 + "px";
  heart.style.animationDuration = 7 + Math.random() * 8 + "s";

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 16000);
}

function burstHearts(amount = 12) {
  for (let i = 0; i < amount; i++) {
    setTimeout(createHeart, i * 70);
  }
}

// Hati muncul sejak halaman pertama dibuka
for (let i = 0; i < 14; i++) {
  setTimeout(createHeart, i * 250);
}

setInterval(createHeart, 650);
