import { IconModel } from "@ui";
import { DrawerEntryCSViewModel } from "./drawer-entry-cs.view.model";

export var DrawerEntryCSViewData: Array<DrawerEntryCSViewModel> = [
    {
        title: "CS Drawer Entry #1",
        titleIcon: new IconModel({
            iconName: "info",
            size: 18
        }),
        description: "This is an Entry in the Drawer CD",
        progressColor: "green",
        progressPercent: 35,
        progressStatusLabel: "pending...",
        showProgress: true
    },
    {
        title: "CS Drawer Entry #2",
        titleIcon: new IconModel({
            iconName: "pop-out",
            size: 14
        }),
        description: "This is an error Entry example with Subtitle CS",
        progressColor: "red",
        progressPercent: 100,
        progressStatusLabel: "failed",
        showProgress: true,
        subtitle: "Additional subtitle information like timestamp etc. (CS)"
    },
    {
        title: "CS Drawer Entry #3",
        titleIcon: null,
        description: "This is a basic Entry CS",
        showProgress: false,
        subtitle: "Additional subtitle information like timestamp etc. (CS)"
    },
    {
        title: "CS Drawer Entry #3",
        titleIcon: null,
        description: "This is a basic Entry CS",
        showProgress: true,
        isLoading: true,
        subtitle: "Additional subtitle information like timestamp etc. (CS)"
    }
]