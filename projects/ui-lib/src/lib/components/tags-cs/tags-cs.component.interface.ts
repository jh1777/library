import { Tag } from "./tags-cs.component.iio.interface";


export interface TagsState {
    isLoading: boolean;
    tags: Array<Tag>;
    moreTagsLabel: string;
    // If set != 0 only this amount of tags is shown
    overflowAfterXItems: number;

    // Show the clarity Tags icon at the start of tag list (default: true)
    showTagsIcon: boolean;

    // enables deletion of tag in place
    showDeletionButton: boolean;
    // enabled edit button in place
    showEditButton: boolean;
    // shows plus button at the end of the tags list
    showAddButton: boolean;

    // Enables the click event and mouse pointer for all tag items
    enableClick: boolean;

    // Enables the click event and mouse pointer for the more (...) button if present
    enableClickMore: boolean;

    id?: any;
}