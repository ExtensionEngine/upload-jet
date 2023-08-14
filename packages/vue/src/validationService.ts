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

function isValidTypeFile(inputFiles: File[], fileTypes: FileType) {
  const validTypeFiles = inputFiles.filter(({ type }) =>
    accept({ type }, fileTypes)
  );
  const invalidTypeFiles = inputFiles.filter(
    ({ type }) => !accept({ type }, fileTypes)
  );

  return { validTypeFiles, invalidTypeFiles };
}

function checkAndReplaceDuplicate(inputFiles: File[], selectedFiles: File[]) {
  const updatedArray = [...selectedFiles];

  for (const inputFile of inputFiles) {
    const index = updatedArray.findIndex(file => inputFile.name === file.name);

    if (index !== -1) {
      updatedArray[index] = inputFile;
    } else {
      updatedArray.push(inputFile);
    }
  }
  console.log(updatedArray);
  return updatedArray;
}

export { exportAcceptedTypes, isValidTypeFile, checkAndReplaceDuplicate };
