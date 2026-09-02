function letterOf(choice) {
  const match = String(choice).trim().match(/^([A-Z])\b/);
  return match ? match[1] : choice;
}

function renderQuiz(root, quizId) {
  const quiz = QUIZZES[quizId];
  if (!quiz) {
    root.innerHTML = "<p>Quiz not found.</p>";
    return;
  }

  const state = {
    answers: {},
    submitted: {},
    done: false
  };

  root.innerHTML = `
    <section class="panel quiz-panel">
      <p class="eyebrow">Interactive quiz</p>
      <h1>${quiz.title}</h1>
      <p class="lede">${quiz.blurb}</p>
      <div class="quiz-progress">
        <div class="quiz-progress-bar" id="quiz-bar"></div>
        <p id="quiz-status">0 of ${quiz.questions.length} answered</p>
      </div>
      <ol class="quiz-list" id="quiz-list"></ol>
      <div class="quiz-footer" id="quiz-footer"></div>
    </section>
  `;

  const list = root.querySelector("#quiz-list");
  quiz.questions.forEach((question, index) => {
    const item = document.createElement("li");
    item.className = "quiz-card";
    item.dataset.index = String(index);
    item.innerHTML = `
      <h2>Question ${index + 1}</h2>
      <p class="quiz-prompt">${escapeHtml(question.prompt).replace(/\n/g, "<br>")}</p>
      <div class="quiz-choices"></div>
      <div class="quiz-feedback" hidden></div>
    `;
    const choices = item.querySelector(".quiz-choices");
    if (question.type === "tf") {
      ["True", "False"].forEach((label) => {
        choices.appendChild(choiceButton(label, () => pick(index, label, item)));
      });
    } else if (question.type === "multi") {
      question.choices.forEach((label) => {
        choices.appendChild(choiceButton(label, () => toggleMulti(index, letterOf(label), item), true));
      });
      const submit = document.createElement("button");
      submit.type = "button";
      submit.className = "btn btn-secondary";
      submit.textContent = "Check answers";
      submit.addEventListener("click", () => gradeMulti(index, item));
      choices.appendChild(submit);
    } else {
      question.choices.forEach((label) => {
        choices.appendChild(choiceButton(label, () => pick(index, letterOf(label), item)));
      });
    }
    list.appendChild(item);
  });

  function pick(index, value, card) {
    if (state.done) return;
    state.answers[index] = value;
    state.submitted[index] = true;
    reveal(index, card);
    refreshMeta();
  }

  function toggleMulti(index, letter, card) {
    if (state.done || state.submitted[index]) return;
    const current = new Set(state.answers[index] || []);
    if (current.has(letter)) current.delete(letter);
    else current.add(letter);
    state.answers[index] = [...current];
    card.querySelectorAll(".choice").forEach((button) => {
      button.classList.toggle("is-selected", current.has(letterOf(button.dataset.value)));
    });
  }

  function gradeMulti(index, card) {
    if (state.submitted[index]) return;
    state.answers[index] = state.answers[index] || [];
    state.submitted[index] = true;
    reveal(index, card);
    refreshMeta();
  }

  function reveal(index, card) {
    const question = quiz.questions[index];
    const given = state.answers[index];
    const correct = isCorrect(question, given);
    card.classList.toggle("is-correct", correct);
    card.classList.toggle("is-wrong", !correct);
    card.querySelectorAll(".choice").forEach((button) => {
      button.disabled = question.type !== "multi";
      const letter = letterOf(button.dataset.value);
      const isAnswer = Array.isArray(question.answer)
        ? question.answer.includes(letter)
        : question.answer === button.dataset.value || question.answer === letter;
      if (isAnswer) button.classList.add("is-answer");
      if (question.type === "multi") {
        button.disabled = true;
        if ((given || []).includes(letter) && !isAnswer) button.classList.add("is-miss");
      } else if (button.dataset.value === given || letter === given) {
        button.classList.add("is-picked");
      }
    });
    const feedback = card.querySelector(".quiz-feedback");
    feedback.hidden = false;
    feedback.innerHTML = `<p><strong>${correct ? "Correct." : "Not quite."}</strong> ${escapeHtml(question.explain)}</p>`;
  }

  function refreshMeta() {
    const answered = Object.keys(state.submitted).length;
    const bar = root.querySelector("#quiz-bar");
    const status = root.querySelector("#quiz-status");
    bar.style.width = `${(answered / quiz.questions.length) * 100}%`;
    status.textContent = `${answered} of ${quiz.questions.length} answered`;
    if (answered === quiz.questions.length) showScore();
  }

  function showScore() {
    const total = quiz.questions.length;
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (isCorrect(question, state.answers[index])) score += 1;
    });
    Progress.recordQuiz(quizId, score, total);
    const footer = root.querySelector("#quiz-footer");
    footer.innerHTML = `
      <div class="score-card">
        <p class="eyebrow">Your score</p>
        <p class="score-number">${score} / ${total}</p>
        <p>${score === total ? "Clean sweep. You know this unit." : score >= total * 0.8 ? "Solid. Review the misses and try again." : "Worth another pass through the lessons, then retry."}</p>
        <button type="button" class="btn" id="quiz-retry">Try again</button>
      </div>
    `;
    footer.querySelector("#quiz-retry").addEventListener("click", () => renderQuiz(root, quizId));
    if (typeof refreshSidebar === "function") refreshSidebar();
  }
}

function isCorrect(question, given) {
  if (question.type === "multi") {
    const expected = [...question.answer].sort().join(",");
    const actual = [...(given || [])].sort().join(",");
    return expected === actual;
  }
  return given === question.answer;
}

function choiceButton(label, onClick, allowMulti) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "choice";
  button.dataset.value = label;
  button.textContent = label;
  button.addEventListener("click", onClick);
  if (allowMulti) button.classList.add("choice-multi");
  return button;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
