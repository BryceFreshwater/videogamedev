import Phaser from "phaser";
import { TitleScreen } from "../consts/SceneKeys";



export default class LostPong extends Phaser.Scene {
  
    preload() 
    {
       

    }

    create() 
    {
        const title = this.add.text(400, 300, "Unfortunately, while trying to goof off\nat work, you got your spirits crushed by\nlosing against a stupid AI. \nYikes, Tom.", {
            fontSize: 30});
        //Blue Sky Thinking
        //Deliverable
        //Sidebar
        //Piggyback
        title.setOrigin(0.5, 0.5)



        this.add.text(480, 400, "Press SPACE to continue", {
            fontSize: 25
        }).setOrigin(0.5, 0.5);


        //STARTS GAME WHEN SPACE IS PRESSED
        this.input.keyboard.once("keydown-SPACE", () => {
            this.scene.start(TitleScreen);
        });

    }
}