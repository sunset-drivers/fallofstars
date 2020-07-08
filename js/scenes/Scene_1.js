class Scene_1 extends Phaser.Scene { 
  
    constructor() { 
        super('Scene_1'); 
        this.player; 
    } 

    preload() {
        this.load.spritesheet("player", "assets/sprites/player/vincent.png",
            { frameWidth: 32, framHeight: 32 }
        );         
        this.load.image("tiles", "assets/tilemaps/01/default.png")
        this.load.image("star", "assets/sprites/star/star.png")
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/01/sc_tm_01.json');             
    } 

    create() {                   
        this.player = new Player({scene:this, x:64, y:230});
        const checkpoint = this.physics.add.sprite(864, 416,'star');   
        const starFase = this.physics.add.sprite(1824, 384,'star'); 

        starFase.body.allowGravity = false;
        checkpoint.body.allowGravity = false;    
        
        const map = this.make.tilemap({key:"map"});

        //Os parâmetros são o nome do tileset no Tiled e o nome da imagem no preload()
        const tileset = map.addTilesetImage("default", "tiles");   

        //Os parâmetros são o Nome do Layer no Tiled, o tileset e a posição x e y;
        this.worldLayer = map.createStaticLayer("world", tileset, 0, 0);
        this.worldLayer.setCollisionByProperty({ collides: true });   

        this.objectsLayer = map.createStaticLayer("objects", tileset, 0, 0);
        this.objectsLayer.setCollisionByProperty({ collides: true }); 

        const debugGraphics = this.add.graphics().setAlpha(0.75);
        
        this.physics.add.collider(this.player, this.worldLayer);

        this.physics.add.collider(this.player, this.worldLayer);
        
        this.physics.add.collider(this.player, this.objectsLayer, () => {            
            this.player.Respawn(); 
        });        

        this.physics.add.collider(this.player, checkpoint, () => {
            this.player.SetCheckpoint(1450, 200);
            checkpoint.destroy();
        });
        
    } 

    update() { 
        if(this.player)
        {   
           // console.log(this.physics.world.collide(this.player, this.objectsLayer));


            var keyObj = this.input.keyboard.addKey('R');    
                keyObj.on('down', () => this.player.Respawn());                 

            this.player.PlayerControl();                        
        }
            
        
    } 
    
} 