let pitanja = [];
let opcijeSlova = [];
let lovacPogodio = "";
let rPitanje = "";
let rIndex = "";
let dugmeA = document.getElementById("A");
let dugmeB = document.getElementById("B");
let dugmeC = document.getElementById("C");
let tablica2 = document.getElementById("tablica2");
let tablica3 = document.getElementById("tablica3");
let tablica4 = document.getElementById("tablica4");
let korisnikPozicija = 0;
let lovacPozicija = 0;
let iPonuda = 0;

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

pitanja = JSON.parse(localStorage.getItem("pitanja"));
tablica2.innerHTML = '<button class="ponuda" id="bVisaPonuda" onclick="izabranaPonuda(this.id);">' + localStorage.getItem("visaPonuda") + "€" + "</button>";
tablica3.innerHTML = '<button class="ponuda" id="bSrednjaPonuda" onclick="izabranaPonuda(this.id);">' + localStorage.getItem("srednjaPonuda") + "€" + "</button>";
tablica4.innerHTML = '<button class="ponuda" id="bNizaPonuda" onclick="izabranaPonuda(this.id);">' + localStorage.getItem("nizaPonuda") + "€" + "</button>";

function izabranaPonuda(ponuda) {
  tablica2.innerHTML = "";
  tablica3.innerHTML = "";
  tablica4.innerHTML = "";

  switch (ponuda) {
    case 'bVisaPonuda':
      korisnikPozicija = 2;
      iPonuda = localStorage.getItem("visaPonuda");
      obojaj();
      azurirajPolja(1, 0);
      break;

    case 'bSrednjaPonuda':
      korisnikPozicija = 3;
      iPonuda = localStorage.getItem("srednjaPonuda");
      obojaj();
      azurirajPolja(1, 0);
      break;

    case 'bNizaPonuda':
      korisnikPozicija = 4;
      iPonuda = localStorage.getItem("nizaPonuda");
      obojaj();
      azurirajPolja(1, 0);
      break;

    default:
      console.log('iskreno nemam pojma kako neko može doć do ovog errora osim ako je namjerno nešto dirao, svaka čast šefe!');
      break;
  }
}

function azurirajPolja(korisniku, lovcu) {
  if (korisnikPozicija == 8) {
    document.getElementById("idOpcije").style.display = "none";
    document.getElementById("pPitanje").innerText = "Pobjedio si!";
    document.getElementById("pPitanje").setAttribute("style", "margin-bottom: 220px;")
  }
  else if (lovacPozicija != korisnikPozicija) {
    if (korisniku == 1) {
      if (korisnikPozicija <= 7) {
        document.getElementById("tablica" + korisnikPozicija).className += " korisnikPozicija";
        document.getElementById("tablica" + korisnikPozicija).innerText = "►   " + iPonuda + "€" + "   ◄";
        document.getElementById("tablica" + (korisnikPozicija - 1)).className = "tablica gotovoPolje";
        document.getElementById("tablica" + (korisnikPozicija - 1)).innerText = "";
      }
    }
    if (lovcu == 1) {
      document.getElementById("tablica" + lovacPozicija).className += " lovacPolje";
      document.getElementById("tablica" + lovacPozicija).innerText = "▼";
      if (lovacPozicija > 1) {
        document.getElementById("tablica" + (lovacPozicija - 1)).className = "tablica lovacPolje";
        document.getElementById("tablica" + (lovacPozicija - 1)).innerText = "";
      }
    }
    (async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      document.getElementById("idOpcije").style.display = "none";
      document.getElementById("pPitanje").innerText = "...";
      document.getElementById("pPitanje").setAttribute("style", "margin-bottom: 220px;")
      await new Promise(resolve => setTimeout(resolve, 2000));
      document.getElementById("pPitanje").style = "";
      document.getElementById("idOpcije").style = "";
      novo();
    })();
  }
  else {
    document.getElementById("idOpcije").style.display = "none";
    document.getElementById("pPitanje").innerText = "Izgubio si!";
    document.getElementById("pPitanje").setAttribute("style", "margin-bottom: 220px;")
    document.getElementById("tablica" + lovacPozicija).className += " lovacPolje";
    document.getElementById("tablica" + lovacPozicija).innerText = "▼";
    document.getElementById("tablica" + (lovacPozicija - 1)).className = "tablica lovacPolje";
    document.getElementById("tablica" + (lovacPozicija - 1)).innerText = "";
  }
}

