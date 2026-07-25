# OctoFit Tracker presentation tier

The React 19 frontend uses Vite, React Router, and Bootstrap. From the repository
root, install dependencies and start it with:

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```

## API environment

When running in GitHub Codespaces, `VITE_CODESPACE_NAME` must be defined. Add it
to `octofit-tracker/frontend/.env.local` using your Codespace name:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend then calls
`https://<codespace-name>-8000.app.github.dev/api/...`. When the variable is
unset, it safely falls back to `http://localhost:8000` for local development.
