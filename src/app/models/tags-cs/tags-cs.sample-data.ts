import { TagsCSViewModel } from "./tags-cs.view.model";


export var TagsCSViewData: Array<TagsCSViewModel> = [
  {
    id: "1",
    isLoading: false,
    tags: [
      {
        name: "Region",
        value: "Europe",
        description: ""
      }
    ],
    $description: "Normal state with add button, no overflow"
  },
  {
    id: "2",
    isLoading: true,
    tags: [
      {
        name: "Region",
        value: "Europe",
        description: ""
      }
    ],
    $description: "Normal state with loading == true"
  }
];