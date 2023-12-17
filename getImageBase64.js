function getImageBase64(file) {
  if (!file || !file.buffer) {
    throw new Error("Invalid file object");
  }
  const base64String = Buffer.from(file.buffer).toString('base64');
  return base64String;
}
module.exports = getImageBase64