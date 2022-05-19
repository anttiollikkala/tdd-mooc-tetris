export class Block {
  color;
  falling;
  constructor(color, falling = true) {
    this.color = color;
    this.falling = falling;
  }
}
