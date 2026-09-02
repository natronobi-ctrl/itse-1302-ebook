#!/usr/bin/env python3
"""Serve the interactive ebook on http://127.0.0.1:8000"""

from __future__ import annotations

import argparse
import functools
import http.server
import os
import socketserver
import sys
import webbrowser

ROOT = os.path.dirname(os.path.abspath(__file__))


class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        sys.stderr.write("  " + (format % args) + "\n")


def main() -> int:
    parser = argparse.ArgumentParser(description="Serve the ITSE-1302 interactive ebook.")
    parser.add_argument("--port", type=int, default=8000)
    parser.add_argument("--no-browser", action="store_true")
    args = parser.parse_args()

    os.chdir(ROOT)
    handler = functools.partial(Handler, directory=ROOT)
    try:
        server = socketserver.TCPServer(("127.0.0.1", args.port), handler)
    except OSError as exc:
        print(f"Could not bind port {args.port}: {exc}", file=sys.stderr)
        return 1

    url = f"http://127.0.0.1:{args.port}/"
    print(f"ITSE-1302 ebook is at {url}", flush=True)
    print("Press Ctrl+C to stop.", flush=True)
    if not args.no_browser:
        webbrowser.open(url)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
