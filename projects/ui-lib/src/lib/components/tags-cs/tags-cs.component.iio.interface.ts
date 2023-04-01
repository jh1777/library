import { Observable } from "rxjs";
import { Tag } from "./tags-cs.component.interface";

export interface IIO {
     // add a tag
     addTag: (tag: Tag) => void;

     changeTag: (original: Tag, changed: Tag) => void;

     // show '...' after n items (optional)
     setOverflow: (items: number) => void;

     // Get all tags data as observable
     getTags: () => Observable<Array<Tag>>;
}