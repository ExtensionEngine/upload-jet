import { predefinedTypes, FileType } from './types';

const exportAcceptedTypes = function (fileTypes: FileType[]) {
  return fileTypes
    .map(type => {
      switch (type) {
        case predefinedTypes.IMAGE:
        case predefinedTypes.AUDIO:
        case predefinedTypes.VIDEO:
          return `${type}/*`;
        case predefinedTypes.PDF:
          return `application/${type}`;
        case predefinedTypes.TEXT:
          return `${type}/plain`;
        default:
          return type;
      }
    })
    .join(',');
};

export default exportAcceptedTypes;
