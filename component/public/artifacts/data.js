nabu.page.provide("page-repeat", {
	name: "data-feed",
	title: "A data feed",
	getDefinition: function(target) {
		var result = {};
		// we store them by name instead of id
		if (target && target.feed) {
			var feed = application.services.dataFeed.feeds.filter(function(feed) {
				return feed.id == target.feed;
			})[0];
			if (feed && feed.fields) {
				feed.fields.forEach(function(field) {
					var type = field.type;
					var format = null;
					if (type == "date") {
						type = "string";
						format = "date-time";
					}
					else if (type == "uuid") {
						type = "string";
						format = "uuid";
					}
					result[field.key] = {
						type: type,
						format: format
					};
				})
			}
		}
		return result;
	},
	getActions: function(target, pageInstance, $services) {
		return [];
	},
	getSpecifications: function(target) {
		return [];
	},
	loadData: function(target, state, page, append) {
		if (target && target.feed) {
			console.log("appending to", state);
			application.services.swagger.execute("nabu.frameworks.dataFeed.rest.feed.data", {
				dataFeedId: target.feed
			}).then(function(result) {
				state.records.splice(0);
				if (result.dataPoints) {
					nabu.utils.arrays.merge(state.records, result.dataPoints);
				}
			})
		}
	},
	configurator: "data-feed-configurator"
});

Vue.service("dataFeed", {
	// wait for page builder to see if you can edit or not
	services: ["swagger", "page"],
	data: function() {
		return {
			feeds: []
		}
	},
	activate: function(done) {
		var self = this;
		// if we can edit, we want to attempt to list all the available data feeds so you can use them
		if (this.$services.page.canEdit()) {
			this.$services.swagger.execute("nabu.frameworks.dataFeed.rest.feed.list", {
				enabled: true
			}).then(function(result) {
				if (result && result.results) {
					nabu.utils.arrays.merge(self.feeds, result.results);
				}
				done();
			}, done);
		}
		else {
			done();
		}
	}
});

Vue.component("data-feed-configurator", {
	template: "#data-feed-configurator",
	props: {
		page: {
			type: Object
		},
		target: {
			type: Object
		}
	},
	methods: {
		filterDataFeeds: function(value) {
			return this.$services.dataFeed.feeds.filter(function(x) {
				return !value || x.name.toLowerCase().indexOf(value.toLowerCase()) >= 0;
			})
		}
	}
})