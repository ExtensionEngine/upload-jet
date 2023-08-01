import axios from 'axios';
import * as express from 'express';
import {
  UploadJetConfig,
  uploadJetConfigSchema
} from './schema/upload-jet-config.dto';
import {
  SetFileName,
  UploadOptions,
  uploadOptionsSchema
} from './schema/upload-options.dto';
import { v4 as uuidv4 } from 'uuid';
import { createUploadPolicyBodySchema } from './schema/create-upload-policy-body.dto';
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
    return (req: express.Request, res: express.Response) => {
      return express.json()(req, res, async () => {
        const uploadOptions = await uploadOptionsSchema.parseAsync(options);
        const uploadPolicyBodyResult =
          await createUploadPolicyBodySchema.safeParseAsync(req.body);

        if (uploadPolicyBodyResult.success === false) {
          return res.status(BAD_REQUEST).send({
            message: 'Invalid request body',
            errors: uploadPolicyBodyResult.error.issues.map(issue => ({
              message: issue.message,
              path: issue.path,
              code: issue.code
            }))
          });
        }

        const policies = await this.#fetchPolicies(
          uploadPolicyBodyResult.data.files,
          uploadOptions,
          req
        );

        return res.json(policies);
      });
    };
  }

  #fetchPolicies = async (
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

    const maxSize = maxFileSize ? bytes.parse(maxFileSize) : undefined;
    const getKey = (originalName: string) =>
      setFileName
        ? setFileName(req, originalName)
        : `${uuidv4()}-${originalName}`;

    const policyRules = files
      .map(originalName => ({
        originalName,
        key: getKey(originalName),
        maxFileSize: maxSize,
        fileType,
        public: isPublic
      }))
      .reduce(
        (acc, { originalName, ...fields }) => ({
          ...acc,
          [originalName]: fields
        }),
        {}
      );

    const url = new URL('upload-policy', API_URL);
    const response = await axios.post(url.href, policyRules);
    return response.data;
  };
}
