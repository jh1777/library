import { TagsCSViewModel } from "./tags-cs.view.model";


export var TagsCSViewData: Array<TagsCSViewModel> = [
  {
    id: "1",
    isLoading: false,
    showAddButton: true,
    showDeletionButton: true,
    showEditButton: true,
    showTagsIcon: true,
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
    isLoading: false,
    moreTagsLabel: "More Data (1 item)",
    showAddButton: false,
    showDeletionButton: false,
    showEditButton: false,
    showTagsIcon: false,
    enableClickMore: true,
    overflowAfterXItems: 1,
    tags: [
      {
        name: "Region",
        value: "Europe",
        description: ""
      },
      {
        name: "Country",
        value: "Spain",
        description: ""
      }
    ],
    $description: "Truncated, More button clickable, no add/edit/del, no tags icon"
  },
  {
    id: "3",
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