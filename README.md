# Birthday Surprise Website Template

A customizable birthday website built with React and Vite. It includes:

- an animated birthday greeting
- an interactive five-candle cake
- music that starts after the final candle is blown out
- a scrapbook-style photo gallery
- a personal message section
- balloons, clouds, and confetti
- responsive desktop and mobile layouts

The repository ships with template text and placeholder artwork. Replace them
with your own content before deploying a personalized version.

## Requirements

- [Node.js](https://nodejs.org/) 20 or newer
- npm, included with Node.js

## Installation

Clone the repository and install its dependencies:

```bash
git clone https://github.com/Rishabh-77/Pookie.git
cd Pookie
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL printed in the terminal, normally
`http://localhost:5173`.

## Customize the text

All user-facing template content is centralized in
`src/templateContent.js`.

Update these values:

```js
export const templateContent = {
  recipientName: "Alex",
  age: "21st",
  senderName: "Sam",
  message: [
    "Happy birthday!",
    "Add your personal message here.",
    "Wishing you an excellent year ahead.",
  ],
  footerText: "Made with care",
  photos: [
    // Photo entries
  ],
};
```

The message is an array. Each item is displayed as a separate paragraph.

## Add photos

### 1. Copy the image files

Create or use the existing directory:

```text
public/media/
```

Copy your images into it:

```text
public/media/photo-1.jpg
public/media/photo-2.jpg
public/media/photo-3.jpg
public/media/photo-4.jpg
public/media/photo-5.jpg
```

The `public/media` directory is ignored by Git by default to prevent personal
photos from being committed accidentally.

### 2. Configure the gallery

Edit the `photos` array in `src/templateContent.js`:

```js
photos: [
  {
    id: 1,
    src: "/media/photo-1.jpg",
    alt: "Describe the people or moment in this photo",
    caption: "Our first adventure",
    rotation: -3,
    position: { x: 15, y: 10 },
  },
  {
    id: 2,
    src: "/media/photo-2.jpg",
    alt: "Describe the second photo",
    caption: "Coffee and conversations",
    rotation: 2,
    position: { x: 45, y: 5 },
  },
];
```

Add up to five entries for the intended scrapbook arrangement. The desktop
layout places three cards across the upper row and two overlapping cards below.
On smaller screens, the cards reorganize into two columns or one column.

The current layout uses the array order. The `position` values remain part of
the photo data format but do not control the scrapbook grid.

### Publishing photos

Because `public/media` is ignored, its files are not included when you push the
repository or deploy directly from Git.

If you intentionally want to publish your images:

1. Confirm that everyone shown has consented.
2. Remove private location and camera metadata from the files.
3. Confirm that you have permission to distribute the images.
4. Remove the `public/media` rules from `.gitignore`.
5. Add and commit the files deliberately.

Never commit private photos just to make a deployment work. A private storage
service or private repository may be more appropriate.

## Replace the music

The bundled track is:

```text
src/assets/hbd.mp3
```

Replace that file with another MP3 while keeping the same filename. The music
starts when the fifth candle is clicked or tapped, then loops until the visitor
pauses it with the music button.

Only distribute audio that you created, licensed, or have permission to use.

To use another filename, update this import in
`src/components/BackgroundMusic.jsx`:

```js
import birthdayAudio from "../assets/your-song.mp3";
```

## Candle interaction

Click or tap each flame once. After the fifth flame:

- the final candle is extinguished
- the celebration event runs
- the background track starts
- the music control becomes available

Browsers require sound to begin from a user interaction, which is why the
candles use click or tap rather than hover-only activation.

## Available commands

```bash
npm run dev          # Start the development server
npm run build        # Create a production build in dist/
npm run preview      # Preview the production build
npm run lint         # Run ESLint
npm run audit:public # Check for unexpected committed media files
```

Run the following before publishing changes:

```bash
npm run audit:public
npm run lint
npm run build
```

## Production deployment

The project produces a static site and can be deployed to services such as
GitHub Pages, Vercel, Netlify, Cloudflare Pages, or Render.

Typical settings:

```text
Build command: npm run build
Output directory: dist
```

If the site is hosted below a subpath instead of a domain root, configure
Vite's `base` option in `vite.config.js`.

## Project structure

```text
public/
  media/                    Private local photos; ignored by Git
  placeholders/             Publishable template artwork
src/
  assets/hbd.mp3            Birthday music
  components/               React interface and animation components
  templateContent.js        Names, message, captions, and photo paths
  index.css                 Global styles and scrapbook layout
scripts/
  audit-public.mjs          Public-media safety check
```

## Privacy checklist

Before making a customized repository public:

- search the source for real names and private messages
- inspect every tracked image, audio, and video file
- remove image metadata where appropriate
- run `npm run audit:public`
- inspect `git status` and `git diff --cached`
- confirm old sensitive files are not present in Git history
- remember that force-pushing rewritten history may not immediately purge
  cached commits from a Git hosting provider

## Contributing

Contributions are welcome. Keep changes focused, do not include personal or
unlicensed media, and run the audit, lint, and build commands before opening a
pull request.

## License

This project is available under the [MIT License](LICENSE).
