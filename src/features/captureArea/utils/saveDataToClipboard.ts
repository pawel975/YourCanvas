function dataURItoBlob(dataURI: any) {
  var byteString = atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

export const saveDataToClipboard = (type: string, data: HTMLCanvasElement) => {
  switch (type) {
    case 'image/png':
      if (data instanceof HTMLCanvasElement) {
        const capturedAreaImage = new Image();
        capturedAreaImage.src = data.toDataURL();

        const imageBlob = dataURItoBlob(capturedAreaImage.src);

        navigator.clipboard.write([
          new ClipboardItem({
            'image/png': imageBlob,
          }),
        ]);
      }
      break;
    default:
      break;
  }
};
