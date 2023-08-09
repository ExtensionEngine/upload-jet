import axios from 'axios';
import * as express from 'express';
import {
  UploadJetConfig,
  uploadJetConfigSchema
} from './schema/upload-jet-config.dto';
import {
  UploadOptions,
  uploadOptionsSchema
} from './schema/upload-options.dto';
import { v4 as uuidv4 } from 'uuid';
import { createUploadPolicyBodySchema } from './schema/create-upload-policy-body.dto';
import * as bytes from 'bytes';
import { ZodError } from 'zod';

const API_URL = 'http://localhost:3000';
const BAD_REQUEST_CODE = 400;
const INTERNAL_SERVER_ERROR_CODE = 500;
const DEFAULT_SERVER_ERROR_MESSAGE = 'Something went wrong.';

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
        const parsedBody = await createUploadPolicyBodySchema.safeParseAsync(
          req.body
        );

        if (parsedBody.success === false) {
          return res.status(BAD_REQUEST_CODE).json({
            message: 'Invalid request body',
            error: mapZodError(parsedBody.error)
          });
        }

        try {
          const policies = await this.fetchPolicies(
            parsedBody.data.files,
            uploadOptions,
            req
          );

          return res.json(policies);
        } catch (error: unknown) {
          console.error('UploadJetAdapterError: ', error);
          if (error instanceof UploadJetError) {
            res.status(INTERNAL_SERVER_ERROR_CODE).json({
              message: DEFAULT_SERVER_ERROR_MESSAGE
            });
          }
        }
      });
    };
  }

  private async fetchPolicies(
    files: string[],
    uploadOptions: UploadOptions,
    req: express.Request
  ) {
    const {
      fileType,
      maxFileSize,
      public: isPublic,
      setFileName
    } = uploadOptions;

    const maxSize = maxFileSize && bytes.parse(maxFileSize);
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
    return axios
      .post(url.href, policyRules)
      .then(({ data }) => data)
      .catch(err => {
        throw new UploadJetError(err.message);
      });
  }
}

function mapZodError(error: ZodError) {
  return error.issues.map(({ path, message, code }) => ({
    path,
    message,
    code
  }));
}

class UploadJetError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
