
import { IconModel } from "@ui";
import { MetricEntryCSViewModel } from "./metric-entry-cs.view.model";

export var MetricEntryCSViewData: Array<MetricEntryCSViewModel> = [
    {
        isLoading: false,
        label: "State",
        labelStyle: "font-weight: 800; color: red;",
        metricValue: 6723,
        metricPercent: 50,
        showMetricPercantageLabel: true,
        id: 4,
        $description: "Restyled label / default bar"
    },
    {
        isLoading: false,
        label: "State",
        metricValue: 6723,
        metricColor: "darkcyan",
        metricPercent: 50,
        metricAdditionalLabel: "(+12 today)",
        showMetricPercantageLabel: false,
        id: 5,
        $description: "Custom percent label"
    },
    {
        isLoading: false,
        label: "State",
        metricValue: 6723,
        metricColor: "green",
        id: 1,
        labelIcon: new IconModel({
            iconName: "info-circle",
            color: "grey",
            tooltip: "More Information",
            isClickable: true
        }),
        showMetricPercantageLabel: true,
        metricPercent: 23,
        $description: "Green bar with with clickable Icon"
    },
    {
        isLoading: false,
        label: "Count",
        showMetricPercantageLabel: false,
        metricColor: "black",
        metricValue: 1234,
        id: 6,
        $description: "Big style KPI, without bar"
    },
    {
        isLoading: true,
        label: "Failed",
        showMetricPercantageLabel: true,
        metricValue: 23623,
        id: 3,
        metricPercent: 75,
        $description: "Loading style"
    }
]