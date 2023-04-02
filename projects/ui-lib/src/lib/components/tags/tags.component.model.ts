export class Tag {
    name: string;
    value: string;
    description: string;
  
    constructor(init?: Partial<Tag>) {
      Object.assign(this, init);
    }
  }