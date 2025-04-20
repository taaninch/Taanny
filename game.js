const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#f0f8ff',
  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image('staff', 'assets/staff.png');
  this.load.image('noteA', 'assets/note-A.png');
  this.load.image('noteC', 'assets/note-C.png');
  this.load.image('noteE', 'assets/note-E.png');
  this.load.image('kitty', 'assets/kitty.png');
}

function create() {
  this.add.image(400, 300, 'staff');
  this.add.image(100, 500, 'kitty').setScale(0.3);

  this.instruction = this.add.text(200, 50, 'Drag the E note to the staff!', {
    font: '28px Comic Sans MS',
    fill: '#000'
  });

  const noteE = this.add.image(100, 100, 'noteE').setInteractive();
  const noteA = this.add.image(200, 100, 'noteA').setInteractive();
  const noteC = this.add.image(300, 100, 'noteC').setInteractive();

  this.input.setDraggable(noteE);
  this.input.setDraggable(noteA);
  this.input.setDraggable(noteC);

  const dropZone = this.add.zone(400, 300, 100, 50).setRectangleDropZone(100, 50);
  this.dropGraphics = this.add.graphics();
  this.dropGraphics.lineStyle(2, 0xff0000);
  this.dropGraphics.strokeRect(dropZone.x - 50, dropZone.y - 25, 100, 50);

  this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
    gameObject.x = dragX;
    gameObject.y = dragY;
  });

  this.input.on('drop', (pointer, gameObject, dropZone) => {
    if (gameObject.texture.key === 'noteE') {
      this.instruction.setText('Great job!');
      gameObject.x = dropZone.x;
      gameObject.y = dropZone.y;
    } else {
      this.instruction.setText('Oops! Try again.');
    }
  });

  this.input.on('dragend', (pointer, gameObject, dropped) => {
    if (!dropped) {
      gameObject.x = gameObject.input.dragStartX;
      gameObject.y = gameObject.input.dragStartY;
    }
  });
}

function update() {
}
