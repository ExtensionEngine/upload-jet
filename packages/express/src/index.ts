import axios, { AxiosError } from 'axios';
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
const SERVER_UNAVAILABLE_ERROR = 503;

const CONNECTION_REFUSED = 'ECONNREFUSED';
const ERR_BAD_REQUEST = AxiosError.ERR_BAD_REQUEST;
const ERR_BAD_RESPONSE = AxiosError.ERR_BAD_RESPONSE;

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
          return res
            .status(BAD_REQUEST_CODE)
            .send(
              new UploadJetError(
                'Invalid request body',
                mapZodError(parsedBody.error),
                BAD_REQUEST_CODE
              )
            );
        }

        try {
          const policies = await this.fetchPolicies(
            parsedBody.data.files,
            uploadOptions,
            req
          );

          return res.json(policies);
        } catch (error: unknown) {
          if (error instanceof UploadJetError) {
            res.status(error.code).send(error);
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
    try {
      const { data } = await axios.post(url.href, policyRules);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorCode = error.code;

        if (errorCode === CONNECTION_REFUSED) {
          throw new UploadJetError(
            'Upload Jet service unavailable',
            errorCode,
            SERVER_UNAVAILABLE_ERROR
          );
        } else if (
          errorCode === ERR_BAD_REQUEST ||
          errorCode === ERR_BAD_RESPONSE
        ) {
          const response = error.response;
          if (response) {
            throw new UploadJetError(
              'Error fetching upload policy',
              response.data,
              response.status
            );
          }
        }
      }
    }
  }
}

function mapZodError(error: ZodError) {
  return error.issues.map(({ path, message, code }) => ({
    path,
    message,
    code
  }));
}

class UploadJetError {
  message: string;
  error: any;
  code: number;

  constructor(message: string, error: any, code: number) {
    this.message = message;
    this.error = error;
    this.code = code;
  }
}
