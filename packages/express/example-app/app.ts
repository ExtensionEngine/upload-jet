import express from 'express';
import { UploadJet } from '../src/index.ts';

const app = express();
const PORT = 3001;
const API_KEY = 'example-api-key';

const uploadJet = new UploadJet({ apiKey: API_KEY });
const uploadRouteConfig = {
  fileType: 'image',
  maxFileSize: '1MB',
  public: true,
  setFileName: (req, fileName) => {
    return fileName;
  }
};

app.use('/api/example', uploadJet.createUploadRoute(uploadRouteConfig));

app.listen(PORT, () => {
  console.log('App is listening on port ' + PORT);
});
