# Notes for coding agents

This is a plain HTML and CSS portfolio site published with GitHub Pages from the main branch (folder: root). There is no build step.

## Structure

- `index.html`: home page with the Projects grid and the About section.
- `projects/<slug>.html`: one page per project. Copy the layout of an existing project page.
- `css/styles.css`: shared styles. Reuse the existing classes (`.project`, `figure`, `.card`, `.tag`) before adding new ones.
- `projects/<slug>/`: images and data files that belong to one project.

## Adding a project

1. Create `projects/<slug>.html` using the same header, footer and `.project` layout as the other project pages.
2. Add a card for it to the Projects grid in `index.html`, with a tag (Analytics, Design, or another short label), a title and one sentence.
3. Keep every page readable on a phone.

## Rules

- Do not commit private files (resumes, transcripts, anything with personal details).
- Keep the writing plain and short.
