import axios from 'axios';
import * as express from 'express';
import {
  UploadJetConfig,
  uploadJetConfigSchema
} from './schema/uploadJetConfig.dto';
import { UploadOptions, uploadOptionsSchema } from './schema/UploadOptions.dto';
import { v4 as uuidv4 } from 'uuid';
import { createUploadPolicyBodySchema } from './schema/createUploadPolicyBody.dto';
import * as bytes from 'bytes';

const API_URL = 'http://localhost:3000';
const BAD_REQUEST = 400;

export class UploadJet {
  #apiKey: string;

  constructor(config: UploadJetConfig) {
    const data = uploadJetConfigSchema.parse(config);
    this.#apiKey = data.apiKey;
  }

  createUploadRoute(options: UploadOptions) {
    const routeConfig = uploadOptionsSchema.parse(options);

    return (req: express.Request, res: express.Response) => {
      return express.json()(req, res, async () => {
        const uploadPolicyBodyResult =
          await createUploadPolicyBodySchema.safeParseAsync(req.body);

        if (uploadPolicyBodyResult.success === false) {
          return res.status(BAD_REQUEST).send(uploadPolicyBodyResult.error);
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
