rmdir /S /Q bottlenecks
del retrained_labels.txt
del retrained_graph.pb

rem Download category images
rmdir /S /Q inputs
mkdir inputs

rem Download required NPM modules
npm install --save images-scraper
npm install --save image-downloader
npm install --save read-chunk
npm install --save is-jpg

xcopy node_modules inputs\node_modules\ /s/h/e/k/f/c/q
copy scrape2.js inputs\scrape2.js

cd inputs
node scrape2.js "empty road" 100
node scrape2.js "normal traffic" 100
node scrape2.js "heavy traffic" 100
node scrape2.js "empty road night" 100
node scrape2.js "normal traffic night" 100
node scrape2.js "heavy traffic night" 100

cd ..
rmdir /S /Q inputs\node_modules

python retrain.py --bottleneck_dir=bottlenecks --how_many_training_steps 500 --model_dir inception --output_graph=retrained_graph.pb --output_labels=retrained_labels.txt --image_dir inputs

