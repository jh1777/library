import { EntryState, EntryTileCollapseMode } from "projects/ui-lib/src/lib/components/entry-tile/entry-tile.component.interface";
import { EntryTileViewModel } from "./entry-tile.view.model";

export var EntryTileViewData: Array<EntryTileViewModel> = [
    {
        isLoading: false,
        id: 1,
        collapseMode: EntryTileCollapseMode.disabled,
        title: "Test",
        header: [{
            label: "State",
            value: "Success"
        }],
        items: [{
            primaryValue: "Connected",
            secondaryValue: "3 mins ago"
        }],
        isCollapsed: false,
        state: EntryState.none,
        $description: "Very simple; 1 Item"
    },
    {
        isLoading: false,
        id: 2,
        collapseMode: EntryTileCollapseMode.manual,
        title: "Onboarding",
        titleIcon: "factory",
        header: [{
            label: "State",
            value: "Completed",
            valueStyle: "color: green"
        }],
        items: [{
            title: "TLS Registration",
            primaryValue: "Completed",
            secondaryValue: "23 mins ago",
            icon: {
                size: 30,
                color: "green",
                iconName: "success-standard",
                isClickable: false
            }
        }],
        isCollapsed: false,
        state: EntryState.none,
        $description: "Simple with Icon; Collapsible; 1 Item"
    },
    {
        isLoading: false,
        id: 3,
        collapseMode: EntryTileCollapseMode.disabled,
        title: "Health",
        header: [{
            label: "State",
            value: "Unhealthy",
        }],
        items: [{
            title: "Startup",
            primaryValue: "3 mins",
            secondaryValue: "26 sec. (avg. 7d)",
            state: EntryState.attention,
            clickable: true,
            icon: {
                size: 30,
                color: "orange",
                iconName: "warning-standard",
                isClickable: false
            }
        },
        {
            title: "CPU Usage",
            primaryValue: "12% last 5 mins",
            secondaryValue: "33% (avg. 7d)",
            state: EntryState.none,
            icon: {
                size: 30,
                color: "green",
                iconName: "success-standard",
                isClickable: false
            }
        }],
        isCollapsed: false,
        state: EntryState.attention,
        $description: "Attention tile; 2 items"
    },
]