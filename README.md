# Side By Side 3D

### Display online 2D videos as SBS 3D.

1. Open browser Inspect
2. Copy the code below
https://github.com/micha31r/3d-sbs/blob/081b5fc49ee60e92a8adc7e28f7508179ea73f39/embedded.min.js#L1
3. Paste and run the code in the console
4. Exit Inspect and enter browser full screen mode (NOT video full screen)

### Abstraction

 1. Search for the video element
 2.  To create a stereo video output, the source video element is resized and positioned on the left, and a new canvas element is created and positioned on the right
 3. The canvas element is stretched horizontally by an arbitrary number of pixels to simulate image taken from two positions
 4. The code reads frames from the source video element and redraw them in the canvas element

**Note: This code does not work when the video is DRM protected (E.g. Youtube movies and Disney Plus)**