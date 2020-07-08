class Scene_0 extends Phaser.Scene { 
  
    constructor() { 
        super('Scene_0'); 
        this.player; 
    } 

    preload() {
        this.load.spritesheet("player", "assets/sprites/player/vincent.png",{ frameWidth: 32, frameHeight: 32 });         
        this.load.image("tiles0", "assets/tilemaps/00/default.png")
        this.load.spritesheet("star", "assets/sprites/star/star_spritesheet.png",
            { frameWidth: 32, frameHeight: 32 }
        );
        this.load.tilemapTiledJSON('map0', 'assets/tilemaps/00/sc_tm_00.json'); 
        updateColor(0, 10, 10);            
    } 

    create() {                   
        this.player = new Player({scene:this, x:64, y:320});

        //CARREGANDO AS ESTRELAS
            this.checkpoint = this.physics.add.sprite(1450, 200,'star');        
            this.starFase = this.physics.add.sprite(1824, 384,'star'); 

            this.starFase.body.allowGravity = false;
            this.checkpoint.body.allowGravity = false;

            this.anims.create({
                key: 'sparkle',
                frames: this.anims.generateFrameNumbers('star', { start: 0, end: 3}),
                frameRate: 4,
                repeat: 0
            });                       
        //FIM ESTRELAS

        const map = this.make.tilemap({key:"map0"});

        //Os parâmetros são o nome do tileset no Tiled e o nome da imagem no preload()
        const tileset = map.addTilesetImage("default", "tiles0");   

        //Os parâmetros são o Nome do Layer no Tiled, o tileset e a posição x e y;
        this.worldLayer = map.createStaticLayer("world", tileset, 0, 0);
        this.worldLayer.setCollisionByProperty({ collides: true });   

        this.objectsLayer = map.createStaticLayer("objects", tileset, 0, 0);
        this.objectsLayer.setCollisionByProperty({ collides: true }); 
        
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        
        this.physics.add.collider(this.player, this.worldLayer);
        
        this.physics.add.collider(this.player, this.objectsLayer, () => {            
            this.player.Respawn(); 
        });        
            
        this.physics.add.collider(this.player, this.checkpoint, () => {
            
            this.player.SetCheckpoint(1450, 200);
            this.checkpoint.destroy();
            this.checkpoint = null;
        });

        this.physics.add.collider(this.player, this.starFase, () => {                                    
            this.scene.stop(Scene_0);
            this.scene.start('Scene_1');            
        });
        
        
    } 

    update() { 

        if(this.player)
        {              
            this.player.PlayerControl();                        
        }

        if(this.checkpoint)
            this.checkpoint.anims.play('sparkle', true); 
      
        if(this.starFase)
            this.starFase.anims.play('sparkle', true); 
       
    } 
    
} 