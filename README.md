# ITSE-1302 Scientific Python

Interactive edition of Prof. Richard G. Baldwin’s *Computer Programming: Scientific Python* courseware (Austin Community College).

This is a **private** repo, same setup as [psychic-pancake](https://github.com/natronobi-ctrl/psychic-pancake). The original lessons, notebooks, and datasets are unchanged. A reader around them adds search, progress, quizzes, live stats labs, and an in-browser Python playground.

## Getting started

You need **Python 3** and a current browser. No extra packages.

### 1. Clone the repo

```bash
git clone https://github.com/natronobi-ctrl/itse-1302-ebook.git
cd itse-1302-ebook
```

If GitHub asks you to sign in, use the `natronobi-ctrl` account. The repo is private, so a clone without access will fail.

### 2. Start the reader

```bash
python3 serve.py
```

That should open [http://127.0.0.1:8000/](http://127.0.0.1:8000/). If the browser does not open, paste that address yourself.

Use the server. Opening `index.html` as a file often blocks lessons and the Python playground.

If port 8000 is already taken:

```bash
python3 serve.py --port 8765
```

Stop the server with `Ctrl+C`.

### 3. Follow the in-app guide

Once the reader loads, open **How to use this ebook** at the top of the sidebar, or go to:

[http://127.0.0.1:8000/#/guide](http://127.0.0.1:8000/#/guide)

That page is the walkthrough: how to read a lesson, run a lab, take a quiz, and try the playground.

## What you can do

| In the sidebar | What it is |
| --- | --- |
| Lessons | Original course HTML, shown in the reader |
| Lab | Live chart you can drag, type into, or resample |
| Quiz | Original review questions with hidden answers and a score |
| Python playground | NumPy + Matplotlib in the browser (Pyodide) |

Progress (visited pages and quiz scores) stays in this browser only. It is not uploaded.

The first playground **Run** downloads the scientific stack from the Pyodide CDN. After that, plots work without a local Python scientific install. You do need a network connection for that first run.

## If something looks wrong

- **Blank lesson pane.** You are probably on `file://`. Run `python3 serve.py` instead.
- **`Could not bind port 8000`.** Another process is using it. Pass `--port` as above.
- **Playground stuck on “Loading Python…”.** Check the network, wait for the first download, then click Run again.
- **Want the old pages with no chrome.** Open `_Index.htm` through the same server: [http://127.0.0.1:8000/_Index.htm](http://127.0.0.1:8000/_Index.htm).

## What’s in the folder

- `index.html` / `interactive/` — the reader
- `serve.py` — local web server
- `*.htm`, `*.html` — original lessons and exported notebooks
- `Notebooks/` — Jupyter sources
- `data/` — CSVs used by the exercises

Original courseware: **Prof. Richard G. Baldwin**, Austin Community College. Interactive shell added 2026.
