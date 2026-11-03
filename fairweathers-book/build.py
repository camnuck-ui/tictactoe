"""Builds otis-says-hello.html: Flying Fairweathers Ep 3 (Hong Kong) picture book.

Run:  python build.py
Then: render the PDF with render_pdf.ps1 (Edge headless).
"""
import html
import io

BW, BH = 1100, 619  # photo box, same 16:9 as the stills


def crop(img, fx=0.5, fy=0.5, z=1.0, bw=BW, bh=BH):
    """Background-style crop of a 16:9 still: focus point (fx, fy), zoom z, into a bw x bh box."""
    w = max(bw, bh * 16 / 9) * z
    h = w * 9 / 16
    ox = min(0, max(bw - w, bw / 2 - fx * w))
    oy = min(0, max(bh - h, bh / 2 - fy * h))
    return (
        f"background-image:url(assets/{img});"
        f"background-size:{w:.0f}px {h:.0f}px;"
        f"background-position:{ox:.0f}px {oy:.0f}px;"
    )


# ---- crayon doodles (inline SVG) -------------------------------------------
def svg(w, h, body):
    return f'<svg width="{w}" height="{h}" viewBox="0 0 {w} {h}" xmlns="http://www.w3.org/2000/svg">{body}</svg>'


KITE_PATH = "M0,0 C-30,-24 -72,-20 -104,12 C-72,0 -42,4 -16,20 L0,36 L16,20 C42,4 72,0 104,12 C72,-20 30,-24 0,0 Z"


def kite(x, y, s=1.0, rot=0):
    return (
        f'<g transform="translate({x},{y}) rotate({rot}) scale({s})">'
        f'<path d="{KITE_PATH}" fill="#4a3b34" stroke="#2b211d" stroke-width="3" stroke-linejoin="round"/>'
        f'</g>'
    )


D_HARBOR = svg(150, 110,
    '<rect x="8" y="46" width="22" height="40" fill="#f2c94c" stroke="#555" stroke-width="2.5"/>'
    '<rect x="34" y="28" width="20" height="58" fill="#6fb3ea" stroke="#555" stroke-width="2.5"/>'
    '<rect x="58" y="52" width="24" height="34" fill="#f09ac0" stroke="#555" stroke-width="2.5"/>'
    '<path d="M84,86 C96,44 118,30 144,48 L144,86 Z" fill="#7cc576" stroke="#555" stroke-width="2.5"/>'
    '<path d="M4,86 L146,86" stroke="#555" stroke-width="2.5"/>'
    '<path d="M8,96 q9,-9 18,0 t18,0 t18,0 t18,0 t18,0 t18,0" fill="none" stroke="#3d8fd1" stroke-width="3"/>'
    '<path d="M18,104 q9,-9 18,0 t18,0 t18,0 t18,0 t18,0" fill="none" stroke="#3d8fd1" stroke-width="3"/>')

D_KITE = svg(150, 110,
    '<g transform="translate(75,50) scale(.62)"><path d="' + KITE_PATH + '" fill="#4a3b34" stroke="#2b211d" stroke-width="4"/></g>'
    '<path d="M22,98 q6,-12 0,-22 M75,102 q6,-12 0,-22 M128,98 q6,-12 0,-22" fill="none" stroke="#e07a3f" stroke-width="3.5" stroke-linecap="round"/>')

D_BUN = svg(150, 110,
    '<ellipse cx="62" cy="62" rx="48" ry="38" fill="#eaa94d" stroke="#8a5a1f" stroke-width="3"/>'
    '<path d="M28,46 L96,84 M40,36 L110,72 M22,62 L82,96 M52,30 L112,58 M94,34 L36,84 M110,50 L50,92 M78,28 L28,60 M112,68 L66,96" stroke="#c9822c" stroke-width="2.5"/>'
    '<g transform="translate(118,52)"><path d="M0,6 C-12,6 -14,34 0,40 C14,34 12,6 0,6Z" fill="#f2c94c" stroke="#555" stroke-width="2.5"/>'
    '<path d="M0,6 L-8,-8 M0,6 L0,-12 M0,6 L8,-8" stroke="#4aa35a" stroke-width="3.5" stroke-linecap="round"/></g>'
    '<path d="M96,92 L140,48 M140,92 L96,48" stroke="#d93b3b" stroke-width="5" stroke-linecap="round"/>')

