class Player extends Phaser.GameObjects.Sprite {
    constructor (config) {
        super(config.scene, config.x, config.y);

        this.spawn_point = {
            x: config.x,
            y: config.y
        }       

        this.scene.physics.world.enable(this);
        this.body.setSize(this.width - 20, this.height - 5, true);
        this.body.setOffset(10, 5)              
        this.scene.add.existing(this);      
        this.StartPlayer();         
       
    } 

    StartPlayer(){
        this.setScale(2);
        this.StartPlayerInfo();
        this.StartPlayerAnimations();        
        CameraFollow(this.scene, this);       
    }

    StartPlayerInfo() {
        //WALKING DATA
        this.speed = 0;
    }

    StartPlayerAnimations(){

        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 0}),
            frameRate: 16,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'start-walking',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 15 }),
            frameRate: 16,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'stop-walking',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 15, end: 0 }),
            frameRate: 16,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'walking',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 16, end: 31 }),
            frameRate: 16,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'jumping',
            frames: this.scene.anims.generateFrameNumbers('player', { start: 32, end: 39 }),
            frameRate: 30,
            repeat: 0
        });
        
    }

    PlayerControl() {
        if(this)
        {               
            this.PlayerMove();                      
            this.PlayerJump();               
        }
    }

    PlayerMove() {        
        if(this)
        {              
            let delta = 0.2    
            let speed_limit = 7;

            let cursors = this.scene.input.keyboard.createCursorKeys();            
            if (cursors.left.isDown)
            {
                if(this.speed < speed_limit)
                    this.speed += delta;
                else if(this.speed > speed_limit)
                    this.speed = speed_limit

                this.body.setVelocityX(-36 * this.speed);
                this.flipX = true;

                if(this.IsGrounded())
                    this.anims.play('walking', true);
            }
            else if (cursors.right.isDown)
            {
                if(this.speed < speed_limit)
                    this.speed += delta;
                else if(this.speed > speed_limit)
                    this.speed = speed_limit

                this.body.setVelocityX(36 * this.speed);
                this.flipX = false;

                if(this.IsGrounded())
                    this.anims.play('walking', true);
            }
            else
            {
                if(this.speed > 0.0){
                    this.speed -= delta * 2;                    
                    this.anims.play('stop-walking', true); 
                } else if(this.speed < 0.0){
                    this.speed = 0.0
                    this.anims.stop();
                    this.anims.play('idle', true); 
                }

                let fix_side;
                if(this.flipX) 
                    fix_side = -1;
                else 
                    fix_side = 1;

                this.body.setVelocityX(this.speed * 36 * fix_side);
                                 
            }
             
            if(this.body.velocity.x == 0 && this.body.velocity.y == 0)
                this.anims.play('idle', true); 
            
        }
    }

    PlayerJump() {
        
        let cursors = this.scene.input.keyboard.createCursorKeys();  
        //testar se esta no chao: && player.body.touching.down  
        if (cursors.up.isDown && this.IsGrounded())
        {
            this.body.setVelocityY(-400);
            this.anims.stop();
            this.anims.play('jumping', true);             
        }        
    }

    IsGrounded() {   
        if(this.body.onFloor())
            return true;
        else
            return false;
    }

    Respawn(){
        this.setPosition(this.spawn_point.x, this.spawn_point.y);
    }

    SetCheckpoint(x, y){
        this.spawn_point = {
            x: x,
            y: y
        }
    }
}