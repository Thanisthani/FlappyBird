import { _decorator, Component, director, Node, UITransform, Vec3 } from 'cc';
import { GameCtrl } from './GameCtrl';
const { ccclass, property } = _decorator;

@ccclass('Ground')
export class Ground extends Component {
    @property({type: Node,tooltip:"Ground1 here"})
    public ground1: Node ;

    @property({type: Node,tooltip:"Ground2 here"})
    public ground2: Node ;

    @property({type: Node,tooltip:"Ground3 here"})
    public ground3: Node ;

    

    public groundWidth1:number
    public groundWidth2:number
    public groundWidth3:number

    public tempLocation1 = new Vec3
    public tempLocation2 = new Vec3
    public tempLocation3 = new Vec3

    public gameCtrlSpeed = new GameCtrl()
    public gameSpeed: number

   onLoad(){
  
    this.startUp()

   }


   startUp(){
    this.groundWidth1 = this.ground1.getComponent(UITransform).width
    this.groundWidth2 = this.ground2.getComponent(UITransform).width
    this.groundWidth3 = this.ground3.getComponent(UITransform).width

    this.tempLocation1.x = 0
    this.tempLocation2.x = this.groundWidth1
    this.tempLocation3.x = this.groundWidth1 + this.groundWidth2

    this.ground1.setPosition(this.tempLocation1)
    this.ground2.setPosition(this.tempLocation2)
    this.ground3.setPosition(this.tempLocation3)
   }



    update(deltaTime: number) {
        this.gameSpeed = this.gameCtrlSpeed.speed
        
        this.tempLocation1.x = this.ground1.getPosition().x
        this.tempLocation2.x = this.ground2.getPosition().x
        this.tempLocation3.x = this.ground3.getPosition().x

        this.tempLocation1.x -= this.gameSpeed * deltaTime
        this.tempLocation2.x -= this.gameSpeed * deltaTime
        this.tempLocation3.x -= this.gameSpeed * deltaTime  

        const scene = director.getScene()
        const canvas = scene.getChildByName("Canvas")
        if(this.tempLocation1.x <= 0- this.groundWidth1){
            this.tempLocation1.x = canvas.getComponent(UITransform).width
        }

        if(this.tempLocation2.x <= 0- this.groundWidth2){
            this.tempLocation2.x = canvas.getComponent(UITransform).width
        } 

        if(this.tempLocation3.x <= 0- this.groundWidth3){
            this.tempLocation3.x = canvas.getComponent(UITransform).width
        } 
        
        this.ground1.setPosition(this.tempLocation1)
        this.ground2.setPosition(this.tempLocation2)
        this.ground3.setPosition(this.tempLocation3)


    }
}


