const kinderInput = document.getElementById('kinder');
const jugendInput = document.getElementById('jugendliche');
const erwInput = document.getElementById('erwachsene');
const rezepteDiv = document.getElementById('rezepte');
const einkaufUl = document.getElementById('einkaufsliste');
const exportCsvBtn = document.getElementById('exportCsv');
const dialog = document.getElementById('rezeptDialog');
const form = document.getElementById('rezeptForm');
const dialogTitel = document.getElementById('dialogTitel');
const rezeptNameInput = document.getElementById('rezeptName');
const zutatenListeDiv = document.getElementById('zutatenListe');
const addZutatBtn = document.getElementById('addZutat');

let rezepte = [];
let editingIndex = null;

function ladeRezepte() {
  const json = localStorage.getItem('rezepte') || '[]';
  rezepte = JSON.parse(json);
}
function speichereRezepte() {
  localStorage.setItem('rezepte', JSON.stringify(rezepte));
}
function berechnePortionen() {
  return (parseFloat(kinderInput.value)||0)*0.5 +
         (parseFloat(jugendInput.value)||0)*0.75 +
         (parseFloat(erwInput.value)||0)*1;
}
function updateRezepteListe() {
  rezepteDiv.innerHTML = '';
  rezepte.forEach((r,i) => {
    const div = document.createElement('div');
    div.textContent = r.name;
    const edit = document.createElement('button');
    edit.textContent = 'Bearbeiten';
    edit.onclick = () => openDialog(r,i);
    const del = document.createElement('button');
    del.textContent = 'Löschen';
    del.onclick = () => { rezepte.splice(i,1); speichereRezepte(); updateRezepteListe(); berechneEinkauf(); };
    div.append(edit, del);
    rezepteDiv.append(div);
  });
}
function berechneEinkauf() {
  const portions = berechnePortionen();
  const einkauf = {};
  rezepte.forEach(r => {
    r.zutaten.forEach(z => {
      const name = z.name;
      const menge = z.menge * portions;
      if (!einkauf[name]) einkauf[name] = { menge: 0, einheit: z.einheit };
      einkauf[name].menge += menge;
    });
  });
  einkaufUl.innerHTML = '';
  Object.entries(einkauf).forEach(([name, { menge, einheit }]) => {
    const li = document.createElement('li');
    li.textContent = `${name}: ${menge.toFixed(2)} ${einheit}`;
    einkaufUl.append(li);
  });
}
function exportCsv() {
  let csv = 'Zutat,Menge,Einheit\n';
  [...einkaufUl.children].forEach(li => {
    const [zutat, rest] = li.textContent.split(': ');
    const [menge, einheit] = rest.split(' ');
    csv += `${zutat},${menge},${einheit}\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'einkaufsliste.csv';
  a.click();
  URL.revokeObjectURL(url);
}
function openDialog(rezept=null, idx=null) {
  editingIndex = idx;
  zutatenListeDiv.innerHTML = '';
  if (rezept) {
    dialogTitel.textContent = 'Rezept bearbeiten';
    rezeptNameInput.value = rezept.name;
    rezept.zutaten.forEach(z => addZutatZeile(z));
  } else {
    dialogTitel.textContent = 'Neues Rezept';
    rezeptNameInput.value = '';
    addZutatZeile();
  }
  dialog.showModal();
}
function addZutatZeile(zutat={name:'',menge:1,einheit:''}) {
  const label = document.createElement('label');
  label.innerHTML = `Name: <input name="zname" value="${zutat.name}" required>
    Menge pro Portion: <input name="zmenge" type="number" step="any" value="${zutat.menge}" required>
    Einheit: <input name="zeinheit" value="${zutat.einheit}" required> 
    <button type="button">✖</button>`;
  label.querySelector('button').onclick = () => label.remove();
  zutatenListeDiv.append(label);
}
form.onsubmit = e => {
  e.preventDefault();
  const name = rezeptNameInput.value.trim();
  const zfields = zutatenListeDiv.querySelectorAll('label');
  const zlist = Array.from(zfields).map(l => ({
    name: l.querySelector('input[name="zname"]').value.trim(),
    menge: parseFloat(l.querySelector('input[name="zmenge"]').value),
    einheit: l.querySelector('input[name="zeinheit"]').value.trim(),
  }));
  const obj = { name, zutaten: zlist };
  if (editingIndex != null) rezepte[editingIndex] = obj;
  else rezepte.push(obj);
  speichereRezepte();
  updateRezepteListe();
  berechneEinkauf();
  dialog.close();
};
addZutatBtn.onclick = () => addZutatZeile();
document.getElementById('abbrechen').onclick = () => dialog.close();
kinderInput.oninput = jugendInput.oninput = erwInput.oninput = berechneEinkauf;
exportCsvBtn.onclick = exportCsv;

ladeRezepte();
updateRezepteListe();
berechneEinkauf();