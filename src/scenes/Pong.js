import Phaser from "phaser";
import { PongBackground } from "../consts/SceneKeys";
import * as Colors from "../consts/Colors";
import { LostPong } from "../consts/SceneKeys";
import { WonPong } from "../consts/SceneKeys";


class Pong extends Phaser.Scene {

    init() {
        this.paddleRightVelocity = new Phaser.Math.Vector2(0, 0);
        this.leftScore = 0;
        this.rightScore = 0;
        this.paused = false;
    }

    preload() {
        
    }

    create() {

        this.scene.run(PongBackground);
        this.scene.sendToBack(PongBackground);
        this.physics.world.setBounds(-100, 0, 1000, 600);
        this.ball = this.add.circle(400, 300, 10, 0x00ff00);
        this.physics.add.existing(this.ball);
        this.ball.body.setCircle(10);
        this.ball.body.setCollideWorldBounds(true,1,1);
        this.ball.body.setBounce(1, 1);
        //this.resetBall();

        this.paddleLeft = this.add.rectangle(50, 300, 20, 100, 0x000000, 1); // Changed color to black
        this.physics.add.existing(this.paddleLeft);
        this.physics.add.collider(this.ball, this.paddleLeft);
        this.physics.add.existing(this.paddleLeft, true);
        this.paddleLeft.body.setBounce(1, 1);
        this.paddleLeft.body.setImmovable(true);
        this.paddleLeft.fillColor = Colors.white;
        
        this.paddleRight = this.add.rectangle(750, 300, 20, 100, 0x000000, 1); // Changed color to black
        this.physics.add.existing(this.paddleRight);
        this.physics.add.collider(this.ball, this.paddleRight);
        this.paddleRight.body.setBounce(1, 1);
        this.paddleRight.body.setImmovable(true);
        this.paddleRight.fillColor = Colors.white;

        this.cursors = this.input.keyboard.createCursorKeys();

        const scoreStyle = { fontSize: '48px'};

        this.leftScoreLabel = this.add.text(200, 20, '0', scoreStyle);
        this.rightScoreLabel = this.add.text(600, 20, '0', scoreStyle);
    
        //Delay before ball starts moving
        this.time.delayedCall(2000, () => {
            this.resetBall();
        });
    }

    update() {
        
        //early out
        if (this.paused) {
            return;
        }
        // Player
        this.processPlayerInput();
        // AI
        this.updateAI();
        //Score
        this.checkScore();
    }

    processPlayerInput() {
        if (this.cursors.up.isDown) {
            this.paddleLeft.body.setVelocityY(-200);
        } else if (this.cursors.down.isDown) {
            this.paddleLeft.body.setVelocityY(200);
        } else {
            this.paddleLeft.body.setVelocityY(0);
        }
    }

    checkScore() {
        if (this.ball.x < -30 ) {
            this.resetBall();
            this.rightScorePoint();
        } 
        else if (this.ball.x > 830) {
            this.resetBall();   
            this.leftScorePoint(); 
        }
    
        const maxScore = 1;
    
        if (this.leftScore >= maxScore) {
            console.log("Tom won!!");
            this.paused = true;
            this.scene.stop(PongBackground);
            this.scene.stop(Pong);
            this.scene.run(WonPong);
        }
        else if (this.rightScore >= maxScore) {
            console.log("Tom lost!!");
            this.paused = true;
            this.scene.stop(PongBackground);
            this.scene.stop(Pong);
            this.scene.run(LostPong);
        }
    }

    updateAI() {
        const diff = this.ball.y - this.paddleRight.y;
        //right padel speed -200, 200
        if (diff<0) {
            this.paddleRight.body.setVelocityY(-20);
        }
        else if (diff>0) {
            this.paddleRight.body.setVelocityY(20);
        }    
        else {
            this.paddleRight.body.setVelocityY(0);
        }
    }

    leftScorePoint() {
        this.leftScore++;
        this.leftScoreLabel.text = this.leftScore.toString();
    }

    rightScorePoint() {
        this.rightScore++;
        this.rightScoreLabel.text = this.rightScore.toString();
    }
            
    resetBall() {
        this.ball.setPosition(400, 300);
        const angle = Phaser.Math.Between(0, 360);
        const vec = this.physics.velocityFromAngle(angle, 300);
        this.ball.body.setVelocity(vec.x, vec.y);
    }
}
export default Pong;