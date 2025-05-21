import { _decorator, AudioClip, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BirdAudio')
export class BirdAudio extends Component {
   @property({type:AudioSource})
   public audioSource 

   @property({type:[AudioClip]})
   public clips:AudioClip[] = []


   onAudioQueue(index: number){
    let clip: AudioClip = this.clips[index];
    
    if (clip) {
        this.audioSource.playOneShot(clip);
    } else {
        console.warn(`Audio clip at index ${index} is undefined`);
    }
}

}


