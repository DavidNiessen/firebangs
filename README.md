# Firebangs
Browser extension that allows the use of DuckDuckGo's Bangs in other search engines

### How does it work?

Imagine you want to search for something on a site like Wikipedia. Instead of going to the side and entering
the search query, you can do it all in one step with a simple "!" shortcut!

For example, the query `!yt complete java course` resolves to `https://www.youtube.com/results?search_query=complete+java+course`

### Update/modify Bangs

All Bangs are currently loaded from `assets/bangs.json`.
If you want the latest official Bangs, go to https://duckduckgo.com/bang.js
and replace the content of `assets/bangs.json` with it.

### Installation 

**For Firefox:**<br>
install the dist/*.xpi (signed) extension file

**For Chrome:** TODO

### Build/sign yourself

pnpm must be installed!<br>
Run `pnpm install` to install all dependencies.<br>

**For Firefox:**<br>
To only build the extension, run `pnpm run build`.
Please note that unsigned extensions can only be installed temporarily<br>

To sign it, you need to set the `WEB_EXT_API_KEY` and `WEB_EXT_API_SECRET` environment variables, 
which you can get from your Mozilla account. After that, run `pnpm run sign`

**For Chrome:** TODO

### Which browsers are supported?

This extension was tested on Chrome and Firefox.

### Important Links

List with all Bangs: https://duckduckgo.com/bang<br>
Bangs json: https://duckduckgo.com/bang.js