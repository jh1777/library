import { TagsViewModel } from "./tags.view.model";

export var TagsViewData: Array<TagsViewModel> = [
    {
        
        isLoading: false,
        showAddButton: true,
        showDeletionButton: true,
        showEditButton: true,
        showTagsIcon: true,
        enableClick: true,
        tags: [ 
            {
                name: "Region",
                value: "Europe",
                description: "",
                id: "1"
            }
        ],
        $description: "Plain defualt, all enabled, no truncation"
    },
    {
        
        isLoading: false,
        showTagsIcon: false,
        overflowAfterXItems: 1,
        enableClickMore: true,
        moreTagsLabel: "More Data (1 item)",
        tags: [
            {
                name: "Region",
                value: "Europe",
                description: "",
                id: "1"
            },
            {
                name: "Country",
                value: "Spain",
                description: "",
                id: "2"
            }
        ],
        $description: "Truncated, More button clickable, no add/edit/del, no tags icon"
    },
    {
        
        isLoading: true,
        showTagsIcon: true,
        tags: [
        ],
        $description: "Normal state with loading == true"
    }
]