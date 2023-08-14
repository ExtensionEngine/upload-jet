import { StandardTypes, FileType } from './types';
import accept from 'attr-accept';

function exportAcceptedTypes(fileTypes: FileType[]) {
  const types: string[] = [];
  fileTypes.forEach(type => {
    switch (type) {
      case StandardTypes.IMAGE:
      case StandardTypes.AUDIO:
      case StandardTypes.VIDEO:
        types.push(`${type}/*`);
        break;
      case StandardTypes.PDF:
        types.push(`application/${type}`);
        break;
      case StandardTypes.TEXT:
        types.push(`${type}/plain`);
        break;
      default:
        types.push(type);
        break;
    }
  });
  return types.join(',');
}

function isValidTypeFile(file: File, fileType: string) {
  return accept({ type: file.type }, fileType);
}

function isDuplicateFile(fileName: string, selectedFiles: File[]) {
  return selectedFiles.some(file => {
    return file.name === fileName;
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
