import { _decorator, CCInteger, Collider2D, Component, Contact2DType, director, IPhysics2DContact, Node } from 'cc';
import { Ground } from './Ground';
import { Result } from './Result';
import { Bird } from './Bird';
import { PipePool } from './PipePool';
const { ccclass, property } = _decorator;

@ccclass('GameCtrl')
export class GameCtrl extends Component {
   @property({type:Ground})
   public ground:Ground

   @property({type:CCInteger,tooltip:"Game Speed"})
   public speed:number = 300

   @property({type:CCInteger,tooltip:"Pipe Speed"})
   public pipeSpeed:number = 200

   @property({type:Result})
   public result:Result

    @property({type:Bird})
    public bird: Bird

@property({type:PipePool})
public pipeQueue:PipePool
   
    public isOver:boolean

    onLoad(){
        this.initListener()
        this.result.resetScore()
        this.isOver = true
    // this.pipeQueue.initPool(); 
    // this.pipeQueue.addPool();
        director.pause()
    }
    initListener(){
        // input.on(Input.EventType.KEY_DOWN,this.onKeyDown,this)
        this.node.on(Node.EventType.TOUCH_START,()=>{

            if(this.isOver == true){
                this.resetGame()
                this.bird.resetBird()
                this.startGame()
                this.isOver = false
            }
            else{
                this.bird.fly()
            }

        })
    }

    // onKeyDown(event:EventKeyboard){
    //     switch(event.keyCode){
    //         case KeyCode.KEY_A:
    //             this.gameOver()
    //             break;
    //         case KeyCode.KEY_P:
    //             this.result.addScore()
    //             break

    //         case KeyCode.KEY_Q:
    //             this.resetGame()
    //             this.bird.resetBird()
    //             break
        
    //     }
    // }
    startGame(){
        this.result.hideResults()
        director.resume()
    }


    gameOver(){
        this.result.showResults()
        this.isOver = true
        director.pause()
    }

    resetGame(){
        this.result.resetScore()
        this.pipeQueue.reset()
        this.isOver = false
        this.startGame()
    }

    passPipe(){
        this.result.addScore()
    }

    createPipe(){
        this.pipeQueue.addPool()
    }

    contactGroudPipe(){
        let colider = this.bird.getComponent(Collider2D)
        if(colider){
            colider.on(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this)
            console.log("colider")
        }
    }

    onBeginContact(selfColider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
        
        this.bird.hitSomething = true
        console.log("Hit something")
        this.gameOver()
    }

    update(){
if(this.isOver == false){
    this.contactGroudPipe()
}
    }
}


