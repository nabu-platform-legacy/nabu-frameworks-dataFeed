nabu.page.provide("page-repeat", {
	name: "data-feed",
	title: "A data feed",
	getDefinition: function(target) {
		return {};
	},
	getActions: function(target, pageInstance, $services) {
		return [];
	},
	getSpecifications: function(target) {
		return [];
	},
	loadData: function(target, state, page, append) {
		console.log("load data!");
	}
})