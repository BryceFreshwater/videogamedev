import Phaser from 'phaser';
import * as Colors from '../consts/Colors';

export default class GameBackground extends Phaser.Scene {

    preload() {
        this.load.image('background', 'assets/background.png');
    }

    create() {
        this.add.image(400, 300, 'background');

        this.add.line(
            400, 250, 
            0, 0,
            0, 800,
            Colors.white, 1);
        this.add.circle(400, 300, 50, Colors.white);
       
    }  
} 