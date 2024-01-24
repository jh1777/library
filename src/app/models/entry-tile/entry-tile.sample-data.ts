import { EntryState, EntryTileCollapseMode } from "projects/ui-lib/src/lib/components/entry-tile/entry-tile.component.interface";
import { EntryTileViewModel } from "./entry-tile.view.model";

export var EntryTileViewData: Array<EntryTileViewModel> = [
    {
        isLoading: false,
        id: 1,
        title: "Title",
        header: [{
            label: "State",
            value: "Success"
        }],
        items: [{
            primaryValue: "Connected",
            secondaryValue: "3 mins ago",
            icon: "pop-out",
            clickable: true
        }],
        isCollapsed: false,
        collapseMode: EntryTileCollapseMode.disabled,
        state: EntryState.none,
        $description: "Very simple; no title; 1 header; 1 item"
    },
    {
        isLoading: false,
        id: 1,
        title: "Simple with small items",
        header: [{
            label: "State",
            value: "OK"
        }],
        items: [{
            primaryValue: "Connected",
            icon: "connect"
        },
        {
            primaryValue: "Registered"
        }],
        isCollapsed: false,
        state: EntryState.none,
        $description: "Very simple; 1 header; 2 one line items"
    },
    {
        isLoading: true,
        id: 4,
        title: "Loading",
        isCollapsed: false,
        state: EntryState.none,
        $description: "Loading style"
    },
    {
        isLoading: false,
        id: "This is Id=2",
        collapseMode: EntryTileCollapseMode.manual,
        title: "Onboarding",
        titleIcon: "factory",
        header: [
            {
                label: "State",
                value: "Completed",
                valueColor: "green",
                valueIcon: "success-standard"
            },
            {
                label: "Updated",
                value: "21 mins ago"
            }
        ],
        items: [{
            title: "TLS Registration",
            primaryValue: "Completed",
            secondaryValue: "23 mins ago",
            clickable: true,
            icon: "ellipsis-vertical"
        }],
        isCollapsed: false,
        state: EntryState.none,
        showMoreButtonLabel: "Show More informations",
        $description: "Simple with icon and 2 headers; collapsible; clickable 1 item"
    },
    {
        isLoading: false,
        id: 3,
        collapseMode: EntryTileCollapseMode.manual,
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
            showStateIcon: true,
            icon: "ellipsis-vertical"
        },
        {
            title: "CPU Usage",
            primaryValue: "12% last 5 mins",
            secondaryValue: "33% (avg. 7d)",
            state: EntryState.error,
            showStateIcon: true
        }],
        isCollapsed: false,
        state: EntryState.error,
        $description: "Error tile; 2 items"
    }
    
]