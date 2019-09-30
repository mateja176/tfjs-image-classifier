import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';

const images = Array.from(
  document.querySelectorAll('img'),
) as HTMLImageElement[];

const imageClassificationApp = async () => {
  const net = await mobilenet.load();

  images.forEach((image, i) => {
    net.classify(image).then(result => {
      console.log(i, ':', result);
    });
  });
};

imageClassificationApp();

const webcam = document.getElementById('webcam') as HTMLVideoElement;

const setupWebcam = async () =>
  new Promise((resolve, reject) => {
    navigator.getUserMedia(
      { video: true },
      stream => {
        webcam.srcObject = stream;
        webcam.addEventListener('loadeddata', () => resolve(), false);
      },
      error => reject(error.message),
    );
  });

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
