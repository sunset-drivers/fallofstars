class Player extends Phaser.GameObjects.Sprite {
    constructor (config) {
        super(config.scene, config.x, config.y);                        
        this.config = config;
        this.player;
        this.speed = 0;
        loader.spritesheet(
            config,  
            [
                { name: 'player', path: 'assets/sprites/player/vincent.png' },
            ],
            () => { this.StartPlayer() }
        );        
        config.scene.add.existing(this);        
    } 

    StartPlayer(){
        console.log("scene2:", this.config.scene);        
        this.player = this.config.scene.physics.add.sprite(400, 300, "player")
        this.player.setCollideWorldBounds(true);              
        this.player.setScale(3);
        this.StartPlayerAnimations();
        console.log("Player Criado!");
    }

    StartPlayerAnimations(){

        this.config.scene.anims.create({
            key: 'start-walking',
            frames: this.config.scene.anims.generateFrameNumbers('player', { start: 0, end: 15 }),
            frameRate: 16,
            repeat: 0
        });

        this.config.scene.anims.create({
            key: 'stop-walking',
            frames: this.config.scene.anims.generateFrameNumbers('player', { start: 15, end: 0 }),
            frameRate: 16,
            repeat: 0
        });

        this.config.scene.anims.create({
            key: 'walking',
            frames: this.config.scene.anims.generateFrameNumbers('player', { start: 16, end: 31 }),
            frameRate: 16,
            repeat: 0
        });

        this.config.scene.anims.create({
            key: 'jumping',
            frames: this.config.scene.anims.generateFrameNumbers('player', { start: 32, end: 39 }),
            frameRate: 16,
            repeat: 0
        });
    }

    PlayerMove(){        
        if(this.player)
        {              
            let delta = 0.2    
            let speed_limit = 7;

            let cursors = this.config.scene.input.keyboard.createCursorKeys();            
            if (cursors.left.isDown)
            {
                if(this.speed < speed_limit)
                    this.speed += delta;
                else if(this.speed > speed_limit)
                    this.speed = speed_limit

                this.player.setVelocityX(-36 * this.speed);
                this.player.flipX = true;
                this.player.anims.play('walking', true);
            }
            else if (cursors.right.isDown)
            {
                if(this.speed < speed_limit)
                    this.speed += delta;
                else if(this.speed > speed_limit)
                    this.speed = speed_limit

                this.player.setVelocityX(36 * this.speed);
                this.player.flipX = false;
                this.player.anims.play('walking', true);
            }
            else
            {
                if(this.speed > 0.0){
                    this.speed -= delta;
                    this.player.anims.play('walking', false);
                    this.player.anims.play('stop-walking', true); 
                } else if(this.speed < 0.0){
                    this.speed = 0.0
                    
                }

                let fix_side;
                if(this.player.flipX) 
                    fix_side = -1;
                else 
                    fix_side = 1;

                this.player.setVelocityX(this.speed * 36 * fix_side);
                                 
            }
            console.log(this.speed);
            //testar se esta no chao: && player.body.touching.down
            if (cursors.up.isDown)
            {
                this.player.setVelocityY(-300);
                this.player.anims.play('jumping', true); 
            }
        }
    }
}