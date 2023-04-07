import { ButtonCSViewModel } from "./button-cs.view.model";


export var ButtonCSViewData: Array<ButtonCSViewModel> = [
    {
        id: "1",
        label: "Accept",
        isLoading: false,
        icon: "check",
        $description: "Plain, no formatting, no border"        
      },
      {
        id: "2",
        label: "Delete",
        isLoading: false,
        icon: "trash",
        color: "red",
        $description: "Custom color"
      },
      {
        id: "3",
        label: "Submit",
        isLoading: false,
        icon: "check",
        color: "white",
        filledStyle: true,
        borderColor: "#00677F",
        backgroundColor: "#00677F",
        $description: "Border style, custom background"
      },
      {
        id: "4",
        label: "Open",
        isLoading: false,
        $description: "No Icon"
      },
      {
        id: "5",
        isLoading: false,
        icon: "trash",
        color: "red",
        $description: "No Label"
      },
      {
        id: "6",
        isLoadingMessage: "Loading...",
        isLoading: true,
        $description: "Default isLoading style"
      }
];