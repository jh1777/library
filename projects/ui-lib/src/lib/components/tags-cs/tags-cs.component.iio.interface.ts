import { Observable } from "rxjs";

export interface IIO {
     // add a tag
     addTag: (tag: Tag) => void;

     changeTag: (original: Tag, changed: Tag) => void;

     // show '...' after n items (optional)
     setOverflow: (items: number) => void;

     // Get all tags data as observable
     getTags: () => Observable<Array<Tag>>;

     setId: (id: any) => void;

}

export interface Tag {
     name: string;
     value: string;
     description?: string;
 }