D_TRAM = svg(170, 110,
    '<path d="M6,100 L164,40" stroke="#8a6b4a" stroke-width="4" stroke-linecap="round"/>'
    '<g transform="rotate(-20 85 60)"><rect x="36" y="34" width="98" height="44" rx="10" fill="#2f7d4f" stroke="#1b4a2e" stroke-width="3"/>'
    '<rect x="46" y="42" width="18" height="18" rx="3" fill="#cfe9f7" stroke="#1b4a2e" stroke-width="2"/>'
    '<rect x="70" y="42" width="18" height="18" rx="3" fill="#cfe9f7" stroke="#1b4a2e" stroke-width="2"/>'
    '<rect x="94" y="42" width="18" height="18" rx="3" fill="#cfe9f7" stroke="#1b4a2e" stroke-width="2"/>'
    '<rect x="36" y="64" width="98" height="5" fill="#e8d9a0"/>'
    '<circle cx="54" cy="82" r="7" fill="#444"/><circle cx="116" cy="82" r="7" fill="#444"/></g>')

D_PLANE = svg(110, 70,
    '<path d="M8,38 C30,18 70,16 100,34 C70,52 30,54 8,38Z" fill="#9fc5e8" stroke="#4a6fa5" stroke-width="3"/>'
    '<path d="M50,30 L36,8 L64,26Z M50,44 L38,64 L64,46Z" fill="#9fc5e8" stroke="#4a6fa5" stroke-width="3"/>'
    '<circle cx="84" cy="32" r="3" fill="#333"/><path d="M88,40 q5,3 9,-1" fill="none" stroke="#333" stroke-width="2.5"/>')

D_HEART = svg(40, 36, '<path d="M20,34 C-8,14 6,-4 20,10 C34,-4 48,14 20,34Z" fill="#f08aa8" stroke="#c4506e" stroke-width="2.5"/>')


# ---- building blocks -----------------------------------------------------------
def fact(doodle, text, rot=-2, cls=""):
    return (f'<div class="note fact {cls}" style="transform:rotate({rot}deg)"><span class="tape"></span>'
            f'<div class="dd">{doodle}</div><p>{text}</p></div>')


def step(n, text, rot=2):
    return (f'<div class="step" style="transform:rotate({rot}deg)"><b>{n}</b><span>{text}</span></div>')


def word_card(rot=-1.5):
    return (f'<div class="note wordcard" style="transform:rotate({rot}deg)"><span class="tape"></span>'
            '<div class="lab">Rudder\'s word</div><div class="zh">唔該</div>'
            '<div class="say">mm-GOY</div><p>Thank you, when someone helps you.</p></div>')


def story_page(n, title, text, img, c=None, stickers="", overlay=""):
    c = c or {}
    paras = "".join(f"<p>{p}</p>" for p in text)
    return f'''
<section class="page story">
  <div class="ribbon"><span>{html.escape(title)}</span></div>
  <div class="photo"><div class="pic" style="{crop(img, **c)}">{overlay}</div><span class="tape t1"></span><span class="tape t2"></span></div>
  <div class="stickers">{stickers}</div>
  <div class="text">{paras}</div>
  <div class="pno">{n}</div>
</section>'''


def q(s):
    return s.replace("“", "&ldquo;").replace("”", "&rdquo;").replace("’", "&rsquo;")


pages = []

# 1 · cover --------------------------------------------------------------------
pages.append('''
<section class="page cover" style="background-image:url(assets/arrival-bluebell.jpg)">
  <div class="cover-band">
    <div class="series">The Flying Fairweathers &middot; Episode 3 &middot; Hong Kong</div>
    <h1>Otis Says Hello</h1>
    <div class="cover-sub">A story about feeling shy &mdash; and one small wave.</div>
  </div>
</section>''')

# 2 · meet the crew --------------------------------------------------------------
pages.append('''
<section class="page crew">
  <div class="ribbon wide"><span>Meet the Fairweathers!</span></div>
  <div class="lineup"><img src="assets/lineup-crop.jpg" alt="">
    <span style="left:18%">Otis</span><span style="left:34%">Kit</span><span style="left:49%">Gus</span>
    <span style="left:67%">Mom</span><span style="left:86%">Dad &amp; Rudder</span></div>
  <div class="note pawcard"><span class="tape"></span>
    <div class="pawpic" style="''' + crop("tram-station.jpg", fx=0.5, fy=0.36, z=1.5, bw=310, bh=310) + '''"></div>
    <div class="cap">Paw-Paw <small>Mom&rsquo;s mom &mdash; and today&rsquo;s big hello!</small></div></div>
  <div class="pno">2</div>
</section>''')

# 3 · where to ---------------------------------------------------------------------
pages.append(story_page(3, "Where to?", [q(
    "One morning in Maple Cove, Mom spun the globe. “Guess where Bluebell flies today? We’re going to see Paw-Paw!”"),
    q("Kit cheered. But Otis hugged his little blue plane tight. “I only know Paw-Paw from the computer,” he whispered.")],
    "kitchen-globe.jpg", stickers=f'<div class="doodle" style="left:40px;top:10px">{D_PLANE}</div>'))

