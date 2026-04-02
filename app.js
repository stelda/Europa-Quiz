// ═══════════════════════════════════════════
// ÉTAT DU JEU
// ═══════════════════════════════════════════

var selectedCats = new Set(["flags"]);
var selectedMode = "quiz";
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
// UTILITAIRES
// ═══════════════════════════════════════════

function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
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
  document.getElementById('catGrid').innerHTML = catData.map(function(c) {
    return '<div class="cat-card ' + (selectedCats.has(c.id) ? 'selected' : '') +
      '" data-cat="' + c.id + '" onclick="toggleCat(\'' + c.id + '\')">' +
      '<span class="cat-emoji">' + c.emoji + '</span>' +
      '<div class="cat-title">' + c.title + '</div>' +
      '<div class="cat-desc">' + c.desc + '</div></div>';
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
  document.querySelectorAll('.mode-btn').forEach(function(b) {
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
  var activeCats = selectedCats.has("all")
    ? ["flags", "monuments", "cuisine", "people", "eu"]
    : Array.from(selectedCats);
  var perCat = Math.ceil(count / activeCats.length);

  activeCats.forEach(function(cat) {

    // --- DRAPEAUX & CAPITALES ---
    if (cat === "flags") {
      pick(FLAGS, perCat).forEach(function(f) {
        if (Math.random() > 0.5) {
          var others = pick(FLAGS.filter(function(x) { return x.country !== f.country; }), 3)
            .map(function(x) { return x.country; });
          qs.push({
            cat: "Drapeaux", type: "flag", flagCountry: f.country,
            text: "Quel pays a ce drapeau ?", answer: f.country,
            options: shuffle([f.country].concat(others)),
            detail: f.country + " – " + f.hint + ". Capitale : " + f.capital + "."
          });
        } else {
          var others = pick(FLAGS.filter(function(x) { return x.capital !== f.capital; }), 3)
            .map(function(x) { return x.capital; });
          qs.push({
            cat: "Capitales", type: "flagtext", flagCountry: f.country,
            text: "Quelle est la capitale de " + f.country + " ?", answer: f.capital,
            options: shuffle([f.capital].concat(others)),
            detail: "La capitale de " + f.country + " est " + f.capital + "."
          });
        }
      });
    }

    // --- MONUMENTS ---
    if (cat === "monuments") {
      pick(MONUMENTS, perCat).forEach(function(m) {
        if (Math.random() > 0.5) {
          var others = pick(MONUMENTS.filter(function(x) { return x.country !== m.country; }), 3)
            .map(function(x) { return x.country; });
          qs.push({
            cat: "Monuments", type: "text",
            text: 'Dans quel pays se trouve "' + m.name + '" ?',
            answer: m.country, options: shuffle([m.country].concat(others)),
            detail: m.name + " se trouve à " + m.city + ", " + m.country + ". " + m.fact
          });
        } else {
          var others = pick(MONUMENTS.filter(function(x) { return x.name !== m.name; }), 3)
            .map(function(x) { return x.name; });
          qs.push({
            cat: "Monuments", type: "text",
            text: "Quel monument se trouve à " + m.city + " (" + m.country + ") ?",
            answer: m.name, options: shuffle([m.name].concat(others)),
            detail: m.name + " – " + m.fact
          });
        }
      });
    }

    // --- GASTRONOMIE ---
    if (cat === "cuisine") {
      pick(CUISINE, perCat).forEach(function(c) {
        if (Math.random() > 0.5) {
          var others = pick(CUISINE.filter(function(x) { return x.country !== c.country; }), 3)
            .map(function(x) { return x.country; });
          qs.push({
            cat: "Gastronomie", type: "text",
            text: 'De quel pays vient "' + c.dish + '" ?',
            answer: c.country, options: shuffle([c.country].concat(others)),
            detail: c.dish + " vient de " + c.country + ". " + c.fact
          });
        } else {
          var others = pick(CUISINE.filter(function(x) { return x.dish !== c.dish; }), 3)
            .map(function(x) { return x.dish; });
          qs.push({
            cat: "Gastronomie", type: "text",
            text: "Quel plat est typique de " + c.country + " ?",
            answer: c.dish, options: shuffle([c.dish].concat(others)),
            detail: c.dish + " – " + c.fact
          });
        }
      });
    }

    // --- PERSONNALITÉS ---
    if (cat === "people") {
      pick(PEOPLE, perCat).forEach(function(p) {
        var others = pick(PEOPLE.filter(function(x) { return x.name !== p.name; }), 3)
          .map(function(x) { return x.country; });
        qs.push({
          cat: "Personnalités", type: "text",
          text: "De quel pays vient " + p.name + " ?",
          answer: p.country, options: shuffle([p.country].concat(others)),
          detail: p.name + " (" + p.country + ") – " + p.fact
        });
      });
    }

    // --- UNION EUROPÉENNE ---
    if (cat === "eu") {
      pick(EU_FACTS, perCat).forEach(function(e) {
        qs.push({
          cat: "Union Européenne", type: "text",
          text: e.q, answer: e.a,
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

  var btns = document.querySelectorAll('.option-btn');
  btns.forEach(function(b) {
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
  expl.textContent = (selected === correct ? "✅ Bravo ! " : "❌ Raté ! ") + q.detail;
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

  if (pct === 100)     { emoji = "🏆"; title = "Parfait ! Tu es un champion !"; }
  else if (pct >= 80)  { emoji = "🌟"; title = "Excellent travail !"; }
  else if (pct >= 60)  { emoji = "👏"; title = "Bien joué !"; }
  else if (pct >= 40)  { emoji = "💪"; title = "Continue, tu progresses !"; }
  else                 { emoji = "📚"; title = "Il faut réviser encore !"; }

  document.getElementById('resEmoji').textContent = emoji;
  document.getElementById('resTitle').textContent = title;
  document.getElementById('resScore').textContent = score + " / " + questions.length;
  document.getElementById('resDetail').innerHTML =
    "Score : " + pct + "%<br>Meilleure série : " + bestStreak + " 🔥<br>" +
    (pct >= 80 ? "Tu es prêt pour le concours !" : "Essaie encore pour t'améliorer !");
}


// ═══════════════════════════════════════════
// MODE FLASHCARDS
// ═══════════════════════════════════════════

function generateFlashcards(count) {
  count = count || 15;
  var cards = [];
  var activeCats = selectedCats.has("all")
    ? ["flags", "monuments", "cuisine", "people", "eu"]
    : Array.from(selectedCats);

  if (activeCats.indexOf("flags") >= 0) {
    pick(FLAGS, 6).forEach(function(f) {
      cards.push({
        front: { flagCountry: f.country, text: "Quel pays ? Quelle capitale ?" },
        back:  { answer: f.country, detail: "Capitale : " + f.capital + "\n" + f.hint }
      });
    });
  }
  if (activeCats.indexOf("monuments") >= 0) {
    pick(MONUMENTS, 4).forEach(function(m) {
      cards.push({
        front: { emoji: "🏛️", text: m.name },
        back:  { answer: m.city + ", " + m.country, detail: m.fact }
      });
    });
  }
  if (activeCats.indexOf("cuisine") >= 0) {
    pick(CUISINE, 4).forEach(function(c) {
      cards.push({
        front: { emoji: "🍽️", text: c.dish },
        back:  { answer: c.country, detail: c.fact }
      });
    });
  }
  if (activeCats.indexOf("people") >= 0) {
    pick(PEOPLE, 4).forEach(function(p) {
      cards.push({
        front: { emoji: "🎨", text: p.name },
        back:  { answer: p.country, detail: p.fact }
      });
    });
  }
  if (activeCats.indexOf("eu") >= 0) {
    pick(EU_FACTS, 4).forEach(function(e) {
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
    '<div class="flash-tap">Clique pour retourner</div>';

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
