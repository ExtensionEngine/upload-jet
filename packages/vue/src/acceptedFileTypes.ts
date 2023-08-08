const StandardTypes = {
  IMAGE: 'image',
  AUDIO: 'audio',
  VIDEO: 'video',
  PDF: 'pdf',
  TEXT: 'text'
};

const exportAcceptedTypes = function (input: string[]) {
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
};
export default exportAcceptedTypes;
