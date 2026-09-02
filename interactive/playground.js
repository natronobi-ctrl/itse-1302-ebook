const STARTERS = {
  histogram: `# Four histograms in one figure — from the Histogram Plotting Preview
import matplotlib.pyplot as plt

fig, ax = plt.subplots(2, 2, sharey=True, sharex=True)
data01 = list(range(0, 100, 5)) + list(range(10, 90, 5)) + list(range(20, 80, 5)) + list(range(30, 70, 5)) + list(range(40, 60, 5))
data02 = list(range(0, 100, 4)) + list(range(15, 85, 4)) + list(range(25, 75, 4))
data03 = list(range(0, 100, 2))
data04 = list(range(20, 80, 3)) + list(range(0, 100, 8))

for axes, data, title in (
    (ax[0, 0], data01, "Upper Left"),
    (ax[0, 1], data02, "Upper Right"),
    (ax[1, 0], data03, "Lower Left"),
    (ax[1, 1], data04, "Lower Right"),
):
    axes.hist(data, bins=20, density=True, range=(min(data), max(data)))
    axes.grid(True)
    axes.set_title(title)

ax[0, 0].set_ylabel("Y-Value")
ax[1, 0].set_ylabel("Y-Value")
ax[1, 0].set_xlabel("X-Value")
ax[1, 1].set_xlabel("X-Value")
fig.suptitle("Four Histograms in a Figure")
plt.tight_layout()
`,
  mean: `import numpy as np

scores = np.array([75, 82, 90, 65, 70])
print("data:", scores)
print("mean:", np.mean(scores))
print("median:", np.median(scores))
print("sample stdev:", np.std(scores, ddof=1))
print("centered:", scores - np.mean(scores))
`,
  scatter: `import numpy as np
import matplotlib.pyplot as plt

rng = np.random.default_rng(7)
x = rng.normal(0, 1, 80)
y = 0.75 * x + rng.normal(0, 0.6, 80)
fig, ax = plt.subplots()
ax.scatter(x, y, c="#c24d2c")
m, b = np.polyfit(x, y, 1)
line = np.linspace(x.min(), x.max(), 50)
ax.plot(line, m * line + b, color="#1e3d32")
ax.set_title("Scatter with best-fit line")
ax.set_xlabel("x")
ax.set_ylabel("y")
ax.grid(True)
`,
  numpy: `import numpy as np

a = np.array([1, 2, 3])
b = np.array([10, 20, 30])
print("a + b =", a + b)
print("a * 3 =", a * 3)
print("dot =", np.dot(a, b))
print("broadcast:\\n", a + np.array([[1], [2], [3]]))
`
};

let pyodideReady = null;

function loadPyodideEngine() {
  if (pyodideReady) return pyodideReady;
  pyodideReady = (async () => {
    if (typeof loadPyodide !== "function") {
      throw new Error("Pyodide script did not load. Check your network connection.");
    }
    const pyodide = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.5/full/"
    });
    await pyodide.loadPackage(["numpy", "matplotlib"]);
    await pyodide.runPythonAsync(`
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
`);
    return pyodide;
  })();
  return pyodideReady;
}

function renderPlayground(root, options) {
  const compact = options && options.compact;
  const starter = (options && options.starter) || STARTERS.histogram;
  root.innerHTML = `
    <section class="${compact ? "" : "panel"} playground-panel">
      ${compact ? "" : `<p class="eyebrow">In-browser Python</p>
      <h1>Python playground</h1>
      <p class="lede">NumPy and Matplotlib run in your browser via Pyodide. Nothing is uploaded. The first run downloads the scientific stack.</p>`}
      <div class="starter-row">
        <button type="button" class="chip" data-starter="histogram">Histograms</button>
        <button type="button" class="chip" data-starter="mean">Mean &amp; stdev</button>
        <button type="button" class="chip" data-starter="scatter">Scatter</button>
        <button type="button" class="chip" data-starter="numpy">NumPy</button>
      </div>
      <textarea id="py-code" class="code-editor" spellcheck="false">${starter}</textarea>
      <div class="playground-actions">
        <button type="button" class="btn" id="py-run">Run</button>
        <p class="status" id="py-status">Ready when you are.</p>
      </div>
      <pre class="py-out" id="py-out"></pre>
      <div class="py-plots" id="py-plots"></div>
    </section>
  `;

  root.querySelectorAll("[data-starter]").forEach((chip) => {
    chip.addEventListener("click", () => {
      root.querySelector("#py-code").value = STARTERS[chip.dataset.starter];
    });
  });

  root.querySelector("#py-run").addEventListener("click", async () => {
    const status = root.querySelector("#py-status");
    const out = root.querySelector("#py-out");
    const plots = root.querySelector("#py-plots");
    const code = root.querySelector("#py-code").value;
    status.textContent = "Loading Python…";
    out.textContent = "";
    plots.innerHTML = "";
    try {
      const pyodide = await loadPyodideEngine();
      status.textContent = "Running…";
      await pyodide.runPythonAsync(`
import sys, io, base64
plt.close("all")
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
`);
      await pyodide.runPythonAsync(code);
      const payload = await pyodide.runPythonAsync(`
import json
images = []
for num in list(plt.get_fignums()):
    fig = plt.figure(num)
    buf = io.BytesIO()
    fig.savefig(buf, format="png", dpi=120, bbox_inches="tight", facecolor="#f7f1e4")
    images.append(base64.b64encode(buf.getvalue()).decode("ascii"))
    plt.close(fig)
json.dumps({
    "stdout": sys.stdout.getvalue(),
    "stderr": sys.stderr.getvalue(),
    "images": images
})
`);
      const result = JSON.parse(payload);
      out.textContent = (result.stdout + result.stderr).trim() || "(no printed output)";
      result.images.forEach((src) => {
        const img = document.createElement("img");
        img.src = "data:image/png;base64," + src;
        img.alt = "Plot from your Python code";
        plots.appendChild(img);
      });
      status.textContent = "Done.";
      Progress.mark("playground");
      if (typeof refreshSidebar === "function") refreshSidebar();
    } catch (error) {
      out.textContent = String(error);
      status.textContent = "Error.";
    }
  });
}
