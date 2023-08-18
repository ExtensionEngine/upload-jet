import { predefinedType, FileType, MimeType } from './types';

// TODO: Extract to shared library
export function getMimeType(fileType: FileType): MimeType {
  if (predefinedType.IMAGE === fileType) return 'image/*';
  if (predefinedType.AUDIO === fileType) return 'audio/*';
  if (predefinedType.VIDEO === fileType) return 'video/*';
  if (predefinedType.PDF === fileType) return 'application/pdf';
  if (predefinedType.TEXT === fileType) return 'text/plain';
  return fileType;
}
