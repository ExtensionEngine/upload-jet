import axios from 'axios';
import * as express from 'express';
import {
  UploadJetConfig,
  uploadJetConfigSchema
} from './schema/uploadJetConfig.dto';
import {
  SetFileName,
  UploadOptions,
  uploadOptionsSchema
} from './schema/UploadOptions.dto';
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
    const uploadOptions = uploadOptionsSchema.parse(options);

    return (req: express.Request, res: express.Response) => {
      return express.json()(req, res, async () => {
        const uploadPolicyBodyResult =
          await createUploadPolicyBodySchema.safeParseAsync(req.body);

        if (uploadPolicyBodyResult.success === false) {
          return res.status(BAD_REQUEST).send(uploadPolicyBodyResult.error);
        }

        const policy = await fetchPolicy(
          uploadPolicyBodyResult.data.files,
          uploadOptions,
          req
        );

        return res.json(policy);
      });
    };
  }
}

const fetchPolicy = async (
  files: string[],
  uploadOptions: UploadOptions,
  req: express.Request
) => {
  const {
    fileType,
    maxFileSize,
    public: isPublic,
    setFileName
  } = uploadOptions;

  const policyData = files
    .map(originalName => {
      const fileName = getFileName(originalName, req, setFileName);

      return {
        originalName,
        fileName
      };
    })
    .reduce((previous, { originalName, fileName }) => {
      const maxSize = maxFileSize ? bytes.parse(maxFileSize) : undefined;

      const policyRules = {
        key: fileName,
        maxFileSize: maxSize,
        fileType,
        public: isPublic
      };

      return { ...previous, [originalName]: policyRules };
    }, {});

  const url = new URL('upload-policy', API_URL);
  console.log(policyData);
  const response = await axios.post(url.href, policyData);
  return response.data;
};

const getFileName = (
  originalName: string,
  req: express.Request,
  setFileName?: SetFileName
) => {
  return setFileName
    ? setFileName(req, originalName)
    : `${uuidv4()}-${originalName}`;
};
