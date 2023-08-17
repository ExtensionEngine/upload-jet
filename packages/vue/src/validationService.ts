import { predefinedTypes, FileType } from './types';

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

function isValidTypeFile(file: File, fileType: string) {
  return accept({ type: file.type }, fileType);
}

function isDuplicateFile(fileName: string, selectedFiles: File[]) {
  return selectedFiles.some(selectedFile => {
    return fileName === selectedFile.name;
  });
}

function findIndexToReplace(file: File, selectedFiles: File[]) {
  return selectedFiles.findIndex(
    selectedfile => file.name === selectedfile.name
  );
}

export {
  exportAcceptedTypes,
  isValidTypeFile,
  isDuplicateFile,
  findIndexToReplace
};
