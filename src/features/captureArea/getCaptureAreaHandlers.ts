import ERRORS from '../../data/errors';
import { CanvasCoordinates, Eventhandlers } from '../../globalInterfaces';
import computePointInCanvas from '../utils/computePointInCanvas';
import { captureArea } from './captureArea';

export default function getCaptureAreaHandlers(canvas: HTMLCanvasElement): Eventhandlers {
  let isCapturing: boolean = false;

  let areaToCapture: HTMLCanvasElement;

  let startPoint: CanvasCoordinates = { x: 0, y: 0 };
  let endPoint: CanvasCoordinates = { x: 0, y: 0 };
  let snapshot: ImageData | undefined = undefined;

  const ctx = canvas.getContext('2d');

  if (!ctx) {
    const error = new Error('Invalid canvas context');
    error.name = ERRORS.INVALID_CONTEXT;
    throw error;
  }

  const mouseDownHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isCapturing = true;
    startPoint = computePointInCanvas(canvas, e.clientX, e.clientY);

    // Gets canvas state before capturing
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
  };

  const mouseMoveHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isCapturing) {
      endPoint = computePointInCanvas(canvas, e.clientX, e.clientY);

      if (!snapshot) {
        const error = new Error('Invalid snapshot - snapshot should contain Image Data');
        error.name = ERRORS.INVALID_SNAPSHOT;
        throw error;
      }

      // Put canvas state before drawing
      ctx.putImageData(snapshot, 0, 0);
      captureArea(startPoint, endPoint, ctx);
    }
  };

  const mouseUpHandler = () => {
    isCapturing = false;

    const sectionWidth = Math.abs(endPoint.x - startPoint.x);
    const sectionHeight = Math.abs(endPoint.y - startPoint.y);
    areaToCapture = document.createElement('canvas');
    areaToCapture.width = sectionWidth;
    areaToCapture.height = sectionHeight;
    const sectionCtx = areaToCapture.getContext('2d');

    const imageData = ctx.getImageData(
      startPoint.x < endPoint.x ? startPoint.x : endPoint.x,
      startPoint.y < endPoint.y ? startPoint.y : endPoint.y,
      areaToCapture.width,
      areaToCapture.height
    );

    sectionCtx?.putImageData(imageData, 0, 0);
  };

  const onPasteHandler = (e: any) => {
    // Get the clipboard data
    const items = (e.clipboardData || window.Clipboard).items;

    // Create a new image element
    const img = new Image();

    // Loop through the clipboard items
    for (const item of items) {
      // Check if the clipboard item is an image
      if (item.type.indexOf('image') !== -1) {
        // Get the image data as a blob
        const blob = item.getAsFile();

        // Set the source of the image element to the blob data
        img.src = URL.createObjectURL(blob);

        img.onload = () => {
          ctx.drawImage(img, 0, 0);
        };
      }
    }
  };

  const onKeyDownHandler = (e: any) => {
    // Copy area to clipboard
    if (e.ctrlKey && e.key === 'c') {
      const capturedAreaImage = new Image();
      capturedAreaImage.src = areaToCapture.toDataURL();

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

      const imageBlob = dataURItoBlob(capturedAreaImage.src);

      navigator.clipboard.write([
        new ClipboardItem({
          'image/png': imageBlob,
        }),
      ]);
    }
  };

  return {
    mouseDownHandler: mouseDownHandler,
    mouseMoveHandler: mouseMoveHandler,
    mouseUpHandler: mouseUpHandler,
    onPasteHandler: onPasteHandler,
    onKeyDownHandler: onKeyDownHandler,
  };
}
