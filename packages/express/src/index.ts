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
import { FileNameArray, fileNameArraySchema } from './schema/fileNameArray.dto';

const API_URL = 'http://localhost:3000';

export class UploadJet {
  #apiKey: string;

  constructor(config: UploadJetConfig) {
    const data = uploadJetConfigSchema.parse(config);
    this.#apiKey = data.apiKey;
  }

  createUploadRoute(config: UploadRouteConfig) {
    const routeConfig = uploadRouteConfigSchema.parse(config);

    return (
      req: express.Request,
      res: express.Response,
      _next: express.NextFunction
    ) => {
      return express.json()(req, res, async () => {
        const fileNameArray: FileNameArray = req.body.fileName;
        const fileNamesResult = fileNameArraySchema.safeParse(fileNameArray);

        if (fileNamesResult.success === false) {
          return res.status(400).send(fileNamesResult.error);
        }

        const policyData = {};
        fileNamesResult.data.forEach((name: string) => {
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
          `${API_URL}/upload-policy`,
          policyData
        );

        return res.json(response.data);
      });
    };
  }
}
