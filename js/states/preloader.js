BasicGame.preloader = function (game) {};

BasicGame.preloader.prototype = {
	preload : function(){
	// 	this.game.load.image('map', "assets/tilemap/map.png");
	// 	this.game.load.tilemap('tileMap', "assets/tilemap/map.json", null, Phaser.Tilemap.TILED_JSON);
	//  this.game.load.spritesheet('player', 'assets/adventurer.png', 24, 32);
	},

    create : function(){
        this.game.state.start('menu');
    }
};