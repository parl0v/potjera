let kIme = localStorage.getItem("kIme");
let novac = 500;
let sekunde = 60;
let stoperica = document.getElementById("stoperica");

let pozdrav = `

   /$$$$$$$             /$$                                     
  | $$__  $$           | $$                                     
  | $$  \\ $$ /$$$$$$  /$$$$$$   /$$  /$$$$$$   /$$$$$$  /$$$$$$ 
  | $$$$$$$//$$__  $$|_  $$_/  |__/ /$$__  $$ /$$__  $$|____  $$
  | $$____/| $$  \\ $$  | $$     /$$| $$$$$$$$| $$  \\__/ /$$$$$$$
  | $$     | $$  | $$  | $$ /$$| $$| $$_____/| $$      /$$__  $$
  | $$     |  $$$$$$/  |  $$$$/| $$|  $$$$$$$| $$     |  $$$$$$$
  |__/      \\______/    \\___/  | $$ \\_______/|__/      \\_______/
                          /$$  | $$                             
                         |  $$$$$$/                             
                          \\______/                              

Dobrodošli u Potjeru!
EDIT 2023./2024.
Napravili Marija Čutura i Josip Parlov
`;

console.log(pozdrav);

document.getElementById("pPozdrav").innerHTML = "Dobar dan <b>" + kIme + "</b>!";

pitanja = JSON.parse(localStorage.getItem("pitanja"));

function kreniVrijeme() {
  let countdown = setInterval(function() {
    sekunde--;
    let minute = Math.floor(sekunde / 60);
    let preostaleSekunde = sekunde % 60;

    let display = `${minute}:${preostaleSekunde < 10 ? "0" : ""}${preostaleSekunde}`;
    stoperica.textContent = display;

    if (sekunde === 0) {
      clearInterval(countdown);
      stoperica.textContent = "Vrijeme je isteklo!";
      document.getElementById("kvizIspitivanje").innerHTML = "";
      document.getElementById("visaPonuda").innerHTML = "Viša ponuda: <b>" + novac * 4.5 + "</b>€";
      document.getElementById("nizaPonuda").innerHTML = "Niža ponuda: <b>" + novac / 2.5 + "</b>€";
      localStorage.setItem("visaPonuda", novac * 4.5);
      localStorage.setItem("srednjaPonuda", novac);
      localStorage.setItem("nizaPonuda", novac / 2.5);
      document.getElementById("pPoruka").innerHTML = "Za <b>5</b> sekundi vas prebacujemo na ploču...";
      (async () => {
        await new Promise(resolve => setTimeout(resolve, 5000));
        document.location = "ploca.html";
      })();
    }
  }, 1000);
}

function kviz() {
  document.getElementById("informacije").innerHTML = "";
  document.getElementById("kviz").style.display = "block";

  rIndex = Math.floor(Math.random() * pitanja["pitanja"].length);
  rPitanje = pitanja["pitanja"][rIndex];

  document.getElementById("pPitanje").innerText = rPitanje.pitanje;

  if (rIndex > -1) {
    pitanja["pitanja"].splice(rIndex, 1);
    localStorage.setItem("pitanja", JSON.stringify(pitanja));
  }
}

function jeLiEnter(event) {
  if (event.key === "Enter") {
    provjera();
  }
}

function provjera() {
  let odgovor = document.getElementById("odgovor");
  let bOdgovor = document.getElementById("bOdgovor");
  let pStanje = document.getElementById("pStanje");
  let pPitanje = document.getElementById("pPitanje");
  let pNovac = document.getElementById("pNovac");
  let minLength = Math.min(odgovor.value.toLowerCase().length, rPitanje[rPitanje.tocanOdgovor].toLowerCase().length);
  let maxLength = Math.max(odgovor.value.toLowerCase().length, rPitanje[rPitanje.tocanOdgovor].toLowerCase().length);
  let istiZnakovi = 0;

  pNovac.innerHTML = "Zarađeno: <b>" + novac + "</b>€";

  for (let i = 0; i < minLength; i++) {
    if (odgovor.value.toLowerCase()[i] === rPitanje[rPitanje.tocanOdgovor].toLowerCase()[i]) {
      istiZnakovi++;
    }
  }

  let postotakSudaranja = (istiZnakovi / maxLength) * 100;

  if (postotakSudaranja >= 75) {
    pStanje.innerHTML = "Točno! +<b>500</b>€";
    (async () => {
      pPitanje.style.display = "none";
      odgovor.style.display = "none";
      bOdgovor.style.display = "none";
      await new Promise(resolve => setTimeout(resolve, 3000));
      pStanje.innerText = "";
      pPitanje.style.display = "block";
      odgovor.style.display = "block";
      bOdgovor.style.display = "block";
      odgovor.select();
    })();
    novac = novac + 500;
  }
  else {
    pStanje.innerHTML = "Netočno! Točan odgovor je: <b>" + rPitanje[rPitanje.tocanOdgovor] + "</b>";
    (async () => {
      pPitanje.style.display = "none";
      odgovor.style.display = "none";
      bOdgovor.style.display = "none";
      await new Promise(resolve => setTimeout(resolve, 3000));
      pStanje.innerText = "";
      pPitanje.style.display = "block";
      odgovor.style.display = "block";
      bOdgovor.style.display = "block";
      odgovor.select();
    })();
  }

  pNovac.innerHTML = "Zarađeno: <b>" + novac + "</b>€";
  odgovor.value = "";
  kviz();
}