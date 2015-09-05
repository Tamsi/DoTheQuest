BasicGame.game = function(game) {};

BasicGame.game.prototype = {

	preload : function(){
		this.game.load.tilemap('tileMap', "assets/tilemap/platform.json", null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('map', "assets/tilemap/platformer_tiles.png");
		this.game.load.spritesheet('player', 'assets/players/adventurer.png', 24, 32);
		this.game.load.spritesheet('bullet', 'assets/chunk.png', 5, 5);
		this.game.load.image('scoreDiamond', 'assets/diamond.png');
	},

	create : function (){
		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		map = this.game.add.tilemap('tileMap');
		map.addTilesetImage('platformer_tiles', 'map');

		layer = map.createLayer('Tile Layer 1');
		layer.resizeWorld();
		layer.wrap = true;

		this.scoreDiamondIcon = this.game.add.sprite(10, 10, 'scoreDiamond');
		this.scoreDiamondIcon.fixedToCamera = true;
		scoreDiamond = 0;
		scoreDiamondText = this.game.add.text(50, 5, scoreDiamond, { fontSize: '32px', fill: '#ffffff' });
		scoreDiamondText.fixedToCamera = true;

		this.bullets = this.game.add.group();
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.enableBody = true;

		this.bullets.createMultiple(2000, 'bullet');

        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 0.5);

		this.diamonds = this.game.add.group();
        this.diamonds.enableBody = true;
        this.diamonds.physicsBodyType = Phaser.Physics.ARCADE;
        this.createDiamonds();

		this.player = this.game.add.sprite(50, 50, 'player');
		this.game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.anchor.setTo(0.5, 0.5);
        this.player.animations.add('gauche', [27, 28, 29, 28], 12, true);
		this.player.animations.add('droite', [9, 10, 11, 10], 12, true);
		this.player.animations.add('haut', [0, 1, 2, 1], 12, true);
		this.player.animations.add('bas', [18, 19, 20, 19], 12, true);

		this.player.animations.add('tirDroit', [15], 1, false);
		this.player.animations.add('tirGauche', [34], 1, false);
		this.player.animations.add('tirBas', [25], 1, false);

        this.game.camera.follow(this.player);

		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.skey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.skey.onDown.add(this.shoot, this);
	},

	 createDiamonds : function(){

        for (var i = 0; i < 100; i++) {
        	while(this.x > 33 && this.x < 200){
        		this.x = this.game.world.randomX;
        	}
            this.diamonds.create(this.game.world.randomX, this.game.world.randomY, 'scoreDiamond');     
        }

        this.diamonds.setAll('anchor.x', 0.5);
        this.diamonds.setAll('anchor.y', 0.5);
    },

    shoot : function() {

    	var bullet = this.bullets.getFirstExists(false);
		if (bullet) {

            bullet.reset(this.player.x , this.player.y);
            bullet.lifespan = 2000;

            this.game.physics.arcade.velocityFromRotation(rotation, 400, bullet.body.velocity);
            this.bulletTime = this.game.time.now + 50;
        }
	},

	update : function() {

		this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;

		if (this.cursors.left.isDown){
            this.player.body.velocity.x = -100;
        } 
        if (this.cursors.right.isDown){
            this.player.body.velocity.x = 100;
        } 
        if (this.cursors.up.isDown){
            this.player.body.velocity.y = -100;
        } 
        if (this.cursors.down.isDown){
            this.player.body.velocity.y = 100;
        } 
        
        if (this.player.body.velocity.x > 0) {
        	this.player.animations.play('droite');
        	if(this.skey.isDown){
        			this.player.animations.stop();
        			this.player.body.velocity.x = 0;
        			this.player.body.velocity.y = 0;
        			this.player.animations.play('tirDroit');					
        	}
        	if(this.player.body.velocity.y > 0){
        		if(this.skey.isDown){
        			rotation = Math.PI/4;
        			this.player.animations.stop();
        			this.player.body.velocity.x = 0;
        			this.player.body.velocity.y = 0;
        			this.player.animations.play('tirDroit');       								
        		}
        		
        	} else if(this.player.body.velocity.y < 0){
        		if(this.skey.isDown){
        			rotation = -Math.PI/4;
        			this.player.animations.stop();
        			this.player.body.velocity.x = 0;
        			this.player.body.velocity.y = 0;
        			this.player.animations.play('tirDroit');					
        		}
        		
        	} else {
        		rotation = 0;
        	}
        }
        if (this.player.body.velocity.x < 0) {
        	this.player.animations.play('gauche');
        	if(this.skey.isDown){
        			this.player.animations.stop();
        			this.player.body.velocity.x = 0;
        			this.player.body.velocity.y = 0;
        			this.player.animations.play('tirGauche');
        	}
        	if(this.player.body.velocity.y > 0){
        		if(this.skey.isDown){
        			rotation = 3*Math.PI/4;
        			this.player.animations.stop();
        			this.player.animations.play('tirGauche');
					this.player.animations.stop();
        		}
        	} else if(this.player.body.velocity.y < 0){
        		if(this.skey.isDown){
        			rotation = 5*Math.PI/4;
        			this.player.animations.stop();
        			this.player.body.velocity.x = 0;
        			this.player.body.velocity.y = 0;
        			this.player.animations.play('tirDroit');
        		}
        	} else {
        		rotation = Math.PI;
        	}	
        }

        if (this.player.body.velocity.x === 0 && this.player.body.velocity.y < 0) {
        	this.player.animations.play('haut');
        	if(this.skey.isDown){
        		rotation = -Math.PI/2;
        		this.player.animations.stop();
        		this.player.body.velocity.x = 0;
        		this.player.body.velocity.y = 0;
        	}       	
        }
        if (this.player.body.velocity.x === 0 && this.player.body.velocity.y > 0) {
        	this.player.animations.play('bas');
        	if(this.skey.isDown){
        		rotation = Math.PI/2;
        		this.player.animations.stop();
        		this.player.body.velocity.x = 0;
        		this.player.body.velocity.y = 0;
        		this.player.animations.play('tirBas');
        	}       	
        }
        if (this.player.body.velocity.x === 0 && this.player.body.velocity.y === 0) {
        	this.player.animations.stop();
        }

        this.game.physics.arcade.overlap(this.player, this.diamonds, this.pickUp);
	},

	pickUp : function(player, diamond){

		diamond.kill();
		scoreDiamond += 1;	
		scoreDiamondText.text = scoreDiamond;
	}
};