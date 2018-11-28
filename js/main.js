var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    parent: container,
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};
var updateScene;
var createScene;
var game = new Phaser.Game(config);
var width = game.config.width;
var height = game.config.height;
var createTween = true, createDiamondTween = true;

var yMiddle = 140 + 88 * 3;
var winSize = { size: 0 }, diamondSize = { size: 1 }, hugeWinSize = { size: 0 };
var blinkCount = { count: 0 };
var blinkCountCheck = 0, spinCount = 0;
var winNumbers;
var startText, spin, spinGlow, interactiveSpinGlow, hand, bigWin, darkBG, hugeWinBG, BGCoins, install, winZero, winHugeNumbers;
var startSpinning = false, firstStop = false, barBlinking = false, win = false, seccondStop = false, thirdStop = false, diamondBlinking = false, hugeWin = false;
var reelSpinning = [true, true, true, true];

var startTextTween, BarBlinkTween, winUpTween, windDownTween, reel0SpeedTween, reel1SpeedTween, reel2SpeedTween, reel3SpeedTween, diamondTween, diamondSizeTween, hugeWinUpTween;

var reel0, reel1, reel2, reel3;
var roll1, roll3;
var reel0Speed = { speed: 0 }, reel1Speed = { speed: 0 }, reel2Speed = { speed: 0 }, reel3Speed = { speed: 0 };

function preload() {
    //back- / foreground images
    this.load.image('BG', 'assets/bg.jpg');
    this.load.image('BGCOINS', 'assets/bg-coins.png');
    this.load.image('BIGWIN', 'assets/big-win.png');
    this.load.image('HUGEWIN', 'assets/huge-win.png');
    this.load.image('COINANIMATION', 'assets/coin-animation.png');
    this.load.image('DARKBG', 'assets/dark-bg-overlay.png');
    //slotmachine images
    this.load.image('SLOTMACHINE', 'assets/slotmachine.jpg');
    this.load.image('REELBG', 'assets/reel-bg.png');
    this.load.image('REELOVERLAY', 'assets/reel-overlay.png');
    this.load.image('TOPBARSGLOW', 'assets/top-bars-glow.png');
    this.load.image('TOPDIAMONDGLOW', 'assets/top-diamond-glow.png');
    //numbers images
    this.load.image('LINESNR', 'assets/lines-number.png');
    this.load.image('TOTALBETNR', 'assets/total-bet-number.png');
    this.load.spritesheet('NUMBERS', 'assets/red-numbers-sprite.png', { frameWidth: 11, frameHeight: 20 });
    this.load.image('NUMBERTHIRDSPIN', 'assets/number-buttom.png');
    //button images
    this.load.image('SPIN', 'assets/spin-btn.png');
    this.load.image('SPINGLOW', 'assets/spin-btn-glow.png');
    this.load.image('INSTALL', 'assets/install-btn.png');
    //start images
    this.load.image('START', 'assets/start-spinning.png');
    this.load.image('MOUSEHAND', 'assets/mousehand.png');
    //slot images
    this.load.image('SLOTS7', 'assets/slots-7.png');
    this.load.image('SLOTS10', 'assets/slots-10.png');
    this.load.image('SLOTSBAR', 'assets/slots-bar.png');
    this.load.image('SLOTSBARLIGHTER', 'assets/slots-bar-lighter.png');
    this.load.image('SLOTSCROWN', 'assets/slots-crown.png');
    this.load.image('SLOTSDIAMOND', 'assets/slots-diamond.png');
    this.load.image('SLOTSDIAMONDLIGHTER', 'assets/slots-diamond-lighter.png');
    this.load.image('SLOTSLEMON', 'assets/slots-lemon.png');
    this.load.image('SLOTSMELON', 'assets/slots-melon.png');
}

