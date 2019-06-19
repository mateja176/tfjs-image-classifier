import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';

const img = document.querySelector('img');
const webcam = document.getElementById('webcam') as HTMLVideoElement;

const imageClassificationApp = async () => {
  const net = await mobilenet.load();

  const result = await net.classify(img);

  console.log(result);
};

const setupWebcam = async () => {
  return new Promise((resolve, reject) => {
    navigator.getUserMedia(
      { video: true },
      stream => {
        webcam.srcObject = stream;
        webcam.addEventListener('loadeddata', () => resolve(), false);
      },
      error => reject(error.message),
    );
  });
};

const webcamImageClassificationApp = async () => {
  const net = await mobilenet.load();

  await setupWebcam();

  const classify = () =>
    setTimeout(async () => {
      const [result] = await net.classify(webcam);
      console.table(result);

      await tf.nextFrame();
      classify();
    }, 2000);

  classify();
};

webcamImageClassificationApp();
