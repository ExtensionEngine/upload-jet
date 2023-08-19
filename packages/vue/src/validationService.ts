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

export function isValidFile(droppedFile: File, fileType: string) {
  return accept({ type: droppedFile.type }, fileType);
}

export function checkAndReplaceDuplicate(
  selectedFiles: File[],
  newFiles: File[]
) {
  const filteredFiles = selectedFiles.filter(selectedFile => {
    return !newFiles.some(newFile => newFile.name === selectedFile.name);
  });

  return [...filteredFiles, ...newFiles];
}