function create() {
    createScene = this;

    var shape = new Phaser.Geom.Rectangle(360, 270, 570, 268);
    var mask = this.add.graphics({ fillStyle: { color: 0x0000ff } });
    mask.fillRectShape(shape);

    this.add.sprite(width / 2, height / 2, 'BG');
    this.add.sprite(width / 2, height / 2, 'SLOTMACHINE');
    this.add.sprite(410, 405, 'REELBG');
    this.add.sprite(410, 405, 'REELOVERLAY');
    this.add.sprite(560, 405, 'REELBG');
    this.add.sprite(560, 405, 'REELOVERLAY');
    this.add.sprite(720, 405, 'REELBG');
    this.add.sprite(720, 405, 'REELOVERLAY');
    this.add.sprite(870, 405, 'REELBG');
    this.add.sprite(870, 405, 'REELOVERLAY');
    this.add.sprite(364, 630, 'LINESNR');
    this.add.sprite(460, 630, 'TOTALBETNR');
    winNumbers = [
        this.add.sprite(0, 0, 'NUMBERS', 5),
        this.add.sprite(11, 0, 'NUMBERS', 8),
        this.add.sprite(22, 0, 'NUMBERS', 6),
        this.add.sprite(25, 0, 'NUMBERS', 10),
        this.add.sprite(36, 0, 'NUMBERS', 8),
        this.add.sprite(47, 0, 'NUMBERS', 0),
        this.add.sprite(58, 0, 'NUMBERS', 6, ),
        this.add.sprite(61, 0, 'NUMBERS', 10),
        this.add.sprite(72, 0, 'NUMBERS', 9, ),
        this.add.sprite(83, 0, 'NUMBERS', 8),
        this.add.sprite(94, 0, 'NUMBERS', 8),
    ]
    winNumbers.forEach(element => {
        element.x += 557;
        element.y += 629;
        element.setVisible(false);
    });
    winZero = this.add.sprite(651, 629, 'NUMBERS', 0);
    winHugeNumbers = this.add.sprite(588, 630, 'NUMBERTHIRDSPIN').setVisible(false);



    //create slots
    reel0 = [
        this.add.sprite(410, 140 + 0, 'SLOTS7'),
        this.add.sprite(410, 140 + 88, 'SLOTS10'),
        this.add.sprite(410, 140 + 88 * 2, 'SLOTSMELON'),
        this.add.sprite(410, 140 + 88 * 3, 'SLOTSLEMON'),
        this.add.sprite(410, 140 + 88 * 4, 'SLOTSDIAMOND'),
        this.add.sprite(410, 140 + 88 * 5, 'SLOTSBAR'),
        this.add.sprite(410, 140 + 88 * 6, 'SLOTSCROWN')
    ];
    //adds the mask to the sprites so they wont show out of the reels
    reel0.forEach(sprite => {
        sprite.mask = new Phaser.Display.Masks.GeometryMask(this, mask)
    });

    reel1 = [
        this.add.sprite(560, 140 + 0, 'SLOTSMELON'),
        this.add.sprite(560, 140 + 88, 'SLOTSCROWN'),
        this.add.sprite(560, 140 + 88 * 2, 'SLOTSBAR'),
        this.add.sprite(560, 140 + 88 * 3, 'SLOTS10'),
        this.add.sprite(560, 140 + 88 * 4, 'SLOTSLEMON'),
        this.add.sprite(560, 140 + 88 * 5, 'SLOTS7'),
        this.add.sprite(560, 140 + 88 * 6, 'SLOTSDIAMOND')
    ];
    reel1.forEach(sprite => {
        sprite.mask = new Phaser.Display.Masks.GeometryMask(this, mask)
    });

    reel2 = [
        this.add.sprite(720, 140 + 0, 'SLOTSLEMON'),
        this.add.sprite(720, 140 + 88, 'SLOTSBAR'),
        this.add.sprite(720, 140 + 88 * 2, 'SLOTS7'),
        this.add.sprite(720, 140 + 88 * 3, 'SLOTSDIAMOND'),
        this.add.sprite(720, 140 + 88 * 4, 'SLOTS10'),
        this.add.sprite(720, 140 + 88 * 5, 'SLOTSCROWN'),
        this.add.sprite(720, 140 + 88 * 6, 'SLOTSMELON')
    ];
    reel2.forEach(sprite => {
        sprite.mask = new Phaser.Display.Masks.GeometryMask(this, mask)
    });

    reel3 = [
        this.add.sprite(870, 140 + 0, 'SLOTSBAR'),
        this.add.sprite(870, 140 + 88, 'SLOTSDIAMOND'),
        this.add.sprite(870, 140 + 88 * 2, 'SLOTSLEMON'),
        this.add.sprite(870, 140 + 88 * 3, 'SLOTSCROWN'),
        this.add.sprite(870, 140 + 88 * 4, 'SLOTS7'),
        this.add.sprite(870, 140 + 88 * 5, 'SLOTSMELON'),
        this.add.sprite(870, 140 + 88 * 6, 'SLOTS10')
    ];
    reel3.forEach(sprite => {
        sprite.mask = new Phaser.Display.Masks.GeometryMask(this, mask)
    });

    roll1 = [
        this.add.sprite(560, 140 + 88 * 3, 'SLOTSBARLIGHTER').setVisible(false),
        this.add.sprite(720, 140 + 88 * 3, 'SLOTSBARLIGHTER').setVisible(false),
        this.add.sprite(870, 140 + 88 * 3, 'SLOTSBARLIGHTER').setVisible(false),
        this.add.sprite(750, 100, 'TOPBARSGLOW').setVisible(false)
    ];
    roll3 = [
        this.add.sprite(410, 140 + 88 * 3, 'SLOTSDIAMONDLIGHTER').setVisible(false),
        this.add.sprite(560, 140 + 88 * 3, 'SLOTSDIAMONDLIGHTER').setVisible(false),
        this.add.sprite(720, 140 + 88 * 3, 'SLOTSDIAMONDLIGHTER').setVisible(false),
        this.add.sprite(870, 140 + 88 * 3, 'SLOTSDIAMONDLIGHTER').setVisible(false),
        this.add.sprite(740, 60, 'TOPDIAMONDGLOW').setVisible(false)
    ]



    spin = this.add.sprite(870, 616, 'SPIN').setInteractive();
    spin.on('pointerdown', func => { spin.setInteractive(false); firstSpin(); startTextTween.stop(); });
    startText = this.add.sprite(870, 540, 'START');
    startTextTween = this.tweens.add({ targets: startText, y: 550, duration: 500, yoyo: true, repeat: -1 });
    hand = this.add.sprite(970, 675, 'MOUSEHAND');

    spinGlow = this.add.sprite(870, 616, 'SPINGLOW').setVisible(false);
    interactiveSpinGlow = this.add.sprite(870, 616, 'SPINGLOW').setVisible(false);

    darkBG = this.add.sprite(width / 2, height / 2, 'DARKBG').setVisible(false);
    bigWin = this.add.sprite(width / 2, height / 2, 'BIGWIN');
    bigWin.scaleX = 0;
    bigWin.scaleY = 0;

    BGCoins = this.add.sprite(width / 2, 312, 'BGCOINS').setVisible(false);

    hugeWinBG = this.add.sprite(width / 2, height / 2, 'HUGEWIN');
    hugeWinBG.scaleX = 0;
    hugeWinBG.scaleY = 0;

    install = this.add.sprite(width / 2, 550, 'INSTALL').setVisible(false);
}

