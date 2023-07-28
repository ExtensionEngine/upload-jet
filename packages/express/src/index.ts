import { UploadJetConfig, UploadRouteConfig } from 'types';
import axios from 'axios';
import * as express from 'express';

export class UploadJet {
  #apiKey: string;

  constructor(config: UploadJetConfig) {
    this.#apiKey = config.apiKey;
  }

  createUploadRoute(config: UploadRouteConfig) {
    return (req: any, res: any, next: any) => {
      return express.json()(req, res, async () => {
        const fileNames = req.body.fileNames;

        if (!fileNames || !fileNames.length) {
          throw new Error('Missing file names');
        }

        const policyData = {};
        fileNames.forEach((name: string) => {
          const fileName = config.setFileName
            ? config.setFileName(req, name)
            : name;

          policyData[name] = {
            key: fileName,
            maxFileSize: config.maxFileSize,
            fileType: config.fileType,
            public: config.public
          };
        });

        const response = await axios.post(
          'http://localhost:3000/upload-policy',
          policyData
        );

        return res.json(response.data);
      });
    };
  }
}
