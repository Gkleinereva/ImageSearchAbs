# Simple Image Search API

### Setup

If you wish to fork this repo, you will need to set it up with your own Google API key.  Here are the steps to do this:

1) Get a Google Developer API Key and create a custom image search engine
	- https://developers.google.com/custom-search/docs/tutorial/creatingcse
2) Create a config.js file in the root directory of your forked repo with this format:
```
var config = {
	GOOGLE_KEY: "<YOUR GOOGLE API KEY>",
	ENGINE_ID: "<YOUR CUSTOM SEARCH ENGINE ID>"
};

module.exports = config;
```