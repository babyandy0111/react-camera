import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { Camera, CameraType } from './Camera';
import Resizer from 'react-image-file-resizer';
import mergeImages from 'merge-images';
// import Base64Downloader from 'react-base64-downloader';

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const Control = styled.div`
  position: fixed;
  display: flex;
  right: 0;
  width: 20%;
  min-width: 130px;
  min-height: 130px;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px;
  box-sizing: border-box;
  flex-direction: column-reverse;

  @media (max-aspect-ratio: 1/1) {
    flex-direction: row;
    bottom: 0;
    width: 100%;
    height: 20%;
  }

  @media (max-width: 400px) {
    padding: 10px;
  }
`;

const Button = styled.button`
  outline: none;
  color: white;
  opacity: 1;
  background: transparent;
  background-color: transparent;
  background-position-x: 0%;
  background-position-y: 0%;
  background-repeat: repeat;
  background-image: none;
  padding: 0;
  text-shadow: 0px 0px 4px black;
  background-position: center center;
  background-repeat: no-repeat;
  pointer-events: auto;
  cursor: pointer;
  z-index: 2;
  filter: invert(100%);
  border: none;

  &:hover {
    opacity: 0.7;
  }
`;

const TakePhotoButton = styled(Button)`
  background: url('https://img.icons8.com/ios/50/000000/compact-camera.png');
  background-position: center;
  background-size: 50px;
  background-repeat: no-repeat;
  width: 80px;
  height: 80px;
  border: solid 4px black;
  border-radius: 50%;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const ChangeFacingCameraButton = styled(Button)`
  background: url(https://img.icons8.com/ios/50/000000/switch-camera.png);
  background-position: center;
  background-size: 40px;
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
  padding: 40px;
  &:disabled {
    opacity: 0;
    cursor: default;
    padding: 60px;
  }
  @media (max-width: 400px) {
    padding: 40px 5px;
    &:disabled {
      padding: 40px 25px;
    }
  }
`;

const ImagePreview = styled.div<{ image: string | null }>`
  width: 120px;
  height: 120px;
  ${({ image }) => (image ? `background-image:  url(${image});` : '')}
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  @media (max-width: 400px) {
    width: 50px;
    height: 120px;
  }
`;

const FullScreenImagePreview = styled.div<{ image: string | null }>`
  width: 100%;
  height: 100%;
  z-index: 100;
  position: absolute;
  background-color: black;
  ${({ image }) => (image ? `background-image:  url(${image});` : '')}
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const App = () => {
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [image, setImage] = useState<string | null>(null);
  const [showImage, setShowImage] = useState<boolean>(false);
  const [showDownload, setShowDownload] = useState<boolean>(false);
  const camera = useRef<CameraType>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [activeDeviceId, setActiveDeviceId] = useState<string | undefined>(undefined);
  const [display, setDisplay] = useState('block');
  const [fileName, setFileName] = useState('');

  const queryStr = (location.pathname + location.search).substr(1);

  const getBase64FromUrl = async (url: string) => {
    const data = await fetch(url);
    const blob = await data.blob();
    let base64data: string | ArrayBuffer | null = '';
    await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        base64data = reader.result;
        resolve(base64data);
      };
    });
    return base64data;
  };
  const convertBase64ToBlob = (base64Image: string) => {
    // Split into two parts
    const parts = base64Image.split(';base64,');

    // Hold the content type
    const imageType = parts[0].split(':')[1];

    // Decode Base64 string
    const decodedData = window.atob(parts[1]);

    // Create UNIT8ARRAY of size same as row data length
    const uInt8Array = new Uint8Array(decodedData.length);

    // Insert all character code into uInt8Array
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }

    // Return BLOB image after conversion
    return new Blob([uInt8Array], { type: imageType });
  };
  const resizeFile = (file: any, w: number, h: number) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        w,
        h,
        'PNG',
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        'base64',
        w,
        h,
      );
    });
  useEffect(() => {
    (async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((i) => i.kind == 'videoinput');
      setDevices(videoDevices);
    })();
  });

  useEffect(() => {
    const arr = queryStr.split('=');
    setFileName(arr[1]);
    console.log(arr[1]);
  }, []);

  return (
    <>
      {display === 'block' && (
        <div id="img_head">
          {window.innerWidth > window.innerHeight ? (
            <img
              src={'/react-camera-pro/static/media/' + fileName + '.png'}
              alt={'test'}
              style={{ width: window.innerWidth - 130, height: window.innerHeight }}
            />
          ) : (
            <img
              src={'/react-camera-pro/static/media/' + fileName + '-1.png'}
              alt={'test'}
              style={{ width: window.innerWidth, height: window.innerHeight - 130 }}
            />
          )}
        </div>
      )}

      <div id="img_head_back">
        <Wrapper>
          {showImage ? (
            <FullScreenImagePreview
              image={image}
              onClick={() => {
                setShowImage(!showImage);
                setDisplay(display === 'none' ? 'block' : 'none');
              }}
            />
          ) : (
            <Camera
              ref={camera}
              facingMode="environment"
              aspectRatio="cover"
              // aspectRatio={16 / 9}
              numberOfCamerasCallback={(i) => setNumberOfCameras(i)}
              videoSourceDeviceId={activeDeviceId}
              errorMessages={{
                noCameraAccessible:
                  'No camera device accessible. Please connect your camera or try a different browser.',
                permissionDenied: 'Permission denied. Please refresh and give camera permission.',
                switchCamera:
                  'It is not possible to switch camera to different one because there is only one video device accessible.',
                canvas: 'Canvas is not supported.',
              }}
              videoReadyCallback={() => {
                console.log('Video feed ready.');
              }}
            />
          )}
          <Control>
            <select
              onChange={(event) => {
                setActiveDeviceId(event.target.value);
              }}
            >
              {devices.map((d) => (
                <option key={d.deviceId} value={d.deviceId}>
                  {d.label}
                </option>
              ))}
            </select>
            <ImagePreview
              image={image}
              onClick={() => {
                setShowImage(!showImage);
                setDisplay(display === 'none' ? 'block' : 'none');
              }}
            />

            {showDownload ? (
              // <Base64Downloader base64={image} downloadName="file_name">
              //   download
              // </Base64Downloader>
              <></>
            ) : (
              <></>
            )}

            <TakePhotoButton
              onClick={async () => {
                if (camera.current) {
                  const url = '/react-camera-pro/static/media/';
                  let endpoint = '';

                  // 相機圖
                  const photo = camera.current.takePhoto();
                  // const blob = convertBase64ToBlob(photo);

                  // 相機寬高
                  // alert('W:' + camera.current.getW() + ' H:' + camera.current.getH());
                  if (camera.current.getW() < camera.current.getH()) {
                    endpoint = url + fileName + '-1.png';
                  } else {
                    endpoint = url + fileName + '.png';
                  }

                  // 匡
                  const frame = await getBase64FromUrl(endpoint);
                  const blob2 = convertBase64ToBlob(frame);

                  try {
                    const png = await resizeFile(blob2, camera.current.getW(), camera.current.getH());
                    // console.log('o:', image);
                    mergeImages([
                      { src: photo, x: 0, y: 0 },
                      { src: png, x: 0, y: 0 },
                    ]).then((b64: any) => {
                      setImage(b64);
                      setShowDownload(true);
                      // console.log('n:', b64);
                    });
                  } catch (err) {
                    console.log(err);
                  }
                }
              }}
            />
            <ChangeFacingCameraButton
              disabled={numberOfCameras <= 1}
              onClick={() => {
                if (camera.current) {
                  const result = camera.current.switchCamera();
                  console.log(result);
                }
              }}
            />
          </Control>
        </Wrapper>
      </div>
    </>
  );
};

export default App;
