// QRCodeGenerator.js

import React, { useRef } from 'react';
import QRCode from 'qrcode.react';
import domtoimage from 'dom-to-image';

const QRCodeGenerator = () => {
  const currentUrl = window.location.href;
  const urlObject = new URL(currentUrl);

  // Get the main URL and the first path segment (child subpath)
  const mainUrl = urlObject.origin;
  const childSubpath = urlObject.pathname.split('/')[1];

  const qrCodeRef = useRef(null);

  // Construct the URL for the QR code
  const qrCodeUrl = `${mainUrl}/${childSubpath}`;

  const downloadQRCode = () => {
    domtoimage.toPng(qrCodeRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'qrcode.png';
        link.click();
      })
      .catch((error) => {
        console.error('Error generating QR code image', error);
      });
  };

  return (
    <div className='p-4 bg-white rounded-md shadow-xl grid grid-cols-1 justify-items-center'>
      <h2 className=''>QR Code to your business</h2>
      <div ref={qrCodeRef} className='m-4'>
        <QRCode value={qrCodeUrl} />
      </div>
      <button 
      onClick={downloadQRCode}
      className='bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none'
      >Download QR Code</button>
    </div>
  );
};

export default QRCodeGenerator;
