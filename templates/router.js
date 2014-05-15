var <%= capitalize(router) %> = Backbone.Router.extend({
	routes: {

	}
});

$(function(){
	var <%= lowerFirstCharacter(router) %> = new <%= capitalize(router) %>();
	Backbone.history.start();
})
