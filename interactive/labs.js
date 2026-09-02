const LABS = {
  dataset: {
    title: "Dataset studio",
    lesson: "The mean, median, and mode",
    intro: "Type a list of numbers. Watch the mean, median, mode, and standard deviation update, and see how a single outlier pulls the mean."
  },
  histogram: {
    title: "Histogram bins",
    lesson: "Histograms",
    intro: "Same data, different bin counts. Too few bins hide the shape; too many turn the histogram into noise."
  },
  scatter: {
    title: "Correlation",
    lesson: "Scatter plots",
    intro: "Drag the correlation slider. Positive r climbs up and to the right; negative r falls. Zero looks like a cloud."
  },
  normal: {
    title: "Normal curve and z-score",
    lesson: "Standard normal PDF",
    intro: "Shift the mean, stretch the standard deviation, and shade the 68–95–99.7 regions. The z-score marks one raw value on the curve."
  },
  clt: {
    title: "Central Limit Theorem",
    lesson: "The Central Limit Theorem",
    intro: "Start with a skewed population. Draw many samples of size n and plot the sample means. As n grows, that sampling distribution turns normal."
  },
  box: {
    title: "Box plot",
    lesson: "Box and whisker plots",
    intro: "A live box plot for an editable dataset. Outliers sit beyond Q1 − 1.5×IQR and Q3 + 1.5×IQR."
  },
  numpy: {
    title: "Array playground",
    lesson: "NumPy arrays",
    intro: "A tiny in-browser NumPy sandbox. Run the starters or type your own. Needs a network connection the first time so Pyodide can load."
  }
};

function renderLab(root, labId) {
  const lab = LABS[labId];
  if (!lab) {
    root.innerHTML = "<p>Lab not found.</p>";
    return;
  }
  Progress.mark("lab:" + labId);
  if (typeof refreshSidebar === "function") refreshSidebar();

  root.innerHTML = `
    <section class="panel lab-panel">
      <p class="eyebrow">Interactive lab · ${escapeHtml(lab.lesson)}</p>
      <h1>${escapeHtml(lab.title)}</h1>
      <p class="lede">${escapeHtml(lab.intro)}</p>
      <div id="lab-body"></div>
    </section>
  `;
  const body = root.querySelector("#lab-body");
  const renderers = {
    dataset: renderDatasetLab,
    histogram: renderHistogramLab,
    scatter: renderScatterLab,
    normal: renderNormalLab,
    clt: renderCltLab,
    box: renderBoxLab,
    numpy: renderNumpyLab
  };
  renderers[labId](body);
}

function parseNumbers(text) {
  return text
    .split(/[\s,;]+/)
    .map((part) => Number(part))
    .filter((value) => Number.isFinite(value));
}

function statsOf(values) {
  if (!values.length) {
    return { n: 0, mean: NaN, median: NaN, mode: "—", stdev: NaN, min: NaN, max: NaN };
  }
  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;
  const mean = sorted.reduce((sum, value) => sum + value, 0) / n;
  const median = n % 2 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
  const counts = new Map();
  sorted.forEach((value) => counts.set(value, (counts.get(value) || 0) + 1));
  let best = 0;
  let modes = [];
  counts.forEach((count, value) => {
    if (count > best) {
      best = count;
      modes = [value];
    } else if (count === best) {
      modes.push(value);
    }
  });
  const mode = best <= 1 ? "none (all unique)" : modes.join(", ");
  const variance = n > 1 ? sorted.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (n - 1) : 0;
  return { n, mean, median, mode, stdev: Math.sqrt(variance), min: sorted[0], max: sorted[n - 1], sorted };
}

function fmt(value, digits) {
  if (!Number.isFinite(value)) return "—";
  return value.toFixed(digits ?? 2);
}

function makeCanvas(parent, width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.className = "lab-canvas";
  parent.appendChild(canvas);
  return canvas.getContext("2d");
}

function clearPlot(ctx) {
  const { width, height } = ctx.canvas;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#f7f1e4";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "#e0d3ba";
  ctx.lineWidth = 1;
  for (let x = 40; x < width; x += 28) {
    ctx.beginPath();
    ctx.moveTo(x, 16);
    ctx.lineTo(x, height - 28);
    ctx.stroke();
  }
  for (let y = 16; y < height - 28; y += 28) {
    ctx.beginPath();
    ctx.moveTo(40, y);
    ctx.lineTo(width - 16, y);
    ctx.stroke();
  }
}

