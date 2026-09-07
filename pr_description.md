This PR fixes the localization of the Decks page and rewrites the deck naming — and the music deck contents — across all nine languages. The previous deck titles and music cards were machine-translated without musical or programming context, producing names like "Japonci" (the Japanese *people*), "Klíčové podpisy — major" (*key* as in door key, *signature* as in autograph) and "Poznámky o Hůl — Bas" (*notes* as in memos, *staff* as in stick).

## Decks page localization

- Localized the page `<title>` and meta description via the new `decks.metaTitle` / `decks.metaDescription` keys.
- Localized the remaining hard-coded English on the page: the "Explore the library" and "Learn about the AI workflow" links, the three sample cards in the hero stack ("What would you like to remember?" and friends), the library summary counts, the footer tagline and copyright, and the `aria-label`s on the hero stack, summary and filter group.
- Deck and card counts in the hero summary are now derived from the catalog instead of hard-coded.
- Added `nav.decks` / `footer.decks` so the "Decks" link is translated everywhere it appears, replacing the page-local `decksLabel` lookup.

## Navigation consistency

- The Decks page nav and footer were missing **AI Prompt** and **Rich Decks**, so the top bar changed shape when navigating to or from it. Both pages' link sets now match the rest of the site.
- The Accessibility page was missing the **Decks** link entirely; added it in the same position as elsewhere.

## Deck naming, all nine languages

- Rewrote every deck title, interest name, pack name and catalog description where the machine translation was wrong, and renamed the published files to match. Representative fixes:
  - **Music** — "key signature" and "staff" were translated as door-key/autograph and walking-stick in most languages. Now `Durové stupnice` / `Mollové stupnice` (cs), `Vorzeichen — Dur` / `Noten im Violinschlüssel` (de), `Armaduras de clave` / `Notas en clave de sol` (es), `Armures` / `Notes en clé de fa` (fr), `調号 — 長調` / `五線譜の音符 — ト音記号` (ja), `조표 — 장조` / `높은음자리표의 음표` (ko).
  - **Languages** — `Japonci` → `Japonština` (cs); capitalized `Japonés` (es) and `Giapponese` (it).
  - **Science** — `전자제품` (consumer electronics) → `전자공학` (ko), `エレクトロニクス` → `電子工学` (ja).
  - **Maths** — "Derivatives" had become the financial instrument in cs/de/es/it/ja/ko/pt; "Powers" had become *forces* in de/es/fr/it/ja/ko.
  - **Programming** — API terms that had been literally translated are back to the names developers use: `ForEach`, `Codable`, `Optionals`, `Closures`, `Sheets`, `Stacks`, `Networking`, `Null safety`. Notable wrong ones: "Persistence" → *perseverance* (cs), "Sheets" → *spreadsheets* (pt-br) / *leaves of paper* (de), "Classes" → *school lessons* (fr, pt-br), "Frameworks" → *picture frames* (cs).

## Music deck contents

The five music decks were regenerated from the English source using each language's own music vocabulary, rather than translated string by string:

- **Key signatures (major/minor)** — all 15 cards × 8 languages. Each language now uses its standard key naming (`C dur` / `a moll`, `C-Dur` / `a-Moll`, `Do mayor` / `La menor`, `ハ長調` / `イ短調`, `다장조` / `가단조`) with correct note names, including the H/B distinction in Czech and German that the old text got wrong. Replaces text such as "Žádné ostré předměty a žádné plošky" (no sharp *objects* and no *facets*), "1 byt" (one *apartment*), "상대적 미성년자" (relative *underage person*) and a Japanese card that had lost its key name entirely.
- **Chord structure by intervals** — all 20 cards × 8 languages, rewritten with correct interval and chord terminology. The Czech deck had asked "which *scales* build a major triad" and answered "*square root*, major third".
- **Notes on the staff** — corrected the "Middle C" line in each language.

Generated output for English is byte-identical to the existing English deck, which is how the generator was validated.

## Other

- Replaced the escaped `&lt;/&gt;` sequence on programming deck tiles with a `{ }` glyph, matching the single-glyph style of `♫`, `∑`, `あ` and `⌁`.
- Refreshed the `bytes` field in the catalog and regenerated `decks/catalog-data.js`.

## Verification

- All 99 download links, across all nine locales, resolve to a file that exists on disk.
- All 99 deck files parse; every zip passes its CRC check and still contains its LilyPond images.
- Card totals unchanged: 886 per locale.
- Every `data-i18n` and `data-decks-key` used on the page resolves in all nine languages.

## Screenshot
TODO
