import { z } from 'zod';
import { FileType, predefinedType } from '@upload-jet/shared';

const mimeTypeSchema = z.string();
const fileTypeSchema = z.union([z.nativeEnum(predefinedType), mimeTypeSchema]);

const setFileNameSchema = z
  .function()
  .args(z.any(), z.string())
  .returns(z.string());

export const uploadOptionsSchema = z
  .object({
    fileType: fileTypeSchema.optional(),
    maxFileSize: z.string().optional(),
    public: z.boolean().optional(),
    setFileName: setFileNameSchema.optional()
  })
  .strict();

export type SetFileName = z.infer<typeof setFileNameSchema>;

export type UploadOptions = Partial<{
  fileType: FileType;
  maxFileSize: string;
  public: boolean;
  setFileName: SetFileName;
}>;
