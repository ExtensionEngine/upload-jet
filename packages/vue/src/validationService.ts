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

export default exportAcceptedTypes;
