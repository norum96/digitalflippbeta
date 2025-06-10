// script.js

let brukere = ["1111", "1112", "1113", "1114", "1115", "1116", "1117", "1118", "1119", "1120", "1121"];
let tider = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30"];
let vaktkoder = ["D1", "D2", "D3", "D4", "Deleger"];
let vaktkodeFarger = {
  D1: "lightgreen",
  D2: "lightblue",
  D3: "lightcoral",
  D4: "lightyellow",
  Deleger: "lightgray"
};
const ekstraOppgaver = [];

const rutenett = document.getElementById("rutenett");

// --------- LAG RUTENETT ----------
function genererRutenett() {
  rutenett.innerHTML = "";
  const headRad = document.createElement("tr");
  const tomtHode = document.createElement("th");
  headRad.appendChild(tomtHode);
  brukere.forEach(bruker => {
    const celle = document.createElement("th");
    celle.textContent = bruker;
    headRad.appendChild(celle);
  });
  rutenett.appendChild(headRad);

  tider.forEach(tid => {
    const rad = document.createElement("tr");
    const tidCelle = document.createElement("td");
    tidCelle.textContent = tid;
    rad.appendChild(tidCelle);
    brukere.forEach(() => {
      const celle = document.createElement("td");
      celle.classList.add("rute");
      rad.appendChild(celle);
    });
    rutenett.appendChild(rad);
  });
  genererVaktkodeOversikt();
  genererVaktkodeStiler();
}

genererRutenett();

// --------- MODAL FOR TIDSPLAN ---------
let valgtCelle = null;

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("rute")) {
    valgtCelle = e.target;
    const rad = valgtCelle.parentElement;
    const tid = rad.firstElementChild.textContent;
    const kolIndex = [...rad.children].indexOf(valgtCelle);
    const bruker = brukere[kolIndex - 1];

    document.getElementById("modal-info").textContent = `Redigerer: ${bruker} - ${tid}`;

    valgtCelle.classList.add("aktiv");
    document.getElementById("modal-bistand").value = valgtCelle.querySelector(".bistand")?.textContent || "";
    document.getElementById("modal-vaktkode").value = valgtCelle.querySelector(".vaktkode")?.textContent || "D1";
    document.getElementById("modal").style.display = "flex";
  }
});

document.getElementById("modal-cancel").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
  valgtCelle?.classList.remove("aktiv");
  valgtCelle = null;
});

document.getElementById("modal-delete").addEventListener("click", () => {
  valgtCelle.innerHTML = "";
  valgtCelle.className = "rute";
  document.getElementById("modal").style.display = "none";
  valgtCelle?.classList.remove("aktiv");
  valgtCelle = null;
  genererVaktkodeOversikt();
});

document.getElementById("modal-save").addEventListener("click", () => {
  const bistand = document.getElementById("modal-bistand").value;
  const vaktkode = document.getElementById("modal-vaktkode").value;
  if (!bistand || !vaktkode) return;

  valgtCelle.innerHTML = `<div class="bistand">${bistand}</div><div class="vaktkode">${vaktkode}</div>`;
  valgtCelle.className = `rute ${vaktkode}`;
  document.getElementById("modal").style.display = "none";
  valgtCelle?.classList.remove("aktiv");
  valgtCelle = null;
  genererVaktkodeOversikt();
});

function genererVaktkodeStiler() {
  const styleTag = document.getElementById("vaktkode-styles") || (() => {
    const style = document.createElement("style");
    style.id = "vaktkode-styles";
    document.head.appendChild(style);
    return style;
  })();

  const css = vaktkoder.map(kode => `
    .rute.${kode} { background-color: ${vaktkodeFarger[kode]}; }
    .${kode} > h3 { background-color: ${vaktkodeFarger[kode]}; padding: 0.2em; }
  `).join("\n");

  styleTag.textContent = css;
}

// Åpne innstillingsmodal
function visInnstillingerModal() {
  document.getElementById("innstillinger-modal").style.display = "flex";
}

function lukkInnstillingerModal() {
  document.getElementById("innstillinger-modal").style.display = "none";
}
