/**
 * TEMPLATE CONTENT
 *
 * Replace the bracketed values before publishing a customized copy.
 * Do not commit private photos, personal messages, or licensed audio unless
 * everyone involved has consented and you have the right to distribute them.
 */
export const templateContent = {
  recipientName: "[RECIPIENT NAME]",
  age: "[AGE]",
  senderName: "[YOUR NAME]",
  message: [
    "[WRITE YOUR BIRTHDAY MESSAGE HERE.]",
    "[ADD ANOTHER SHORT PARAGRAPH OR DELETE THIS PLACEHOLDER.]",
    "[END WITH A WARM WISH FOR THE YEAR AHEAD.]",
  ],
  footerText: "Made with care using the Birthday Surprise Template",

  /**
   * Replace each placeholder path with a photo stored under public/media.
   * Keep private media out of Git when preparing a public repository.
   */
  photos: [
    {
      id: 1,
      src: "/placeholders/photo-placeholder.svg",
      alt: "Template photo placeholder 1",
      caption: "[PHOTO CAPTION 1]",
      rotation: -3,
      position: { x: 15, y: 10 },
    },
    {
      id: 2,
      src: "/placeholders/photo-placeholder.svg",
      alt: "Template photo placeholder 2",
      caption: "[PHOTO CAPTION 2]",
      rotation: 2,
      position: { x: 45, y: 5 },
    },
    {
      id: 3,
      src: "/placeholders/photo-placeholder.svg",
      alt: "Template photo placeholder 3",
      caption: "[PHOTO CAPTION 3]",
      rotation: -1,
      position: { x: 75, y: 10 },
    },
    {
      id: 4,
      src: "/placeholders/photo-placeholder.svg",
      alt: "Template photo placeholder 4",
      caption: "[PHOTO CAPTION 4]",
      rotation: 4,
      position: { x: 25, y: 50 },
    },
    {
      id: 5,
      src: "/placeholders/photo-placeholder.svg",
      alt: "Template photo placeholder 5",
      caption: "[PHOTO CAPTION 5]",
      rotation: -2,
      position: { x: 65, y: 40 },
    },
  ],
};
