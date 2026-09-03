This PR is a marketing and conversion tune-up of the landing page based on an external UX/growth review. It lifts the two genuinely rare features — Apple Watch review and the Lock Screen Live Activity — into the hero, adds an honest trust band and a mid-page call to action, corrects the swipe-direction copy that did not match the app, and makes the AI skill install auditable. Every new or changed string is localized across all 9 supported languages and kept in sync with the embedded web bundle.

No invented social proof was added: the review suggested a star rating and download count, and a "zero tracking" claim. Ratings are not published, and `privacy.html` discloses Firebase Analytics, Crashlytics and RevenueCat, so the trust band only states claims a visitor can verify (native platforms, offline operation, nine languages, the published accessibility report).

## Changes

- Rewrote the hero lede to lead with the category claim — the flashcard app that lives quietly across every Apple device — and to name wrist review before the SM-2 engine.
- Added two linked hero pills for Apple Watch review and the Lock Screen Live Activity, so the two differentiating features are visible above the fold instead of appearing as sections 09 and 10.
- Added a trust band under the hero listing only verifiable claims, with the fourth item linking to the published accessibility report.
- Added a mid-page call to action after the science section so a long scroll never has to return to the top to install, alongside a secondary link to the Apple Watch section.
- Corrected the swipe-direction copy in all 9 languages: left rates a card Hard and down rates it Again (previously left was documented as Again and down was not documented at all), and the copy now states that the same four buttons can be tapped.
- Added direction glyphs to the Again / Hard / Good / Easy chips so the gesture-to-outcome mapping is visible, matching the grade buttons in the app screenshot.
- Allowed the chip row to wrap, which it needs at phone widths once the glyphs are present.
- Added a GitHub source link beside the `npx skills add DanielCech/JustFlip-Skills` command on both the landing page and the Rich Decks page, so the package can be audited before installation.
- Moved the section indicator rail after `</main>` so the page's raw text order starts with the hero rather than a twelve-item chapter index; the rail is fixed-positioned and renders unchanged.
- Rewrote the meta description in all 9 languages to include Apple Watch, which it previously omitted entirely.
- Localized the primary and footer navigation "Accessibility" label using the existing `accessibility.navLabel` key, and added the previously unused `ai.richGuideLabel` translations.
- Added the missing `ai-skill.html` to `sitemap.xml`. The press kit stays unlisted — no inbound links, absent from the sitemap, and its robots directive extended with `noimageindex, nosnippet` so its screenshots and videos are not indexed either.
- Added intrinsic dimensions to the hero and device images, with `fetchpriority="high"` on the above-the-fold hero image.
- Regenerated the embedded translation bundle in `js/i18n.js` from the locale JSON files and verified it matches them key for key and in order.
- Repointed every "Features" link in the primary and footer navigation at the top of the landing page. It previously targeted `#devices` (section 02), so tapping it from a subpage loaded the landing page already scrolled past the hero and the trailer.
- Fixed the hero's "Explore the features" button, which targeted `#features` — an id that does not exist on the page, so the button did nothing. It now scrolls to section 02, which is where the feature tour actually starts.
- Made in-page anchors that resolve to the start of the document land on a true top instead of a few pixels down behind the sticky header, using the header's measured height rather than the hardcoded offset.

## Not done

- No email capture or waitlist: the site is a static GitHub Pages deployment, and a form would require a third-party service.
- No swipe demo GIF and no Mac + iPhone + iPad + Watch hero composition: both need new assets. The chip direction glyphs cover the gesture mapping in the meantime.
- The custom GPT link is unchanged. The review claimed custom GPTs were deprecated for new developers, which is not correct.
- `privacy.html` and `terms.html` remain English-only in 8 of 9 locales; translating legal text needs review rather than a tune-up.
- The AI section forces about 70px of horizontal scroll at 390px viewport width. This is pre-existing and unchanged by this PR.

## Screenshot

TODO
