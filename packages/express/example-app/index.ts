import express, { Express } from 'express';
import { UploadJet } from '../src/index';

const app: Express = express();
const port = 3001;
const API_KEY = 'example-api-key';

const uploadJet = new UploadJet({ apiKey: API_KEY });
const uploadRouteConfig = {
  fileType: 'image',
  maxFileSize: '1MB',
  public: true,
  setFileName: (req: Request, fileName: string) => {
    return fileName;
  }
};

app.use('/api/example', uploadJet.createUploadRoute(uploadRouteConfig));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
