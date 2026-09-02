# ITSE-1302 Scientific Python

Interactive edition of Prof. Richard G. Baldwin’s *Computer Programming: Scientific Python* courseware (Austin Community College).

The original HTML lessons, Jupyter notebooks, and datasets are unchanged. This repo adds a reader around them:

- Sidebar navigation, search, and previous/next
- Reading progress stored in the browser
- Scored quizzes built from the original review questions
- Live labs for mean/median, histograms, correlation, the normal curve, the Central Limit Theorem, and box plots
- An in-browser Python playground (NumPy + Matplotlib via Pyodide)

## Run it

```bash
python3 serve.py
```

That opens [http://127.0.0.1:8000/](http://127.0.0.1:8000/). A local server is required so lessons can load in the reader and so the Python playground can fetch Pyodide.

The first playground run downloads the scientific stack from the Pyodide CDN. After that, plots render without a Python install.

## Original materials

Start at `_Index.htm` if you want the unwrapped 2018–2024 pages. Notebooks live under `Notebooks/`. Course datasets live under `data/`.

Housekeeping credit from the source pages: **Prof. Richard G. Baldwin**, Austin Community College. Interactive shell added 2026.
