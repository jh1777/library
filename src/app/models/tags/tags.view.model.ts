import { BaseViewModel } from "../base.view.model";

export interface TagsViewModel extends BaseViewModel {

    tags: Array<{ name: string, value: string, description: string, id?: any }>;

    showTagsIcon?: boolean;

    showDeletionButton?: boolean;
  
    showEditButton?: boolean;
  
    showAddButton?: boolean;
  
    enableClick?: boolean;
  
    enableClickMore?: boolean;
  
    overflowAfterXItems?: number;
  
    moreTagsLabel?: string;

    isLoading?: boolean;
}