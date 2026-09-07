This PR adds an English curated-decks section to the JustFlip website and publishes downloadable starter decks. It presents the curated library as a starting point while directing visitors toward JustFlip’s AI-assisted deck creation tools.

## Changes

- Added the responsive `/decks/` page with a curated library, category filters, deck metadata, and downloads for the curated decks.
- Localized the Decks page across English, Czech, German, Spanish, French, Italian, Brazilian Portuguese, Japanese, and Korean using the existing flag language switcher.
- Added a local-file-safe embedded catalogue so direct opening of `decks/index.html` still localizes deck names, descriptions, and download targets without a web server.
- Connected the page to the generated 99-entry catalogue so each locale displays its translated deck title and description and downloads the matching file.
- Appended locale codes to published filenames, for example `Chord Structure by Intervals (en).flashcards`.
- Made the whole deck tile activate its download action, with keyboard support as well as the visible download link.
- Added the programming-deck `&lt;/&gt;` glyph and kept the responsive styling aligned with the existing JustFlip design language.
- Extended the existing navigation, footer links, reveal animations, and sitemap with the new Decks section.

## Screenshot
TODO
