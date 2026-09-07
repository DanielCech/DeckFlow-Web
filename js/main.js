/* JustFlip — landing page interactions
   ----------------------------------------------------- */

(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------
   * Nav: tonal shift once we've scrolled past the hero edge
   * ------------------------------------------------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------------------------------------------------
   * Reveal: tag every direct content child of [data-section]
   * with a staggered fade-up.
   * ------------------------------------------------- */
  const sections = document.querySelectorAll('[data-section]');
  sections.forEach((section) => {
    const candidates = section.querySelectorAll(
      '.eyebrow, .display, .headline, .lede, .kicker, .hero__actions, .hero__meta, ' +
      '.placeholder, .algo__visual, .tile, .algo__flow li, .algo__formula, .markdown__sample, ' +
      '.science__chart, .science__quote, ' +
      '.article-prose, .learning-callout, ' +
      '.widget, .split, .duo__chips, .cta, ' +
      '.float-pill, .ai__terminal, .ai__panel, .ai__note, .ai__flow li, ' +
      '.prompt-hero__panel, .prompt-editor, .prompt-steps, .prompt-platforms, ' +
      '.adv-card, .report-card, .tracker-card, .stat-mini, .heatmap, ' +
      '.spoken-demo, .code-compare, .import-flow, .safety-panel, ' +
      '.watch__stage, .trailer__copy, .trailer__frame, ' +
      '.trust__title, .trust__item, .hero__usp'
      + ', .decks-hero__copy, .decks-hero__stack, .decks-ai-bridge, .decks-library__head, .decks-filter, .deck-tile, .decks-final-cta'
    );
    candidates.forEach((el, i) => {
      el.setAttribute('data-reveal', '');
      el.style.setProperty('--reveal-delay', `${Math.min(i * 70, 420)}ms`);
    });
  });

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------------------------------------------------
   * Deep-link entry (e.g. the iOS app linking straight to
   * #ai): reveal the targeted section's content right away
   * so a direct hit never lands on a blank, mid-animation
   * panel, then make sure it is scrolled into view. Only
   * runs when the page is opened on a hash — normal in-page
   * scrolling keeps its fade-up.
   * ------------------------------------------------- */
  if (location.hash && location.hash.length > 1) {
    let target = null;
    try { target = document.querySelector(location.hash); } catch (_) { target = null; }
    if (target) {
      target.classList.add('is-visible');
      target.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
      requestAnimationFrame(() => target.scrollIntoView());
    }
  }

  /* ---------------------------------------------------
   * Algorithm illustration: count-up ring + urgency cycle.
   * Mirrors the onboarding progress/urgency panel.
   * ------------------------------------------------- */
  const algorithmDashboard = document.querySelector('[data-algo-dashboard]');
  if (algorithmDashboard) {
    const progressValue = algorithmDashboard.querySelector('[data-algo-progress-value]');
    const ringProgress = algorithmDashboard.querySelector('.algo__ring-progress');
    const urgencyDots = Array.from(algorithmDashboard.querySelectorAll('.algo__urgency-dot'));
    const progressTarget = Number(algorithmDashboard.dataset.progressTarget || 78);
    const progressDuration = Number(algorithmDashboard.dataset.progressDuration || 1400);
    const urgencyCycle = Number(algorithmDashboard.dataset.urgencyCycle || 2400);
    const urgencyPalette = ['#8c8a7a', '#e0914f', '#f0c04b', '#d9745e', '#c45c4b'];
    const ringLength = ringProgress?.getTotalLength?.() || 0;
    let activeUrgency = 0;
    let hasStarted = false;

    const hexToRgba = (hex, alpha) => {
      const normalized = hex.replace('#', '');
      const value = normalized.length === 3
        ? normalized.split('').map((char) => char + char).join('')
        : normalized;
      const int = Number.parseInt(value, 16);
      const r = (int >> 16) & 255;
      const g = (int >> 8) & 255;
      const b = int & 255;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const setUrgency = (index) => {
      activeUrgency = ((index % urgencyPalette.length) + urgencyPalette.length) % urgencyPalette.length;
      const color = urgencyPalette[activeUrgency];

      algorithmDashboard.style.setProperty('--algo-urgency-color', color);
      algorithmDashboard.style.setProperty('--algo-urgency-glow', hexToRgba(color, 0.38));

      urgencyDots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === activeUrgency);
      });
    };

    const setProgress = (value) => {
      const clamped = Math.max(0, Math.min(progressTarget, value));
      if (progressValue) progressValue.textContent = `${Math.round(clamped)}%`;
      if (ringProgress && ringLength > 0) {
        ringProgress.style.strokeDasharray = `${ringLength}`;
        ringProgress.style.strokeDashoffset = `${ringLength * (1 - clamped / 100)}`;
      }
    };

    const animateProgress = () => {
      if (prefersReducedMotion) return;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min(1, (now - start) / progressDuration);
        const eased = 1 - Math.pow(1 - progress, 3);
        setProgress(progressTarget * eased);
        if (progress < 1) {
          window.requestAnimationFrame(tick);
        } else {
          setProgress(progressTarget);
        }
      };
      window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (hasStarted) return;
      hasStarted = true;

      if (prefersReducedMotion) {
        setProgress(progressTarget);
        setUrgency(2);
        return;
      }

      setProgress(0);
      setUrgency(0);
      animateProgress();

      window.setInterval(() => {
        setUrgency(activeUrgency + 1);
      }, urgencyCycle);
    };

    if ('IntersectionObserver' in window) {
      const dashboardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          start();
          dashboardObserver.unobserve(entry.target);
        });
      }, { threshold: 0.35, rootMargin: '0px 0px -8% 0px' });

      dashboardObserver.observe(algorithmDashboard);
    } else {
      start();
    }
  }

  /* ---------------------------------------------------
   * Rail: highlight the section currently in view.
   * ------------------------------------------------- */
  const railItems = Array.from(document.querySelectorAll('.rail li'));
  const railMap = new Map(railItems.map((li) => [li.dataset.target, li]));

  if ('IntersectionObserver' in window) {
    const navIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        const li = railMap.get(id);
        if (!li) return;
        if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
          railItems.forEach((x) => x.classList.remove('is-active'));
          li.classList.add('is-active');
        }
      });
    }, { threshold: [0.35, 0.6] });

    sections.forEach((section) => {
      if (section.id && railMap.has(section.id)) navIO.observe(section);
    });
  }

  /* ---------------------------------------------------
   * Light parallax for elements tagged with data-parallax.
   * Values are pixels per scrolled pixel — small numbers.
   * ------------------------------------------------- */
  if (!prefersReducedMotion) {
    const parallaxItems = Array.from(document.querySelectorAll('[data-parallax]'))
      .map((el) => ({ el, rate: parseFloat(el.dataset.parallax) || 0 }));

    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      parallaxItems.forEach(({ el, rate }) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) return;
        const center = rect.top + rect.height / 2;
        const offset = (center - vh / 2) * rate;
        el.style.transform =
          (el.classList.contains('placeholder--tilt') ? 'rotate(4deg) ' : '') +
          `translate3d(0, ${(-offset).toFixed(1)}px, 0)`;
      });
      ticking = false;
    };
    const onScrollParallax = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    update();
    window.addEventListener('scroll', onScrollParallax, { passive: true });
    window.addEventListener('resize', update);
  }

  /* ---------------------------------------------------
   * Hero pointer glow: nudge the beam toward the cursor
   * for a subtle "follow the light" effect on desktop.
   * ------------------------------------------------- */
  const beam = document.querySelector('.hero__beam');
  if (beam && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
    let raf;
    document.querySelector('.hero')?.addEventListener('pointermove', (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 6;
        const y = (e.clientY / window.innerHeight - 0.5) * 6;
        beam.style.transform = `translate3d(${x}%, ${y}%, 0)`;
      });
    });
  }

  /* ---------------------------------------------------
   * Smooth scroll for in-page anchors (respects reduced motion).
   * ------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 60;
      // A target that sits at the very start of the document (#top) should land
      // on a true top rather than a few pixels down, behind the sticky header.
      const navH = nav ? nav.getBoundingClientRect().height : 0;
      const top = offset <= navH ? 0 : offset;
      window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  });

  /* ---------------------------------------------------
   * Apple Watch video: pause off-screen to save battery
   * and data, and respect reduced motion with the poster.
   * ------------------------------------------------- */
  const watchVideo = document.querySelector('.watch__video');
  if (watchVideo) {
    // Belt-and-suspenders repeat: some browsers don't reliably honor the
    // native `loop` attribute after a programmatic src swap (locale switch).
    watchVideo.addEventListener('ended', () => {
      watchVideo.currentTime = 0;
      watchVideo.play().catch(() => {});
    });

    if (prefersReducedMotion) {
      watchVideo.removeAttribute('autoplay');
      watchVideo.pause();
    } else if ('IntersectionObserver' in window) {
      const watchIO = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) watchVideo.play().catch(() => {});
          else watchVideo.pause();
        });
      }, { threshold: 0.2 });
      watchIO.observe(watchVideo);
    }
  }

  /* ---------------------------------------------------
   * Prompt page: bundle the user's request with the
   * read-only build instructions and copy the whole
   * thing to the clipboard.
   * ------------------------------------------------- */
  const instructionsField = document.querySelector('[data-prompt-instructions]');
  const requestField = document.querySelector('[data-user-request]');
  if (instructionsField) {
    const status = document.querySelector('[data-copy-status]');
    let statusTimer;

    // Show a random example each visit so the empty editor never feels
    // stale. Localized per language; mix of simple topics, exam-style
    // requests, language drills and "turn this page / notes into a deck".
    const EXAMPLES = {
      en: { eg: "e.g. ", items: [
        "Create a deck of all US presidents and their dates in office.",
        "20 essential French verbs with their English meanings.",
        "The most important trigonometry identities and formulas.",
        "First 20 elements of the periodic table — symbol, atomic number and one fact each.",
        "Key machine learning concepts: overfitting, regularization, gradient descent, bias vs. variance. One card each.",
        "Turn this article into a study deck:\nhttps://en.wikipedia.org/wiki/Roman_Empire\nFocus on the emperors and the key dates.",
        "Czech phrases for ordering food in a restaurant, with English translations.",
        "Make a deck from the notes below — cover the cell cycle, the phases of mitosis and the main checkpoints.\n\n[paste your notes here]",
        "Major and minor scales with their key signatures.",
        "The 27 amendments to the US Constitution, one card per amendment.",
        "Spaced-repetition flashcards for the SI base units and what each one measures.",
        "Summarize this lecture transcript into 15 flashcards on the core ideas:\n\n[paste the transcript here]",
        "Key events of World War II in chronological order, with years.",
        "Common Spanish irregular verbs in the present tense (yo / tú / él forms).",
        "Define the most important data structures: array, linked list, stack, queue, hash map, binary tree. One card each."
      ] },
      cs: { eg: "např. ", items: [
        "Vytvoř balíček všech amerických prezidentů a období jejich vlády.",
        "20 základních francouzských sloves s českým významem.",
        "Nejdůležitější trigonometrické identity a vzorce.",
        "Prvních 20 prvků periodické tabulky — značka, protonové číslo a jeden fakt ke každému.",
        "Klíčové pojmy strojového učení: přeučení, regularizace, gradientní sestup, bias vs. rozptyl. Ke každému jedna karta.",
        "Udělej z tohoto článku studijní balíček:\nhttps://cs.wikipedia.org/wiki/Římská_říše\nZaměř se na císaře a klíčová data.",
        "Anglické fráze pro objednávání jídla v restauraci, s českým překladem.",
        "Vytvoř balíček z poznámek níže — pokryj buněčný cyklus, fáze mitózy a hlavní kontrolní body.\n\n[sem vlož své poznámky]",
        "Durové a mollové stupnice s jejich předznamenáními.",
        "27 dodatků Ústavy USA, jedna karta na dodatek.",
        "Karty pro základní jednotky SI a co každá měří.",
        "Shrň tento přepis přednášky do 15 karet s hlavními myšlenkami:\n\n[sem vlož přepis]",
        "Klíčové události druhé světové války chronologicky, s letopočty.",
        "Běžná nepravidelná španělská slovesa v přítomném čase (tvary yo / tú / él).",
        "Definuj nejdůležitější datové struktury: pole, spojový seznam, zásobník, fronta, hashovací tabulka, binární strom. Ke každé jednu kartu."
      ] },
      de: { eg: "z. B. ", items: [
        "Erstelle ein Deck mit allen US-Präsidenten und ihren Amtszeiten.",
        "20 wichtige französische Verben mit ihrer deutschen Bedeutung.",
        "Die wichtigsten trigonometrischen Identitäten und Formeln.",
        "Die ersten 20 Elemente des Periodensystems — Symbol, Ordnungszahl und je eine Tatsache.",
        "Zentrale Machine-Learning-Konzepte: Overfitting, Regularisierung, Gradientenabstieg, Bias vs. Varianz. Je eine Karte.",
        "Mach aus diesem Artikel ein Lern-Deck:\nhttps://de.wikipedia.org/wiki/Römisches_Reich\nKonzentriere dich auf die Kaiser und die wichtigsten Daten.",
        "Tschechische Sätze, um im Restaurant Essen zu bestellen, mit deutscher Übersetzung.",
        "Erstelle ein Deck aus den folgenden Notizen — behandle den Zellzyklus, die Phasen der Mitose und die wichtigsten Kontrollpunkte.\n\n[Notizen hier einfügen]",
        "Dur- und Moll-Tonleitern mit ihren Vorzeichen.",
        "Die 27 Zusatzartikel der US-Verfassung, eine Karte pro Artikel.",
        "Karten für die SI-Basiseinheiten und was jede misst.",
        "Fasse dieses Vorlesungstranskript in 15 Karten zu den Kernideen zusammen:\n\n[Transkript hier einfügen]",
        "Wichtige Ereignisse des Zweiten Weltkriegs in chronologischer Reihenfolge, mit Jahreszahlen.",
        "Häufige unregelmäßige spanische Verben im Präsens (Formen yo / tú / él).",
        "Definiere die wichtigsten Datenstrukturen: Array, verkettete Liste, Stack, Queue, Hashmap, Binärbaum. Je eine Karte."
      ] },
      es: { eg: "p. ej. ", items: [
        "Crea un deck con todos los presidentes de EE. UU. y sus periodos en el cargo.",
        "20 verbos franceses esenciales con su significado en español.",
        "Las identidades y fórmulas de trigonometría más importantes.",
        "Los primeros 20 elementos de la tabla periódica: símbolo, número atómico y un dato de cada uno.",
        "Conceptos clave de machine learning: sobreajuste, regularización, descenso de gradiente, sesgo vs. varianza. Una tarjeta por concepto.",
        "Convierte este artículo en un deck de estudio:\nhttps://es.wikipedia.org/wiki/Imperio_romano\nCéntrate en los emperadores y las fechas clave.",
        "Frases en checo para pedir comida en un restaurante, con traducción al español.",
        "Crea un deck con las notas de abajo: cubre el ciclo celular, las fases de la mitosis y los puntos de control principales.\n\n[pega tus notas aquí]",
        "Escalas mayores y menores con sus armaduras de clave.",
        "Las 27 enmiendas de la Constitución de EE. UU., una tarjeta por enmienda.",
        "Tarjetas para las unidades básicas del SI y qué mide cada una.",
        "Resume esta transcripción de clase en 15 tarjetas con las ideas principales:\n\n[pega la transcripción aquí]",
        "Eventos clave de la Segunda Guerra Mundial en orden cronológico, con años.",
        "Verbos irregulares comunes en español en presente (formas yo / tú / él).",
        "Define las estructuras de datos más importantes: array, lista enlazada, pila, cola, tabla hash, árbol binario. Una tarjeta por cada una."
      ] },
      fr: { eg: "p. ex. ", items: [
        "Crée un deck de tous les présidents des États-Unis et leurs mandats.",
        "20 verbes français essentiels avec leur traduction anglaise.",
        "Les identités et formules de trigonométrie les plus importantes.",
        "Les 20 premiers éléments du tableau périodique — symbole, numéro atomique et un fait pour chacun.",
        "Concepts clés du machine learning : surapprentissage, régularisation, descente de gradient, biais vs variance. Une carte chacun.",
        "Transforme cet article en deck de révision :\nhttps://fr.wikipedia.org/wiki/Empire_romain\nConcentre-toi sur les empereurs et les dates clés.",
        "Phrases en tchèque pour commander à manger au restaurant, avec leur traduction française.",
        "Crée un deck à partir des notes ci-dessous — couvre le cycle cellulaire, les phases de la mitose et les principaux points de contrôle.\n\n[colle tes notes ici]",
        "Gammes majeures et mineures avec leurs armures.",
        "Les 27 amendements de la Constitution des États-Unis, une carte par amendement.",
        "Des cartes pour les unités de base du SI et ce que chacune mesure.",
        "Résume cette transcription de cours en 15 cartes sur les idées principales :\n\n[colle la transcription ici]",
        "Événements clés de la Seconde Guerre mondiale dans l'ordre chronologique, avec les années.",
        "Verbes irréguliers espagnols courants au présent (formes yo / tú / él).",
        "Définis les structures de données les plus importantes : tableau, liste chaînée, pile, file, table de hachage, arbre binaire. Une carte chacune."
      ] },
      it: { eg: "es. ", items: [
        "Crea un deck con tutti i presidenti degli Stati Uniti e i loro mandati.",
        "20 verbi francesi essenziali con il loro significato in italiano.",
        "Le identità e le formule di trigonometria più importanti.",
        "I primi 20 elementi della tavola periodica — simbolo, numero atomico e un fatto per ciascuno.",
        "Concetti chiave del machine learning: overfitting, regolarizzazione, discesa del gradiente, bias vs varianza. Una carta ciascuno.",
        "Trasforma questo articolo in un deck di studio:\nhttps://it.wikipedia.org/wiki/Impero_romano\nConcentrati sugli imperatori e sulle date chiave.",
        "Frasi in ceco per ordinare da mangiare al ristorante, con traduzione in italiano.",
        "Crea un deck dagli appunti qui sotto — copri il ciclo cellulare, le fasi della mitosi e i principali checkpoint.\n\n[incolla qui i tuoi appunti]",
        "Scale maggiori e minori con le loro armature di chiave.",
        "I 27 emendamenti della Costituzione degli Stati Uniti, una carta per emendamento.",
        "Carte per le unità di base del SI e cosa misura ciascuna.",
        "Riassumi questa trascrizione di lezione in 15 carte sulle idee principali:\n\n[incolla qui la trascrizione]",
        "Eventi chiave della Seconda guerra mondiale in ordine cronologico, con gli anni.",
        "Verbi irregolari spagnoli comuni al presente (forme yo / tú / él).",
        "Definisci le strutture dati più importanti: array, lista concatenata, stack, coda, hash map, albero binario. Una carta ciascuna."
      ] },
      "pt-br": { eg: "ex.: ", items: [
        "Crie um deck com todos os presidentes dos EUA e seus mandatos.",
        "20 verbos franceses essenciais com o significado em português.",
        "As identidades e fórmulas de trigonometria mais importantes.",
        "Os primeiros 20 elementos da tabela periódica — símbolo, número atômico e um fato de cada.",
        "Conceitos-chave de machine learning: overfitting, regularização, gradiente descendente, viés vs. variância. Uma carta para cada.",
        "Transforme este artigo em um deck de estudo:\nhttps://pt.wikipedia.org/wiki/Império_Romano\nFoque nos imperadores e nas datas principais.",
        "Frases em tcheco para pedir comida em um restaurante, com tradução para o português.",
        "Crie um deck com as anotações abaixo — cubra o ciclo celular, as fases da mitose e os principais pontos de verificação.\n\n[cole suas anotações aqui]",
        "Escalas maiores e menores com suas armaduras de clave.",
        "As 27 emendas da Constituição dos EUA, uma carta por emenda.",
        "Cartas para as unidades básicas do SI e o que cada uma mede.",
        "Resuma esta transcrição de aula em 15 cartas com as ideias principais:\n\n[cole a transcrição aqui]",
        "Principais eventos da Segunda Guerra Mundial em ordem cronológica, com os anos.",
        "Verbos irregulares comuns do espanhol no presente (formas yo / tú / él).",
        "Defina as estruturas de dados mais importantes: array, lista encadeada, pilha, fila, tabela hash, árvore binária. Uma carta para cada."
      ] },
      ja: { eg: "例: ", items: [
        "アメリカ歴代大統領と在任期間をまとめたデッキを作って。",
        "重要なフランス語の動詞 20 個と日本語の意味。",
        "最も重要な三角関数の公式と恒等式。",
        "周期表の最初の 20 元素 — 元素記号、原子番号、それぞれの豆知識を 1 つずつ。",
        "機械学習の主要概念：過学習、正則化、勾配降下法、バイアスとバリアンス。それぞれ 1 枚ずつ。",
        "この記事を学習デッキにして：\nhttps://ja.wikipedia.org/wiki/ローマ帝国\n皇帝と重要な年号に注目して。",
        "レストランで料理を注文するためのチェコ語フレーズと日本語訳。",
        "下のメモからデッキを作って — 細胞周期、有糸分裂の各期、主なチェックポイントを扱って。\n\n[ここにメモを貼り付け]",
        "長調と短調の音階と調号。",
        "アメリカ合衆国憲法の 27 の修正条項、1 条につき 1 枚。",
        "SI 基本単位と、それぞれが何を測るかのカード。",
        "この講義の文字起こしを、要点をまとめた 15 枚のカードに要約して：\n\n[ここに文字起こしを貼り付け]",
        "第二次世界大戦の主な出来事を年号付きで時系列に。",
        "よく使うスペイン語の不規則動詞の現在形（yo / tú / él の形）。",
        "最も重要なデータ構造を定義して：配列、連結リスト、スタック、キュー、ハッシュマップ、二分木。それぞれ 1 枚ずつ。"
      ] },
      ko: { eg: "예: ", items: [
        "미국 역대 대통령과 재임 기간을 담은 덱을 만들어 줘.",
        "꼭 필요한 프랑스어 동사 20개와 한국어 뜻.",
        "가장 중요한 삼각함수 공식과 항등식.",
        "주기율표의 처음 20개 원소 — 기호, 원자번호, 각각의 사실 하나씩.",
        "머신러닝 핵심 개념: 과적합, 정규화, 경사하강법, 편향 대 분산. 각 1장씩.",
        "이 글을 학습 덱으로 만들어 줘:\nhttps://ko.wikipedia.org/wiki/로마_제국\n황제와 주요 연도에 초점을 맞춰 줘.",
        "식당에서 음식을 주문할 때 쓰는 체코어 표현과 한국어 번역.",
        "아래 메모로 덱을 만들어 줘 — 세포 주기, 유사분열의 단계, 주요 체크포인트를 다뤄 줘.\n\n[여기에 메모를 붙여넣으세요]",
        "장조와 단조 음계와 조표.",
        "미국 헌법의 27개 수정 조항, 조항당 1장.",
        "SI 기본 단위와 각각이 무엇을 측정하는지에 대한 카드.",
        "이 강의 녹취록을 핵심 아이디어를 담은 15장의 카드로 요약해 줘:\n\n[여기에 녹취록을 붙여넣으세요]",
        "제2차 세계대전의 주요 사건을 연도와 함께 시간순으로.",
        "자주 쓰는 스페인어 불규칙 동사의 현재형 (yo / tú / él 형태).",
        "가장 중요한 자료구조를 정의해 줘: 배열, 연결 리스트, 스택, 큐, 해시맵, 이진 트리. 각 1장씩."
      ] }
    };

    const placeholderLocale = () => {
      const lang = (document.documentElement.lang || 'en').toLowerCase();
      return EXAMPLES[lang] ? lang : 'en';
    };

    const updatePlaceholder = () => {
      if (!requestField) return;
      const set = EXAMPLES[placeholderLocale()];
      const pick = set.items[Math.floor(Math.random() * set.items.length)];
      requestField.setAttribute('placeholder', set.eg + pick);
    };

    updatePlaceholder();

    // Refresh the example when the language switcher (built by i18n.js)
    // changes locale. The click handler runs after i18n has updated
    // document.documentElement.lang, so a 0ms defer reads the new value.
    document.addEventListener('click', (e) => {
      if (e.target.closest && e.target.closest('.lang-s__item')) {
        window.setTimeout(updatePlaceholder, 0);
      }
    });

    const setStatus = (message) => {
      if (!status) return;
      status.textContent = message;
      window.clearTimeout(statusTimer);
      statusTimer = window.setTimeout(() => {
        status.textContent = '';
      }, 4000);
    };

    // Compose: build instructions first, then the user's material,
    // matching the prompt's own "after these instructions, wait for
    // the user's source material" expectation.
    const buildFullPrompt = () => {
      const instructions = instructionsField.value;
      const request = requestField ? requestField.value.trim() : '';
      if (!request) return instructions;
      return instructions +
        '\n\n---\n\n# Here is what I want you to turn into a deck\n\n' +
        request;
    };

    const fallbackCopy = (text) => {
      // Stage the combined text in a temporary element so we never
      // overwrite the user's request field.
      const scratch = document.createElement('textarea');
      scratch.value = text;
      scratch.setAttribute('readonly', '');
      scratch.style.position = 'fixed';
      scratch.style.top = '-1000px';
      scratch.style.opacity = '0';
      document.body.appendChild(scratch);
      scratch.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (_) { ok = false; }
      document.body.removeChild(scratch);
      return ok;
    };

    document.querySelectorAll('[data-copy-prompt]').forEach((button) => {
      button.addEventListener('click', async () => {
        const successMessage = button.dataset.copySuccess || 'Prompt copied.';
        const failMessage = button.dataset.copyFail || 'Select the text and copy it manually.';
        const fullPrompt = buildFullPrompt();

        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(fullPrompt);
          } else if (!fallbackCopy(fullPrompt)) {
            throw new Error('copy command failed');
          }
          setStatus(successMessage);
        } catch (_) {
          if (fallbackCopy(fullPrompt)) {
            setStatus(successMessage);
          } else {
            setStatus(failMessage);
          }
        }
      });
    });

    document.querySelectorAll('[data-reset-prompt]').forEach((button) => {
      button.addEventListener('click', () => {
        if (requestField) {
          requestField.value = '';
          updatePlaceholder();
          requestField.focus();
        }
        setStatus(button.dataset.clearedStatus || 'Cleared.');
      });
    });
  }

  /* ---------------------------------------------------
   * Generic "copy this command/snippet" buttons.
   * Any [data-copy-text="…"] button copies its value to
   * the clipboard and briefly swaps its label to confirm.
   * Used by the rich-deck (skill) page install command.
   * ------------------------------------------------- */
  const copyTextFallback = (text) => {
    const scratch = document.createElement('textarea');
    scratch.value = text;
    scratch.setAttribute('readonly', '');
    scratch.style.position = 'fixed';
    scratch.style.top = '-1000px';
    scratch.style.opacity = '0';
    document.body.appendChild(scratch);
    scratch.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (_) { ok = false; }
    document.body.removeChild(scratch);
    return ok;
  };

  document.querySelectorAll('[data-copy-text]').forEach((button) => {
    let labelTimer;
    button.addEventListener('click', async () => {
      const text = button.getAttribute('data-copy-text') || '';
      const label = button.querySelector('[data-copy-label]') || button;
      const original = label.dataset.copyOriginal || label.textContent;
      label.dataset.copyOriginal = original;
      const done = button.dataset.copiedLabel || 'Copied!';

      let ok = true;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else if (!copyTextFallback(text)) {
          ok = false;
        }
      } catch (_) {
        ok = copyTextFallback(text);
      }

      label.textContent = ok ? done : (button.dataset.copyFailLabel || 'Press ⌘C');
      button.classList.toggle('is-copied', ok);
      window.clearTimeout(labelTimer);
      labelTimer = window.setTimeout(() => {
        label.textContent = original;
        button.classList.remove('is-copied');
      }, 2200);
    });
  });
})();
