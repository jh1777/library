
export interface IIO {
     
     setVisibility: (add: boolean, edit: boolean, del: boolean, tagsIcon: boolean) => void;
     setClickable: (tag: boolean, more: boolean, moreLabel: string) => void;
     setLoading: (state: boolean) => void;
     // setId: (id: any) => void;
     setTags: (tags: Tag[]) => void;
     addTag: (tag: Tag) => void;

     changeTag: (original: Tag, changed: Tag) => void;
     
     setOverflow: (items: number) => void;
     // getTags: () => Observable<Array<Tag>>;
}

export interface Tag {
     name: string;
     value: string;
     description?: string;
 }