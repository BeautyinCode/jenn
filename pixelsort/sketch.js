var img;
var recording = false;
var newImg;
var t = 1;
var gif;

function preload() {
    img = loadImage("mma.png"); // load image
    newImg = img;
}

function setup() { 
    c = createCanvas(img.width, img.height);
    
    // load pixels to access pixel data
    // loads as image object property
    // pulls r,g,b,a values from left to right across each row and down each column
    img.loadPixels();
    
    setupGif();
} 

function draw() { 
    //image(img,0,0);
    sortNpx(t%10);
    image(newImg,0,0);
    t++;
    if (t % 10 == 0) t++;
    
    if (recording && frameCount % 3 ==0) {
        gif.addFrame(c.elt, {delay:1, copy: true});    
    }
}

function sortNpx(numPx) {
  //loadPixels();
  newImg = img;
  newImg.loadPixels();
  for (i=0; i<newImg.pixels.length-numPx; i+=numPx) {
    var c = [];
    for (j=0; j<numPx; j++) {
      c[j] = newImg.pixels[i+j];
    }
    c = sort(c);

    for (j=0; j<numPx; j++) {
      newImg.pixels[i+j] = c[j];
    }
  }
  newImg.updatePixels();
}

function mousePressed() {
  recording = !recording;
  if (!recording) {
    gif.render();
  }
}

function setupGif() {
  gif = new GIF({
    workers: 2,
    quality: 10
  });

  gif.on('finished', function(blob) {
    window.open(URL.createObjectURL(blob));
    setupGif();
  });
}