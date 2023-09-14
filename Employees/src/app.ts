import express from 'express';
import router from './routes';
import cors from 'cors'
class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.routes();
  }

  private config():void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private routes(): void {
    this.app.use(router);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export default App 