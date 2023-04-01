import { ButtonCSViewModel } from "./button-cs.view.model";


export var ButtonCSViewData: Array<ButtonCSViewModel> = [
    {
        id: "1",
        label: "Accept",
        loading: false,
        icon: "check",
        $description: "Plain, no formatting, no border"        
      },
      {
        id: "2",
        label: "Delete",
        loading: false,
        icon: "trash",
        color: "red",
        $description: "Custom color"
      },
      {
        id: "3",
        label: "Submit",
        loading: false,
        icon: "check",
        color: "white",
        borderColor: "#00677F",
        backgroundColor: "#00677F",
        $description: "Border style, custom background"
      },
      {
        id: "4",
        label: "Open",
        loading: false,
        $description: "No Icon"
      },
      {
        id: "5",
        loading: false,
        icon: "trash",
        color: "red",
        $description: "No Label"
      },
      {
        id: "6",
        color: null,
        label: "Loading...",
        loading: true,
        $description: "Default isLoading style"
      }
];