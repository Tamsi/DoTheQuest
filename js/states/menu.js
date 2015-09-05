BasicGame.menu = function (game) {};

BasicGame.menu.prototype = {

	create : function(){
		var title;

		title = this.game.add.text(this.game.world.centerX, 100, "Do The Quest", {font: "32px Arial", fill: "#ffffff"});
        title.anchor.set(0.5);

        this.pkey = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
        this.pkey.onDown.add(this.play, this);
        this.game.state.start('game');
    },

    play : function(){

    	this.game.state.start('game');
    }
};