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

export function isValidFileType(file: File, fileType: string) {
  return accept({ type: file.type }, fileType);
}

export function checkAndReplaceDuplicate(file: File, currentFiles: File[]) {
  const filteredArray = currentFiles.filter(el => el.name !== file.name);
  currentFiles = [...filteredArray, file];
  return currentFiles;
}
