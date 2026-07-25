import app from './app.js';
import { connectDatabase } from './config/database.js';

const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

async function startServer(): Promise<void> {
  try {
    await connectDatabase();
    app.listen(port, '0.0.0.0', () => {
      console.log(`Octofit Tracker API is running at ${baseUrl}`);
    });
  } catch (error) {
    console.error('Unable to start the Octofit Tracker API:', error);
    process.exit(1);
  }
}

void startServer();
