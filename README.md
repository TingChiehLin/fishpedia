This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Fish ID (Local ML Setup)

The "Fish for Real" page can identify fish using a local Python model. Since the virtual environment is not committed to Git, each developer needs to set it up locally.

1. Create the virtual environment (from the repo root):
```bash
python3 -m venv .venv-fish3d
```

2. Install dependencies:
```bash
.venv-fish3d/bin/pip install torch torchvision transformers pillow
```

3. Start the app (port 3001 is used in this project):
```bash
npm run dev -- -H 127.0.0.1 -p 3001
```

Notes:
- The model weights are downloaded at first run to your local Hugging Face cache (e.g., `~/.cache/huggingface/`).
- The API route expects the Python path at `.venv-fish3d/bin/python` relative to the repo root.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
