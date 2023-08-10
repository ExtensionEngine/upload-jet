import { StandardTypes } from './types';
import accept from 'attr-accept';

function exportAcceptedTypes(input: StandardTypes[]) {
  const types: string[] = [];
  input.forEach(el => {
    switch (el) {
      case StandardTypes.IMAGE:
      case StandardTypes.AUDIO:
      case StandardTypes.VIDEO:
        types.push(`${el}/*`);
        break;
      case StandardTypes.PDF:
        types.push(`application/${el}`);
        break;
      case StandardTypes.TEXT:
        types.push(`${el}/plain`);
        break;
      default:
        types.push(el);
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
