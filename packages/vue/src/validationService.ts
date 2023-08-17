import { predefinedTypes, FileType } from './types';
import accept from 'attr-accept';

const exportAcceptedTypes = function (fileType: FileType) {
  switch (fileType) {
    case predefinedTypes.IMAGE:
    case predefinedTypes.AUDIO:
    case predefinedTypes.VIDEO:
      return `${fileType}/*`;
    case predefinedTypes.PDF:
      return `application/${fileType}`;
    case predefinedTypes.TEXT:
      return `${fileType}/plain`;
    default:
      return fileType;
  }
};

function isValidFileType(file: File, fileType: string) {
  return accept({ type: file.type }, fileType);
}

function checkAndReplaceDuplicate(file: File, currentFiles: File[]) {
  const filteredArray = currentFiles.filter(el => el.name !== file.name);
  currentFiles = [...filteredArray, file];
  return currentFiles;
}

export { exportAcceptedTypes, isValidFileType, checkAndReplaceDuplicate };
