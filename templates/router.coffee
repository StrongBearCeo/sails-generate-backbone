<%= capitalize(router) %> = Backbone.Router.extend
	routes: {

	}

$ ->
	<%= lowerFirstCharacter(router) %> = new <%= capitalize(router) %>
	Backbone.history.start
