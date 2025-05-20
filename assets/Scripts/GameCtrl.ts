import { _decorator, CCInteger, Component, director, EventKeyboard, Input, input, KeyCode, Node } from 'cc';
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
   
    update(deltaTime: number) {
        
    }

    onLoad(){
        this.initListener()
        this.result.resetScore()
        director.pause()
    }
    initListener(){
        input.on(Input.EventType.KEY_DOWN,this.onKeyDown,this)
        this.node.on(Node.EventType.TOUCH_START,()=>{
            this.bird.fly()
        })
    }

    onKeyDown(event:EventKeyboard){
        switch(event.keyCode){
            case KeyCode.KEY_A:
                this.gameOver()
                break;
            case KeyCode.KEY_P:
                this.result.addScore()
                break

            case KeyCode.KEY_Q:
                this.resetGame()
                this.bird.resetBird()
                break
        
        }
    }
    startGame(){
        this.result.hideResults()
        director.resume()
    }


    gameOver(){
        this.result.showResults()
        director.pause()
    }

    resetGame(){
        this.result.resetScore()
        this.pipeQueue.reset()
        this.startGame()
    }

    passPipe(){
        this.result.addScore()
    }

    createPipe(){
        this.pipeQueue.addPool()
    }
}


