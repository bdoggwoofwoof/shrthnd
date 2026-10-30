# Shrthnd

Learn Gregg, Teeline or Pitman shorthand: animated strokes, rules, words, short forms, reading, drills with reviews that come due, a timed test, a writing pad, speed dictation (40 to 100 wpm) and a look-up for any word.

A single static page (`index.html`) with no build step. It installs to the home screen and works offline (`sw.js`).
Progress is saved on the device; Help can save and restore a backup file.

## Files
- `index.html`: the app, with all lesson data inline
- `sw.js`: offline cache (bump happens automatically: the version is a hash of index.html)
- `gdict/a.json` to `z.json`: about 13,100 outlines cut from the 1930 Gregg Shorthand Dictionary (public domain, via greggdict scans), as `{word: [base64 PNG, width, height, page]}`
- `pitman-words.json`: about 2,100 Pitman outlines drawn from New Era rules
- `teeline-outlines.json`, `teeline-specials.json`: Teeline letter data from teeline.online (MIT)

## Credits
Teeline outlines and the word generator: [teeline.online](https://teeline.online) (MIT). Gregg scans: [greggdict](https://github.com/richyliu/greggdict); Gregg strokes checked against [Grascii](https://github.com/grascii/grascii) (MIT). Pitman strokes checked against [pitman-translator](https://github.com/squablyscientist/pitman-translator) (MIT) and [Long Live Pitman's Shorthand](https://long-live-pitmans-shorthand.org.uk).
