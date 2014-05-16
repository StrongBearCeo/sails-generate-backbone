<%= capitalize(view) %> = Backbone.View.extend
	templateName : ''
	render: ->
		# use for model
		@$el.html Templates[@templateName] @model.attributes;
		# use for collection
		# @$el.html Templates[@templateName] @collection.toJSON();
