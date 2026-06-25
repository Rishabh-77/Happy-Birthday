# Birthday Surprise Website Template

A customizable React and Vite birthday website with an interactive cake,
animations, photo cards, a message section, and optional background music.
The public repository contains template placeholders only—no personal photos,
private messages, or bundled music.

## Quick start

```bash
npm install
npm run dev
```

## Customize the template

Edit `src/templateContent.js` to change:

- `[RECIPIENT NAME]`, `[AGE]`, and `[YOUR NAME]`
- the birthday message
- photo captions and image paths
- the footer text
- the optional music path

Place private media in `public/media/`. That directory is ignored by Git so
personal photos and audio are not accidentally committed. If you intend to
publish media, review consent, privacy, copyright, and image metadata first.

The included `public/placeholders/photo-placeholder.svg` is safe to publish and
shows where photos will appear.

## Safety check before publishing

```bash
npm run audit:public
npm run build
npm run lint
```

Also inspect `git status`, the staged diff, and the remote repository name
before making a repository public.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Security and privacy concerns can be
reported using [SECURITY.md](SECURITY.md).

## License

MIT — see [LICENSE](LICENSE).
