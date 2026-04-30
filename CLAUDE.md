# CLAUDE.md — Website Marieke Verhaak

## Project
Persoonlijke brand-website voor **Marieke Verhaak** — hypnotherapeut en auteur.
- Live: https://mariekeverhaak.com (GitHub Pages; domeinnaam-migratie gepland)
- GitHub-repo: https://github.com/guidoboone/MariekeVerhaak (controleer bij twijfel)

## Stack
- **Vanilla HTML / CSS / JS** — geen frameworks, geen build-stap, geen npm
- Één pagina: `index.html` + `style.css` + `script.js`
- Taal: Nederlands (NL) door de hele website

## Bestandsstructuur
```
index.html              ← volledige website
style.css               ← alle stijlen
script.js               ← hamburger-menu, scroll-animaties (IntersectionObserver)
_skills/design_taste/SKILL.md  ← verplicht designsysteem
marieke.jpg
Foto met boek '22.jpg
Afbeelding cover.jpg
frames-for-your-heart-unsplash soundhealing.jpg
```

## Designsysteem — VERPLICHT RAADPLEGEN
Lees `_skills/design_taste/SKILL.md` **voor elke visuele aanpassing**.
Kernpunten:
- Fonts: `Playfair Display` (koppen) + `Plus Jakarta Sans` (body) — verboden fonts in §3
- Canvas: warme crèmes (`#FDFBF7`, `#F7F6F3`), off-black tekst (`#111111`, `#2F3437`)
- Accent: max. 1 kleur tegelijk, gedesatureerd — momenteel salie-groen + zacht roze toevoegen (zie Open taken)
- Animaties: uitsluitend `cubic-bezier(0.16, 1, 0.3, 1)`, `IntersectionObserver`, alleen `transform` + `opacity`
- Cards: Double-Bezel architectuur (§6)
- Sectie-padding: minimaal `96px`
- Geen `linear` of `ease-in-out` transitions

## Tone & Voice
- Warm, professioneel, menselijk — nooit corporate of generiek
- Mariekeʼs stem: zacht, intuïtief, authentiek, aardend
- Vermijd: "elevate", "seamless", "game-changer", "delve", "naadloos" (zie SKILL.md §3)
- Citaten van Marieke altijd cursief in `<blockquote>` of stylistisch gemarkeerd

## Git-workflow
- **Guido pusht altijd zelf** — nooit automatisch pushen
- **Commit alleen wanneer Guido er expliciet om vraagt**
- Actieve werkbranch: `v2-feedback-improvements`
- `main` = stabiele live-versie; wijzigingen gaan altijd eerst op de werkbranch

## Deployment
- Huidig: GitHub Pages
- Gepland: migratie naar extern domein (nog te bepalen) — houd dit in gedachten bij absolute URLs

---

## Open taken — Feedback 28-4-2026

### 1. Kleur
- Voeg **zacht roze** toe als tweede accentkleur naast salie-groen
- Gebruik roze voor afwisselende sectie-achtergronden (nu: wit / donkergrijs)
- Vervang donkergrijze knoppen door roze variant

### 2. Tekstwijzigingen per sectie

**Hero — "Kom weer in balans"**
Huidige tekst: *"Ik begeleid drukbezette volwassenen die zichzelf voorbij lopen in de dagelijkse hectiek te (her)ontdekken wat ze diep van binnen écht willen, zodat ze vanuit innerlijke rust en vrijheid keuzes maken die hun leven weer plezierig en vervullend maken."*

**Over mij**
Verwijder bestaande tekst. Nieuwe versie begint met het citaat en loopt door t/m verwijzing naar "Portugalreis 2026" (link) en boek *Gelukkig opgroeien*. Volledige tekst in feedbackdocument.

**Diensten**
- Inhoud blokken: okay
- Fix: tekst "90 euro per 50 minuten" is onleesbaar (wit op lichte achtergrond) — corrigeer contrast

**Het boek**
- Tekst: okay
- Toevoegen: aparte sectie/pagina met volledige boekbeschrijving (3 pijlers) die opent via knop "Bestel het boek"
- Bestelknop verwijst naar Bol.com

**Individuele begeleiding**
Vervang eerste alinea: *"Ben jij een (hoog)gevoelige volwassene..."*
Door: *"Ben je klaar om te vertragen, naar binnen te keren en weer te leven vanuit wie je werkelijk bent, zodat je jouw leven bewust kunt vormgeven?"*
Voeg toe: link "hier" in bodytext → pagina "De kracht van hypnotherapie"

**Exclusieve dagbeleving**
- Verander: "gevolgd door een vegetarische lunch" → "gevolgd door lunchpauze"
- Verander prijs: "€ 144 volledig verzorgd · Midden-Nederland" → "€ 122 Comfortabel vanuit huis en helemaal afgestemd op jou"

### 3. Nieuwe pagina's / secties
- **Portugalreis 2026** — nieuw verhaal beschikbaar in feedbackdocument; intern gelinkt vanuit "Over mij"
- **De kracht van hypnotherapie** — volledige tekst beschikbaar in feedbackdocument; gelinkt vanuit "Individuele begeleiding"
- **Boek-bestelpagina** — tekst beschikbaar in feedbackdocument; opent via "Bestel het boek"-knop

### 4. Knoppen (latere versie)
- Koop-/betaalpagina-links worden in een volgende versie toegevoegd
- "Bestel jouw exemplaar" → Bol.com (dit mag nu al)
- Overige knoppen: nog te koppelen

---

## Wat niet aanraken zonder overleg
- De navigatiestructuur (ankerlinks werken correct)
- De afbeeldingen (zijn door Marieke goedgekeurd)
- Tekst die in het feedbackdocument als "okay" of "bruin" (ongewijzigd) is gemarkeerd
