import { z } from 'zod';

export const predefinedType = {
  IMAGE: 'image',
  AUDIO: 'audio',
  VIDEO: 'video',
  PDF: 'pdf',
  TEXT: 'text'
} as const;

const mimeType = z.string();
const fileTypeSchema = z.union([z.nativeEnum(predefinedType), mimeType]);

export type MimeType = string & {};
export type FileType =
  | (typeof predefinedType)[keyof typeof predefinedType]
  | MimeType;

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
