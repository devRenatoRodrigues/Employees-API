import express, { Request, Response } from 'express';
import router from './routes';
import cors from 'cors'
import { restResponseTimeHistogram, startMetricsServer, requestCounter } from './utils/metrics';
import responseTime from 'response-time';
class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.routes();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(cors());

    this.app.use(
      responseTime((req: Request, res: Response, time: number) => {
        if (req?.route?.path) {
          const routePath = req.route.path;

          requestCounter.labels(routePath).inc();

          restResponseTimeHistogram.observe(
            {
              method: req.method,
              route: req.route.path,
              status_code: res.statusCode,
            },
            time * 1000
          );
        }
      })
    );

  }

  private routes(): void {
    this.app.use(router);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
    startMetricsServer()
  }
}

export default App 