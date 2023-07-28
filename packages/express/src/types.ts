export type UploadJetConfig = {
  apiKey: string;
};

export type UploadRouteConfig = {
  fileType: string;
  maxFileSize: number;
  public: boolean;
  setFileName: Function;
};
