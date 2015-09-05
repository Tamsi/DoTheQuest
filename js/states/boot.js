var BasicGame = {};

BasicGame.boot = function(game) {};

BasicGame.boot.prototype = {

	create : function () {
		this.game.state.start('menu');
	}

}