# 4 · it's okay to go quiet --------------------------------------------------------
pages.append(story_page(4, "It’s okay to go quiet", [q(
    "“What if I go all quiet?” asked Otis."),
    q("Dad crouched down beside him. “Then you go quiet, buddy. That’s okay.”"),
    q("Otis looked at the globe. “But… why is it called Hong Kong?”"),
    q("“It means <b>fragrant harbor</b>,” said Mom. “Fragrant? Like… smelly-nice?” Otis scrunched his nose.")],
    "kitchen-otis-leo.jpg",
    stickers=fact(D_HARBOR, "&ldquo;Hong Kong&rdquo; means <b>fragrant harbor</b>!", -2)))

# 5 · pre-flight (Gus) ----------------------------------------------------------------
pages.append(story_page(5, "Snug as a bun", [q(
    "On Bluebell, Gus held up a paper bakery bag. “Tuck your bag under the seat, snug as a bun!”"),
    q("Click, click went the seatbelts. Gus crouched beside Otis. “My tummy feels wiggly,” Otis whispered."),
    q("“New hellos make my tummy wiggle too,” said Gus kindly. “You don’t have to be brave all at once.”")],
    "cabin.jpg",
    stickers='<div class="note gus" style="transform:rotate(3deg)"><span class="tape"></span><img src="assets/gus.jpg" alt=""><div class="cap">Gus</div></div>'))

# 6 · the flight ------------------------------------------------------------------------
pages.append(story_page(6, "Up in the clouds", [q(
    "Above the soft white clouds, the flight was calm and smooth."),
    q("“Paw-Paw loves riding the tram up the Peak to watch the black kites,” said Mom."),
    q("“I’ll say hi first,” said Kit. “Then you can just wave.” “A wave,” Otis whispered. “I can do a wave.”"),
    q("Then Dad’s voice crackled over the speaker: “What’s a pilot’s favorite snack? Plane crackers!” Otis giggled.")],
    "flight-otis.jpg"))

# 7 · meet Paw-Paw ------------------------------------------------------------------------
pages.append(story_page(7, "Hello, Paw-Paw!", [q(
    "At the Peak Tram station, there she was! Kit hurried into a great big hug."),
    q("Otis hid behind Dad’s leg at first. Paw-Paw crouched down, a few steps away, and spoke to his little blue plane."),
    q("“Hello, little plane. Do you like trains?”"),
    q("Otis lifted one hand and gave a tiny wave. Paw-Paw waved back, just as tiny.")],
    "tram-station.jpg", stickers=step(1, "a tiny wave")))

# 8 · share a table -------------------------------------------------------------------------
pages.append(story_page(8, "Can we share?", [q(
    "The café was so busy! Every little table was full. Paw-Paw smiled at a grandpa at a big round table. “Can we share, please?”"),
    q("“Please, sit!” he said. “Mm-GOY,” said Paw-Paw."),
    q("Kit was giggling with Rudder and missed it. But Otis watched closely. “In a busy café, we share tables,” Paw-Paw whispered. “You just ask nicely.”")],
    "cafe-share.jpg", stickers=word_card()))

# 9 · pineapple buns -----------------------------------------------------------------------------
pages.append(story_page(9, "Pineapple buns", [q(
    "Then came warm, golden pineapple buns! “Pineapple! My favorite fruit!” said Dad."),
    q("He broke his bun open and peered inside. “Wait… where’s the pineapple?”"),
    q("Paw-Paw laughed. “There’s no pineapple in a pineapple bun! The crunchy sugar top just looks like pineapple skin.”"),
    q("“Still delicious!” said Dad.")],
    "cafe-buns.jpg",
    stickers=fact(D_BUN, "No pineapple in a <b>pineapple bun</b>! The sugar top just looks like pineapple skin.", 2)))

# 10 · tram up --------------------------------------------------------------------------------------
pages.append(story_page(10, "Up, up, up!", [q(
    "Up, up, up the steep hill went the little green tram."),
    q("“I rode this tram every Saturday,” said Paw-Paw, “when I was Otis’s size.”"),
    q("“Look!” giggled Kit. “The buildings are leaning!”"),
    q("“They only look tipped,” Paw-Paw laughed. “The hill is so steep, it tricks your eyes.”")],
    "tram-station.jpg", c=dict(fx=0.8, fy=0.45, z=1.3), stickers=f'<div class="doodle" style="left:30px;top:0">{D_TRAM}</div>'))

