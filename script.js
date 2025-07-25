let recipeCount = 0;

document.getElementById("addRecipeBtn").addEventListener("click", addRecipeForm);
document.getElementById("calculateBtn").addEventListener("click", calculateTotal);

function addRecipeForm() {
  recipeCount++;
  const container = document.createElement("div");
  container.className = "recipe";
  container.innerHTML = `
    <h3>Rezept ${recipeCount}</h3>
    <label>Name:
      <input type="text" class="recipe-name" placeholder="z. B. Spaghetti Bolognese">
    </label>
    <label>Zutaten (Format pro Zeile: Name, Menge, Einheit):
      <textarea class="recipe-ingredients" rows="4" placeholder="z. B. Nudeln,500,g"></textarea>
    </label>
  `;
  document.getElementById("recipes").appendChild(container);
}

function calculateTotal() {
  const days = parseInt(document.getElementById("days").value) || 1;
  const children = parseInt(document.getElementById("children").value) || 0;
  const teens = parseInt(document.getElementById("teens").value) || 0;
  const adults = parseInt(document.getElementById("adults").value) || 0;

  const totalUnits = (children * 0.5 + teens * 0.75 + adults) * days;

  const allRecipes = document.querySelectorAll(".recipe");
  const totalIngredients = {};

  allRecipes.forEach(recipe => {
    const lines = recipe.querySelector(".recipe-ingredients").value.split("\n");
    lines.forEach(line => {
      const parts = line.split(",").map(s => s.trim());
      if (parts.length !== 3) return;
      const [name, amtStr, unit] = parts;
      const amtPer4 = parseFloat(amtStr);
      if (!name || isNaN(amtPer4)) return;
      const scaled = amtPer4 * (totalUnits / 4);
      const key = `${name} (${unit})`;
      totalIngredients[key] = (totalIngredients[key] || 0) + scaled;
    });
  });

  displayResults(totalIngredients);
}

function displayResults(data) {
  document.getElementById("resultSection").style.display = 'block';
  const div = document.getElementById("results");
  div.innerHTML = "";
  const ul = document.createElement("ul");
  Object.entries(data).forEach(([k, v]) => {
    const li = document.createElement("li");
    li.innerHTML = `${k}: <strong>${v.toFixed(1)}</strong>`;
    ul.appendChild(li);
  });
  div.appendChild(ul);
}