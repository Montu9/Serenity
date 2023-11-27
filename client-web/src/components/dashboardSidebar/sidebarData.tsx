import { FaListOl } from "react-icons/fa6";
import { IoPeopleSharp } from "react-icons/io5";
import { FaDog } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { GiDogHouse } from "react-icons/gi";
import { MdOutlineSpaceDashboard } from "react-icons/md";

interface SidebarSection {
    title: string;
    content: {
        subTitle: string;
        icon: React.ReactNode;
        href: string;
    }[];
}

export const SidebarData: SidebarSection[] = [
    {
        title: "Shelter",
        content: [
            {
                subTitle: "Dashboard",
                icon: <MdOutlineSpaceDashboard />,
                href: "",
            },
            {
                subTitle: "Shelter settings",
                icon: <IoSettingsSharp />,
                href: "settings",
            },
        ],
    },
    {
        title: "Kennels",
        content: [
            {
                subTitle: "Add new kennel",
                icon: <GiDogHouse />,
                href: "addNewKennel",
            },
            {
                subTitle: "Kennels list",
                icon: <FaListOl />,
                href: "kennels",
            },
        ],
    },
    {
        title: "Caretakers",
        content: [
            {
                subTitle: "Add new caretaker",
                icon: <IoPeopleSharp />,
                href: "addNewCaretaker",
            },
            {
                subTitle: "Caretakers list",
                icon: <FaListOl />,
                href: "caretakers",
            },
        ],
    },
    {
        title: "Dogs",
        content: [
            {
                subTitle: "Add new dog",
                icon: <FaDog />,
                href: "addNewDog",
            },
            {
                subTitle: "Dogs list",
                icon: <FaListOl />,
                href: "dogs",
            },
        ],
    },
];
