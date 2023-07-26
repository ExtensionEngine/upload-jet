export const conditionMappings = {
  maxFileSize: (value: number) => ({ 'content-length-range': [0, value] }),
  fileType: (value: string) => ({ 'Content-Type': value }),
  public: (value: boolean) => ({ acl: value })
};
