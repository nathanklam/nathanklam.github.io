"""
Regenerate Nathan_Lam_Portfolio.pdf from portfolio_print.html.

    python build_portfolio_pdf.py

portfolio_print.html pulls its content from projects.js and index.html, so
after editing either of those, just rerun this script. It serves the site on
a temporary local port (the print page needs http to read index.html) and
prints it to PDF with headless Chrome or Edge. No packages to install.
"""

import functools
import http.server
import os
import shutil
import subprocess
import sys
import tempfile
import threading

ROOT = os.path.dirname(os.path.abspath(__file__))
OUTPUT = os.path.join(ROOT, "Nathan_Lam_Portfolio.pdf")

BROWSERS = [
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "google-chrome", "chromium", "chromium-browser", "chrome", "msedge",
]


def find_browser():
    for b in BROWSERS:
        if os.path.isfile(b):
            return b
        found = shutil.which(b)
        if found:
            return found
    sys.exit("Could not find Chrome or Edge. Install one, or add its path to BROWSERS.")


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def main():
    handler = functools.partial(QuietHandler, directory=ROOT)
    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    url = f"http://127.0.0.1:{server.server_address[1]}/portfolio_print.html"

    browser = find_browser()
    with tempfile.TemporaryDirectory() as profile:
        subprocess.run([
            browser,
            "--headless=new",
            "--disable-gpu",
            "--no-pdf-header-footer",
            f"--user-data-dir={profile}",
            "--virtual-time-budget=15000",
            f"--print-to-pdf={OUTPUT}",
            url,
        ], check=True, timeout=180, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    server.shutdown()
    print(f"Wrote {OUTPUT}")


if __name__ == "__main__":
    main()
