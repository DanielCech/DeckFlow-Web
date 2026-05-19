/* JustFlip — i18n / localization module
   ----------------------------------------------------- */

((w) => {
  'use strict';

  const SUPPORTED = ['en', 'cs'];
  const DEFAULT   = 'en';
  const STORAGE   = 'justflip-lang';
  const YEAR_RE   = /\{year\}/g;

  /* ── Embedded translations ──────────────────────────
   * The JSON files in locales/ are kept as source of
   * truth for the Swift app.  The web bundles them here
   * so that zero network requests are needed and the
   * page works even when opened via file:// protocol.
   * ─────────────────────────────────────────────────── */
  const BUNDLE = {
    cs: {
      "nav.features": "Funkce",
      "nav.aiDecks": "AI Balíčky",
      "nav.algorithm": "Algoritmus",
      "nav.guide": "Průvodce",
      "nav.about": "O aplikaci",
      "nav.appStore": "App Store",
      "rail.open": "Úvod",
      "rail.everywhere": "Všude",
      "rail.aiDecks": "AI Balíčky",
      "rail.study": "Učení",
      "rail.algorithm": "Algoritmus",
      "rail.markdown": "Markdown",
      "rail.listen": "Poslech",
      "rail.dayNight": "Den / Noc",
      "hero.eyebrow": "Aplikace pro efektivní učení s kartičkami",
      "hero.title": "Uč se v klidu.<br/><em>Vše si zapamatuj.</em>",
      "hero.lede": "JustFlip! je aplikace pro učení s kartičkami s metodou spaced repetition pro iPhone, iPad a Mac. Spravuj své balíčky na počítači, opakuj si je na cestách a nech se vést engine inspirovaným SM-2, který ti ukáže správnou kartu ve správný okamžik.",
      "hero.downloadCta": "Stáhnout z App Store",
      "hero.exploreCta": "Prozkoumat funkce",
      "hero.metaPlatforms": "<strong>iOS · iPadOS · macOS</strong>",
      "hero.metaSync": "<strong>iCloud sync</strong> vestavěný",
      "hero.metaOffline": "<strong>Offline</strong> první",
      "hero.floatPillText": "<em>Novinka —</em> vytvářej balíčky s oblíbeným AI agentem",
      "hero.scroll": "Posouvat",
      "devices.title": "Jedna knihovna.<br/><em>Tři společníci.</em>",
      "devices.kicker": "Tvoř a spravuj na Macu. Opakuj si na iPhonu u ranní kávy. Doplňuj poznámky na iPadu na okraj. iCloud udržuje všechny karty, intervaly i série v dokonalém souladu — aniž bys o tom musel přemýšlet.",
      "devices.stageLabel": "Obrázek · iPhone, iPad a Mac se synchronizovanými balíčky",
      "devices.macos": "macOS",
      "devices.macosTitle": "Správce",
      "devices.macosDesc": "Importuj <code>.flashcard</code> archivy přetažením, spravuj oblasti zájmu, edituj karty v dedikovaném editoru.",
      "devices.ipados": "iPadOS",
      "devices.ipadosTitle": "Studio",
      "devices.ipadosDesc": "Široké plátno pro dlouhé studijní sezení s typografií přívětivou k tužce a rozděleným zobrazením.",
      "devices.ios": "iOS",
      "devices.iosTitle": "Kapesní učitel",
      "devices.iosDesc": "Denní opakování, tichý widget na domovské obrazovce a sledování pokroku kartu po kartě.",
      "ai.title": "Nech AI <em>napsat balíček.</em>",
      "ai.kicker": "Nainstaluj JustFlip! skill do svého oblíbeného agentího nástroje — <em>Claude Code</em>, <em>Codex</em> nebo <em>OpenCode</em> — a požádej o karty, které potřebuješ. Agent vytvoří, strukturovat a exportuje <code>.flashcard</code> archiv, který JustFlip! naimportuje jedním přetažením. Žádné ruční psaní, žádné kopírování, žádný zlomený formát.",
      "ai.terminalAria": "Terminálová ukázka generování flashcard balíčku s AI agentem",
      "ai.panelTitle": "Skill pro každého agenta",
      "ai.claudeDesc": "Vlož skill do <code>~/.claude/skills</code> a zavolej <code>/justflip</code>.",
      "ai.codexDesc": "Zaregistruj helper a nech GPT modely navrhnout balíček.",
      "ai.opencodeDesc": "Stejný formát, stejný výstup — tvůj stack, tvoje volba.",
      "ai.step1Title": "Požádej",
      "ai.step1Desc": "Popiš téma jednoduchým jazykem.",
      "ai.step2Title": "Vygeneruj",
      "ai.step2Desc": "Agent vytvoří markdown karty, příklady a audio nápovědy.",
      "ai.step3Title": "Importuj",
      "ai.step3Desc": "Přetáhni <code>.flashcard</code> soubor do JustFlip!. Hotovo.",
      "ai.note": "Instalační instrukce a skill bundle jsou součástí veřejné beta verze.",
      "study.title": "Knihovna, kterou můžeš <em>projet prstem.</em>",
      "study.kicker": "Procházej balíčky v klidném seznamu — nebo se pusť do soustředěného opakování a hodnot každou kartu swipe gestem jako u Tinderu. Doprava pro <em>dobré</em>, doleva pro <em>znovu</em>, nahoru pro <em>snadné</em>. Tok zůstává ve tvé ruce.",
      "study.cardListLabel": "Obrázek · Seznam karet",
      "study.swipeLabel": "Obrázek · Swipe opakovací obrazovka",
      "study.chipAgain": "Znovu",
      "study.chipHard": "Těžké",
      "study.chipGood": "Dobré",
      "study.chipEasy": "Snadné",
      "algorithm.title": "Trpělivý algoritmus.<br/><em>Pět stavů. Nekonečná paměť.</em>",
      "algorithm.kicker": "JustFlip! používá vylepšený SM-2 engine s pěti stavy učení. Karty procházejí stavy <em>nenaučené</em>, <em>učící se</em>, <em>opakované</em>, <em>přeučované</em> a <em>absolvované</em>, každý s vlastním intervalem a obtížností. Naléhavost ti říká, co si dnes zaslouží tvůj čas.",
      "algorithm.statsLabel": "Obrázek · Progress a dashboard naléhavosti",
      "algorithm.unseen": "Nenaučené",
      "algorithm.unseenDesc": "Ještě nestudováno — připraveno k prvnímu kontaktu.",
      "algorithm.learning": "Učící se",
      "algorithm.learningDesc": "Minuty až den. Čerstvá paměť se formuje.",
      "algorithm.reviewing": "Opakované",
      "algorithm.reviewingDesc": "Dny až týdny. Interval roste podle obtížnosti.",
      "algorithm.relearning": "Přeučované",
      "algorithm.relearningDesc": "Zapomněl jsi? Zpět na krátké intervaly, jemně.",
      "algorithm.graduated": "Absolvované",
      "algorithm.graduatedDesc": "Týdny až měsíce. Dlouhodobé zapamatování.",
      "algorithm.formulaNote": "Obtížnost roste při <em>snadném</em>, stabilizuje se při <em>dobrém</em> a klesá při <em>těžkém</em> nebo <em>znovu</em> — nikdy pod 1.3.",
      "markdown.title": "Karty, které <em>vypadají jako eseje.</em>",
      "markdown.kicker": "Definuj karty v bohatém Markdownu — nadpisy, seznamy, bloky kódu, inline matematiku, obrázky a odkazy. JustFlip! je zobrazuje s redakční typografií, takže karta může být jednořádková nápověda nebo malý kus vědecké práce.",
      "markdown.label": "Obrázek · Ukázka karty v Markdownu",
      "audio.title": "Balíčky, které <em>mluví.</em>",
      "audio.kicker": "Nech si karty předčítat nahlas, zatímco chodíš, vaříš nebo řídíš. Widget JustFlip! na domovské obrazovce udržuje další opakování jedno klepnutí daleko — malé, zlaté pozvání k pěti minutám učení.",
      "audio.phoneLabel": "Obrázek · Přehrávač mluvených karet",
      "audio.widgetDeck": "Romantičtí básníci · EN",
      "audio.widgetCard": "\"Kubla Khan\" — Coleridge",
      "audio.widgetDue": "14 dnes k opakování",
      "audio.widgetTap": "Klepni pro učení",
      "theme.title": "Tma při svíčkách.<br/><em>Světlo za úsvitu.</em>",
      "theme.kicker": "JustFlip! respektuje systém. Přepni z hluboké, učené tmy do jemného pergamenového světla — zlatá a břidlicová paleta design systému zůstává věrná v kteroukoli hodinu.",
      "theme.darkLabel": "Obrázek · Tmavý režim",
      "theme.lightLabel": "Obrázek · Světlý režim",
      "cta.eyebrow": "Již brzy na Apple platformách",
      "cta.title": "Přines si JustFlip! do své knihovny.",
      "cta.lede": "Jeden nákup. Tři platformy. Celý život dobře načasovaného opakování.",
      "cta.download": "Stáhnout z App Store",
      "cta.readGuide": "Přečíst průvodce",
      "footer.tagline": "Flashcard společník pro celoživotní vzdělávání.",
      "footer.features": "Funkce",
      "footer.aiDecks": "AI Balíčky",
      "footer.algorithm": "Algoritmus",
      "footer.guide": "Průvodce",
      "footer.about": "O aplikaci",
      "footer.privacy": "Soukromí",
      "footer.terms": "Podmínky",
      "footer.support": "Podpora",
      "footer.contact": "Kontakt",
      "footer.copyright": "© {year} JustFlip! Vytvořeno v Praze. Apple, logo Apple, iPhone, iPad a Mac jsou ochranné známky společnosti Apple Inc.",
      "meta.title": "JustFlip! — Učení s metodou spaced repetition. Tiché a brilantní.",
      "meta.description": "JustFlip! je aplikace pro učení s kartičkami pro iPhone, iPad a Mac. Spaced repetition, swipe hodnocení jako u Tinderu, bohaté markdown karty, mluvené balíčky a widget na domovské obrazovce — synchronizované napříč všemi zařízeními přes iCloud.",
      "ai.jumpAria": "Přejít na generování AI balíčků",
      "lang.switchLabel": "Přepnout jazyk",
      "lang.en": "English",
      "lang.cs": "Čeština"
    }
  };

  const ORIG    = 'data-i18n-o';   // attribute name for original HTML snapshot
  const ORIG_A  = 'data-i18n-oa';  // attribute name for original attr snapshot

  let current   = DEFAULT;
  let msgs      = null;     // null = use HTML (English) defaults
  let switcher  = null;
  let isOpen    = false;
  let originalsSaved = false;

  /* ---------------------------------------------------
   * Detect preferred locale
   * ------------------------------------------------- */
  function detect() {
    let stored;
    try { stored = w.localStorage.getItem(STORAGE); } catch (_) { /* noop */ }
    if (stored && SUPPORTED.includes(stored)) return stored;

    const navLang = (navigator.language || '').split('-')[0];
    if (SUPPORTED.includes(navLang)) return navLang;

    return DEFAULT;
  }

  /* ---------------------------------------------------
   * Load translations: synchronous — no network needed
   * ------------------------------------------------- */
  function load(locale) {
    if (locale === DEFAULT) {
      msgs = null;
      return;
    }
    if (!BUNDLE[locale]) {
      console.warn('[i18n] No translations for "' + locale + '"');
      msgs = null;
      return;
    }
    msgs = BUNDLE[locale];
  }

  /* ---------------------------------------------------
   * Save / restore the original DOM so we can switch
   * back to English without a page reload.
   * ------------------------------------------------- */
  function saveOriginals() {
    if (originalsSaved) return;
    originalsSaved = true;

    // Snapshot innerHTML of every translatable element
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      if (!el.hasAttribute(ORIG)) {
        el.setAttribute(ORIG, el.innerHTML);
      }
    });

    // Snapshot translatable attributes (aria-label, content, …)
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      const attrs = el.getAttribute('data-i18n-attr').split(',');
      attrs.forEach((attr) => {
        attr = attr.trim();
        const key = ORIG_A + '-' + attr;
        if (!el.hasAttribute(key)) {
          el.setAttribute(key, el.getAttribute(attr) || '');
        }
      });
    });
  }

  function restoreOriginals() {
    if (!originalsSaved) return;

    // Restore innerHTML
    document.querySelectorAll('[' + ORIG + ']').forEach((el) => {
      el.innerHTML = el.getAttribute(ORIG);
      el.removeAttribute(ORIG);
    });

    // Restore attributes
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      const attrs = el.getAttribute('data-i18n-attr').split(',');
      attrs.forEach((attr) => {
        attr = attr.trim();
        const key = ORIG_A + '-' + attr;
        const val = el.getAttribute(key);
        if (val !== null) {
          el.setAttribute(attr, val);
          el.removeAttribute(key);
        }
      });
    });

    originalsSaved = false;
  }

  /* ---------------------------------------------------
   * Translate: walk all [data-i18n] elements in the DOM
   * ------------------------------------------------- */
  function translate() {
    const year = new Date().getFullYear();

    // Snapshot the English originals before first translation
    saveOriginals();

    // If msgs is null, every element keeps its original (English) HTML
    if (!msgs) {
      document.documentElement.lang = current;
      return;
    }

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const val = msgs[key];
      if (!val) return;  // no translation for this key, keep original

      const text = val.replace(YEAR_RE, year);

      if (el.innerHTML !== text) {
        el.innerHTML = text;
      }
    });

    // Handle attribute translations: data-i18n-attr="aria-label,content,…"
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      const attrs = el.getAttribute('data-i18n-attr').split(',');
      attrs.forEach((attr) => {
        attr = attr.trim();
        const key = el.getAttribute('data-i18n-' + attr);
        if (!key) return;
        const val = msgs[key];
        if (val) {
          el.setAttribute(attr, val.replace(YEAR_RE, year));
        }
      });
    });

    // Update <html lang>
    document.documentElement.lang = current;
  }

  /* ---------------------------------------------------
   * Switch locale & re-translate
   * ------------------------------------------------- */
  function setLocale(locale) {
    if (locale === current) return;

    // Switching TO English = restore original HTML
    if (locale === DEFAULT) {
      restoreOriginals();
      current = locale;
      msgs = null;
      try { w.localStorage.setItem(STORAGE, locale); } catch (_) { /* noop */ }
      document.documentElement.lang = current;
      updateSwitcherUI();
      updateBtnAriaLabel();
      return;
    }

    load(locale);
    if (!msgs) {
      console.warn('[i18n] Could not load "' + locale + '" — keeping "' + current + '"');
      return;
    }
    current = locale;
    try { w.localStorage.setItem(STORAGE, locale); } catch (_) { /* noop */ }
    translate();
    updateSwitcherUI();
  }

  /* ---------------------------------------------------
   * Language switcher UI
   * ------------------------------------------------- */
  function createSwitcherUI() {
    switcher = document.createElement('div');
    switcher.className = 'lang-s';

    // — trigger button —
    const btn = document.createElement('button');
    btn.className = 'lang-s__btn';
    btn.setAttribute('aria-label', '');
    btn.setAttribute('aria-haspopup', 'true');
    btn.setAttribute('aria-expanded', 'false');

    const flag = document.createElement('span');
    flag.className = 'lang-s__flag';
    btn.appendChild(flag);

    const arrow = document.createElement('span');
    arrow.className = 'lang-s__arrow';
    arrow.innerHTML = '▾';
    btn.appendChild(arrow);

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown();
    });

    switcher.appendChild(btn);

    // — dropdown —
    const dd = document.createElement('div');
    dd.className = 'lang-s__dd';

    SUPPORTED.forEach((code) => {
      const item = document.createElement('button');
      item.className = 'lang-s__item';
      item.dataset.lang = code;
      item.textContent = getLangLabel(code) + '  ' + getFlag(code);
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        setLocale(code);
        closeDropdown();
      });
      dd.appendChild(item);
    });

    switcher.appendChild(dd);

    // Close dropdown on outside click
    document.addEventListener('click', closeDropdown);

    // Insert switcher into the nav
    const nav = document.getElementById('nav');
    const cta = nav && nav.querySelector('.nav__cta');
    if (cta) {
      cta.parentNode.insertBefore(switcher, cta.nextSibling);
    } else if (nav) {
      nav.appendChild(switcher);
    }

    updateSwitcherUI();
    updateBtnAriaLabel();
  }

  function updateBtnAriaLabel() {
    const btn = switcher && switcher.querySelector('.lang-s__btn');
    if (!btn) return;
    const label = (msgs && msgs['lang.switchLabel']) || 'Switch language';
    btn.setAttribute('aria-label', label);
  }

  function getFlag(code) {
    return code === 'cs' ? '🇨🇿' : '🇬🇧';
  }

  function getLangLabel(code) {
    switch (code) {
      case 'cs': return 'Čeština';
      default:   return 'English';
    }
  }

  function updateFlag(flagEl) {
    if (!flagEl) return;
    flagEl.textContent = getFlag(current);
  }

  function updateSwitcherUI() {
    if (!switcher) return;
    const btn = switcher.querySelector('.lang-s__btn');
    const flag = btn && btn.querySelector('.lang-s__flag');
    updateFlag(flag);

    switcher.querySelectorAll('.lang-s__item').forEach((item) => {
      item.classList.toggle('is-active', item.dataset.lang === current);
    });
  }

  function toggleDropdown() {
    isOpen = !isOpen;
    switcher.classList.toggle('is-open', isOpen);
    const btn = switcher.querySelector('.lang-s__btn');
    if (btn) btn.setAttribute('aria-expanded', String(isOpen));
  }

  function closeDropdown() {
    if (!isOpen) return;
    isOpen = false;
    switcher.classList.remove('is-open');
    const btn = switcher.querySelector('.lang-s__btn');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }

  /* ---------------------------------------------------
   * Init
   * ------------------------------------------------- */
  function init() {
    current = detect();
    load(current);

    // If the detected/requested locale has no bundle, fall back to English
    if (!msgs) current = DEFAULT;

    translate();

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createSwitcherUI);
    } else {
      createSwitcherUI();
    }
  }

  init();
})(window);
