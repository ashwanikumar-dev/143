# 💌 How to Personalize "A Little Step Forward"

All content and customizable text in this experience lives in one single file:
**`src/config/content.ts`**

You do not need to touch any code or component files to personalize the experience!

---

## 1. Quick Personalization Checklist

Open `src/config/content.ts` and replace the clearly labeled placeholders:

### Your Names & Meta
- `meta.senderName`: Replace `[YOUR NAME]` with your name or nickname.
- `meta.recipientName`: Replace `[HER NAME]` with her name or pet name.

### The Apology Letter (Chapter 1)
- `letter.greeting`: e.g., `"My dearest Sarah,"`
- `letter.paragraphs`: Your sincere, heartfelt thoughts written in your own voice.
- `letter.signature`: Your sign-off and name.

### Inside Jokes & Memories (Chapters 3, 4, 5)
- `personal.insideJokes`: Add funny memories or silly phrases only the two of you share.
- `quiz.questions`: Customize questions with real memories or habits.
- `usQuiz.questions`: Shared milestones (where you first met, favorite trips, special dates).

### Photos (Chapter 7)
1. Drop your favorite photos into the `public/photos/` folder.
2. In `src/config/content.ts`, update `memories.photos` with matching filenames (e.g. `src: '/photos/our-first-trip.webp'`).
3. Add handwritten captions and dates!

### The Finale (Chapter 9)
- `finale.apologyMessage`: Your closing thoughts.
- `finale.promises`: 3 commitments you genuinely want to make to her.
- `finale.closingMessage`: Warm final reassurance.

---

## 2. Deploying to Vercel or Netlify

1. Push this project to GitHub.
2. Connect your repository to [Vercel](https://vercel.com) or [Netlify](https://netlify.com).
3. The default settings (Framework: Next.js) will build automatically (`npm run build`).
4. Share the generated link with her on a quiet evening!
