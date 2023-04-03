import { Observable } from "rxjs";

export interface IIO {
     // add a tag
     addTag: (tag: Tag) => void;

     changeTag: (original: Tag, changed: Tag) => void;

     // show '...' after n items (optional)
     setOverflow: (items: number) => void;

     // Get all tags data as observable
     getTags: () => Observable<Array<Tag>>;

     setVisibility: (add: boolean, edit: boolean, del: boolean, tagsIcon: boolean) => void;
     
     setClickable: (tag: boolean, more: boolean, moreLabel: string) => void;
     
     setLoading: (state: boolean) => void;
     
     setId: (id: any) => void;

     // IDEA SSC
     // setInit: (data: Partial<TagsState>) => void;

     // setAll: (data: Partial<TagsState>) => void;

}

export interface Tag {
     name: string;
     value: string;
     description?: string;
 }