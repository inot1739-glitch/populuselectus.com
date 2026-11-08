#!/usr/bin/env python3
"""
PopulusElectus SEO cleanup.
Run from the repo root:  python3 fix_seo.py
1. Internal links /page.html  ->  /page  (matches the existing canonical tags)
2. Fixes the broken link /how-to-budget-your-money.html -> /how-to-budget-money
3. Adds a canonical tag to index.html
4. Rebuilds sitemap.xml with every page, extensionless
"""
import re, pathlib, datetime

ROOT = pathlib.Path(__file__).resolve().parent
SITE = "https://populuselectus.com"
TODAY = datetime.date.today().isoformat()

pages = sorted(p.stem for p in ROOT.glob("*.html"))
slugs = {s for s in pages if s != "index"}

BROKEN = {"how-to-budget-your-money": "how-to-budget-money"}

def fix_links(text):
    def repl(m):
        quote, slug = m.group(1), m.group(2)
        slug = BROKEN.get(slug, slug)
        if slug == "index":
            return f"{quote}/{quote[-1]}"
        if slug in slugs:
            return f"{quote}/{slug}{quote[-1]}"
        return m.group(0)
    # href="/x.html"  and  url: "/x.html"
    return re.sub(r'((?:href=|url:\s*)["\'])/([a-z0-9-]+)\.html["\']', repl, text)

changed = []
for f in list(ROOT.glob("*.html")) + list(ROOT.glob("*.js")):
    old = f.read_text(encoding="utf-8")
    new = fix_links(old)
    if f.name == "index.html" and 'rel="canonical"' not in new:
        new = new.replace("</title>",
                          f'</title>\n  <link rel="canonical" href="{SITE}/" />', 1)
    if new != old:
        f.write_text(new, encoding="utf-8")
        changed.append(f.name)

# Sitemap: all pages, extensionless
priority = {"index": "1.0", "mindset": "0.7", "productivity": "0.7",
            "career": "0.6", "finance": "0.6", "philosophy": "0.6",
            "about": "0.3", "contact": "0.3", "write-for-us": "0.3",
            "privacy": "0.1"}
urls = []
for s in pages:
    loc = f"{SITE}/" if s == "index" else f"{SITE}/{s}"
    urls.append(f"  <url>\n    <loc>{loc}</loc>\n    <lastmod>{TODAY}</lastmod>\n"
                f"    <priority>{priority.get(s, '0.8')}</priority>\n  </url>")
(ROOT / "sitemap.xml").write_text(
    '<?xml version="1.0" encoding="UTF-8"?>\n'
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + "\n".join(urls) + "\n</urlset>\n", encoding="utf-8")
changed.append("sitemap.xml")

print(f"{len(changed)} files updated:", ", ".join(sorted(changed)))
