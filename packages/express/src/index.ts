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
import { createUploadPolicyBodySchema } from './schema/createUploadPolicyBody.dto';
import * as bytes from 'bytes';

const API_URL = 'http://localhost:3000';

export class UploadJet {
  #apiKey: string;

  constructor(config: UploadJetConfig) {
    const data = uploadJetConfigSchema.parse(config);
    this.#apiKey = data.apiKey;
  }

  createUploadRoute(config: UploadRouteConfig) {
    const routeConfig = uploadRouteConfigSchema.parse(config);

    return (req: express.Request, res: express.Response) => {
      return express.json()(req, res, async () => {
        const uploadPolicyBodyResult =
          await createUploadPolicyBodySchema.safeParseAsync(req.body);

        if (uploadPolicyBodyResult.success === false) {
          return res.status(400).send(uploadPolicyBodyResult.error);
        }

        const policyData = uploadPolicyBodyResult.data.files
          .map(name => {
            const fileName = routeConfig.setFileName
              ? routeConfig.setFileName(req, name)
              : `${uuidv4()}-${name}`;

            return {
              name,
              fileName
            };
          })
          .reduce((previous, { name, fileName }) => {
            const policyRules = {
              key: fileName,
              maxFileSize: bytes.parse(routeConfig.maxFileSize),
              fileType: routeConfig.fileType,
              public: routeConfig.public
            };

            return { ...previous, [name]: policyRules };
          }, {});

        const url = new URL('upload-policy', API_URL);
        const response = await axios.post(url.href, policyData);

        return res.json(response.data);
      });
    };
  }
}
