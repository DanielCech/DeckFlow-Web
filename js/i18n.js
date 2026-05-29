/* JustFlip — i18n / localization module
   ----------------------------------------------------- */

((w) => {
  'use strict';

  const SUPPORTED = ['en', 'de', 'es', 'fr', 'it', 'pt-br', 'ja', 'ko', 'cs'];
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
      "ai.kicker": "Dva způsoby, jak vytvářet balíčky — plnohodnotné karty s obrázky a zvuky pomocí agentních nástrojů, nebo jednoduché textové sady přímo v ChatGPT.",
      "ai.terminalAria": "Terminálová ukázka generování flashcard balíčku s AI agentem",
      "ai.panelTitle": "Zvol si svůj přístup",
      "ai.richTitle": "Plnohodnotné karty",
      "ai.richDesc": "Generuj balíčky s obrázky, zvuky, audio nápovědami a Markdown formátováním. Vyžaduje agentní nástroj jako Claude Code, Codex nebo OpenCode.",
      "ai.textTitle": "Jednoduché textové karty",
      "ai.textDesc": "Rychlé textové kartičky — bez obrázků nebo zvuku. Vytvoř je přímo v ChatGPT.",
      "ai.chatgptLabel": "JustFlip GPT → Otevřít",
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
      "algorithm.statsLabel": "Animovaný · Progress a dashboard naléhavosti",
      "algorithm.progressLabel": "Pokrok",
      "algorithm.urgencyLabel": "Naléhavost",
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
      "audio.widgetCard": "Angličtina ↔ Němčina",
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
      "cta.langs": "Dostupné v <strong>English</strong>, <strong>Deutsch</strong>, <strong>Español</strong>, <strong>Français</strong>, <strong>Italiano</strong>, <strong>Português (Brasil)</strong>, <strong>日本語</strong>, <strong>한국어</strong> a <strong>Čeština</strong>.",
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
      "ai.quote1": "\"Vytvoř 10 kartiček pro nepravidelná slovesa v angličtině.\"",
      "ai.quote2": "\"Nejdůležitější matematické věty o trigonometrii.\"",
      "ai.quote3": "\"Prvních 10 prezidentů USA\"",

      "ai.jumpAria": "Přejít na generování AI balíčků",
      "lang.switchLabel": "Přepnout jazyk",
      "lang.en": "English",
      "lang.cs": "Čeština"
    },
    de:     {
      "nav.features": "Funktionen",
      "nav.aiDecks": "KI-Decks",
      "nav.algorithm": "Algorithmus",
      "nav.guide": "Leitfaden",
      "nav.about": "Über",
      "nav.appStore": "App Store",
      "rail.open": "Start",
      "rail.everywhere": "Überall",
      "rail.aiDecks": "KI-Decks",
      "rail.study": "Lernen",
      "rail.algorithm": "Algorithmus",
      "rail.markdown": "Markdown",
      "rail.listen": "Anhören",
      "rail.dayNight": "Tag / Nacht",
      "hero.eyebrow": "Eine Karteikarten-App für effizientes Lernen",
      "hero.title": "Lerne ruhig.<br/><em>Behalte alles.</em>",
      "hero.lede": "JustFlip! ist eine Spaced-Repetition-Karteikarten-App für iPhone, iPad und Mac. Verwalte deine Decks am Desktop, wiederhole sie unterwegs und vertraue auf eine von SM-2 inspirierte Engine, die dir zur richtigen Zeit die richtige Karte zeigt.",
      "hero.downloadCta": "Im App Store laden",
      "hero.exploreCta": "Funktionen entdecken",
      "hero.metaPlatforms": "<strong>iOS · iPadOS · macOS</strong>",
      "hero.metaSync": "<strong>iCloud-Sync</strong> integriert",
      "hero.metaOffline": "<strong>Offline zuerst</strong>",
      "hero.floatPillText": "<em>Neu —</em> Decks mit deinem Lieblings-KI-Agenten erzeugen",
      "hero.scroll": "Scrollen",
      "devices.title": "Eine Bibliothek.<br/><em>Drei Begleiter.</em>",
      "devices.kicker": "Erstellen und pflegen auf dem Mac. Wiederholen auf dem iPhone beim Morgenkaffee. Auf dem iPad Notizen am Rand ergänzen. iCloud hält jede Karte, jedes Intervall und jede Serie perfekt synchron.",
      "devices.stageLabel": "Bild · iPhone, iPad und Mac mit synchronisierten Decks",
      "devices.macos": "macOS",
      "devices.macosTitle": "Der Kurator",
      "devices.macosDesc": "Importiere <code>.flashcard</code>-Archive per Drag-and-Drop, verwalte Themen und bearbeite Karten in einem eigenen Editor.",
      "devices.ipados": "iPadOS",
      "devices.ipadosTitle": "Das Studio",
      "devices.ipadosDesc": "Eine breite Leinwand für lange Lernsessions mit Apple-Pencil-freundlicher Typografie und Split View.",
      "devices.ios": "iOS",
      "devices.iosTitle": "Der Taschenlehrer",
      "devices.iosDesc": "Tägliche Wiederholungen, ein stilles Widget auf dem Homescreen und Fortschritt Karte für Karte.",
      "ai.title": "Lass die KI <em>das Deck schreiben.</em>",
      "ai.kicker": "Zwei Wege, Decks zu erstellen: vollwertige Karten mit Bildern und Audio über agentische Tools oder einfache Textkarten direkt in ChatGPT.",
      "ai.terminalAria": "Terminal-Demo zur Erzeugung eines Karteikarten-Decks mit einem KI-Agenten",
      "ai.panelTitle": "Wähle deinen Ansatz",
      "ai.richTitle": "Vollwertige Karten",
      "ai.richDesc": "Erzeuge Decks mit Bildern, Tönen, Audiohinweisen und Markdown-Formatierung. Dafür brauchst du ein agentisches Coding-Tool wie Claude Code, Codex oder OpenCode.",
      "ai.textTitle": "Einfache Textkarten",
      "ai.textDesc": "Schnelle Text-Karteikarten ohne Bilder oder Audio. Erstelle sie direkt in ChatGPT.",
      "ai.chatgptLabel": "JustFlip GPT → Öffnen",
      "study.title": "Eine Bibliothek, durch die du <em>wischen kannst.</em>",
      "study.kicker": "Durchstöbere Decks als ruhige, redaktionelle Liste oder gehe in den fokussierten Review-Modus und bewerte jede Karte per Tinder-ähnlichem Swipe: rechts für <em>gut</em>, links für <em>nochmal</em>, hoch für <em>einfach</em>.",
      "study.cardListLabel": "Bild · Kartenliste",
      "study.swipeLabel": "Bild · Swipe-Review",
      "study.chipAgain": "Nochmal",
      "study.chipHard": "Schwer",
      "study.chipGood": "Gut",
      "study.chipEasy": "Einfach",
      "algorithm.title": "Ein geduldiger Algorithmus.<br/><em>Fünf Zustände. Unendliches Gedächtnis.</em>",
      "algorithm.kicker": "JustFlip! nutzt eine verfeinerte SM-2-Engine mit fünf Lernzuständen. Karten durchlaufen <em>unseen</em>, <em>learning</em>, <em>reviewing</em>, <em>relearning</em> und <em>graduated</em>, jeweils mit eigenem Intervall und eigener Leichtigkeit.",
      "algorithm.statsLabel": "Animiert · Fortschritt- und Dringlichkeits-Dashboard",
      "algorithm.progressLabel": "Fortschritt",
      "algorithm.urgencyLabel": "Dringlichkeit",
      "algorithm.unseen": "Unbekannt",
      "algorithm.unseenDesc": "Noch nie gelernt – bereit für den ersten Kontakt.",
      "algorithm.learning": "Lernen",
      "algorithm.learningDesc": "Minuten bis Tage. Frische Erinnerung nimmt Form an.",
      "algorithm.reviewing": "Wiederholen",
      "algorithm.reviewingDesc": "Tage bis Wochen. Das Intervall wächst mit der Leichtigkeit.",
      "algorithm.relearning": "Neu lernen",
      "algorithm.relearningDesc": "Vergessen? Zurück zu kurzen Intervallen, ganz sanft.",
      "algorithm.graduated": "Abgeschlossen",
      "algorithm.graduatedDesc": "Wochen bis Monate. Langfristige Erinnerung.",
      "algorithm.formulaNote": "Leichtigkeit steigt bei <em>einfach</em>, stabilisiert sich bei <em>gut</em> und sinkt bei <em>schwer</em> oder <em>nochmal</em> — nie unter 1,3.",
      "markdown.title": "Karten, die <em>wie Essays lesen.</em>",
      "markdown.kicker": "Definiere Karten in reichhaltigem Markdown: Überschriften, Listen, Codeblöcke, Inline-Mathe, Bilder und Links. JustFlip! setzt sie mit editorialer Typografie um.",
      "markdown.label": "Bild · Markdown-Karte",
      "audio.title": "Decks, die <em>sprechen.</em>",
      "audio.kicker": "Lass deine Karten laut vorlesen, während du gehst, kochst oder fährst. Das JustFlip!-Widget auf dem Homescreen hält die nächste Wiederholung nur einen Tipp entfernt.",
      "audio.phoneLabel": "Bild · Sprachausgabe für Karten",
      "audio.widgetDeck": "Romantische Dichter · EN",
      "audio.widgetCard": "Englisch ↔ Deutsch",
      "audio.widgetDue": "14 heute fällig",
      "audio.widgetTap": "Tippen zum Lernen",
      "theme.title": "Dunkel bei Kerzenschein.<br/><em>Hell am Morgen.</em>",
      "theme.kicker": "JustFlip! respektiert das System. Wechsle von tiefem, gelehrtem Dunkel zu sanftem Pergamentlicht.",
      "theme.darkLabel": "Bild · Dunkelmodus",
      "theme.lightLabel": "Bild · Hellmodus",
      "cta.eyebrow": "Bald auf Apple-Plattformen verfügbar",
      "cta.title": "Hol dir JustFlip! ins Regal.",
      "cta.lede": "Ein Kauf. Drei Plattformen. Ein Leben lang gut getaktetes Wiederholen.",
      "cta.download": "Im App Store laden",
      "cta.readGuide": "Leitfaden lesen",
      "cta.langs": "Verfügbar in <strong>Englisch</strong>, <strong>Deutsch</strong>, <strong>Español</strong>, <strong>Français</strong>, <strong>Italiano</strong>, <strong>Português (Brasil)</strong>, <strong>日本語</strong>, <strong>한국어</strong> und <strong>Čeština</strong>.",
      "footer.tagline": "Ein Karteikarten-Begleiter für lebenslang Lernende.",
      "footer.features": "Funktionen",
      "footer.aiDecks": "KI-Decks",
      "footer.algorithm": "Algorithmus",
      "footer.guide": "Leitfaden",
      "footer.about": "Über",
      "footer.privacy": "Datenschutz",
      "footer.terms": "AGB",
      "footer.support": "Support",
      "footer.contact": "Kontakt",
      "footer.copyright": "© {year} JustFlip! Entwickelt in Prag. Apple, das Apple-Logo, iPhone, iPad und Mac sind Marken von Apple Inc.",
      "meta.title": "JustFlip! — Lernen mit Spaced Repetition. Still brillant.",
      "meta.description": "JustFlip! ist eine Karteikarten-App für iPhone, iPad und Mac. Spaced Repetition, Tinder-ähnliche Bewertung, reich formatierte Markdown-Karten, gesprochene Decks und ein Homescreen-Widget — über iCloud mit allen Geräten synchronisiert.",
      "ai.quote1": "\"Erstelle 10 Karteikarten zu unregelmäßigen Verben im Englischen.\"",
      "ai.quote2": "\"Die wichtigsten mathematischen Sätze zur Trigonometrie.\"",
      "ai.quote3": "\"Die ersten 10 US-Präsidenten\"",
      "ai.jumpAria": "Zur KI-Deck-Erzeugung springen",
      "lang.switchLabel": "Sprache wechseln"
    },
    es:     {
      "nav.features": "Funciones",
      "nav.aiDecks": "Decks IA",
      "nav.algorithm": "Algoritmo",
      "nav.guide": "Guía",
      "nav.about": "Acerca de",
      "nav.appStore": "App Store",
      "rail.open": "Inicio",
      "rail.everywhere": "En todas partes",
      "rail.aiDecks": "Decks IA",
      "rail.study": "Estudio",
      "rail.algorithm": "Algoritmo",
      "rail.markdown": "Markdown",
      "rail.listen": "Escuchar",
      "rail.dayNight": "Día / Noche",
      "hero.eyebrow": "Una app de tarjetas para estudiar con eficacia",
      "hero.title": "Estudia en calma.<br/><em>Recuerda todo.</em>",
      "hero.lede": "JustFlip! es una app de tarjetas con repetición espaciada para iPhone, iPad y Mac. Organiza tus decks en el escritorio, repásalos donde quieras y confía en un motor inspirado en SM-2 que muestra la carta correcta en el momento justo.",
      "hero.downloadCta": "Descargar en el App Store",
      "hero.exploreCta": "Explorar funciones",
      "hero.metaPlatforms": "<strong>iOS · iPadOS · macOS</strong>",
      "hero.metaSync": "<strong>Sincronización con iCloud</strong> integrada",
      "hero.metaOffline": "<strong>Primero offline</strong>",
      "hero.floatPillText": "<em>Nuevo —</em> crea decks con tu agente de IA favorito",
      "hero.scroll": "Desplazar",
      "devices.title": "Una biblioteca.<br/><em>Tres compañeros.</em>",
      "devices.kicker": "Crea y organiza en Mac. Repasa en iPhone con un café por la mañana. Añade notas en iPad al margen. iCloud mantiene cada tarjeta, intervalo y racha perfectamente sincronizados.",
      "devices.stageLabel": "Imagen · iPhone, iPad y Mac con decks sincronizados",
      "devices.macos": "macOS",
      "devices.macosTitle": "El curador",
      "devices.macosDesc": "Importa archivos <code>.flashcard</code> arrastrando y soltando, gestiona temas y edita tarjetas en un editor dedicado.",
      "devices.ipados": "iPadOS",
      "devices.ipadosTitle": "El estudio",
      "devices.ipadosDesc": "Un lienzo amplio para sesiones largas con tipografía amigable para Apple Pencil y vista dividida.",
      "devices.ios": "iOS",
      "devices.iosTitle": "El tutor de bolsillo",
      "devices.iosDesc": "Repasos diarios, un widget silencioso en la pantalla de inicio y progreso tarjeta por tarjeta.",
      "ai.title": "Deja que la IA <em>escriba el deck.</em>",
      "ai.kicker": "Dos formas de crear decks: tarjetas completas con imágenes y audio mediante herramientas agénticas, o conjuntos de texto simples directamente en ChatGPT.",
      "ai.terminalAria": "Demo de terminal generando un deck de tarjetas con un agente de IA",
      "ai.panelTitle": "Elige tu enfoque",
      "ai.richTitle": "Tarjetas completas",
      "ai.richDesc": "Genera decks con imágenes, sonidos, pistas de audio y formato Markdown. Requiere una herramienta agéntica como Claude Code, Codex u OpenCode.",
      "ai.textTitle": "Tarjetas de texto simples",
      "ai.textDesc": "Tarjetas rápidas solo de texto, sin imágenes ni audio. Créelas directamente en ChatGPT.",
      "ai.chatgptLabel": "JustFlip GPT → Abrir",
      "study.title": "Una biblioteca que puedes <em>deslizar.</em>",
      "study.kicker": "Explora decks en una lista editorial tranquila o entra en un modo de repaso concentrado y valora cada tarjeta con un gesto tipo Tinder: derecha para <em>bien</em>, izquierda para <em>otra vez</em>, arriba para <em>fácil</em>.",
      "study.cardListLabel": "Imagen · Lista de tarjetas",
      "study.swipeLabel": "Imagen · Pantalla de repaso por deslizamiento",
      "study.chipAgain": "Otra vez",
      "study.chipHard": "Difícil",
      "study.chipGood": "Bien",
      "study.chipEasy": "Fácil",
      "algorithm.title": "Un algoritmo paciente.<br/><em>Cinco estados. Memoria infinita.</em>",
      "algorithm.kicker": "JustFlip! usa un motor SM-2 refinado con cinco estados de aprendizaje. Las tarjetas pasan por <em>unseen</em>, <em>learning</em>, <em>reviewing</em>, <em>relearning</em> y <em>graduated</em>, cada uno con su intervalo y facilidad.",
      "algorithm.statsLabel": "Animado · Panel de progreso y urgencia",
      "algorithm.progressLabel": "Progreso",
      "algorithm.urgencyLabel": "Urgencia",
      "algorithm.unseen": "No visto",
      "algorithm.unseenDesc": "Nunca estudiada, lista para el primer contacto.",
      "algorithm.learning": "Aprendiendo",
      "algorithm.learningDesc": "Minutos a un día. Memoria fresca tomando forma.",
      "algorithm.reviewing": "Repasando",
      "algorithm.reviewingDesc": "Días a semanas. El intervalo crece con la facilidad.",
      "algorithm.relearning": "Reaprendiendo",
      "algorithm.relearningDesc": "¿Olvidada? Vuelve a intervalos cortos, con suavidad.",
      "algorithm.graduated": "Graduada",
      "algorithm.graduatedDesc": "Semanas a meses. Retención a largo plazo.",
      "algorithm.formulaNote": "La facilidad sube con <em>fácil</em>, se estabiliza con <em>bien</em> y baja con <em>difícil</em> o <em>otra vez</em> — nunca por debajo de 1.3.",
      "markdown.title": "Tarjetas que <em>se leen como ensayos.</em>",
      "markdown.kicker": "Define tus tarjetas en Markdown enriquecido: títulos, listas, bloques de código, matemáticas en línea, imágenes y enlaces. JustFlip! las presenta con tipografía editorial.",
      "markdown.label": "Imagen · Tarjeta en Markdown",
      "audio.title": "Decks que <em>hablan.</em>",
      "audio.kicker": "Deja que tus tarjetas se lean en voz alta mientras caminas, cocinas o conduces. El widget de JustFlip! en la pantalla de inicio deja el siguiente repaso a un toque de distancia.",
      "audio.phoneLabel": "Imagen · Reproductor de tarjetas habladas",
      "audio.widgetDeck": "Poetas románticos · EN",
      "audio.widgetCard": "Inglés ↔ Alemán",
      "audio.widgetDue": "14 pendientes hoy",
      "audio.widgetTap": "Toca para estudiar",
      "theme.title": "Oscuro a la luz de las velas.<br/><em>Claro por la mañana.</em>",
      "theme.kicker": "JustFlip! respeta el sistema. Cambia de una oscuridad profunda y académica a una luz suave de pergamino.",
      "theme.darkLabel": "Imagen · Modo oscuro",
      "theme.lightLabel": "Imagen · Modo claro",
      "cta.eyebrow": "Disponible pronto en las plataformas Apple",
      "cta.title": "Lleva JustFlip! a tu estantería.",
      "cta.lede": "Una compra. Tres plataformas. Una vida de repaso bien espaciado.",
      "cta.download": "Descargar en el App Store",
      "cta.readGuide": "Leer la guía",
      "cta.langs": "Disponible en <strong>English</strong>, <strong>Deutsch</strong>, <strong>Español</strong>, <strong>Français</strong>, <strong>Italiano</strong>, <strong>Português (Brasil)</strong>, <strong>日本語</strong>, <strong>한국어</strong> y <strong>Čeština</strong>.",
      "footer.tagline": "Un compañero de tarjetas para quienes aprenden toda la vida.",
      "footer.features": "Funciones",
      "footer.aiDecks": "Decks IA",
      "footer.algorithm": "Algoritmo",
      "footer.guide": "Guía",
      "footer.about": "Acerca de",
      "footer.privacy": "Privacidad",
      "footer.terms": "Términos y condiciones",
      "footer.support": "Soporte",
      "footer.contact": "Contacto",
      "footer.copyright": "© {year} JustFlip! Creado en Praga. Apple, el logotipo de Apple, iPhone, iPad y Mac son marcas comerciales de Apple Inc.",
      "meta.title": "JustFlip! — Estudia con repetición espaciada. Silenciosamente brillante.",
      "meta.description": "JustFlip! es una app de tarjetas para iPhone, iPad y Mac. Repetición espaciada, repasos estilo Tinder, tarjetas Markdown enriquecidas, decks hablados y un widget de inicio, sincronizados en todos tus dispositivos mediante iCloud.",
      "ai.quote1": "\"Crea 10 tarjetas para verbos irregulares en inglés.\"",
      "ai.quote2": "\"Los teoremas matemáticos más importantes sobre trigonometría.\"",
      "ai.quote3": "\"Los primeros 10 presidentes de EE. UU.\"",
      "ai.jumpAria": "Ir a la generación de decks con IA",
      "lang.switchLabel": "Cambiar idioma"
    },
    fr:     {
      "nav.features": "Fonctionnalités",
      "nav.aiDecks": "Decks IA",
      "nav.algorithm": "Algorithme",
      "nav.guide": "Guide",
      "nav.about": "À propos",
      "nav.appStore": "App Store",
      "rail.open": "Accueil",
      "rail.everywhere": "Partout",
      "rail.aiDecks": "Decks IA",
      "rail.study": "Étude",
      "rail.algorithm": "Algorithme",
      "rail.markdown": "Markdown",
      "rail.listen": "Écoute",
      "rail.dayNight": "Jour / Nuit",
      "hero.eyebrow": "Une app de cartes pour étudier efficacement",
      "hero.title": "Étudie calmement.<br/><em>Retiens tout.</em>",
      "hero.lede": "JustFlip! est une app de cartes à répétition espacée pour iPhone, iPad et Mac. Organise tes decks sur ordinateur, révise-les en déplacement et fais confiance à un moteur inspiré de SM-2 qui affiche la bonne carte au bon moment.",
      "hero.downloadCta": "Télécharger sur l’App Store",
      "hero.exploreCta": "Découvrir les fonctionnalités",
      "hero.metaPlatforms": "<strong>iOS · iPadOS · macOS</strong>",
      "hero.metaSync": "<strong>Synchronisation iCloud</strong> intégrée",
      "hero.metaOffline": "<strong>Hors ligne d’abord</strong>",
      "hero.floatPillText": "<em>Nouveau —</em> crée des decks avec ton agent IA préféré",
      "hero.scroll": "Faire défiler",
      "devices.title": "Une bibliothèque.<br/><em>Trois compagnons.</em>",
      "devices.kicker": "Crée et organise sur Mac. Révise sur iPhone avec un café du matin. Ajoute des notes sur iPad dans les marges. iCloud garde chaque carte, intervalle et série parfaitement synchronisés.",
      "devices.stageLabel": "Image · iPhone, iPad et Mac avec decks synchronisés",
      "devices.macos": "macOS",
      "devices.macosTitle": "Le curateur",
      "devices.macosDesc": "Importe des archives <code>.flashcard</code> par glisser-déposer, gère les thèmes et modifie les cartes dans un éditeur dédié.",
      "devices.ipados": "iPadOS",
      "devices.ipadosTitle": "Le studio",
      "devices.ipadosDesc": "Une large toile pour les longues sessions d’étude avec une typographie adaptée à l’Apple Pencil et le mode Split View.",
      "devices.ios": "iOS",
      "devices.iosTitle": "Le professeur de poche",
      "devices.iosDesc": "Révisions quotidiennes, widget discret sur l’écran d’accueil et progression carte par carte.",
      "ai.title": "Laisse l’IA <em>écrire le deck.</em>",
      "ai.kicker": "Deux façons de créer des decks : des cartes complètes avec images et audio via des outils agents, ou de simples ensembles de texte directement dans ChatGPT.",
      "ai.terminalAria": "Démo terminal de génération d’un deck de cartes avec un agent IA",
      "ai.panelTitle": "Choisis ton approche",
      "ai.richTitle": "Cartes complètes",
      "ai.richDesc": "Génère des decks avec images, sons, indices audio et mise en forme Markdown. Nécessite un outil de codage agentique comme Claude Code, Codex ou OpenCode.",
      "ai.textTitle": "Cartes texte simples",
      "ai.textDesc": "Cartes rapides uniquement textuelles, sans image ni audio. Crée-les directement dans ChatGPT.",
      "ai.chatgptLabel": "JustFlip GPT → Ouvrir",
      "study.title": "Une bibliothèque que tu peux <em>balayer du doigt.</em>",
      "study.kicker": "Parcours les decks comme une liste éditoriale calme ou passe en révision concentrée et note chaque carte avec un geste façon Tinder : droite pour <em>bien</em>, gauche pour <em>encore</em>, haut pour <em>facile</em>.",
      "study.cardListLabel": "Image · Liste de cartes",
      "study.swipeLabel": "Image · Écran de révision par glissement",
      "study.chipAgain": "Encore",
      "study.chipHard": "Difficile",
      "study.chipGood": "Bien",
      "study.chipEasy": "Facile",
      "algorithm.title": "Un algorithme patient.<br/><em>Cinq états. Mémoire infinie.</em>",
      "algorithm.kicker": "JustFlip! utilise un moteur SM-2 affiné avec cinq états d’apprentissage. Les cartes passent par <em>unseen</em>, <em>learning</em>, <em>reviewing</em>, <em>relearning</em> et <em>graduated</em>, chacun avec son intervalle et sa facilité.",
      "algorithm.statsLabel": "Animé · Tableau de progression et d’urgence",
      "algorithm.progressLabel": "Progression",
      "algorithm.urgencyLabel": "Urgence",
      "algorithm.unseen": "Inconnue",
      "algorithm.unseenDesc": "Jamais étudiée — prête pour le premier contact.",
      "algorithm.learning": "En apprentissage",
      "algorithm.learningDesc": "Quelques minutes à une journée. La mémoire prend forme.",
      "algorithm.reviewing": "En révision",
      "algorithm.reviewingDesc": "De quelques jours à quelques semaines. L’intervalle grandit avec la facilité.",
      "algorithm.relearning": "Réapprentissage",
      "algorithm.relearningDesc": "Oubliée ? Retour à des intervalles courts, en douceur.",
      "algorithm.graduated": "Graduée",
      "algorithm.graduatedDesc": "Semaines à mois. Rétention à long terme.",
      "algorithm.formulaNote": "La facilité augmente sur <em>facile</em>, se stabilise sur <em>bien</em> et diminue sur <em>difficile</em> ou <em>encore</em> — jamais en dessous de 1,3.",
      "markdown.title": "Des cartes qui <em>se lisent comme des essais.</em>",
      "markdown.kicker": "Définis tes cartes en Markdown riche : titres, listes, blocs de code, maths inline, images et liens. JustFlip! les affiche avec une typographie éditoriale.",
      "markdown.label": "Image · Carte en Markdown",
      "audio.title": "Des decks qui <em>parlent.</em>",
      "audio.kicker": "Laisse tes cartes se lire à voix haute pendant que tu marches, cuisines ou conduis. Le widget JustFlip! sur l’écran d’accueil garde la prochaine révision à un tap.",
      "audio.phoneLabel": "Image · Lecteur de cartes parlées",
      "audio.widgetDeck": "Poètes romantiques · EN",
      "audio.widgetCard": "Anglais ↔ Allemand",
      "audio.widgetDue": "14 à réviser aujourd’hui",
      "audio.widgetTap": "Touchez pour étudier",
      "theme.title": "Sombre à la lueur des bougies.<br/><em>Clair au matin.</em>",
      "theme.kicker": "JustFlip! respecte le système. Passe d’une obscurité savante à une lumière douce de parchemin.",
      "theme.darkLabel": "Image · Mode sombre",
      "theme.lightLabel": "Image · Mode clair",
      "cta.eyebrow": "Bientôt disponible sur les plateformes Apple",
      "cta.title": "Ajoute JustFlip! à ton étagère.",
      "cta.lede": "Un achat. Trois plateformes. Une vie entière de révisions bien espacées.",
      "cta.download": "Télécharger sur l’App Store",
      "cta.readGuide": "Lire le guide",
      "cta.langs": "Disponible en <strong>English</strong>, <strong>Deutsch</strong>, <strong>Español</strong>, <strong>Français</strong>, <strong>Italiano</strong>, <strong>Português (Brasil)</strong>, <strong>日本語</strong>, <strong>한국어</strong> et <strong>Čeština</strong>.",
      "footer.tagline": "Un compagnon de cartes pour les apprenants de toute la vie.",
      "footer.features": "Fonctionnalités",
      "footer.aiDecks": "Decks IA",
      "footer.algorithm": "Algorithme",
      "footer.guide": "Guide",
      "footer.about": "À propos",
      "footer.privacy": "Confidentialité",
      "footer.terms": "Conditions générales",
      "footer.support": "Support",
      "footer.contact": "Contact",
      "footer.copyright": "© {year} JustFlip! Conçu à Prague. Apple, le logo Apple, iPhone, iPad et Mac sont des marques d’Apple Inc.",
      "meta.title": "JustFlip! — Étudie avec la répétition espacée. Discrètement brillant.",
      "meta.description": "JustFlip! est une app de cartes pour iPhone, iPad et Mac. Répétition espacée, révision façon Tinder, cartes Markdown riches, decks parlés et widget d’écran d’accueil — synchronisés sur tous tes appareils via iCloud.",
      "ai.quote1": "\"Crée 10 cartes sur les verbes irréguliers en anglais.\"",
      "ai.quote2": "\"Les théorèmes mathématiques les plus importants sur la trigonométrie.\"",
      "ai.quote3": "\"Les 10 premiers présidents des États-Unis\"",
      "ai.jumpAria": "Aller à la génération de decks IA",
      "lang.switchLabel": "Changer de langue"
    },
    it:     {
      "nav.features": "Funzionalità",
      "nav.aiDecks": "Deck IA",
      "nav.algorithm": "Algoritmo",
      "nav.guide": "Guida",
      "nav.about": "Info",
      "nav.appStore": "App Store",
      "rail.open": "Inizio",
      "rail.everywhere": "Ovunque",
      "rail.aiDecks": "Deck IA",
      "rail.study": "Studio",
      "rail.algorithm": "Algoritmo",
      "rail.markdown": "Markdown",
      "rail.listen": "Ascolta",
      "rail.dayNight": "Giorno / Notte",
      "hero.eyebrow": "Un’app di flashcard per studiare in modo efficace",
      "hero.title": "Studia in silenzio.<br/><em>Ricorda tutto.</em>",
      "hero.lede": "JustFlip! è un’app di flashcard con ripetizione dilazionata per iPhone, iPad e Mac. Gestisci i tuoi deck sul desktop, ripassali in movimento e affidati a un motore ispirato a SM-2 che mostra la carta giusta al momento giusto.",
      "hero.downloadCta": "Scarica su App Store",
      "hero.exploreCta": "Esplora le funzionalità",
      "hero.metaPlatforms": "<strong>iOS · iPadOS · macOS</strong>",
      "hero.metaSync": "<strong>Sincronizzazione iCloud</strong> integrata",
      "hero.metaOffline": "<strong>Prima offline</strong>",
      "hero.floatPillText": "<em>Novità —</em> genera deck con il tuo agente AI preferito",
      "hero.scroll": "Scorri",
      "devices.title": "Una libreria.<br/><em>Tre compagni.</em>",
      "devices.kicker": "Crea e organizza su Mac. Ripassa su iPhone con il caffè del mattino. Aggiungi note su iPad ai margini. iCloud mantiene ogni carta, intervallo e streak perfettamente sincronizzati.",
      "devices.stageLabel": "Immagine · iPhone, iPad e Mac con deck sincronizzati",
      "devices.macos": "macOS",
      "devices.macosTitle": "Il curatore",
      "devices.macosDesc": "Importa archivi <code>.flashcard</code> trascinando e rilasciando, gestisci gli argomenti e modifica le carte in un editor dedicato.",
      "devices.ipados": "iPadOS",
      "devices.ipadosTitle": "Lo studio",
      "devices.ipadosDesc": "Una tela ampia per sessioni di studio lunghe con tipografia adatta ad Apple Pencil e vista affiancata.",
      "devices.ios": "iOS",
      "devices.iosTitle": "Il tutor da tasca",
      "devices.iosDesc": "Ripassi quotidiani, un widget silenzioso sulla schermata Home e progressi carta per carta.",
      "ai.title": "Lascia che l’AI <em>scriva il deck.</em>",
      "ai.kicker": "Due modi per creare deck: carte complete con immagini e audio tramite strumenti agentici, oppure semplici set di testo direttamente in ChatGPT.",
      "ai.terminalAria": "Demo da terminale della generazione di un deck di flashcard con un agente AI",
      "ai.panelTitle": "Scegli il tuo approccio",
      "ai.richTitle": "Carte complete",
      "ai.richDesc": "Genera deck con immagini, suoni, indizi audio e formattazione Markdown. Serve uno strumento di coding agentico come Claude Code, Codex o OpenCode.",
      "ai.textTitle": "Carte di solo testo",
      "ai.textDesc": "Flashcard rapide solo testuali, senza immagini né audio. Creale direttamente in ChatGPT.",
      "ai.chatgptLabel": "JustFlip GPT → Apri",
      "study.title": "Una libreria che puoi <em>sfogliare con un gesto.</em>",
      "study.kicker": "Esplora i deck come un elenco editoriale tranquillo oppure entra in una revisione focalizzata e valuta ogni carta con un gesto stile Tinder: destra per <em>bene</em>, sinistra per <em>di nuovo</em>, su per <em>facile</em>.",
      "study.cardListLabel": "Immagine · Elenco carte",
      "study.swipeLabel": "Immagine · Schermata revisione swipe",
      "study.chipAgain": "Di nuovo",
      "study.chipHard": "Difficile",
      "study.chipGood": "Bene",
      "study.chipEasy": "Facile",
      "algorithm.title": "Un algoritmo paziente.<br/><em>Cinque stati. Memoria infinita.</em>",
      "algorithm.kicker": "JustFlip! usa un motore SM-2 raffinato con cinque stati di apprendimento. Le carte passano attraverso <em>unseen</em>, <em>learning</em>, <em>reviewing</em>, <em>relearning</em> e <em>graduated</em>, ognuno con il proprio intervallo e facilità.",
      "algorithm.statsLabel": "Animato · Dashboard di progresso e urgenza",
      "algorithm.progressLabel": "Progresso",
      "algorithm.urgencyLabel": "Urgenza",
      "algorithm.unseen": "Non visto",
      "algorithm.unseenDesc": "Mai studiata — pronta per il primo contatto.",
      "algorithm.learning": "In apprendimento",
      "algorithm.learningDesc": "Da minuti a un giorno. Memoria fresca che prende forma.",
      "algorithm.reviewing": "In revisione",
      "algorithm.reviewingDesc": "Da giorni a settimane. L’intervallo cresce con la facilità.",
      "algorithm.relearning": "Reapprendimento",
      "algorithm.relearningDesc": "Dimenticata? Torna a intervalli brevi, con delicatezza.",
      "algorithm.graduated": "Graduata",
      "algorithm.graduatedDesc": "Da settimane a mesi. Ritenzione a lungo termine.",
      "algorithm.formulaNote": "La facilità cresce con <em>facile</em>, si stabilizza con <em>bene</em> e scende con <em>difficile</em> o <em>di nuovo</em> — mai sotto 1.3.",
      "markdown.title": "Carte che <em>si leggono come saggi.</em>",
      "markdown.kicker": "Definisci le tue carte in Markdown ricco: titoli, elenchi, blocchi di codice, matematica inline, immagini e link. JustFlip! le rende con una tipografia editoriale.",
      "markdown.label": "Immagine · Carta Markdown",
      "audio.title": "Deck che <em>parlano.</em>",
      "audio.kicker": "Lascia che le tue carte parlino ad alta voce mentre cammini, cucini o guidi. Il widget di JustFlip! sulla schermata Home tiene il prossimo ripasso a un tocco di distanza.",
      "audio.phoneLabel": "Immagine · Lettore di carte parlate",
      "audio.widgetDeck": "Poeti romantici · EN",
      "audio.widgetCard": "Inglese ↔ Tedesco",
      "audio.widgetDue": "14 da ripassare oggi",
      "audio.widgetTap": "Tocca per studiare",
      "theme.title": "Scuro alla luce delle candele.<br/><em>Chiaro al mattino.</em>",
      "theme.kicker": "JustFlip! rispetta il sistema. Passa da un buio profondo e accademico a una morbida luce pergamenata.",
      "theme.darkLabel": "Immagine · Modalità scura",
      "theme.lightLabel": "Immagine · Modalità chiara",
      "cta.eyebrow": "Disponibile presto sulle piattaforme Apple",
      "cta.title": "Porta JustFlip! nella tua libreria.",
      "cta.lede": "Un acquisto. Tre piattaforme. Una vita di ripassi ben distribuiti.",
      "cta.download": "Scarica su App Store",
      "cta.readGuide": "Leggi la guida",
      "cta.langs": "Disponibile in <strong>English</strong>, <strong>Deutsch</strong>, <strong>Español</strong>, <strong>Français</strong>, <strong>Italiano</strong>, <strong>Português (Brasil)</strong>, <strong>日本語</strong>, <strong>한국어</strong> e <strong>Čeština</strong>.",
      "footer.tagline": "Un compagno di flashcard per chi impara per tutta la vita.",
      "footer.features": "Funzionalità",
      "footer.aiDecks": "Deck IA",
      "footer.algorithm": "Algoritmo",
      "footer.guide": "Guida",
      "footer.about": "Info",
      "footer.privacy": "Privacy",
      "footer.terms": "Termini e condizioni",
      "footer.support": "Supporto",
      "footer.contact": "Contatto",
      "footer.copyright": "© {year} JustFlip! Creato a Praga. Apple, il logo Apple, iPhone, iPad e Mac sono marchi di Apple Inc.",
      "meta.title": "JustFlip! — Studia con la ripetizione dilazionata. Silenziosamente brillante.",
      "meta.description": "JustFlip! è un’app di flashcard per iPhone, iPad e Mac. Ripetizione dilazionata, revisione stile Tinder, carte Markdown ricche, deck parlati e widget Home, sincronizzati su tutti i dispositivi tramite iCloud.",
      "ai.quote1": "\"Crea 10 flashcard sui verbi irregolari inglesi.\"",
      "ai.quote2": "\"I teoremi matematici più importanti sulla trigonometria.\"",
      "ai.quote3": "\"I primi 10 presidenti degli Stati Uniti\"",
      "ai.jumpAria": "Vai alla generazione di deck IA",
      "lang.switchLabel": "Cambia lingua"
    },
    "pt-br":     {
      "nav.features": "Recursos",
      "nav.aiDecks": "Decks de IA",
      "nav.algorithm": "Algoritmo",
      "nav.guide": "Guia",
      "nav.about": "Sobre",
      "nav.appStore": "App Store",
      "rail.open": "Início",
      "rail.everywhere": "Em todo lugar",
      "rail.aiDecks": "Decks de IA",
      "rail.study": "Estudo",
      "rail.algorithm": "Algoritmo",
      "rail.markdown": "Markdown",
      "rail.listen": "Ouvir",
      "rail.dayNight": "Dia / Noite",
      "hero.eyebrow": "Um app de flashcards para estudar com eficiência",
      "hero.title": "Estude em silêncio.<br/><em>Lembre-se de tudo.</em>",
      "hero.lede": "JustFlip! é um app de flashcards com repetição espaçada para iPhone, iPad e Mac. Organize seus decks no desktop, revise em qualquer lugar e confie em um motor inspirado em SM-2 que mostra a carta certa no momento certo.",
      "hero.downloadCta": "Baixar na App Store",
      "hero.exploreCta": "Explorar recursos",
      "hero.metaPlatforms": "<strong>iOS · iPadOS · macOS</strong>",
      "hero.metaSync": "<strong>Sincronização com iCloud</strong> integrada",
      "hero.metaOffline": "<strong>Offline primeiro</strong>",
      "hero.floatPillText": "<em>Novo —</em> crie decks com seu agente de IA favorito",
      "hero.scroll": "Rolar",
      "devices.title": "Uma biblioteca.<br/><em>Três companheiros.</em>",
      "devices.kicker": "Crie e organize no Mac. Revise no iPhone com um café da manhã. Acrescente notas no iPad nas margens. O iCloud mantém cada carta, intervalo e sequência perfeitamente sincronizados.",
      "devices.stageLabel": "Imagem · iPhone, iPad e Mac com decks sincronizados",
      "devices.macos": "macOS",
      "devices.macosTitle": "O curador",
      "devices.macosDesc": "Importe arquivos <code>.flashcard</code> arrastando e soltando, gerencie temas e edite cartas em um editor dedicado.",
      "devices.ipados": "iPadOS",
      "devices.ipadosTitle": "O estúdio",
      "devices.ipadosDesc": "Uma tela ampla para sessões longas com tipografia amigável ao Apple Pencil e visualização dividida.",
      "devices.ios": "iOS",
      "devices.iosTitle": "O tutor de bolso",
      "devices.iosDesc": "Revisões diárias, um widget silencioso na tela inicial e progresso carta por carta.",
      "ai.title": "Deixe a IA <em>escrever o deck.</em>",
      "ai.kicker": "Duas formas de criar decks: cartas completas com imagens e áudio via ferramentas agênticas, ou conjuntos simples de texto diretamente no ChatGPT.",
      "ai.terminalAria": "Demonstração no terminal de geração de um deck de flashcards com um agente de IA",
      "ai.panelTitle": "Escolha sua abordagem",
      "ai.richTitle": "Cartas completas",
      "ai.richDesc": "Gere decks com imagens, sons, dicas de áudio e formatação Markdown. Requer uma ferramenta de codificação agêntica como Claude Code, Codex ou OpenCode.",
      "ai.textTitle": "Cartas simples de texto",
      "ai.textDesc": "Flashcards rápidos apenas de texto, sem imagens nem áudio. Crie-os diretamente no ChatGPT.",
      "ai.chatgptLabel": "JustFlip GPT → Abrir",
      "study.title": "Uma biblioteca que você pode <em>deslizar.</em>",
      "study.kicker": "Navegue pelos decks como uma lista editorial calma ou entre em um modo de revisão focado e avalie cada carta com um gesto estilo Tinder: direita para <em>bom</em>, esquerda para <em>de novo</em>, cima para <em>fácil</em>.",
      "study.cardListLabel": "Imagem · Lista de cartas",
      "study.swipeLabel": "Imagem · Tela de revisão por swipe",
      "study.chipAgain": "De novo",
      "study.chipHard": "Difícil",
      "study.chipGood": "Bom",
      "study.chipEasy": "Fácil",
      "algorithm.title": "Um algoritmo paciente.<br/><em>Cinco estados. Memória infinita.</em>",
      "algorithm.kicker": "JustFlip! usa um motor SM-2 refinado com cinco estados de aprendizado. As cartas passam por <em>unseen</em>, <em>learning</em>, <em>reviewing</em>, <em>relearning</em> e <em>graduated</em>, cada um com seu intervalo e facilidade.",
      "algorithm.statsLabel": "Animado · Painel de progresso e urgência",
      "algorithm.progressLabel": "Progresso",
      "algorithm.urgencyLabel": "Urgência",
      "algorithm.unseen": "Não visto",
      "algorithm.unseenDesc": "Nunca estudado — pronto para o primeiro contato.",
      "algorithm.learning": "Aprendendo",
      "algorithm.learningDesc": "Minutos a um dia. Memória fresca tomando forma.",
      "algorithm.reviewing": "Revisando",
      "algorithm.reviewingDesc": "Dias a semanas. O intervalo cresce com a facilidade.",
      "algorithm.relearning": "Reaprendendo",
      "algorithm.relearningDesc": "Esqueceu? Volta para intervalos curtos, com leveza.",
      "algorithm.graduated": "Graduado",
      "algorithm.graduatedDesc": "Semanas a meses. Retenção de longo prazo.",
      "algorithm.formulaNote": "A facilidade cresce no <em>fácil</em>, se estabiliza no <em>bom</em> e cai no <em>difícil</em> ou <em>de novo</em> — nunca abaixo de 1.3.",
      "markdown.title": "Cartas que <em>parecem ensaios.</em>",
      "markdown.kicker": "Defina suas cartas em Markdown rico: títulos, listas, blocos de código, matemática inline, imagens e links. O JustFlip! as mostra com tipografia editorial.",
      "markdown.label": "Imagem · Carta em Markdown",
      "audio.title": "Decks que <em>falam.</em>",
      "audio.kicker": "Deixe suas cartas lerem em voz alta enquanto você caminha, cozinha ou dirige. O widget do JustFlip! na tela inicial deixa a próxima revisão a um toque de distância.",
      "audio.phoneLabel": "Imagem · Reprodutor de cartas faladas",
      "audio.widgetDeck": "Poetas românticos · EN",
      "audio.widgetCard": "Inglês ↔ Alemão",
      "audio.widgetDue": "14 para revisar hoje",
      "audio.widgetTap": "Toque para estudar",
      "theme.title": "Escuro à luz de velas.<br/><em>Claro pela manhã.</em>",
      "theme.kicker": "O JustFlip! respeita o sistema. Alterne de um escuro profundo e acadêmico para uma luz suave de pergaminho.",
      "theme.darkLabel": "Imagem · Modo escuro",
      "theme.lightLabel": "Imagem · Modo claro",
      "cta.eyebrow": "Em breve nas plataformas Apple",
      "cta.title": "Leve o JustFlip! para sua estante.",
      "cta.lede": "Uma compra. Três plataformas. Uma vida inteira de revisões bem espaçadas.",
      "cta.download": "Baixar na App Store",
      "cta.readGuide": "Ler o guia",
      "cta.langs": "Disponível em <strong>English</strong>, <strong>Deutsch</strong>, <strong>Español</strong>, <strong>Français</strong>, <strong>Italiano</strong>, <strong>Português (Brasil)</strong>, <strong>日本語</strong>, <strong>한국어</strong> e <strong>Čeština</strong>.",
      "footer.tagline": "Um companheiro de flashcards para aprendizes ao longo da vida.",
      "footer.features": "Recursos",
      "footer.aiDecks": "Decks de IA",
      "footer.algorithm": "Algoritmo",
      "footer.guide": "Guia",
      "footer.about": "Sobre",
      "footer.privacy": "Privacidade",
      "footer.terms": "Termos e condições",
      "footer.support": "Suporte",
      "footer.contact": "Contato",
      "footer.copyright": "© {year} JustFlip! Criado em Praga. Apple, o logotipo da Apple, iPhone, iPad e Mac são marcas registradas da Apple Inc.",
      "meta.title": "JustFlip! — Estude com repetição espaçada. Silenciosamente brilhante.",
      "meta.description": "JustFlip! é um app de flashcards para iPhone, iPad e Mac. Repetição espaçada, revisão estilo Tinder, cartas Markdown ricas, decks falados e widget da tela inicial — sincronizados entre todos os dispositivos via iCloud.",
      "ai.quote1": "\"Crie 10 flashcards sobre verbos irregulares em inglês.\"",
      "ai.quote2": "\"Os teoremas matemáticos mais importantes sobre trigonometria.\"",
      "ai.quote3": "\"Os primeiros 10 presidentes dos EUA\"",
      "ai.jumpAria": "Ir para a geração de decks com IA",
      "lang.switchLabel": "Trocar idioma"
    },
    ja:     {
      "nav.features": "機能",
      "nav.aiDecks": "AI デッキ",
      "nav.algorithm": "アルゴリズム",
      "nav.guide": "ガイド",
      "nav.about": "概要",
      "nav.appStore": "App Store",
      "rail.open": "はじめに",
      "rail.everywhere": "どこでも",
      "rail.aiDecks": "AI デッキ",
      "rail.study": "学習",
      "rail.algorithm": "アルゴリズム",
      "rail.markdown": "Markdown",
      "rail.listen": "再生",
      "rail.dayNight": "昼 / 夜",
      "hero.eyebrow": "効率よく学ぶためのフラッシュカードアプリ",
      "hero.title": "静かに学ぶ。<br/><em>すべてを覚える。</em>",
      "hero.lede": "JustFlip! は iPhone、iPad、Mac 向けの間隔反復フラッシュカードアプリです。デスクトップでデッキを管理し、外出先で復習し、SM-2 に着想を得たエンジンが最適なタイミングで最適なカードを表示します。",
      "hero.downloadCta": "App Store でダウンロード",
      "hero.exploreCta": "機能を見る",
      "hero.metaPlatforms": "<strong>iOS · iPadOS · macOS</strong>",
      "hero.metaSync": "<strong>iCloud 同期</strong>を内蔵",
      "hero.metaOffline": "<strong>オフライン優先</strong>",
      "hero.floatPillText": "<em>新機能 —</em> お気に入りの AI エージェントでデッキを生成",
      "hero.scroll": "スクロール",
      "devices.title": "ひとつのライブラリ。<br/><em>三つの相棒。</em>",
      "devices.kicker": "Mac で作成・管理。朝のコーヒーとともに iPhone で復習。iPad で余白にメモ。iCloud がすべてのカード、間隔、連続記録を完全に同期します。",
      "devices.stageLabel": "画像 · 同期済みデッキを備えた iPhone、iPad、Mac",
      "devices.macos": "macOS",
      "devices.macosTitle": "編集者",
      "devices.macosDesc": "<code>.flashcard</code> アーカイブをドラッグ＆ドロップで取り込み、テーマを管理し、専用エディタでカードを編集します。",
      "devices.ipados": "iPadOS",
      "devices.ipadosTitle": "スタジオ",
      "devices.ipadosDesc": "Apple Pencil にやさしいタイポグラフィと分割表示を備えた、長時間の学習に向いた広いキャンバス。",
      "devices.ios": "iOS",
      "devices.iosTitle": "ポケットの先生",
      "devices.iosDesc": "毎日の復習、ホーム画面の静かなウィジェット、カードごとの進捗管理。",
      "ai.title": "AI に <em>デッキを書かせる。</em>",
      "ai.kicker": "デッキの作り方は 2 通り。エージェント型ツールで画像や音声を含む本格的なカードを作るか、ChatGPT でシンプルなテキストカードを直接作成します。",
      "ai.terminalAria": "AI エージェントでフラッシュカードのデッキを生成するターミナルのデモ",
      "ai.panelTitle": "方法を選ぶ",
      "ai.richTitle": "本格カード",
      "ai.richDesc": "画像、音、音声ヒント、Markdown 書式を含むデッキを生成します。Claude Code、Codex、OpenCode のようなエージェント型コーディングツールが必要です。",
      "ai.textTitle": "シンプルなテキストカード",
      "ai.textDesc": "画像や音声なしの素早いテキストカード。ChatGPT で直接作成できます。",
      "ai.chatgptLabel": "JustFlip GPT → 開く",
      "study.title": "スワイプで <em>めくれる</em> ライブラリ。",
      "study.kicker": "落ち着いた編集的な一覧でデッキを眺めるか、集中復習モードで各カードを Tinder 風のスワイプで評価します。右は <em>良い</em>、左は <em>もう一度</em>、上は <em>簡単</em>。",
      "study.cardListLabel": "画像 · カード一覧",
      "study.swipeLabel": "画像 · スワイプ復習画面",
      "study.chipAgain": "もう一度",
      "study.chipHard": "難しい",
      "study.chipGood": "良い",
      "study.chipEasy": "簡単",
      "algorithm.title": "忍耐強いアルゴリズム。<br/><em>5 つの状態。無限の記憶。</em>",
      "algorithm.kicker": "JustFlip! は 5 つの学習状態を持つ改良版 SM-2 エンジンを使います。カードは <em>未学習</em>、<em>学習中</em>、<em>復習中</em>、<em>再学習中</em>、<em>卒業</em> を通り、それぞれ固有の間隔と易しさを持ちます。",
      "algorithm.statsLabel": "アニメーション · 進捗と緊急度のダッシュボード",
      "algorithm.progressLabel": "進捗",
      "algorithm.urgencyLabel": "緊急度",
      "algorithm.unseen": "未学習",
      "algorithm.unseenDesc": "まだ学習していないカード。最初の接触に備えます。",
      "algorithm.learning": "学習中",
      "algorithm.learningDesc": "数分から 1 日。新しい記憶が形になります。",
      "algorithm.reviewing": "復習中",
      "algorithm.reviewingDesc": "数日から数週間。間隔は易しさに応じて伸びます。",
      "algorithm.relearning": "再学習中",
      "algorithm.relearningDesc": "忘れた？ 短い間隔に戻して、やさしくやり直します。",
      "algorithm.graduated": "卒業",
      "algorithm.graduatedDesc": "数週間から数か月。長期記憶へ。",
      "algorithm.formulaNote": "易しさは <em>簡単</em> で上がり、<em>良い</em> で落ち着き、<em>難しい</em> または <em>もう一度</em> で下がります。1.3 未満にはなりません。",
      "markdown.title": "<em>エッセイのように読める</em> カード。",
      "markdown.kicker": "見出し、リスト、コードブロック、インライン数式、画像、リンクまで豊富な Markdown でカードを定義できます。JustFlip! は編集的なタイポグラフィで表示します。",
      "markdown.label": "画像 · Markdown カード",
      "audio.title": "<em>話す</em> デッキ。",
      "audio.kicker": "歩きながら、料理しながら、運転しながらカードを音声で読み上げましょう。JustFlip! のホーム画面ウィジェットで次の復習にすぐ触れられます。",
      "audio.phoneLabel": "画像 · 音声カードプレーヤー",
      "audio.widgetDeck": "ロマン派詩人 · EN",
      "audio.widgetCard": "英語 ↔ ドイツ語",
      "audio.widgetDue": "今日 14 枚が対象",
      "audio.widgetTap": "タップして学習",
      "theme.title": "ろうそくの灯りでは暗く。<br/><em>朝には明るく。</em>",
      "theme.kicker": "JustFlip! はシステムに従います。深い学術的な暗さから、やわらかな羊皮紙の明るさへ。",
      "theme.darkLabel": "画像 · ダークモード",
      "theme.lightLabel": "画像 · ライトモード",
      "cta.eyebrow": "Apple プラットフォームで近日公開",
      "cta.title": "JustFlip! を本棚に。",
      "cta.lede": "1 回の購入。3 つのプラットフォーム。生涯にわたる適切な間隔の復習。",
      "cta.download": "App Store でダウンロード",
      "cta.readGuide": "ガイドを読む",
      "cta.langs": "<strong>English</strong>、<strong>Deutsch</strong>、<strong>Español</strong>、<strong>Français</strong>、<strong>Italiano</strong>、<strong>Português (Brasil)</strong>、<strong>日本語</strong>、<strong>한국어</strong>、<strong>Čeština</strong> で利用できます。",
      "footer.tagline": "生涯学習者のためのフラッシュカード相棒。",
      "footer.features": "機能",
      "footer.aiDecks": "AI デッキ",
      "footer.algorithm": "アルゴリズム",
      "footer.guide": "ガイド",
      "footer.about": "概要",
      "footer.privacy": "プライバシー",
      "footer.terms": "利用規約",
      "footer.support": "サポート",
      "footer.contact": "連絡先",
      "footer.copyright": "© {year} JustFlip! プラハで制作。Apple、Apple ロゴ、iPhone、iPad、Mac は Apple Inc. の商標です。",
      "meta.title": "JustFlip! — 間隔反復で学ぶ。静かに、でも賢く。",
      "meta.description": "JustFlip! は iPhone、iPad、Mac 向けのフラッシュカード学習アプリです。間隔反復、Tinder 風の復習、豊かな Markdown カード、音声デッキ、ホーム画面ウィジェットを iCloud で全デバイスに同期します。",
      "ai.quote1": "\"英語の不規則動詞について 10 枚のカードを作って。\"",
      "ai.quote2": "\"三角法に関する最も重要な数学定理。\"",
      "ai.quote3": "\"アメリカ合衆国初代 10 人の大統領\"",
      "ai.jumpAria": "AI デッキ生成へ移動",
      "lang.switchLabel": "言語を切り替える"
    },
    ko:     {
      "nav.features": "기능",
      "nav.aiDecks": "AI 덱",
      "nav.algorithm": "알고리즘",
      "nav.guide": "가이드",
      "nav.about": "소개",
      "nav.appStore": "App Store",
      "rail.open": "시작",
      "rail.everywhere": "어디서나",
      "rail.aiDecks": "AI 덱",
      "rail.study": "학습",
      "rail.algorithm": "알고리즘",
      "rail.markdown": "Markdown",
      "rail.listen": "듣기",
      "rail.dayNight": "낮 / 밤",
      "hero.eyebrow": "효율적인 학습을 위한 플래시카드 앱",
      "hero.title": "조용히 공부하세요.<br/><em>모두 기억하세요.</em>",
      "hero.lede": "JustFlip!는 iPhone, iPad, Mac용 간격 반복 플래시카드 앱입니다. 데스크톱에서 덱을 관리하고, 이동 중에 복습하고, SM-2에서 영감을 받은 엔진이 정확한 순간에 올바른 카드를 보여줍니다.",
      "hero.downloadCta": "App Store에서 다운로드",
      "hero.exploreCta": "기능 살펴보기",
      "hero.metaPlatforms": "<strong>iOS · iPadOS · macOS</strong>",
      "hero.metaSync": "<strong>iCloud 동기화</strong> 내장",
      "hero.metaOffline": "<strong>오프라인 우선</strong>",
      "hero.floatPillText": "<em>새 기능 —</em> 좋아하는 AI 에이전트로 덱 만들기",
      "hero.scroll": "스크롤",
      "devices.title": "하나의 라이브러리.<br/><em>세 개의 동반자.</em>",
      "devices.kicker": "Mac에서 만들고 관리하세요. 아침 커피와 함께 iPhone에서 복습하고, iPad에서는 여백에 메모를 더하세요. iCloud가 모든 카드, 간격, 연속 기록을 완벽하게 동기화합니다.",
      "devices.stageLabel": "이미지 · 동기화된 덱이 있는 iPhone, iPad, Mac",
      "devices.macos": "macOS",
      "devices.macosTitle": "큐레이터",
      "devices.macosDesc": "<code>.flashcard</code> 아카이브를 드래그 앤 드롭으로 가져오고, 주제를 관리하고, 전용 편집기에서 카드를 수정하세요.",
      "devices.ipados": "iPadOS",
      "devices.ipadosTitle": "스튜디오",
      "devices.ipadosDesc": "Apple Pencil 친화적인 타이포그래피와 분할 보기로 긴 학습 세션에 어울리는 넓은 캔버스.",
      "devices.ios": "iOS",
      "devices.iosTitle": "주머니 속 튜터",
      "devices.iosDesc": "매일 복습, 홈 화면의 조용한 위젯, 카드별 진행 상황 추적.",
      "ai.title": "AI가 <em>덱을 쓰게 하세요.</em>",
      "ai.kicker": "덱을 만드는 두 가지 방법: 에이전트형 도구로 이미지와 오디오를 포함한 완성도 높은 카드를 만들거나, ChatGPT에서 바로 간단한 텍스트 세트를 만들 수 있습니다.",
      "ai.terminalAria": "AI 에이전트로 플래시카드 덱을 생성하는 터미널 데모",
      "ai.panelTitle": "방식을 선택하세요",
      "ai.richTitle": "완성형 카드",
      "ai.richDesc": "이미지, 소리, 오디오 힌트, Markdown 서식을 포함한 덱을 생성합니다. Claude Code, Codex, OpenCode 같은 에이전트형 코딩 도구가 필요합니다.",
      "ai.textTitle": "간단한 텍스트 카드",
      "ai.textDesc": "이미지나 오디오 없는 빠른 텍스트 플래시카드. ChatGPT에서 바로 만들 수 있습니다.",
      "ai.chatgptLabel": "JustFlip GPT → 열기",
      "study.title": "손가락으로 <em>넘길 수 있는</em> 라이브러리.",
      "study.kicker": "차분한 편집 목록처럼 덱을 둘러보거나, 집중 복습 모드에서 Tinder 스타일의 스와이프로 각 카드를 평가하세요. 오른쪽은 <em>좋음</em>, 왼쪽은 <em>다시</em>, 위쪽은 <em>쉬움</em>입니다.",
      "study.cardListLabel": "이미지 · 카드 목록",
      "study.swipeLabel": "이미지 · 스와이프 복습 화면",
      "study.chipAgain": "다시",
      "study.chipHard": "어려움",
      "study.chipGood": "좋음",
      "study.chipEasy": "쉬움",
      "algorithm.title": "인내심 있는 알고리즘.<br/><em>다섯 상태. 무한한 기억.</em>",
      "algorithm.kicker": "JustFlip!은 다섯 가지 학습 상태를 가진 정제된 SM-2 엔진을 사용합니다. 카드는 <em>미학습</em>, <em>학습</em>, <em>복습</em>, <em>재학습</em>, <em>졸업</em>을 거치며, 각 상태마다 고유한 간격과 난이도가 있습니다.",
      "algorithm.statsLabel": "애니메이션 · 진행 및 긴급도 대시보드",
      "algorithm.progressLabel": "진행",
      "algorithm.urgencyLabel": "긴급도",
      "algorithm.unseen": "미학습",
      "algorithm.unseenDesc": "아직 공부하지 않은 카드 - 첫 만남을 준비합니다.",
      "algorithm.learning": "학습 중",
      "algorithm.learningDesc": "몇 분에서 하루까지. 새로운 기억이 형태를 잡습니다.",
      "algorithm.reviewing": "복습 중",
      "algorithm.reviewingDesc": "며칠에서 몇 주까지. 간격은 쉬움에 따라 늘어납니다.",
      "algorithm.relearning": "재학습 중",
      "algorithm.relearningDesc": "잊었나요? 짧은 간격으로 부드럽게 다시 시작합니다.",
      "algorithm.graduated": "졸업",
      "algorithm.graduatedDesc": "몇 주에서 몇 달까지. 장기 기억으로 이어집니다.",
      "algorithm.formulaNote": "쉬움은 <em>쉬움</em>에서 올라가고, <em>좋음</em>에서 안정되며, <em>어려움</em> 또는 <em>다시</em>에서 내려갑니다. 1.3 아래로는 내려가지 않습니다.",
      "markdown.title": "<em>에세이처럼 읽히는</em> 카드.",
      "markdown.kicker": "제목, 목록, 코드 블록, 인라인 수학, 이미지, 링크까지 풍부한 Markdown으로 카드를 정의하세요. JustFlip!은 편집적인 타이포그래피로 보여줍니다.",
      "markdown.label": "이미지 · Markdown 카드",
      "audio.title": "<em>말하는</em> 덱.",
      "audio.kicker": "걷거나 요리하거나 운전하는 동안 카드를 소리 내어 읽어 보세요. JustFlip! 홈 화면 위젯이 다음 복습을 한 번의 탭으로 가져옵니다.",
      "audio.phoneLabel": "이미지 · 음성 카드 플레이어",
      "audio.widgetDeck": "낭만주의 시인 · EN",
      "audio.widgetCard": "영어 ↔ 독일어",
      "audio.widgetDue": "오늘 14개 복습",
      "audio.widgetTap": "탭하여 학습",
      "theme.title": "촛불 아래서는 어둡게.<br/><em>아침에는 밝게.</em>",
      "theme.kicker": "JustFlip!은 시스템을 존중합니다. 깊고 학구적인 어둠에서 부드러운 양피지 같은 밝음으로 전환하세요.",
      "theme.darkLabel": "이미지 · 다크 모드",
      "theme.lightLabel": "이미지 · 라이트 모드",
      "cta.eyebrow": "곧 Apple 플랫폼에서 제공",
      "cta.title": "JustFlip!을 서가에 들여놓으세요.",
      "cta.lede": "한 번의 구매. 세 개의 플랫폼. 평생 이어지는 잘 조율된 복습.",
      "cta.download": "App Store에서 다운로드",
      "cta.readGuide": "가이드 읽기",
      "cta.langs": "<strong>English</strong>, <strong>Deutsch</strong>, <strong>Español</strong>, <strong>Français</strong>, <strong>Italiano</strong>, <strong>Português (Brasil)</strong>, <strong>日本語</strong>, <strong>한국어</strong> 및 <strong>Čeština</strong>로 제공됩니다.",
      "footer.tagline": "평생 학습자를 위한 플래시카드 동반자.",
      "footer.features": "기능",
      "footer.aiDecks": "AI 덱",
      "footer.algorithm": "알고리즘",
      "footer.guide": "가이드",
      "footer.about": "소개",
      "footer.privacy": "개인정보 보호",
      "footer.terms": "이용 약관",
      "footer.support": "지원",
      "footer.contact": "문의",
      "footer.copyright": "© {year} JustFlip! 프라하에서 제작. Apple, Apple 로고, iPhone, iPad 및 Mac은 Apple Inc.의 상표입니다.",
      "meta.title": "JustFlip! — 간격 반복으로 공부하세요. 조용하지만 강력하게.",
      "meta.description": "JustFlip!는 iPhone, iPad, Mac용 플래시카드 학습 앱입니다. 간격 반복, Tinder 스타일 복습, 풍부한 Markdown 카드, 음성 덱, 홈 화면 위젯을 iCloud로 모든 기기와 동기화합니다.",
      "ai.quote1": "\"영어 불규칙 동사에 대한 플래시카드 10장을 만들어 줘.\"",
      "ai.quote2": "\"삼각법에 관한 가장 중요한 수학 정리들.\"",
      "ai.quote3": "\"미국 초대 대통령 10명\"",
      "ai.jumpAria": "AI 덱 생성으로 이동",
      "lang.switchLabel": "언어 변경"
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

    const navLocale = (navigator.language || '').toLowerCase();
    if (SUPPORTED.includes(navLocale)) return navLocale;

    const navLang = navLocale.split('-')[0];
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
    switch (code) {
      case 'cs':   return '🇨🇿';
      case 'de':   return '🇩🇪';
      case 'es':   return '🇪🇸';
      case 'fr':   return '🇫🇷';
      case 'it':   return '🇮🇹';
      case 'pt-br': return '🇧🇷';
      case 'ja':   return '🇯🇵';
      case 'ko':   return '🇰🇷';
      default:     return '🇬🇧';
    }
  }

  function getLangLabel(code) {
    switch (code) {
      case 'de': return 'Deutsch';
      case 'es': return 'Español';
      case 'fr': return 'Français';
      case 'it': return 'Italiano';
      case 'pt-br': return 'Português (Brasil)';
      case 'ja': return '日本語';
      case 'ko': return '한국어';
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