function update() {
    updateScene = this;
    if (startSpinning) {
        spinning();
    }
    if (firstStop) {
        stopSpinningFirstTime();
    }
    if (seccondStop) {
        stopSpinningSeccondTime();
    }
    if (thirdStop) {
        stopSpinningThirdTime();
    }
    if (barBlinking) {
        if (createTween) {
            BarBlinkTween = updateScene.tweens.add({ targets: blinkCount, count: 8, duration: 2000, ease: 'Linear.easeIn' }).setCallback('onComplete', func => { win = true; barBlinking = false; }, [], this);
        }
        createTween = false;
        var cRound = Math.round(blinkCount.count);
        if (cRound != blinkCountCheck) {
            blinkCountCheck = cRound;
            blinking(roll1, null, 2, 1, 0);
        }
    }
    if (diamondBlinking) {
        if (createDiamondTween) {
            blinkCount.count = 0;
            diamondTween = updateScene.tweens.add({ targets: blinkCount, count: 9, duration: 4000, ease: 'Linear.None' }).setCallback('onComplete', func => { hugeWin = true; diamondBlinking = false; }, [], this);
            diamondSizeTween = updateScene.tweens.add({ targets: diamondSize, size: 1.5, duration: 500, yoyo: true, repeat: 3, ease: 'Linear.None' });
        }
        createDiamondTween = false;
        var cRound = Math.round(blinkCount.count);
        if (cRound != blinkCountCheck) {
            blinkCountCheck = cRound;
            blinking(roll3, 4, 6, 3, 1);
        }
    }
    reel0[4].scaleX = diamondSize.size;
    reel0[4].scaleY = diamondSize.size;
    reel1[6].scaleX = diamondSize.size;
    reel1[6].scaleY = diamondSize.size;
    reel2[3].scaleX = diamondSize.size;
    reel2[3].scaleY = diamondSize.size;
    reel3[1].scaleX = diamondSize.size;
    reel3[1].scaleY = diamondSize.size;
    for (let index = 0; index < roll3.length - 1; index++) {
        roll3[index].scaleX = diamondSize.size;
        roll3[index].scaleY = diamondSize.size;
    }

    if (win) {
        winZero.setVisible(false);
        winNumbers.forEach(element => {
            element.setVisible(true);
        });
        winUpTween = createScene.tweens.add({ targets: winSize, size: 1.2, duration: 2000, ease: 'Elastic', easeParams: [2, 1] }).setCallback('onComplete', func => {
            BarBlinkTween.stop();

            //making the win go away again
            updateScene.time.delayedCall(2000, winAway => {
                winUpTween.stop();
                windDownTween = createScene.tweens.add({ targets: winSize, size: 0, duration: 100, ease: 'Linear.easeIn' }).setCallback('onComplete', func => {
                    darkBG.setVisible(false);
                    spin.setVisible(false);
                    interactiveSpinGlow.setVisible(true);
                    interactiveSpinGlow.setInteractive();
                    interactiveSpinGlow.on('pointerdown', func => {
                        if (spinCount == 0) {
                            seccondSpin();
                            interactiveSpinGlow.setVisible(false);
                            spinGlow.setVisible(true);
                        } else if (spinCount == 1) {
                            thirdSpin();
                            interactiveSpinGlow.setVisible(false);
                            spinGlow.setVisible(true);
                        }
                        spinCount++;
                    }, [], this);
                    windDownTween.stop();
                }, [], this);
            }, [], this);
        }, [], this)
        darkBG.setVisible(true);

        win = false;
        //TODO add win numbers
    }
    bigWin.scaleX = winSize.size;
    bigWin.scaleY = winSize.size;


    if (hugeWin) {
        winNumbers.forEach(element => {
            element.setVisible(false);
        });
        winHugeNumbers.setVisible(true);
        roll3[4].setVisible(true);
        darkBG.setVisible(true);
        BGCoins.setVisible(true);
        hugeWinUpTween = createScene.tweens.add({ targets: hugeWinSize, size: 1.2, duration: 2000, ease: 'Elastic', easeParams: [2, 1] }).setCallback('onComplete', func => {
            install.setVisible(true);
            install.angle = -5;
            createScene.tweens.add({ targets: install, angle: 5, repeat: -1, yoyo: true })
        }, [], this);
        hugeWin = false;
    }
    hugeWinBG.scaleX = hugeWinSize.size;
    hugeWinBG.scaleY = hugeWinSize.size;
}