function obojaj() {
  for (i = 1; i < korisnikPozicija; i++) {
    document.getElementById("tablica" + i).className = "tablica gotovoPolje";
  }
}

// dodat random delay
// nvm, imamo jak deadline i veće problemeee
function lovacPogodak(opcije, pozeljanOdgovor, tezina) {
  const rBroj = Math.random();

  if (rBroj < tezina) {
    return pozeljanOdgovor;
  }
  else {
    let rOpcija = Math.floor(Math.random() * opcije.length);
    return opcije[rOpcija];
  }
}

function provjeri(slovo) {
  document.getElementById(slovo).setAttribute("class", "opcija pogodak");
  if (slovo == rPitanje.tocanOdgovor) {
    console.log("IGRAČ: TOČNO");
    document.getElementById(rPitanje.tocanOdgovor).setAttribute("class", "opcija tocno");
    korisnikPozicija++;
    if (lovacPogodio == rPitanje.tocanOdgovor) {
      console.log("LOVAC: TOČNO");
      document.getElementById(rPitanje.tocanOdgovor).setAttribute("class", "opcija tocno lovac");
      lovacPozicija++;
      azurirajPolja(1, 1);
    }
    else {
      console.log("LOVAC: NETOČNO");
      document.getElementById(lovacPogodio).setAttribute("class", "opcija lovac");
      azurirajPolja(1, 0);
    }
  }
  else {
    console.log("IGRAČ: NETOČNO");
    if (lovacPogodio == rPitanje.tocanOdgovor) {
      console.log("LOVAC: TOČNO");
      document.getElementById(lovacPogodio).setAttribute("class", "opcija tocno lovac");
      lovacPozicija++;
      azurirajPolja(0, 1);
    }
    else if (lovacPogodio == slovo) {
      console.log("LOVAC: NETOČNO");
      document.getElementById(lovacPogodio).setAttribute("class", "opcija pogodak lovac");
      document.getElementById(rPitanje.tocanOdgovor).setAttribute("class", "opcija tocno");
      azurirajPolja(0, 0);
    }
    else {
      console.log("LOVAC: NETOČNO");
      document.getElementById(lovacPogodio).setAttribute("class", "opcija lovac");
      document.getElementById(rPitanje.tocanOdgovor).setAttribute("class", "opcija tocno");
      azurirajPolja(0, 0);
    }
  }
  dugmeA.disabled = true;
  dugmeB.disabled = true;
  dugmeC.disabled = true;
}

function novo() {
  dugmeA.setAttribute("class", "opcija"); dugmeA.disabled = false;
  dugmeB.setAttribute("class", "opcija"); dugmeB.disabled = false;
  dugmeC.setAttribute("class", "opcija"); dugmeC.disabled = false;

  rIndex = Math.floor(Math.random() * pitanja["pitanja"].length);
  rPitanje = pitanja["pitanja"][rIndex];

  opcijeSlova = ["A", "B", "C"];
  lovacPogodio = lovacPogodak(opcijeSlova, rPitanje.tocanOdgovor, 0.6);

  document.getElementById("pPitanje").innerText = rPitanje.pitanje;
  dugmeA.innerText = "A " + rPitanje.A;
  dugmeB.innerText = "B " + rPitanje.B;
  dugmeC.innerText = "C " + rPitanje.C;

  if (rIndex > -1) {
    pitanja["pitanja"].splice(rIndex, 1);
    localStorage.setItem("pitanja", JSON.stringify(pitanja));
  }
}