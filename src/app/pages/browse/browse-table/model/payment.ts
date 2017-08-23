/**
 * A model for an individual payment
 */
export class Payment {
  _id: string;
  name: string;
  category: string;
  date: string;
  value: number;

  constructor(id: string, name: string, category: string, date: string, value: number) {
    this._id = id;
    this.name = name;
    this.category = category;
    this.date = date;
    this.value = value;
  }
}