function firstSpin() {
    startSpinning = true;
    startText.setVisible(false);
    spin.setVisible(false);
    hand.setVisible(false);
    spinGlow.setVisible(true);
    updateScene.time.delayedCall(3000, setFirstStop => {
        firstStop = true;
        spinGlow.setVisible(false);
        spin.setVisible(true);
    }, [], this);
}

function seccondSpin() {
    reel0Speed.speed = 0;
    reel1Speed.speed = 0;
    reel2Speed.speed = 0;
    reel3Speed.speed = 0;
    for (let index = 0; index < reelSpinning.length; index++) {
        reelSpinning[index] = true;;
    }
    startSpinning = true;
    updateScene.time.delayedCall(3000, func => {
        seccondStop = true;
        spinGlow.setVisible(false);
        spin.setVisible(true);
    }, [], this);
}

function thirdSpin() {
    reel0Speed.speed = 0;
    reel1Speed.speed = 0;
    reel2Speed.speed = 0;
    reel3Speed.speed = 0;
    for (let index = 0; index < reelSpinning.length; index++) {
        reelSpinning[index] = true;;
    }
    startSpinning = true;
    updateScene.time.delayedCall(3000, func => {
        thirdStop = true;
        spinGlow.setVisible(false);
        spin.setVisible(true);
    }, [], this);
}

