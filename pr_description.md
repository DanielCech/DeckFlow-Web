This PR adds an English-only press kit at `/presskit` and localizes the full accessibility report across all 9 supported languages. The press kit is intentionally unlisted and gives journalists a fast fact sheet, product story, media previews, downloadable assets, and a private contact path for promo codes.

## Changes

- Added the `/accessibility` page with a gilded hero, status summary, grouped accessibility coverage table, CT1–CT8 validation table, publishing rule, and feedback contact.
- Localized the complete `/accessibility` report — metadata, hero, status cards, coverage matrix, common-task validation table, publishing rule, and feedback contact — in English, German, Spanish, French, Italian, Brazilian Portuguese, Japanese, Korean, and Czech.
- Kept the locale JSON files and embedded web translation bundle in sync, with language switching restoring the original English HTML correctly.
- Added the `/presskit` directory-index page with `noindex, nofollow, noarchive`, fact sheet, elevator pitch, key features, contact details, media previews, and embedded English promo video.
- Added `JustFlip-Press-Kit.zip` with both 1024 × 1024 app-icon variants, selected iPhone/Mac/Apple Watch screenshots, the 39-second MP4, and an asset guide.
- Documented VoiceOver, Voice Control, Larger Text, Dark Interface, Reduced Motion, non-color cues, spoken cards, touch targets, contrast work, platform scope, and non-applicable Captions/Audio Descriptions categories.
- Added a legacy `accessibility.html` redirect and included the clean URL in `sitemap.xml`.
- Added Accessibility before About in the primary and footer navigation across the site.
- Added a link from the landing page’s accessibility section to the full report and softened wording that previously implied completed validation.

## Screenshot

TODO
