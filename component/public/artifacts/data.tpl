<template id="data-feed-configurator">
	<div class="data-feed-configurator">
		<n-form-combo v-model="target.feed"
			:filter="filterDataFeeds"
			label="Data feed"
			:formatter="function(x) { return x.name }"
			:extracter="function(x) { return x.id }"
			/>
	</div>
</template>