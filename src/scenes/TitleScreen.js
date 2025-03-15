import Phaser from "phaser";
import { Pong } from "../consts/SceneKeys";



export default class TitleScreen extends Phaser.Scene {
  
    preload() 
    {
       

    }

    create() 
    {
        const title = this.add.text(400, 300, "Blue Sky Thinking", {
            fontSize: 45});
        //Blue Sky Thinking
        //Deliverable
        //Sidebar
        //Piggyback
        title.setOrigin(0.5, 0.5)



        this.add.text(480, 400, "Press SPACE to start", {
            fontSize: 25
        }).setOrigin(0.5, 0.5);


        //STARTS GAME WHEN SPACE IS PRESSED
        this.input.keyboard.once("keydown-SPACE", () => {
            this.scene.start(Pong);
        });

    }
}