// 2017/03/05 : Scrape Bing and download an arbitrary number of images for the specified search term, stored under the <searchterm> directory

var Scraper = require ('images-scraper')
  , bing = new Scraper.Bing();
var image_downloader = require('image-downloader');

var readChunk = require('read-chunk'); // npm install read-chunk 
var isJpg = require('is-jpg');

// USER INPUTS
var category = 'dogs'; // Single category
var max_images = 100;

var args = process.argv.slice(2);
category = args[0];
if ( args[1] !== undefined && !isNaN(args[1])) {
	max_images = args[1];
} else {
	max_images = 100; // Default
}
// END USER INPUTS

var fs = require('fs');
var safe_category = category.replace(/ /g, '_');

var dir = './' + safe_category;

if (!fs.existsSync(dir)){
	fs.mkdirSync(dir);
}

console.log('Now working on category ' + category + ' in directory: ' + dir);

bing.list({
	keyword: category,
	num: max_images,
	detail: true // Set to true to get big images?
})
.then(function (res) {
	console.log('Results from bing', res);
	
	for ( url_hash in res ) {
		var image_counter = url_hash;
		url_hash = res[url_hash];
		// Retrieve the image URL itself, which is in the "url" field of the hash
		var url = url_hash['url'];
		
		// Skip non-JPG URLs
		if ( !url.endsWith('.jpg') ) {
			continue;
		}

		// Check if it's a valid JPEG image
		
		console.log('Retrieving URL #' + image_counter + ' : ' + url_hash['url']);
		// Download to a directory and save with the original filename 
		var options = {
			url: url_hash['url'],
			dest: dir + '/' + image_counter + '.jpg',                  // Save to /path/to/dest/image.jpg 
			done: function(err, filename, image) {
				if (err || filename === undefined) {
					// console.log(err);
					return;
				}
				// console.log('Downloaded file: ', filename);
				// console.log('Download location: ', dir + '/' + image_counter + '.jpg');
				
				// If the filename is defined but doesn't exist, attempt to delete it and move on
				fs.access(filename, fs.constants.R_OK | fs.constants.W_OK, (err) => {
					if (!err) {
						var readchunk = readChunk.sync(filename, 0, 3);
						if ( !isJpg( readchunk ) ) {
							console.log('Deleting invalid file', filename);
							fs.unlink(filename);
						} else {
							console.log('File saved to', filename);
						}
					}
				});
				
			},
		};
		image_downloader(options);
	 
	}
}).catch(function(err) {
	console.log('err',err);
})

	


