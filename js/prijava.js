let kIme = document.getElementById("kIme");
let rgxPattern = /^[a-zA-Z_]{3,22}$/; // regex za korisničko ime
kIme.select();

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

fetch('json/podatci.json')
  .then(response => response.json())
  .then(data => {
    localStorage.setItem("pitanja", JSON.stringify(data));
  })
  .catch(error => {
    console.log('Error:', error);
  });

function prijava() {
  if (rgxPattern.test(kIme.value)) {
    localStorage.setItem("kIme", kIme.value);
    document.location = 'kviz.html';
  }
  else {
    alert("Korisničko ime nije ispravno!");
  }
}

function jeLiEnter(event) {
  if (event.key === "Enter") {
    prijava();
  }
}