# Μαθηματικά Γ΄ Λυκείου — Website

Ιστοσελίδα για το YouTube κανάλι **@petrosch** — δημοσιεύεται στο **GitHub Pages**.

## Δομή Αρχείων

```
petrosch-site/
├── index.html           ← Αρχική σελίδα
├── css/
│   └── style.css        ← Κοινό CSS
├── js/
│   └── shared.js        ← Κοινό JS (αστέρια, nav, animations)
└── pages/
    ├── topics.html      ← Θεματολογία
    ├── videos.html      ← Βίντεο
    ├── epal.html        ← ΕΠΑ.Λ.
    └── about.html       ← Σχετικά
```

## Δημοσίευση στο GitHub Pages

### Βήμα 1 — Δημιούργησε repository

1. Πήγαινε στο [github.com/new](https://github.com/new)
2. **Repository name:** `petrosch.github.io` (ή οποιοδήποτε όνομα)
3. Visibility: **Public**
4. Κλικ **Create repository**

### Βήμα 2 — Ανέβασε τα αρχεία

**Μέθοδος Α — μέσω browser (πιο εύκολη):**
1. Στο repository σου → **Add file → Upload files**
2. Σύρε όλα τα αρχεία και φακέλους (`index.html`, `css/`, `js/`, `pages/`)
3. **Commit changes**

**Μέθοδος Β — μέσω terminal:**
```bash
cd petrosch-site
git init
git add .
git commit -m "Initial website"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/petrosch.github.io.git
git push -u origin main
```

### Βήμα 3 — Ενεργοποίησε GitHub Pages

1. Στο repository → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / **(root)**
4. Κλικ **Save**

### Βήμα 4 — Το site είναι online!

Μετά από ~2 λεπτά, το site είναι διαθέσιμο στο:
```
https://YOURUSERNAME.github.io/
```
(ή `https://YOURUSERNAME.github.io/REPONAME/` αν το repo δεν λέγεται `username.github.io`)

---

## Σελίδες

| Σελίδα | URL | Περιγραφή |
|--------|-----|-----------|
| Αρχική | `/` | Hero, stats, YT banner |
| Θεματολογία | `/pages/topics.html` | 3 κεφάλαια, ύλη, τύποι |
| Βίντεο | `/pages/videos.html` | Embedded YouTube videos |
| ΕΠΑ.Λ. | `/pages/epal.html` | Ύλη ΕΠΑ.Λ., σύγκριση |
| Σχετικά | `/pages/about.html` | Bio, FAQ accordion |

## Αλλαγές & Προσαρμογές

- **Χρώματα:** Επεξεργάσου τις CSS variables στην αρχή του `css/style.css`
- **Βίντεο:** Αντικατάστησε τα YouTube embed IDs στο `pages/videos.html`
- **Τίτλος καναλιού:** Ψάξε και αντικατάστησε `@petrosch` με τον πραγματικό σου handle
