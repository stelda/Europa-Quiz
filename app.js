// ═══════════════════════════════════════════
// ÉTAT DU JEU
// ═══════════════════════════════════════════

var selectedCats = new Set(["flags"]);
var selectedMode = "quiz";
var currentLang = "fr";
var questions = [];
var currentQ = 0;
var score = 0;
var streak = 0;
var bestStreak = 0;
var totalAnswered = 0;
var totalCorrect = 0;
var flashIndex = 0;
var flashCards = [];


// ═══════════════════════════════════════════
// LANGUE
// ═══════════════════════════════════════════

function t(key) {
  return i18n[currentLang][key];
}

function getData() {
  if (currentLang === "en") {
    return { flags: FLAGS_EN, monuments: MONUMENTS_EN, cuisine: CUISINE_EN, people: PEOPLE_EN, eu: EU_FACTS_EN };
  }
  return { flags: FLAGS, monuments: MONUMENTS, cuisine: CUISINE, people: PEOPLE, eu: EU_FACTS };
}

// Les clés SVG sont en FR — on traduit le nom EN vers FR pour trouver le bon drapeau
function getFlagCountryKey(countryName) {
  if (SVG_FLAGS[countryName]) return countryName;
  if (COUNTRY_EN_TO_FR[countryName]) return COUNTRY_EN_TO_FR[countryName];
  return countryName;
}

