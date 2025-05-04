export class Record {
  name: string;
  description: string;
  categories: string[];
  date: string;

  constructor(name: string, description: string, categories: string[], date: string) {
    this.name = name;
    this.description = description;
    this.categories = categories;
    this.date = date;
  }

}
