# Optional Audio Setup

The public template does not include music. This avoids redistributing a
copyrighted or personal recording.

1. Use an audio file that you created, licensed, or have permission to share.
2. Place it in `public/media/`, for example
   `public/media/birthday-song.mp3`.
3. Set `musicPath` in `src/templateContent.js`:

```js
musicPath: "/media/birthday-song.mp3",
```

Leave `musicPath` empty to hide the music control.
