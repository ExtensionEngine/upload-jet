import accept from 'attr-accept';

export function isValidFileType({ type }: File, fileType: string) {
  return accept({ type }, fileType);
}

export function removeDuplicates(existingFiles: File[], newFiles: File[]) {
  const isDuplicate = (file: File) => {
    return !newFiles.some(it => it.name === file.name);
  };
  const files = existingFiles.filter(isDuplicate);
  return [...files, ...newFiles];
}
