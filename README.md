# Lebensmittelberechnung

Diese App berechnet den Lebensmittelbedarf für eine Jugendfreizeit über mehrere Tage, basierend auf der Teilnehmerzahl (Kinder, Jugendliche, Erwachsene) und beliebigen Rezepten (für 4 Personen).

- Kinder zählen als 0,5 Portion
- Jugendliche zählen als 0,75 Portion
- Erwachsene zählen als 1 Portion

Die App ist komplett clientseitig und kann über GitHub Pages gehostet sowie in Notion eingebettet werden.

---

## Dateien

- **index.html** – Oberfläche & Eingabe
- **styles.css** – Styling
- **script.js** – Logik zur Berechnung

---

## 🚀 Deploy über GitHub Pages

1. Neues GitHub-Repo erstellen (z. B. `jugendfreizeit-planer`)
2. Diese Dateien in das Repo hochladen
3. In den Repo-Einstellungen unter **Pages**:
   - Branch: `main`
   - Ordner: `/ (root)`
4. Nach kurzer Zeit ist die App unter `https://<dein-nutzername>.github.io/jugendfreizeit-planer/` erreichbar

---

## 📥 Notion-Einbettung

- In Notion `/embed` eingeben
- Die GitHub-Pages-URL eingeben
- ✅ Die App wird direkt in Notion angezeigt

---

## Weiterentwicklungsideen

- PWA-Support (Service Worker + Manifest)
- Rezepte persistent speichern (z. B. localStorage)
- CSV/Export
- Mehrere Mahlzeiten pro Tag (z. B. Frühstück, Mittag, Abend)