import express from 'express';
import cors from 'cors';
import { UploadJet, UploadOptions } from '@upload-jet/express';

const app = express();
const router = express.Router();
const port = 3001;
const API_KEY = 'example-api-key';
const URL = 'http://localhost:3000';

app.use(cors());

const uploadJet = new UploadJet({ apiKey: API_KEY, url: URL });
const uploadRouteConfig: UploadOptions = {
  fileType: 'image',
  maxFileSize: '1MB',
  public: true,
  setFileName: (req: Request, fileName: string) => {
    return fileName;
  }
};

router.post('/images', uploadJet.createUploadRoute(uploadRouteConfig));

app.use('/api', router);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