# 11 · black kites ------------------------------------------------------------------------------------
kites_overlay = svg(BW, BH, kite(240, 85, .85, -8) + kite(600, 50, .65, 6) + kite(980, 120, .75, -5))
pages.append(story_page(11, "Black kites", [q(
    "At the top, the whole harbor sparkled far below. Black kites glided past on still wings. Rudder flapped and flapped."),
    q("Otis shuffled closer to Paw-Paw. “But… why don’t they flap?” he whispered."),
    q("“Good question!” Paw-Paw whispered back. “The sun warms the hill, and warm air rises. The kites ride it up, like an elevator.”")],
    "peak-terrace.jpg", c=dict(fx=0.78, fy=0.28, z=2.0),
    overlay=f'<div class="ovl">{kites_overlay}</div>',
    stickers=fact(D_KITE, "Black kites ride <b>warm air</b>, so they glide with only a few flaps!", -2) + step(2, "a whispered question", 3)))

# 12 · trouble --------------------------------------------------------------------------------------------
pages.append(story_page(12, "Every table is full!", [q(
    "Dad came back with hot egg waffles. “Kit, Otis, can you find us a place to sit?” asked Paw-Paw."),
    q("“Easy!” said Kit. She checked one table. Full! She checked another. Full!"),
    q("“Every table is full!” Kit’s shoulders drooped. “We’ll have to stand. Or wait forever.”")],
    "peak-terrace.jpg"))

# 13 · fix it ---------------------------------------------------------------------------------------------------
pages.append(story_page(13, "Otis asks", [q(
    "Otis looked around quietly. He spotted a round table with three empty stools."),
    q("“Kit,” he whispered, “we can share. Like Paw-Paw did at breakfast. You just ask nicely.”"),
    q("Otis took a big breath. “Hello. Can we share, please?”"),
    q("“Of course! Sit, sit,” said the dad. “Mm-GOY!” said Otis, beaming.")],
    "peak-terrace.jpg", c=dict(fx=0.5, fy=0.66, z=1.7), stickers=step(3, "ask &mdash; and say thank you", -2)))

# 14 · fly home ----------------------------------------------------------------------------------------------------
pages.append(story_page(14, "A little tram", [q(
    "“I’m good at watching,” Otis said with a shy grin. “The best watcher,” said Kit. “Thanks, Otis!”"),
    q("Before they flew home, Paw-Paw crouched down. “This was mine when I was little. Now it’s yours.”"),
    q("A toy Peak Tram! Otis set his little plane on top. Then he hugged Paw-Paw, all on his own. “Bye, Paw-Paw.”")],
    "tram-station.jpg", c=dict(fx=0.62, fy=0.5, z=1.5),
    stickers=fact(D_TRAM, "Paw-Paw&rsquo;s toy tram from when she was little &mdash; now it&rsquo;s <b>Otis&rsquo;s</b>!", -2)))

# 15 · journal ----------------------------------------------------------------------------------------------------------
pages.append('''
<section class="page journal" style="background-image:url(assets/journal-hongkong.jpg)">
  <div class="polaroid"><div class="ppic" style="background-image:url(assets/tram-station.jpg)"></div>
    <div class="pcap">Paw-Paw, Kit and Otis at the Peak!</div></div>
  <div class="pno light">15</div>
</section>''')

# 16 · the end ---------------------------------------------------------------------------------------------------------------
pages.append('''
<section class="page end">
  <div class="ribbon wide"><span>Start small</span></div>
  <div class="endcol">
    <p class="big">Feeling shy is okay. Start with one small hello.</p>
    <div class="steps3"><div><b>1</b>a tiny wave</div><div><b>2</b>a whispered question</div><div><b>3</b>&ldquo;Hello!&rdquo; and &ldquo;mm-GOY!&rdquo;</div></div>
    <div class="quiz"><h3>Can you remember?</h3>
      <p>What does &ldquo;Hong Kong&rdquo; mean? <i>Fragrant harbor!</i></p>
      <p>How do black kites glide? <i>They ride the warm air, like an elevator.</i></p>
      <p>What&rsquo;s inside a pineapple bun? <i>No pineapple!</i></p></div>
  </div>
  <div class="rudder"><div class="note wordcard big"><span class="tape"></span><img src="assets/rudder.jpg" alt="">
    <div class="zh">唔該</div><div class="say">mm-GOY!</div><p>Thank you, when someone helps you.</p></div></div>
  <div class="theend">The End</div>
  <div class="pno">16</div>
</section>''')

CSS = open("book.css", encoding="utf-8").read()
JS = open("book.js", encoding="utf-8").read()
out = f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Otis Says Hello</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;800&family=Nunito:wght@600;800&family=Patrick+Hand&display=swap" rel="stylesheet">
<style>{CSS}</style></head>
<body><div id="stage">{"".join(pages)}</div>
<div id="hud"><button id="prev">&larr;</button><span id="pos"></span><button id="next">&rarr;</button></div>
<script>{JS}</script></body></html>'''
with io.open("otis-says-hello.html", "w", encoding="utf-8") as f:
    f.write(out)
print("wrote otis-says-hello.html", len(pages), "pages")
