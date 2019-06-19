import * as mobilenet from '@tensorflow-models/mobilenet';

const img = document.querySelector('img');

(async function app() {
  const net = await mobilenet.load();

  const result = await net.classify(img);

  console.log(result);
})();
