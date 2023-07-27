import { UploadJetConfig } from 'types';

export class UploadJet {
  #apiKey: string;

  constructor(config: UploadJetConfig) {
    this.#apiKey = config.apiKey;
  }

  getApiKey() {
    return this.#apiKey;
  }
}