function stopSpinningFirstTime() {
    reel0SpeedTween.stop();
    reel1SpeedTween.stop();
    reel2SpeedTween.stop();
    reel3SpeedTween.stop();
    stopping(0, reel0, 3);
    //waiting after first reel is tweening
    updateScene.time.delayedCall(400, stopping1FirstStop => {

        stopping(1, reel1, 2);
        //waiting after the seccond reel is tweening
        updateScene.time.delayedCall(400, stopping2FirstStop => {

            stopping(2, reel2, 1);
            //waiting after the third reel is tweening
            updateScene.time.delayedCall(1500, stopping3FirstStop => {
                stopping(3, reel3, 0)
            }, [], this);
        }, [], this);
    }, [], this);
}

function stopSpinningSeccondTime() {

    reel0SpeedTween.stop();
    reel1SpeedTween.stop();
    reel2SpeedTween.stop();
    reel3SpeedTween.stop();
    stopping(0, reel0, 5);
    //waiting after first reel is tweening
    updateScene.time.delayedCall(500, stopping1FirstStop => {

        stopping(1, reel1, 5);
        //waiting after the seccond reel is tweening
        updateScene.time.delayedCall(500, stopping2FirstStop => {

            stopping(2, reel2, 3);
            //waiting after the third reel is tweening
            updateScene.time.delayedCall(500, stopping3FirstStop => {
                stopping(3, reel3, 6)
            }, [], this);
        }, [], this);
    }, [], this);
}

function stopSpinningThirdTime() {
    reel0SpeedTween.stop();
    reel1SpeedTween.stop();
    reel2SpeedTween.stop();
    reel3SpeedTween.stop();
    stopping(0, reel0, 4);
    //waiting after first reel is tweening
    updateScene.time.delayedCall(600, stopping1FirstStop => {

        stopping(1, reel1, 6);
        //waiting after the seccond reel is tweening
        updateScene.time.delayedCall(600, stopping2FirstStop => {

            stopping(2, reel2, 3);
            //waiting after the third reel is tweening
            updateScene.time.delayedCall(1000, stopping3FirstStop => {
                stopping(3, reel3, 1)
            }, [], this);
        }, [], this);
    }, [], this);
}


