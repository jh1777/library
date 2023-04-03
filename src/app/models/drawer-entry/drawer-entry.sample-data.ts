import { IconModel } from "@ui";
import { DrawerEntryViewModel } from "./drawer-entry.view.model";

export var DrawerEntryViewData: Array<DrawerEntryViewModel> = [
    {
        title: "Drawer Entry #1",
        titleIcon: new IconModel({
            iconName: "info",
            size: 18
        }),
        description: "This is an Entry in the Drawer",
        progressColor: "green",
        progressPercent: 35,
        progressStatusLabel: "pending...",
        showProgress: true
    },
    {
        title: "Drawer Entry #2",
        titleIcon: new IconModel({
            iconName: "pop-out",
            size: 14
        }),
        description: "This is an error Entry example with Subtitle",
        progressColor: "red",
        progressPercent: 100,
        progressStatusLabel: "failed",
        showProgress: true,
        subtitle: "Additional subtitle information like timestamp etc."
    },
    {
        title: "Drawer Entry #3",
        titleIcon: null,
        description: "This is a basic Entry",
        showProgress: false,
        subtitle: "Additional subtitle information like timestamp etc."
    }
]