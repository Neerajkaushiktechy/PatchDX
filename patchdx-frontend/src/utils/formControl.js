
import { LuTextCursorInput } from "react-icons/lu";
import { BsTextareaResize } from "react-icons/bs";
import { IoCheckboxOutline } from "react-icons/io5";
import { RiCheckboxMultipleLine } from "react-icons/ri";
import { IoMdRadioButtonOn } from "react-icons/io";
import { TbFileUpload } from "react-icons/tb";
import { GoSingleSelect } from "react-icons/go";


export interface fieldInterFace {
    id: number;
    title: string;
    fieldform: any;
    inputType: string;
}


export const selectField: fieldInterFace[] = [
    {
        id: 1,
        inputType: "text",
        title: "Text Input",
        fieldform: {
            Label: "Label",
            Placeholder: "Place Holder",
        },
        icon: LuTextCursorInput,
    },
    {
        id: 2,
        inputType: "number",
        title: "Number Input",
        fieldform: {
            Label: "Label",
            Placeholder: "Place Holder",
        },
        icon: LuTextCursorInput,
    },
    {
        id: 3,
        inputType: "textarea",
        title: "TextArea",
        fieldform: {
            Label: "Label",
            Placeholder: "Place Holder",
        },
        icon: BsTextareaResize ,
    },
    // {
    //     id: 4,
    //     inputType: "select",
    //     title: "Single Select",
    //     fieldform: {
    //         Label: "Enter label",
    //         Placeholder: "Place Holder",
    //         OptionLabel: "Options"
    //     },
    //     icon: GoSingleSelect ,
    // },
    // {
    //     id: 5,
    //     inputType: "checkbox",
    //     title: "Single checkbox",
    //     fieldform: {
    //         Label: "Enter label",
    //         Placeholder: "Place Holder",
    //         OptionLabel: "Options"
    //     },
    //     icon: IoCheckboxOutline,
    // },
    // {
    //     id: 6,
    //     inputType: "multicheckbox",
    //     title: "Multi Checkbox",
    //     fieldform: {
    //         Label: "Enter label",
    //         Placeholder: "Place Holder",
    //         OptionLabel: "Options"
    //     },
    //     icon: RiCheckboxMultipleLine ,
    // },
    {
        id: 7,
        inputType: "radiogroup",
        title: "Radio Buttons",
        fieldform: {
            Label: "Enter label",
            Placeholder: "Place Holder",
            OptionLabel: "Options"
        },
        icon: IoMdRadioButtonOn,
    },
    // {
    //     id: 8,
    //     inputType: "file",
    //     title: "File Upload",
    //     fieldform: {
    //         Label: "Label",
    //         Placeholder: "Place Holder",
    //     },
    //     icon: TbFileUpload,
    // },
    {
        id: 9,
        inputType: "date",
        title: "Date",
        fieldform: {
            Label: "Label",
            Placeholder: "Place Holder",
        },
        icon: LuTextCursorInput,
    },
];