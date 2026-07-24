# Mend Social Publisher

One approved insight powers both the in-app Mend Notes library and a complete branded social package.

## Publish a note

1. Add or edit an item in `content/insights.json`.
2. Keep new work at `"status": "draft"` until its claim, source, sample, caveat, caption, and alt text are reviewed.
3. Run `npm run content:check`.
4. Change the reviewed item to `"status": "published"`.
5. Run `npm run social:generate -- --id your-insight-id`.

The package appears in `social/generated/your-insight-id/` with:

- Three 1080x1350 Instagram carousel slides.
- Three 1080x1920 story slides.
- `caption.txt` with source and hashtags.
- `alt-text.txt` for accessible publishing.
- `manifest.json` recording the exact source and generated files.

Generate every published note with `npm run social:generate`. Use `--out /absolute/path` to send output somewhere else.

## Editorial rules

- Use a primary paper, official public-health source, or first-party resource URL.
- State what the study found without converting association into causation.
- Keep the sample and limitation visible in the app.
- Do not use a statistic without enough context to interpret it.
- Safety resources, crisis help, and the app's educational-not-therapy framing are never paywalled.
- Social copy invites reflection; it never diagnoses a partner or promises an outcome.
