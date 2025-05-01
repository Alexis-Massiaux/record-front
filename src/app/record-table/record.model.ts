export class Record {
  name: string;
  description: string;
  categories: string[];
  date: Date;

  constructor(name: string, description: string, categories: string[], date: Date) {
    this.name = name;
    this.description = description;
    this.categories = categories;
    this.date = date;
  }

}
