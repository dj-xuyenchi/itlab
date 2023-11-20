
// import MyComponent from './Example/MyComponent';
import { useEffect, useState } from 'react';
import { Quagga } from 'quagga';
function QRCode({ }) {
    const [barcodeData, setBarcodeData] = useState(null);

    useEffect(() => {
            Quagga.init(
                {
                    inputStream: {
                        name: 'Live',
                        type: 'LiveStream',
                        target: document.querySelector('#barcode-scanner'),
                        constraints: {
                            width: 640,
                            height: 480,
                            facingMode: 'environment',
                        },
                    },
                    decoder: {
                        readers: ['ean_reader', 'upc_reader', 'code_128_reader'],
                    },
                },
                function (err) {
                    if (err) {
                        console.error('Error initializing Quagga:', err);
                        return;
                    }
                    Quagga.start();
                }
            );

            Quagga.onDetected((data) => {
                setBarcodeData(data.codeResult.code);
            });

        return () => {
            Quagga.stop();
        };
    }, []);

    return (

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', zIndex: 10 }}>
            <div id="barcode-scanner"></div>
            <p>Barcode data: {barcodeData}</p>
            <style>
                {`
          #barcode-scanner video {
            width: 100%;
            max-width: 640px;
          }
        `}
            </style>
        </div>
    );
}

export default QRCode;