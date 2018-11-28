var config = {
    type: Phaser.CANVAS,
    parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var sprites;
var gravity = 0.5;
var idx = 1;
var frame = 'veg01';
var numbers = [];

var game = new Phaser.Game(config);
let pressed = false;

function preload ()
{
    this.load.atlas('atlas', 'assets/veg.png', 'assets/veg.json');
}

function launch ()
{
    idx++;

    if (idx === 38)
    {
        idx = 1;
    }

    if (idx < 10)
    {
        frame = 'veg0' + idx.toString();
    }
    else
    {
        frame = 'veg' + idx.toString();
    }
    
    var bob = sprites.create(0, 0, 'atlas', frame);

    bob.vx = Math.random() * 10;
    bob.vy = Math.random() * 10;
    bob.bounce = 0.8 + (Math.random() * 0.3);
}

function create ()
{
    numbers.push(this.add.image(32 + 0 * 50, 742, 'atlas', '0'));
    numbers.push(this.add.image(32 + 1 * 50, 742, 'atlas', '0'));
    numbers.push(this.add.image(32 + 2 * 50, 742, 'atlas', '0'));
    numbers.push(this.add.image(32 + 3 * 50, 742, 'atlas', '0'));
    numbers.push(this.add.image(32 + 4 * 50, 742, 'atlas', '0'));
    numbers.push(this.add.image(32 + 5 * 50, 742, 'atlas', '0'));
    numbers.push(this.add.image(32 + 6 * 50, 742, 'atlas', '0'));

    sprites = this.add.group();
}

function update ()
{
    if (this.input.activePointer.isDown && pressed === false)
    {
        pressed = true;
        for (var i = 0; i < 500; ++i)
        {
            launch();
        }

        updateDigits();
    } else if (this.input.activePointer.isDown && pressed === true) pressed = true;
    else pressed = false;

    for (var index = 0, length = sprites.children.entries.length; index < length; ++index)
    {
        var bob = sprites.children.entries[index];

        bob.vy += gravity;

        bob.y += bob.vy;
        bob.x += bob.vx;

        if (bob.x > 1024)
        {
            bob.x = 1024;
            bob.vx *= -bob.bounce;
        }
        else if (bob.x < 0)
        {
            bob.x = 0;
            bob.vx *= -bob.bounce;
        }

        if (bob.y > 684)
        {
            bob.y = 684;
            bob.vy *= -bob.bounce;
        }
    }

    // this.cameras.main.scrollX = Math.sin(iter) * 200;
    // iter += 0.01;
}

function updateDigits ()
{
    console.log(sprites);
    var len = Phaser.Utils.String.Pad(sprites.children.entries.length.toString(), 7, '0', 1);

    numbers[0].setFrame(len[0]);
    numbers[1].setFrame(len[1]);
    numbers[2].setFrame(len[2]);
    numbers[3].setFrame(len[3]);
    numbers[4].setFrame(len[4]);
    numbers[5].setFrame(len[5]);
    numbers[6].setFrame(len[6]);
}
