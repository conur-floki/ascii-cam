// sketch.js
const density = ' .:░▒▓█';

let video;
let asciiPre;

function setup() {
  noCanvas();
  video = createCapture(VIDEO);
  video.size(128, 48);
  video.style('display', 'none');
  asciiPre = select('.ascii-grid'); 
}

function draw() {
  const urlParams = new URLSearchParams(window.location.search);
  const colorParam = urlParams.get('color') ?? "red";
  video.loadPixels();
  let asciiImage = "";
  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, 0, len));
      const c = density.charAt(charIndex);
      if (c == " ") {
        asciiImage += "<span style='color: black'>&nbsp;</span>"; // Cambia el color de los espacios en blanco a negro
      } else {
        asciiImage += `<span style="color: ${colorParam}">${c}</span>`;
      }
    }
    asciiImage += '\n';
  }
  asciiPre.html(asciiImage); 
}