function drawAxes(ctx, x0, y0, x1, y1) {
  ctx.strokeStyle = "#1a1612";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.lineTo(x1, y0);
  ctx.moveTo(x0, y0);
  ctx.lineTo(x0, y1);
  ctx.stroke();
}

function renderDatasetLab(root) {
  root.innerHTML = `
    <div class="lab-grid">
      <label class="field">
        <span>Dataset (comma or space separated)</span>
        <textarea id="dataset-input" rows="3">75, 82, 90, 65, 70</textarea>
      </label>
      <div class="stat-tiles" id="stat-tiles"></div>
    </div>
    <div class="canvas-wrap" id="dataset-plot"></div>
  `;
  const input = root.querySelector("#dataset-input");
  const tiles = root.querySelector("#stat-tiles");
  const ctx = makeCanvas(root.querySelector("#dataset-plot"), 720, 280);
  const draw = () => {
    const values = parseNumbers(input.value);
    const s = statsOf(values);
    tiles.innerHTML = [
      ["n", s.n],
      ["mean", fmt(s.mean)],
      ["median", fmt(s.median)],
      ["mode", s.mode],
      ["stdev", fmt(s.stdev)],
      ["range", Number.isFinite(s.min) ? `${fmt(s.min)} – ${fmt(s.max)}` : "—"]
    ]
      .map(([label, value]) => `<div class="stat-tile"><p>${label}</p><strong>${value}</strong></div>`)
      .join("");
    clearPlot(ctx);
    if (!values.length) return;
    const pad = { l: 48, r: 20, t: 20, b: 40 };
    const w = ctx.canvas.width - pad.l - pad.r;
    const h = ctx.canvas.height - pad.t - pad.b;
    const min = Math.min(s.min, s.mean) - 5;
    const max = Math.max(s.max, s.mean) + 5;
    const x = (value) => pad.l + ((value - min) / (max - min)) * w;
    const y = ctx.canvas.height - pad.b - 36;
    drawAxes(ctx, pad.l, ctx.canvas.height - pad.b, ctx.canvas.width - pad.r, pad.t);
    values.forEach((value) => {
      ctx.fillStyle = "#2f6f55";
      ctx.beginPath();
      ctx.arc(x(value), y, 7, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.strokeStyle = "#c24d2c";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x(s.mean), pad.t);
    ctx.lineTo(x(s.mean), ctx.canvas.height - pad.b);
    ctx.stroke();
    ctx.strokeStyle = "#1e3d32";
    ctx.setLineDash([5, 4]);
    ctx.beginPath();
    ctx.moveTo(x(s.median), pad.t);
    ctx.lineTo(x(s.median), ctx.canvas.height - pad.b);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = "#1a1612";
    ctx.font = "12px IBM Plex Sans, sans-serif";
    ctx.fillText("solid = mean, dashed = median", pad.l, ctx.canvas.height - 12);
  };
  input.addEventListener("input", draw);
  draw();
}

function histogram(values, bins) {
  if (!values.length) return { edges: [], counts: [] };
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const width = span / bins;
  const counts = Array(bins).fill(0);
  values.forEach((value) => {
    let index = Math.floor((value - min) / width);
    if (index === bins) index = bins - 1;
    counts[index] += 1;
  });
  const edges = Array.from({ length: bins + 1 }, (_, i) => min + i * width);
  return { edges, counts, min, max };
}

function drawHistogram(ctx, values, bins, color) {
  clearPlot(ctx);
  const { edges, counts } = histogram(values, bins);
  if (!counts.length) return;
  const pad = { l: 48, r: 16, t: 16, b: 36 };
  const w = ctx.canvas.width - pad.l - pad.r;
  const h = ctx.canvas.height - pad.t - pad.b;
  const maxCount = Math.max(...counts, 1);
  const barW = w / counts.length;
  drawAxes(ctx, pad.l, ctx.canvas.height - pad.b, ctx.canvas.width - pad.r, pad.t);
  counts.forEach((count, i) => {
    const barH = (count / maxCount) * h;
    ctx.fillStyle = color || "#3d6b54";
    ctx.fillRect(pad.l + i * barW + 1, ctx.canvas.height - pad.b - barH, barW - 2, barH);
  });
  ctx.fillStyle = "#1a1612";
  ctx.font = "12px IBM Plex Sans, sans-serif";
  ctx.fillText(`${bins} bins · ${values.length} values`, pad.l, ctx.canvas.height - 12);
}

function renderHistogramLab(root) {
  const seed = skewedSample(180);
  root.innerHTML = `
    <label class="field">
      <span>Bin count: <strong id="bin-label">12</strong></span>
      <input id="bin-range" type="range" min="3" max="40" value="12">
    </label>
    <div class="canvas-wrap"></div>
  `;
  const slider = root.querySelector("#bin-range");
  const label = root.querySelector("#bin-label");
  const ctx = makeCanvas(root.querySelector(".canvas-wrap"), 720, 320);
  const draw = () => {
    label.textContent = slider.value;
    drawHistogram(ctx, seed, Number(slider.value));
  };
  slider.addEventListener("input", draw);
  draw();
}

function randomNormal() {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function skewedSample(n) {
  return Array.from({ length: n }, () => {
    const base = Math.abs(randomNormal()) * 8 + 12;
    return Math.random() < 0.08 ? base + 30 : base;
  });
}

function renderScatterLab(root) {
  root.innerHTML = `
    <label class="field">
      <span>Correlation r: <strong id="r-label">0.80</strong></span>
      <input id="r-range" type="range" min="-100" max="100" value="80">
    </label>
    <div class="canvas-wrap"></div>
  `;
  const slider = root.querySelector("#r-range");
  const label = root.querySelector("#r-label");
  const ctx = makeCanvas(root.querySelector(".canvas-wrap"), 720, 360);
  const draw = () => {
    const r = Number(slider.value) / 100;
    label.textContent = r.toFixed(2);
    const points = Array.from({ length: 80 }, () => {
      const x = randomNormal();
      const y = r * x + Math.sqrt(Math.max(0, 1 - r * r)) * randomNormal();
      return [x, y];
    });
    clearPlot(ctx);
    const pad = { l: 48, r: 16, t: 16, b: 36 };
    const w = ctx.canvas.width - pad.l - pad.r;
    const h = ctx.canvas.height - pad.t - pad.b;
    drawAxes(ctx, pad.l, ctx.canvas.height - pad.b, ctx.canvas.width - pad.r, pad.t);
    points.forEach(([x, y]) => {
      const px = pad.l + ((x + 3.2) / 6.4) * w;
      const py = ctx.canvas.height - pad.b - ((y + 3.2) / 6.4) * h;
      ctx.fillStyle = "#c24d2c";
      ctx.beginPath();
      ctx.arc(px, py, 4.2, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = "#1a1612";
    ctx.font = "12px IBM Plex Sans, sans-serif";
    ctx.fillText(r > 0.15 ? "positive correlation" : r < -0.15 ? "negative correlation" : "little or no correlation", pad.l, ctx.canvas.height - 12);
  };
  slider.addEventListener("input", draw);
  draw();
}

function normalPdf(x, mean, stdev) {
  const z = (x - mean) / stdev;
  return Math.exp(-0.5 * z * z) / (stdev * Math.sqrt(2 * Math.PI));
}

function renderNormalLab(root) {
  root.innerHTML = `
    <div class="lab-controls">
      <label class="field">Mean μ <input id="mu" type="range" min="-6" max="6" value="0" step="0.1"><strong id="mu-v">0.0</strong></label>
      <label class="field">Stdev σ <input id="sd" type="range" min="0.4" max="3" value="1" step="0.1"><strong id="sd-v">1.0</strong></label>
      <label class="field">Shade <select id="shade"><option value="1">±1σ ≈ 68%</option><option value="2">±2σ ≈ 95%</option><option value="3">±3σ ≈ 99.7%</option></select></label>
      <label class="field">Raw x for z-score <input id="xval" type="number" value="1.5" step="0.1"><strong id="zval"></strong></label>
    </div>
    <div class="canvas-wrap"></div>
  `;
  const mu = root.querySelector("#mu");
  const sd = root.querySelector("#sd");
  const shade = root.querySelector("#shade");
  const xval = root.querySelector("#xval");
  const ctx = makeCanvas(root.querySelector(".canvas-wrap"), 720, 340);
  const draw = () => {
    const mean = Number(mu.value);
    const stdev = Number(sd.value);
    const k = Number(shade.value);
    const x = Number(xval.value);
    root.querySelector("#mu-v").textContent = mean.toFixed(1);
    root.querySelector("#sd-v").textContent = stdev.toFixed(1);
    root.querySelector("#zval").textContent = `z = ${((x - mean) / stdev).toFixed(2)}`;
    clearPlot(ctx);
    const pad = { l: 48, r: 16, t: 16, b: 36 };
    const w = ctx.canvas.width - pad.l - pad.r;
    const h = ctx.canvas.height - pad.t - pad.b;
    const xmin = -8;
    const xmax = 8;
    const xpix = (value) => pad.l + ((value - xmin) / (xmax - xmin)) * w;
    const peak = normalPdf(mean, mean, stdev);
    const ypix = (value) => ctx.canvas.height - pad.b - (value / (peak * 1.15)) * h;
    drawAxes(ctx, pad.l, ctx.canvas.height - pad.b, ctx.canvas.width - pad.r, pad.t);
    ctx.fillStyle = "rgba(61, 107, 84, 0.28)";
    ctx.beginPath();
    ctx.moveTo(xpix(mean - k * stdev), ctx.canvas.height - pad.b);
    for (let t = mean - k * stdev; t <= mean + k * stdev; t += 0.05) {
      ctx.lineTo(xpix(t), ypix(normalPdf(t, mean, stdev)));
    }
    ctx.lineTo(xpix(mean + k * stdev), ctx.canvas.height - pad.b);
    ctx.fill();
    ctx.strokeStyle = "#1e3d32";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let t = xmin; t <= xmax; t += 0.05) {
      const px = xpix(t);
      const py = ypix(normalPdf(t, mean, stdev));
      if (t === xmin) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.strokeStyle = "#c24d2c";
    ctx.beginPath();
    ctx.moveTo(xpix(x), pad.t);
    ctx.lineTo(xpix(x), ctx.canvas.height - pad.b);
    ctx.stroke();
  };
  [mu, sd, shade, xval].forEach((el) => el.addEventListener("input", draw));
  draw();
}

function renderCltLab(root) {
  const population = Array.from({ length: 4000 }, () => Math.pow(Math.random(), 3) * 100);
  root.innerHTML = `
    <div class="lab-controls">
      <label class="field">Sample size n <input id="n" type="range" min="2" max="80" value="5"><strong id="n-v">5</strong></label>
      <button type="button" class="btn" id="draw-samples">Draw 400 sample means</button>
    </div>
    <div class="split-plots">
      <div>
        <p class="plot-caption">Skewed population</p>
        <div class="canvas-wrap" id="pop-plot"></div>
      </div>
      <div>
        <p class="plot-caption">Distribution of sample means</p>
        <div class="canvas-wrap" id="means-plot"></div>
      </div>
    </div>
  `;
  const popCtx = makeCanvas(root.querySelector("#pop-plot"), 340, 240);
  const meanCtx = makeCanvas(root.querySelector("#means-plot"), 340, 240);
  drawHistogram(popCtx, population, 24, "#c24d2c");
  const n = root.querySelector("#n");
  root.querySelector("#n-v").textContent = n.value;
  n.addEventListener("input", () => {
    root.querySelector("#n-v").textContent = n.value;
  });
  root.querySelector("#draw-samples").addEventListener("click", () => {
    const size = Number(n.value);
    const means = Array.from({ length: 400 }, () => {
      let sum = 0;
      for (let i = 0; i < size; i += 1) {
        sum += population[Math.floor(Math.random() * population.length)];
      }
      return sum / size;
    });
    drawHistogram(meanCtx, means, 18, "#3d6b54");
  });
  drawHistogram(meanCtx, [], 18);
}

function quartiles(sorted) {
  const at = (p) => {
    const index = (sorted.length - 1) * p;
    const lo = Math.floor(index);
    const hi = Math.ceil(index);
    return sorted[lo] + (sorted[hi] - sorted[lo]) * (index - lo);
  };
  const q1 = at(0.25);
  const q2 = at(0.5);
  const q3 = at(0.75);
  const iqr = q3 - q1;
  return { q1, q2, q3, iqr, lo: q1 - 1.5 * iqr, hi: q3 + 1.5 * iqr };
}

function renderBoxLab(root) {
  root.innerHTML = `
    <label class="field">
      <span>Dataset</span>
      <textarea id="box-input" rows="3">12, 14, 15, 15, 16, 17, 18, 19, 21, 22, 45</textarea>
    </label>
    <div class="stat-tiles" id="box-tiles"></div>
    <div class="canvas-wrap"></div>
  `;
  const input = root.querySelector("#box-input");
  const tiles = root.querySelector("#box-tiles");
  const ctx = makeCanvas(root.querySelector(".canvas-wrap"), 720, 240);
  const draw = () => {
    const values = parseNumbers(input.value);
    const s = statsOf(values);
    if (!values.length) return;
    const q = quartiles(s.sorted);
    const outliers = values.filter((value) => value < q.lo || value > q.hi);
    tiles.innerHTML = [
      ["Q1", fmt(q.q1)],
      ["median", fmt(q.q2)],
      ["Q3", fmt(q.q3)],
      ["IQR", fmt(q.iqr)],
      ["outliers", outliers.length ? outliers.join(", ") : "none"]
    ]
      .map(([label, value]) => `<div class="stat-tile"><p>${label}</p><strong>${value}</strong></div>`)
      .join("");
    clearPlot(ctx);
    const pad = { l: 48, r: 20, t: 40, b: 50 };
    const min = Math.min(s.min, q.lo) - 2;
    const max = Math.max(s.max, q.hi) + 2;
    const x = (value) => pad.l + ((value - min) / (max - min)) * (ctx.canvas.width - pad.l - pad.r);
    const mid = 110;
    drawAxes(ctx, pad.l, 180, ctx.canvas.width - pad.r, 40);
    ctx.strokeStyle = "#1e3d32";
    ctx.lineWidth = 2;
    ctx.strokeRect(x(q.q1), mid - 28, x(q.q3) - x(q.q1), 56);
    ctx.beginPath();
    ctx.moveTo(x(q.q2), mid - 28);
    ctx.lineTo(x(q.q2), mid + 28);
    ctx.stroke();
    const whiskerLo = Math.min(...s.sorted.filter((value) => value >= q.lo));
    const whiskerHi = Math.max(...s.sorted.filter((value) => value <= q.hi));
    ctx.beginPath();
    ctx.moveTo(x(whiskerLo), mid);
    ctx.lineTo(x(q.q1), mid);
    ctx.moveTo(x(q.q3), mid);
    ctx.lineTo(x(whiskerHi), mid);
    ctx.moveTo(x(whiskerLo), mid - 12);
    ctx.lineTo(x(whiskerLo), mid + 12);
    ctx.moveTo(x(whiskerHi), mid - 12);
    ctx.lineTo(x(whiskerHi), mid + 12);
    ctx.stroke();
    outliers.forEach((value) => {
      ctx.fillStyle = "#c24d2c";
      ctx.beginPath();
      ctx.arc(x(value), mid, 6, 0, Math.PI * 2);
      ctx.fill();
    });
  };
  input.addEventListener("input", draw);
  draw();
}

function renderNumpyLab(root) {
  root.innerHTML = `
    <p class="lede">This lab shares the same in-browser Python engine as the playground. First run can take a few seconds.</p>
    <div class="canvas-wrap" id="numpy-mount"></div>
  `;
  renderPlayground(root.querySelector("#numpy-mount"), {
    compact: true,
    starter: `import numpy as np

a = np.array([[1, 2, 3], [4, 5, 6]])
print("array:\\n", a)
print("shape:", a.shape)
print("mean:", np.mean(a))
print("a * 2:\\n", a * 2)
print("row 0:", a[0])
print("slice:", a[0:2, 1:3])
`
  });
}
