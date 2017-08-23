import { Direction } from './direction';

export class Sorting {
  constructor(field: string, direction: Direction = Direction.DESC) {
    this.field = field;
    this.direction = direction;
  }

  field: string;
  direction: Direction;
}
