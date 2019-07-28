export const getFileExtension = (filename: string) => {
  return filename.split('.').pop()
}
