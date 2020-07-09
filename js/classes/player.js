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
        this.is_dashing = false;

        //JUMPING DATA
        this.jump_force = -300;
        this.is_jumping = false;
        this.jump_time = 1;
        this.jump_time_counter = 0;

        //DASH DATA
        this.can_dash = true;

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
            
            var Respawn_key = this.scene.input.keyboard.addKey('R');    
            Respawn_key.on('down', () => this.Respawn());         
            
            var Dash_key = this.scene.input.keyboard.addKey('SPACE');    
            Dash_key.on('down', () => this.PlayerDash());         

        }
    }

    PlayerMove() {        
        if(this)
        {              
            let delta = 0.2    
            let speed_limit = 7;

            if(!this.is_dashing)
            {            
                let cursors = this.scene.input.keyboard.createCursorKeys();            
                if (cursors.left.isDown)
                {
                    if(this.speed < speed_limit)
                        this.speed += delta;
                    else if(this.speed > speed_limit)
                        this.speed = speed_limit

                    this.body.setVelocityX(-32 * this.speed);
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

                    this.body.setVelocityX(32 * this.speed);
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

                    this.body.setVelocityX(this.speed * 32 * fix_side);
                                    
                }
            }
            else
            {
                let fix_side;
                if(this.flipX) 
                    fix_side = -1;
                else 
                    fix_side = 1;
                    
                this.body.setVelocity(7 * 100 * fix_side, -35);
            }
             
            if(this.body.velocity.x == 0 && this.body.velocity.y == 0)
                this.anims.play('idle', true); 
            
        }
    }

    PlayerDash() {             
        if(!this.is_dashing) 
        {        
            this.is_dashing = true;        
            setTimeout(() => {
                this.is_dashing = false;
            },250)                         
        }
    }

    PlayerJump() {
        
        let cursors = this.scene.input.keyboard.createCursorKeys();  
        //testar se esta no chao: && player.body.touching.down  
        if (cursors.up.isDown && this.IsGrounded())
        {
            this.is_jumping = true;
            this.jump_time_counter = this.jump_time;
            this.body.setVelocityY(this.jump_force);
            this.anims.stop();
            this.anims.play('jumping', true);             
        } 
        
        if(cursors.up.isDown && this.is_jumping)
        {
            if(this.jump_time_counter > 0){
                this.body.setVelocityY(this.jump_force);
                this.jump_time_counter -= 0.1;
            }else{
                this.is_jumping = false;
            }
        }

        if(cursors.up.isUp){
            this.is_jumping = false;
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