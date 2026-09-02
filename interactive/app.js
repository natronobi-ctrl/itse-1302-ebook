const STORE_KEY = "itse1302-progress-v1";

const Progress = {
  read() {
    try {
      return JSON.parse(localStorage.getItem(STORE_KEY)) || { done: {}, quizzes: {} };
    } catch (error) {
      return { done: {}, quizzes: {} };
    }
  },
  write(data) {
    localStorage.setItem(STORE_KEY, JSON.stringify(data));
  },
  mark(id) {
    const data = Progress.read();
    data.done[id] = Date.now();
    Progress.write(data);
  },
  recordQuiz(id, score, total) {
    const data = Progress.read();
    data.quizzes[id] = { score, total, at: Date.now() };
    data.done["quiz:" + id] = Date.now();
    Progress.write(data);
  },
  isDone(id) {
    const data = Progress.read();
    return Boolean(data.done[id] || data.done["quiz:" + id] || data.quizzes[id]);
  }
};

function itemDone(item) {
  return (
    Progress.isDone(item.id) ||
    (item.lab && Progress.isDone("lab:" + item.lab)) ||
    (item.quiz && Progress.isDone("quiz:" + item.quiz))
  );
}

function progressCounts() {
  const items = allItems();
  const done = items.filter(itemDone).length;
  return { done, total: items.length };
}

function itemKind(item) {
  if (item.type === "quiz") return "quiz";
  if (item.type === "lab") return "lab";
  if (item.type === "playground") return "code";
  if (item.type === "guide") return "start";
  return "";
}

function renderSidebar() {
  const nav = document.querySelector("#sidebar-nav");
  const query = (document.querySelector("#search").value || "").trim().toLowerCase();
  nav.innerHTML = "";
  CATALOG.units.forEach((unit) => {
    const items = unit.items.filter((item) => !query || item.title.toLowerCase().includes(query));
    if (!items.length) return;
    const block = document.createElement("div");
    block.className = "nav-unit";
    block.innerHTML = `<p class="nav-unit-title">${unit.title}</p><ul class="nav-list"></ul>`;
    const list = block.querySelector("ul");
    items.forEach((item) => {
      const li = document.createElement("li");
      const done = itemDone(item);
      li.innerHTML = `<a href="#/${item.id}"><span class="dot${done ? " is-done" : ""}"></span><span>${item.title}</span>${itemKind(item) ? `<span class="kind">${itemKind(item)}</span>` : ""}</a>`;
      list.appendChild(li);
    });
    nav.appendChild(block);
  });
  highlightActive();
}

function refreshSidebar() {
  renderSidebar();
  updateChrome();
}

function highlightActive() {
  const id = routeId();
  document.querySelectorAll(".nav-list a").forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === `#/${id}`);
  });
}

