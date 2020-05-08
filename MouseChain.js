class MouseChain{
    constructor(bodyA, canvasmouse){
        var m_options = {
            
             mouse: canvasmouse
            
        }
        
        this.mConstraint = MouseConstraint.create(engine,m_options);
        World.add(world, this.mConstraint);
    }
    attach(body){
        this.sling.bodyA = body;
    }
    
    fly(){
        if(this.mConstraint.body){
            console.log("in MouseChain fly");
            
            this.mConstraint.body.speed = random(3,5);
            console.log(this.mConstraint.body);
            this.mConstraint.body = null
           console.log(this.mConstraint.body);
        }
    }

    display(){
        console.log("Mouse is : "+this.mConstraint);
        }
}
    
