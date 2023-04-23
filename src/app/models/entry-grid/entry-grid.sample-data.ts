
import { IconModel } from "@ui";
import { EntryGridViewModel } from "./entry-grid.view.model";

export var EntryGridViewData: EntryGridViewModel = {
    items: [ 
        {
            isLoading: false,
            component: "PROPERTY",
            data: {
                isLoading: false,
                label: "Devices",
                value: "6723",
                valueSubtitle: "+32 today",
                subtitle: "Increase",
                id: 1,
                $description: "Default #1"
            }
        },
        {
            isLoading: false,
            component: "PROPERTY",
            data: {
                isLoading: false,
                label: "Vehicles",
                value: "43322",
                valueSubtitle: "+66 today",
                subtitle: "Increase",
                id: 2,
                $description: "Default #2"
            }
        },
        {
            isLoading: false,
            component: "PROPERTY",
            data: {
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
                id: 3,
                $description: "With Icon and colored subtitle"
            }
        },
        {
            isLoading: false,
            component: "PROPERTY",
            data: {
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
                id: 4,
                $description: "Use for state example"
            }
        }
    ]
}