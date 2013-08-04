define(['buildable','jquery'], function(Buildable, $) {
	var RequestManager = Object.create(Buildable);

	RequestManager.extend({
		init: function(options) {

			/** 
			 * The request parser.
			 * If defined, will alter the request response.
			 */
			this.parse = options.parse;

			/**
			 * The endpoint to which send the ajax requests.
			 */
			this.endpoint = options.endpoint;

			/**
			 * The function that will build up the url.
			 */
			this.url = options.url || this.url;

			// self documenting
			this.ajaxOptions = options.ajaxOptions || {};
		},

		request: function(params) {

			var defer = $.Deferred(),
				url = this.url(params),
				request = $.ajax(url, this.ajaxOptions);

			/**
			 * The request itself is a promise.
			 */
			request
				.then(this.parse)
				.then(defer.resolve);

			return defer;
		},

		url: function(params) {
			var jsonp = this.ajaxOptions.dataType === 'jsonp' ? '&callback=?' : '';

			return this.endpoint + '?' + $.param(params) + jsonp;
		},

		parse: function(res) {
			return res;
		}
	});

	return RequestManager;
});