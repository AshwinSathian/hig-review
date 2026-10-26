# Security

loupe runs scripts in two places: inside the web page under review (through the Playwright MCP server) and as Python on your machine (`scripts/contrast.py`, `scripts/png_contrast.py`). The page scripts read computed styles and layout and return measurements. They make no network requests and write no files. The Python scripts read only the files and values you pass them.

If you find a way for a reviewed page, a repository, or a web search result to make the skill run commands, write files, or send data somewhere, please report it privately through [GitHub's private vulnerability reporting](https://github.com/AshwinSathian/loupe/security/advisories/new) rather than a public issue. Include the page or input that triggers it and what happened.

Only the latest release is supported.
