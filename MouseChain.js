class MouseChain{
    constructor(bodyA, canvasmouse){
        var m_options = {
            
             mouse: canvasmouse
            
        }
        this.sling3 = loadImage('sprites/sling3.png');
        this.mConstraint = MouseConstraint.create(engine,m_options);
        World.add(world, this.mConstraint);
        
    }
    attach(body){
        console.log("in MouseChain attach");
        this.mConstraint.body = body;
    }
    
    fly(){
        if(this.mConstraint.body){
            console.log("in MouseChain fly");
             this.mConstraint.body = null;
           
        }
    }

    display(){

        if(this.mConstraint.body){
           
            var m = this.mConstraint.mouse.position;
        

        if(m.x < 220) {
            console.log("less thn 200 ");
            stroke(48,22,8);
            strokeWeight(7);
            line(180,50,m.x - 20,m.y - 3);
            line(220, 50, m.x -20, m.y -3);
            image(this.sling3,m.x- 25, m.y-20,15,30);
        }
        /*else{
            console.log("grtr thn 200");
            stroke(48,22,8);
            strokeWeight(7);
            line(pos.x,pos,y,m.x,m.y);
            //line(pointA.x - 20, pointA.y, 230, 47);
            //image(this.sling3,pointA.x -30, pointA.y -10,15,30);
        }*/
    }
    }
}
    
