# tensorflow-prebuilt-classifier
A simple, pre-built classifier that can be programmed using image search terms, designed to run on Windows PCs.

This is designed for beginners, or for anyone wishing to harness simple neural networks to perform image classification on arbitrary categories.

If there is sufficient interest, a one-click Dockerized version of this project will be considered.

## Prerequisites

### Required
* [NodeJS](https://nodejs.org/en/download/)
* Python3, recommended via [Anaconda3](https://www.continuum.io/downloads)
* TensorFlow, install via Anaconda3 or pip:
```Javascript
# If you have a discrete GPU:
C:> pip install --ignore-installed --upgrade tensorflow-gpu
# If you are unsure, or you do not have a discrete GPU, use the CPU-only version (will take about 10x longer to run):
C:> pip install --ignore-installed --upgrade tensorflow
```

### Optional
* Windows environment to use train.cmd
* Discrete GPU for faster training
*  Note that you must install CuDNN and CUDA as described [here](https://github.com/tensorflow/tensorflow/issues/11645)

## Usage

* Download/Clone all files in the repository
* Edit train.cmd to specify your categories (e.g., 100 pictures of cars, bikes and trains):
```Javascript
node scrape2.js "cars" 100
node scrape2.js "bikes" 100
node scrape2.js "trains" 100
```
* Launch train.cmd on the commandline (Win+R, type cmd, press enter); this can take up to an hour the first time:
```Javascript
C:> train.cmd
```
* Supply an image (e.g., download.jpg) to test your newly retrained Neural Network image classifier:
```Javascript
C:> python predict.py download.jpg
...
cars (score = 0.69207)
trains (score = 0.16574)
bikes (score = 0.14219)
```