function routeId() {
  const raw = location.hash.replace(/^#\/?/, "");
  return raw || "home";
}

function updateChrome(item) {
  const crumb = document.querySelector("#crumb");
  const { done, total } = progressCounts();
  if (!item || item.id === "home") {
    crumb.textContent = `${done} of ${total} visited`;
  } else {
    crumb.textContent = `${item.unitTitle} · ${item.title}`;
  }
  const { prev, next } = item && item.id ? neighbors(item.id) : { prev: null, next: null };
  const prevBtn = document.querySelector("#prev");
  const nextBtn = document.querySelector("#next");
  prevBtn.disabled = !prev;
  nextBtn.disabled = !next;
  prevBtn.onclick = () => prev && (location.hash = "#/" + prev.id);
  nextBtn.onclick = () => next && (location.hash = "#/" + next.id);
}

function renderGuide(root) {
  Progress.mark("guide");
  root.innerHTML = `
    <section class="panel guide-panel">
      <p class="eyebrow">Getting started</p>
      <h1>How to use this ebook</h1>
      <p class="lede">You are in the interactive reader. The original Baldwin lessons are still the course. This page is only the map.</p>

      <ol class="steps">
        <li>
          <h2>Find a page in the sidebar</h2>
          <p>Lessons are the original HTML. Items tagged <strong>lab</strong>, <strong>quiz</strong>, or <strong>code</strong> are the interactive pieces. Search filters the list. Previous and Next at the top walk the course in order.</p>
        </li>
        <li>
          <h2>Read a lesson</h2>
          <p>Open <a href="#/overview">Overview</a> first if you are new to the course. Links inside a lesson that point at another lesson stay in the reader. A gold dot in the sidebar means you have been there in this browser.</p>
        </li>
        <li>
          <h2>Use a lab when you want to poke the idea</h2>
          <p>Labs sit next to the theory they belong to. Try <a href="#/lab-dataset">Dataset studio</a>: type numbers and watch mean, median, and the plot move. No Python install for these.</p>
        </li>
        <li>
          <h2>Check yourself with a quiz</h2>
          <p>Answers stay hidden until you pick one. Finish a set to see a score. Start with <a href="#/quiz-stats">Statistics quiz</a> after that unit, or jump there anytime.</p>
        </li>
        <li>
          <h2>Run Python in the playground</h2>
          <p>Open <a href="#/playground">Python playground</a>, pick a starter (histograms, mean, scatter, NumPy), click <strong>Run</strong>. The first run downloads NumPy and Matplotlib into the browser and can take a bit. After that it is local. Nothing you type is uploaded.</p>
        </li>
      </ol>

      <div class="callout">
        <p><strong>If a lesson is blank</strong> you are probably viewing the files directly. From the repo folder run <code>python3 serve.py</code> and use <a href="http://127.0.0.1:8000/">http://127.0.0.1:8000/</a>.</p>
        <p>Progress never leaves this browser. Clearing site data resets the gold dots and quiz scores.</p>
      </div>

      <div class="guide-actions">
        <a class="btn" href="#/overview">Start the overview</a>
        <a class="btn ghost" href="#/lab-dataset">Skip to a lab</a>
      </div>
    </section>
  `;
  renderSidebar();
}

function renderHome(root) {
  const { done, total } = progressCounts();
  const pct = total ? Math.round((done / total) * 100) : 0;
  root.innerHTML = `
    <section class="home-hero">
      <p class="eyebrow">Austin Community College · ITSE-1302</p>
      <h1>Scientific Python, with the knobs still attached.</h1>
      <p class="lede">Prof. Baldwin’s courseware is still here — the lessons, exercises, and review questions. This shell adds live labs, scored quizzes, an in-browser Python runner, and a place to leave your progress.</p>
      <div class="progress-line">
        <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
        <span>${done}/${total}</span>
      </div>
    </section>
    <section class="home-grid">
      <a class="home-card" href="#/guide"><p class="eyebrow">Start here</p><h2>How to use this ebook</h2><p>Two minutes: how lessons, labs, quizzes, and the playground work.</p></a>
      <a class="home-card" href="#/overview"><p class="eyebrow">Read</p><h2>Course overview</h2><p>Course structure, Jupyter, and how the original ebook is organized.</p></a>
      <a class="home-card" href="#/lab-dataset"><p class="eyebrow">Play</p><h2>Open a stats lab</h2><p>Mean vs median, histograms, the normal curve, and the Central Limit Theorem.</p></a>
      <a class="home-card" href="#/quiz-stats"><p class="eyebrow">Check</p><h2>Take a review quiz</h2><p>The original questions, now with hidden answers and a running score.</p></a>
      <a class="home-card accent" href="#/playground"><p class="eyebrow">Code</p><h2>Python playground</h2><p>NumPy and Matplotlib in the browser. No install required for a first plot.</p></a>
    </section>
  `;
}

function showStage(mode) {
  document.querySelector("#page").hidden = mode === "lesson";
  document.querySelector("#frame").hidden = mode !== "lesson";
}

function bindLessonFrame(item) {
  const frame = document.querySelector("#frame");
  frame.src = item.src;
  frame.onload = () => {
    Progress.mark(item.id);
    refreshSidebar();
    try {
      const doc = frame.contentDocument;
      if (!doc) return;
      doc.querySelectorAll("a[href]").forEach((anchor) => {
        const href = anchor.getAttribute("href") || "";
        if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:")) return;
        const file = href.split("#")[0].split("/").pop();
        const match = findItemBySrc(file);
        if (!match) return;
        anchor.addEventListener("click", (event) => {
          event.preventDefault();
          location.hash = "#/" + match.id;
        });
      });
    } catch (error) {
      /* file:// may block iframe script access; the lesson still displays. */
    }
  };
}

function renderRoute() {
  const id = routeId();
  const page = document.querySelector("#page");
  if (id === "home") {
    showStage("page");
    renderHome(page);
    updateChrome({ id: "home" });
    highlightActive();
    return;
  }
  const item = findItem(id);
  if (!item) {
    showStage("page");
    page.innerHTML = `<section class="panel"><h1>Missing page</h1><p>Nothing is mapped to <code>${escapeHtml(id)}</code>.</p></section>`;
    updateChrome();
    return;
  }
  updateChrome(item);
  highlightActive();
  if (item.type === "lesson") {
    showStage("lesson");
    bindLessonFrame(item);
    return;
  }
  showStage("page");
  if (item.type === "guide") renderGuide(page);
  else if (item.type === "quiz") renderQuiz(page, item.quiz);
  else if (item.type === "lab") renderLab(page, item.lab);
  else if (item.type === "playground") {
    Progress.mark(item.id);
    renderPlayground(page);
  }
}

function boot() {
  renderSidebar();
  document.querySelector("#search").addEventListener("input", renderSidebar);
  document.querySelector("#menu-toggle").addEventListener("click", () => {
    document.querySelector("#sidebar").classList.toggle("is-open");
  });
  window.addEventListener("hashchange", () => {
    document.querySelector("#sidebar").classList.remove("is-open");
    renderRoute();
    window.scrollTo(0, 0);
  });
  renderRoute();
}

document.addEventListener("DOMContentLoaded", boot);
