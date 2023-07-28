import axios from 'axios';
import * as express from 'express';
import {
  UploadJetConfig,
  uploadJetConfigSchema
} from './schema/uploadJetConfig.dto';
import {
  UploadRouteConfig,
  uploadRouteConfigSchema
} from './schema/UploadRouteConfig.dto';
import { v4 as uuidv4 } from 'uuid';

export class UploadJet {
  #apiKey: string;

  constructor(config: UploadJetConfig) {
    const data = uploadJetConfigSchema.parse(config);
    this.#apiKey = data.apiKey;
  }

  createUploadRoute(config: UploadRouteConfig) {
    const routeConfig = uploadRouteConfigSchema.parse(config);

    return (req: any, res: any, next: any) => {
      return express.json()(req, res, async () => {
        const fileNames = req.body.fileNames;

        if (!fileNames || !fileNames.length) {
          throw new Error('Missing file names');
        }

        const policyData = {};
        fileNames.forEach((name: string) => {
          const fileName = routeConfig.setFileName
            ? routeConfig.setFileName(req, name)
            : `${uuidv4()}-${name}`;

          policyData[name] = {
            key: fileName,
            maxFileSize: routeConfig.maxFileSize,
            fileType: routeConfig.fileType,
            public: routeConfig.public
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
