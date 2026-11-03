# Otis Says Hello: Flying Fairweathers Ep 3 (Hong Kong) picture book

16 landscape spreads (1920x1080, 16:9), ages 3-7. Built from the Ep 3 script PDF, the E3 stills and the character sheets.

- `build.py` holds the story text and layout; `book.css` / `book.js` style it and add the page-turning view.
- `otis-says-hello.html` is the flipbook (arrow keys / buttons; prints as one page per spread).
- `render_pdf.ps1` renders `otis-says-hello.pdf` with headless Edge.

```
python build.py
powershell -File render_pdf.ps1
```

`assets/` (show artwork) and the PDF are **not committed**: this GitHub repo is public and the art is unreleased.
Re-create `assets/` from the Fairweathers OneDrive folder and Downloads `E3 Hong Kong*.png` (names are in `build.py`).

## To check before publishing

- **唔該 / mm-GOY**: the script marks the tones `[VERIFY with a Cantonese speaker]`.
- **Illustrations missing from the stills**, currently covered by a crop or a crayon doodle:
  - p11 black kites (crayon kites over the terrace sky)
  - p13 Otis asking the dad and his daughter (terrace crop; the dad and girl aren't visible)
  - p14 Paw-Paw giving the toy tram (station crop plus a doodle)
  - p7 Otis hiding behind Dad (the station still shows him standing)
- Cover uses the Bluebell arrival still, where Otis wears the dino hood; swap if you want the green-hoodie look.
- Kids call Maya "Mom" and Leo "Dad" (the script never fixes this for the kids; Kit says "Dad!" in Scene 3).
- Paw-Paw has no locked character sheet yet (her look block in the script is marked "not locked").
