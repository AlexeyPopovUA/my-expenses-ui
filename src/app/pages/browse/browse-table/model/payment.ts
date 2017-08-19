/**
 * A model for an individual payment
 */
export class Payment {
  name: string;
  category: string;
  date: string;
  value: number;

  constructor(name: string, category: string, date: string, value: number) {
    this.name = name;
    this.category = category;
    this.date = date;
    this.value = value;
  }
}
