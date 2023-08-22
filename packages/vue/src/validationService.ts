import { predefinedType, FileType, MimeType } from './types';
import accept from 'attr-accept';

// TODO: Extract to shared library
export function getMimeType(fileType: FileType): MimeType {
  if (predefinedType.IMAGE === fileType) return 'image/*';
  if (predefinedType.AUDIO === fileType) return 'audio/*';
  if (predefinedType.VIDEO === fileType) return 'video/*';
  if (predefinedType.PDF === fileType) return 'application/pdf';
  if (predefinedType.TEXT === fileType) return 'text/plain';
  return fileType;
}

export function isValidFileType({ type }: File, fileType: string) {
  return accept({ type }, fileType);
}

export function removeDuplicates(existingFiles: File[], newFiles: File[]) {
  const isDuplicate = (file: File) => {
    return !newFiles.some(it => it.name === file.name);
  };

  const files = existingFiles.filter(isDuplicate);

  return [...files, ...newFiles];
}
