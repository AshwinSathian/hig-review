# Security

loupe runs scripts in three places:

- **In the Playwright MCP server process.** `scripts/measure-runner.js` is passed to the server's `browser_run_code_unsafe` tool, which runs code with full access to the browser automation API. The runner reads one file, the skill's own `scripts/measure.js`, and drives the page through the width, colour-scheme and motion combinations.
- **Inside the web page under review.** `measure.js` and `type-eval.js` read computed styles, layout and fonts and return measurements. They write no files. `type-eval.js` asks the page's own fonts to load their subsets for its coverage test, which can make the page request font files; neither script sends data anywhere else.
- **As Python on your machine.** `scripts/contrast.py` and `scripts/png_contrast.py` read only the files and values you pass them.

If you find a way for a reviewed page, a repository, or a web search result to make the skill run commands, write files, or send data somewhere, please report it privately through [GitHub's private vulnerability reporting](https://github.com/AshwinSathian/loupe/security/advisories/new) rather than a public issue. Include the page or input that triggers it and what happened.

Only the latest release is supported.
