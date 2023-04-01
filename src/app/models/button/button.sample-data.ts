import { ButtonIIOModel } from "./button.iio.model";

export var ButtonData: Array<ButtonIIOModel> = [
    {
        id: "1",
        label: "Accept",
        loading: false,
        icon: "check",
        $description: ""        
      },
      {
        id: "2",
        label: "Delete",
        loading: false,
        icon: "trash",
        color: "red"
      },
      {
        id: "3",
        label: "Submit",
        loading: false,
        icon: "check",
        color: "white",
        borderColor: "#00677F",
        backgroundColor: "#00677F"
      },
      {
        id: "4",
        label: "Open",
        loading: false
      },
      {
        id: "5",
        color: null,
        label: "Loading...",
        loading: true
      },
      {
        id: "6",
        color: null,
        label: "Loading...",
        loading: true,
        filled: true,
        backgroundColor: "#efefef",
        borderColor: "#efefef"
      }
];