export const predefinedType = {
  IMAGE: 'image',
  AUDIO: 'audio',
  VIDEO: 'video',
  PDF: 'pdf',
  TEXT: 'text'
} as const;

export type MimeType = string & {};
export type FileType =
  | (typeof predefinedType)[keyof typeof predefinedType]
  | MimeType;

export function getMimeType(fileType: FileType): MimeType {
  if (predefinedType.IMAGE === fileType) return 'image/*';
  if (predefinedType.AUDIO === fileType) return 'audio/*';
  if (predefinedType.VIDEO === fileType) return 'video/*';
  if (predefinedType.PDF === fileType) return 'application/pdf';
  if (predefinedType.TEXT === fileType) return 'text/plain';
  return fileType;
}