function switchLang(lang) {
  currentLang = lang;
  document.querySelectorAll('.lang-btn').forEach(function(b) {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  document.documentElement.lang = lang;
  refreshUI();
}

function refreshUI() {
  document.getElementById('headerFlag').textContent = t('headerFlag');
  document.getElementById('headerSub').textContent = t('headerSub');
  document.getElementById('labelScore').textContent = t('score');
  document.getElementById('labelStreak').textContent = t('streak');
  document.getElementById('modeTitle').textContent = t('modeTitle');

  document.querySelectorAll('.mode-btn[data-mode]').forEach(function(b) {
    if (b.dataset.mode === 'quiz') b.textContent = t('modeQuiz');
    if (b.dataset.mode === 'flash') b.textContent = t('modeFlash');
    if (b.dataset.mode === 'marathon') b.textContent = t('modeMarathon');
  });

  document.getElementById('startBtn').textContent = t('start');
  document.getElementById('nextBtn').textContent = t('next');
  document.getElementById('flashPrevBtn').textContent = t('prev');
  document.getElementById('flashNextBtn').textContent = t('next');
  document.getElementById('backMenuBtn').textContent = t('backMenu');
  document.getElementById('resRetryBtn').textContent = t('retry');
  document.getElementById('resMenuBtn').textContent = t('menu');

  renderCategories();
}


// ═══════════════════════════════════════════
// UTILITAIRES
// ═══════════════════════════════════════════

function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}

function pick(arr, n) {
  return shuffle(arr).slice(0, n);
}

function updateScoreBar() {
  document.getElementById('totalScore').textContent = totalCorrect;
  document.getElementById('streak').textContent = streak;
  document.getElementById('accuracy').textContent = totalAnswered > 0
    ? Math.round(totalCorrect / totalAnswered * 100) : 0;
}


// ═══════════════════════════════════════════
// MENU : CATÉGORIES & MODE
// ═══════════════════════════════════════════

function renderCategories() {
  var L = i18n[currentLang];
  document.getElementById('catGrid').innerHTML = catData.map(function(c) {
    return '<div class="cat-card ' + (selectedCats.has(c.id) ? 'selected' : '') +
      '" data-cat="' + c.id + '" onclick="toggleCat(\'' + c.id + '\')">' +
      '<span class="cat-emoji">' + c.emoji + '</span>' +
      '<div class="cat-title">' + L.catTitle(c) + '</div>' +
      '<div class="cat-desc">' + L.catDesc(c) + '</div></div>';
  }).join('');
}

function toggleCat(id) {
  if (id === "all") {
    selectedCats = new Set(["all"]);
  } else {
    selectedCats.delete("all");
    if (selectedCats.has(id)) selectedCats.delete(id);
    else selectedCats.add(id);
    if (!selectedCats.size) selectedCats.add("flags");
  }
  renderCategories();
}

function selectMode(mode) {
  selectedMode = mode;
  document.querySelectorAll('.mode-btn[data-mode]').forEach(function(b) {
    b.classList.toggle('active', b.dataset.mode === mode);
  });
}

function backToMenu() {
  document.getElementById('menuArea').classList.remove('hidden');
  document.getElementById('quizArea').classList.remove('active');
  document.getElementById('resultsArea').classList.remove('active');
  document.getElementById('flashArea').classList.remove('active');
}


// ═══════════════════════════════════════════
// GÉNÉRATION DES QUESTIONS
// ═══════════════════════════════════════════

function generateQuestions(count) {
  count = count || 10;
  var qs = [];
  var L = i18n[currentLang];
  var D = getData();
  var activeCats = selectedCats.has("all")
    ? ["flags", "monuments", "cuisine", "people", "eu"]
    : Array.from(selectedCats);
  var perCat = Math.ceil(count / activeCats.length);

  activeCats.forEach(function(cat) {

    if (cat === "flags") {
      pick(D.flags, perCat).forEach(function(f) {
        var flagKey = getFlagCountryKey(f.country);
        if (Math.random() > 0.5) {
          var others = pick(D.flags.filter(function(x) { return x.country !== f.country; }), 3)
            .map(function(x) { return x.country; });
          qs.push({
            cat: currentLang === "fr" ? "Drapeaux" : "Flags",
            type: "flag", flagCountry: flagKey,
            text: L.whichCountryFlag, answer: f.country,
            options: shuffle([f.country].concat(others)),
            detail: L.flagDetail(f.country, f.hint, f.capital)
          });
        } else {
          var others = pick(D.flags.filter(function(x) { return x.capital !== f.capital; }), 3)
            .map(function(x) { return x.capital; });
          qs.push({
            cat: currentLang === "fr" ? "Capitales" : "Capitals",
            type: "flagtext", flagCountry: flagKey,
            text: L.capitalOf(f.country), answer: f.capital,
            options: shuffle([f.capital].concat(others)),
            detail: L.capitalDetail(f.country, f.capital)
          });
        }
      });
    }

    if (cat === "monuments") {
      pick(D.monuments, perCat).forEach(function(m) {
        if (Math.random() > 0.5) {
          var others = pick(D.monuments.filter(function(x) { return x.country !== m.country; }), 3)
            .map(function(x) { return x.country; });
          qs.push({
            cat: "Monuments", type: "text",
            text: L.whereIsMonument(m.name), answer: m.country,
            options: shuffle([m.country].concat(others)),
            detail: L.monumentDetail(m.name, m.city, m.country, m.fact)
          });
        } else {
          var others = pick(D.monuments.filter(function(x) { return x.name !== m.name; }), 3)
            .map(function(x) { return x.name; });
          qs.push({
            cat: "Monuments", type: "text",
            text: L.whichMonument(m.city, m.country), answer: m.name,
            options: shuffle([m.name].concat(others)),
            detail: L.monumentDetail2(m.name, m.fact)
          });
        }
      });
    }

    if (cat === "cuisine") {
      pick(D.cuisine, perCat).forEach(function(c) {
        if (Math.random() > 0.5) {
          var others = pick(D.cuisine.filter(function(x) { return x.country !== c.country; }), 3)
            .map(function(x) { return x.country; });
          qs.push({
            cat: currentLang === "fr" ? "Gastronomie" : "Cuisine",
            type: "text", text: L.dishFrom(c.dish), answer: c.country,
            options: shuffle([c.country].concat(others)),
            detail: L.dishDetail(c.dish, c.country, c.fact)
          });
        } else {
          var others = pick(D.cuisine.filter(function(x) { return x.dish !== c.dish; }), 3)
            .map(function(x) { return x.dish; });
          qs.push({
            cat: currentLang === "fr" ? "Gastronomie" : "Cuisine",
            type: "text", text: L.typicalDish(c.country), answer: c.dish,
            options: shuffle([c.dish].concat(others)),
            detail: L.dishDetail2(c.dish, c.fact)
          });
        }
      });
    }

    if (cat === "people") {
      pick(D.people, perCat).forEach(function(p) {
        var others = pick(D.people.filter(function(x) { return x.name !== p.name; }), 3)
          .map(function(x) { return x.country; });
        qs.push({
          cat: currentLang === "fr" ? "Personnalités" : "Famous People",
          type: "text", text: L.personFrom(p.name), answer: p.country,
          options: shuffle([p.country].concat(others)),
          detail: L.personDetail(p.name, p.country, p.fact)
        });
      });
    }

    if (cat === "eu") {
      pick(D.eu, perCat).forEach(function(e) {
        qs.push({
          cat: currentLang === "fr" ? "Union Européenne" : "European Union",
          type: "text", text: e.q, answer: e.a,
          options: shuffle(e.opts), detail: e.detail
        });
      });
    }
  });

  return shuffle(qs).slice(0, count);
}


// ═══════════════════════════════════════════
// MODE QUIZ
// ═══════════════════════════════════════════

function startGame() {
  if (selectedMode === "flash") { startFlashcards(); return; }
  var count = selectedMode === "marathon" ? 25 : 10;
  questions = generateQuestions(count);
  currentQ = 0; score = 0; streak = 0;

  document.getElementById('menuArea').classList.add('hidden');
  document.getElementById('resultsArea').classList.remove('active');
  document.getElementById('quizArea').classList.add('active');
  document.getElementById('flashArea').classList.remove('active');
  showQuestion();
}

function showQuestion() {
  var q = questions[currentQ];
  var total = questions.length;
  document.getElementById('progressFill').style.width = (currentQ / total * 100) + "%";
  document.getElementById('progressText').textContent = (currentQ + 1) + "/" + total;

  var flagHtml = '';
  if (q.type === "flag" && q.flagCountry)
    flagHtml = '<div class="q-flag-svg">' + getFlagSVG(q.flagCountry, 200) + '</div>';
  else if (q.type === "flagtext" && q.flagCountry)
    flagHtml = '<div class="q-flag-svg">' + getFlagSVG(q.flagCountry, 120) + '</div>';

  var optionsHtml = q.options.map(function(opt, i) {
    return '<button class="option-btn" data-val="' + i + '" onclick="checkAnswer(this,' + i + ')">' + opt + '</button>';
  }).join('');

  document.getElementById('questionCard').innerHTML =
    '<div class="q-category">' + q.cat + '</div>' +
    '<div class="q-text">' + q.text + '</div>' +
    flagHtml +
    '<div class="options">' + optionsHtml + '</div>';

  document.getElementById('explanation').classList.remove('show');
  document.getElementById('nextBtn').classList.remove('show');
}

function checkAnswer(btn, idx) {
  var q = questions[currentQ];
  var selected = q.options[idx];
  var correct = q.answer;

  document.querySelectorAll('.option-btn').forEach(function(b) {
    b.disabled = true;
    if (b.textContent === correct) b.classList.add('correct');
  });

  totalAnswered++;
  if (selected === correct) {
    btn.classList.add('correct');
    score++; streak++; totalCorrect++;
    if (streak > bestStreak) bestStreak = streak;
  } else {
    btn.classList.add('wrong');
    streak = 0;
  }

  updateScoreBar();

  var expl = document.getElementById('explanation');
  expl.textContent = (selected === correct ? t('correct') : t('wrong')) + q.detail;
  expl.classList.add('show');
  document.getElementById('nextBtn').classList.add('show');
}

function nextQuestion() {
  currentQ++;
  if (currentQ >= questions.length) showResults();
  else showQuestion();
}


// ═══════════════════════════════════════════
// RÉSULTATS
// ═══════════════════════════════════════════

function showResults() {
  document.getElementById('quizArea').classList.remove('active');
  document.getElementById('resultsArea').classList.add('active');

  var pct = Math.round(score / questions.length * 100);
  var emoji, title;

  if (pct === 100)     { emoji = "🏆"; title = t('result100'); }
  else if (pct >= 80)  { emoji = "🌟"; title = t('result80'); }
  else if (pct >= 60)  { emoji = "👏"; title = t('result60'); }
  else if (pct >= 40)  { emoji = "💪"; title = t('result40'); }
  else                 { emoji = "📚"; title = t('resultLow'); }

  document.getElementById('resEmoji').textContent = emoji;
  document.getElementById('resTitle').textContent = title;
  document.getElementById('resScore').textContent = score + " / " + questions.length;
  document.getElementById('resDetail').innerHTML =
    t('score') + " : " + pct + "%<br>" + t('bestStreak') + " : " + bestStreak + " 🔥<br>" +
    (pct >= 80 ? t('ready') : t('tryAgain'));
}


// ═══════════════════════════════════════════
// MODE FLASHCARDS
// ═══════════════════════════════════════════

function generateFlashcards(count) {
  count = count || 15;
  var cards = [];
  var L = i18n[currentLang];
  var D = getData();
  var activeCats = selectedCats.has("all")
    ? ["flags", "monuments", "cuisine", "people", "eu"]
    : Array.from(selectedCats);

  if (activeCats.indexOf("flags") >= 0) {
    pick(D.flags, 6).forEach(function(f) {
      cards.push({
        front: { flagCountry: getFlagCountryKey(f.country), text: L.flashFlagQ },
        back:  { answer: f.country, detail: L.flashCapital(f.capital, f.hint) }
      });
    });
  }
  if (activeCats.indexOf("monuments") >= 0) {
    pick(D.monuments, 4).forEach(function(m) {
      cards.push({
        front: { emoji: "🏛️", text: m.name },
        back:  { answer: m.city + ", " + m.country, detail: m.fact }
      });
    });
  }
  if (activeCats.indexOf("cuisine") >= 0) {
    pick(D.cuisine, 4).forEach(function(c) {
      cards.push({
        front: { emoji: "🍽️", text: c.dish },
        back:  { answer: c.country, detail: c.fact }
      });
    });
  }
  if (activeCats.indexOf("people") >= 0) {
    pick(D.people, 4).forEach(function(p) {
      cards.push({
        front: { emoji: "🎨", text: p.name },
        back:  { answer: p.country, detail: p.fact }
      });
    });
  }
  if (activeCats.indexOf("eu") >= 0) {
    pick(D.eu, 4).forEach(function(e) {
      cards.push({
        front: { emoji: "⭐", text: e.q },
        back:  { answer: e.a, detail: e.detail }
      });
    });
  }
  return shuffle(cards).slice(0, count);
}

function startFlashcards() {
  flashCards = generateFlashcards(15);
  flashIndex = 0;

  document.getElementById('menuArea').classList.add('hidden');
  document.getElementById('quizArea').classList.remove('active');
  document.getElementById('resultsArea').classList.remove('active');
  document.getElementById('flashArea').classList.add('active');
  showFlashcard();
}

function showFlashcard() {
  var c = flashCards[flashIndex];
  document.getElementById('flashCounter').textContent = (flashIndex + 1) + " / " + flashCards.length;

  var frontVisual = '';
  if (c.front.flagCountry)
    frontVisual = getFlagSVG(c.front.flagCountry, 120);
  else if (c.front.emoji)
    frontVisual = '<div class="flash-emoji">' + c.front.emoji + '</div>';

  document.getElementById('flashFront').innerHTML =
    frontVisual +
    '<div class="flash-question">' + c.front.text + '</div>' +
    '<div class="flash-tap">' + t('flipTap') + '</div>';

  document.getElementById('flashBack').innerHTML =
    '<div class="flash-answer">' + c.back.answer + '</div>' +
    '<div class="flash-detail">' + c.back.detail + '</div>';

  document.getElementById('flashcard').classList.remove('flipped');
}

function flipCard() {
  document.getElementById('flashcard').classList.toggle('flipped');
}

function nextCard() {
  if (flashIndex < flashCards.length - 1) flashIndex++;
  else { flashIndex = 0; flashCards = shuffle(flashCards); }
  showFlashcard();
}

function prevCard() {
  if (flashIndex > 0) { flashIndex--; showFlashcard(); }
}


// ═══════════════════════════════════════════
// INITIALISATION
// ═══════════════════════════════════════════

renderCategories();
