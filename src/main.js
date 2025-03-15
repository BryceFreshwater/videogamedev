import Phaser, { Physics } from "phaser";
import TitleScreen from "./scenes/TitleScreen";
import Game from "./scenes/Pong";
import GameBackground from "./scenes/PongBackground";
import * as SceneKeys from "./consts/SceneKeys";


const config = {
  type: Phaser.AUTO,    // Phaser will use WebGL if available, otherwise it will use Canvas
  width: 800,           // Game width               
  height: 600,          // Game height
  //backgroundColor: '#616161', // Game background color
  physics: {
    default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    }
}

const game = new Phaser.Game(config);

game.scene.add(SceneKeys.TitleScreen, TitleScreen);
game.scene.add(SceneKeys.Game, Game);
game.scene.add(SceneKeys.GameBackground, GameBackground);

game.scene.start(SceneKeys.TitleScreen);
//game.scene.start(SceneKeys.Game);