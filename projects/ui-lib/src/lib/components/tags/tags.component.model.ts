export class Tag {
    name: string;
    value: string;
    description: string;
    id?: any;
  
    constructor(init?: Partial<Tag>) {
      Object.assign(this, init);
    }
  }