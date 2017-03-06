# tensorflow-prebuilt-classifier
A simple, pre-built classifier that can morph to ANY image search term for categorization.

## Prerequisites

### Required
* Python3, recommended via Anaconda3
* TensorFlow
* NodeJS

### Optional
* Windows environment to use train.cmd
* Discrete GPU for faster training

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
cmd.exe> train.cmd
```
* Supply an image (e.g., download.jpg) to test your newly retrained Neural Network image classifier:
```Javascript
cmd.exe> python predict.py download.jpg
...
cars (score = 0.69207)
trains (score = 0.16574)
bikes (score = 0.14219)
```
