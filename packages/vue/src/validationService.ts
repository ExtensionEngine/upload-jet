import { StandardTypes, FileType } from './types';

const exportAcceptedTypes = function (fileTypes: FileType[]) {
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
};

export default exportAcceptedTypes;
