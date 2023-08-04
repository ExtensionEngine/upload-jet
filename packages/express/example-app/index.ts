import express from 'express';
import { UploadJet } from '../src/index';

const app = express();
const router = express.Router();
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

router.post('/api/example', uploadJet.createUploadRoute(uploadRouteConfig));

app.use(router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
