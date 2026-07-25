import app from './app';
import { connectDatabase } from './config/database';

const PORT = 8000;
const codespaceName = process.env.CODESPACE_NAME;
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

async function startServer(): Promise<void> {
  try {
    await connectDatabase();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Octofit Tracker API is running at ${apiBaseUrl}`);
    });
  } catch (error) {
    console.error('Unable to start the Octofit Tracker API:', error);
    process.exit(1);
  }
}

void startServer();
