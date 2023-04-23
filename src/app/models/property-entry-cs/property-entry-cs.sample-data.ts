
import { IconModel } from "@ui";
import { PropertyEntryCSViewModel } from "./property-entry-cs.view.model";

export var PropertyEntryCSViewData: Array<PropertyEntryCSViewModel> = [
    {
        isLoading: false,
        label: "Devices",
        value: "6723",
        valueSubtitle: "+32 today",
        subtitle: "Increase",
        id: 1,
        $description: "Default"
    },
    {
        isLoading: false,
        label: "Devices",
        labelIcon: new IconModel({
            iconName: "pop-out", 
            source: 'clarity',
            size: 15,
            tooltip: "Click to show more details",
            isClickable: true
        }),
        value: "8765",
        valueSubtitle: "-2 today",
        valueSubtitleStyle: "color: red;",
        subtitle: "Increase",
        id: 2,
        $description: "With Icon and colored subtitle"
    },
    {
        isLoading: false,
        label: "Onboarding State",
        value: "Completed",
        valueIcon: new IconModel({ 
            iconName: "check-circle", 
            source: 'clarity',
            size: 17,
            isClickable: false,
            tooltip: `The State is Completed`,
            color: 'green'
        }),
        valueStyle: "color: green; font-weight: 800;",
        valueSubtitle: "20.03.2023T12:23:45Z",
        subtitle: "Timestamp",
        id: 3,
        $description: "Use for state example"
    },
    {
        isLoading: false,
        label: "Started",
        subtitle: "Onboarding State",
        id: 4,
        $description: "Key Value; one column only"
    },
    {
        isLoading: true,
        label: "Onboarding State",
        value: "Completed",
        valueSubtitle: "20.03.2023T12:23:45Z",
        subtitle: "Timestamp",
        id: 5,
        $description: "Loading style"
    },
]