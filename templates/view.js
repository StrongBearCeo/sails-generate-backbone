var <%= capitalize(view) %> = Backbone.View.extend({
	templateName : '',
	render: function() {
		// use for model
		this.$el.html(Templates[this.templateName](this.model.attributes));
		// use for collection
		// this.$el.html(Templates[this.templateName](this.collection.toJSON()));
	}
})