function stopping(reelNR, array, chosen) {
    if (array[chosen].y > (yMiddle - 70) && array[chosen].y < (yMiddle - 40)) {
        for (var index = 0; index < array.length; index++) {
            var target = targetFinder(chosen, index);
            if (target == 0 || target == 6) {
                array[index].y = 140 + 88 * target;
            }
            eTarget = 140 + 88 * target;
            updateScene.tweens.add({ targets: array[index], y: eTarget, duration: 4000, ease: 'Elastic', easeParams: [0.05, 0.1] }).setCallback('onComplete', func => {
                startSpinning = false;

                //what to do at each stop
                if (firstStop == true) {
                    barBlinking = true;
                    firstStop = false;
                } else if (seccondStop == true) {
                    spin.setVisible(false);
                    interactiveSpinGlow.setVisible(true)
                    seccondStop = false;
                } else if (thirdStop == true) {
                    diamondBlinking = true;
                    thirdStop = false;
                }

            }, [], this);
        };
        reelSpinning[reelNR] = false;
    }
}

function result() {

}
//Finds the target position of the slots
function targetFinder(chosen, index) {
    var move = 0;
    var move = 3 - chosen;
    index += move
    if (index > 6) index = 0 + (index - 7);
    else if (index < 0) index = 7 - (0 - index);
    return index;
}

function blinking(lightUpArray, reel0Index, reel1Index, reel2Index, reel3Index) {
    lightUpArray.forEach(element => {
        element.setVisible(blink(element));
    });
    if (reel0Index != null) reel0[reel0Index].setVisible(blink(reel0[reel0Index]))
    if (reel1Index != null) reel1[reel1Index].setVisible(blink(reel1[reel1Index]));
    if (reel2Index != null) reel2[reel2Index].setVisible(blink(reel2[reel2Index]));
    if (reel3Index != null) reel3[reel3Index].setVisible(blink(reel3[reel3Index]));
}

function blink(element) {
    if (element.visible == true) return false;
    else return true;
}

//Spinns the reels
function spinning() {
    //TODO make a reel object
    reel0SpeedTween = createScene.tweens.add({ targets: reel0Speed, speed: 20, duration: 500, ease: 'Linear.None' });
    reel1SpeedTween = createScene.tweens.add({ targets: reel1Speed, speed: 20, duration: 500, ease: 'Linear.None' });
    reel2SpeedTween = createScene.tweens.add({ targets: reel2Speed, speed: 20, duration: 500, ease: 'Linear.None' });
    reel3SpeedTween = createScene.tweens.add({ targets: reel3Speed, speed: 20, duration: 500, ease: 'Linear.None' });

    //reel 1
    if (reelSpinning[0]) {
        for (let index = 0; index < reel0.length; index++) {
            reel0[index].y += reel0Speed.speed;
            if (reel0[index].y > 140 + 88 * 6) {
                if (index + 1 >= reel0.length) {
                    reel0[index].y = reel0[0].y - 88;
                } else {
                    var temp = index + 1
                    reel0[index].y = reel0[temp].y - 88;
                }
            }
        }
    }
    //reel 2
    if (reelSpinning[1]) {
        for (let index = 0; index < reel1.length; index++) {
            reel1[index].y += reel1Speed.speed;
            if (reel1[index].y > 140 + 88 * 6) {
                if (index + 1 >= reel1.length) {
                    reel1[index].y = reel1[0].y - 88;
                } else {
                    var temp = index + 1
                    reel1[index].y = reel1[temp].y - 88;
                }
            }
        }
    }
    //reel 3
    if (reelSpinning[2]) {
        for (let index = 0; index < reel2.length; index++) {
            reel2[index].y += reel2Speed.speed;
            if (reel2[index].y > 140 + 88 * 6) {
                if (index + 1 >= reel2.length) {
                    reel2[index].y = reel2[0].y - 88;
                } else {
                    var temp = index + 1
                    reel2[index].y = reel2[temp].y - 88;
                }
            }
        }
    }
    //reel 4
    if (reelSpinning[3]) {
        for (let index = 0; index < reel3.length; index++) {
            reel3[index].y += reel3Speed.speed;
            if (reel3[index].y > 140 + 88 * 6) {
                if (index + 1 >= reel3.length) {
                    reel3[index].y = reel3[0].y - 88;
                } else {
                    var temp = index + 1
                    reel3[index].y = reel3[temp].y - 88;
                }
            }
        }
    }
}