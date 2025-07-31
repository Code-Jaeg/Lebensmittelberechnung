let rezepte = [];

function berechnePortionen() {
  const kinder = parseInt(document.getElementById("kinder").value) || 0;
  const jugendliche = parseInt(document.getElementById("jugendliche").value) || 0;
  const erwachsene = parseInt(document.getElementById("erwachsene").value) || 0;

  return kinder * 0.5 + jugendliche * 0.75 + erwachsene * 1;
}

function berechneEinkauf() {
  const portionen = berechnePortionen();
  const einkaufsliste = {};

  rezepte.forEach(rezept => {
    rezept.zutaten.forEach(zutat => {
      const gesamtmenge = zutat.menge * portionen;
      if (!einkaufsliste[zutat.name]) {
        einkaufsliste[zutat.name] = { menge: 0, einheit: zutat.einheit };
      }
      einkaufsliste[zutat.name].menge += gesamtmenge;
    });
  });

  const liste = document.getElementById("einkaufsliste");
  liste.innerHTML = "";
  for (let zutat in einkaufsliste) {
    const eintrag = einkaufsliste[zutat];
    liste.innerHTML += `<li>${zutat}: ${eintrag.menge.toFixed(2)} ${eintrag.einheit}</li>`;
  }
}