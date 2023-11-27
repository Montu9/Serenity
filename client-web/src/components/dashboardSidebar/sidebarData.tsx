import { FaListOl } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { TbDog, TbHomePlus, TbUsersPlus } from "react-icons/tb";

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
                icon: <IoSettingsOutline />,
                href: "settings",
            },
        ],
    },
    {
        title: "Kennels",
        content: [
            {
                subTitle: "Add new kennel",
                icon: <TbHomePlus />,
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
                icon: <TbUsersPlus />,
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
                icon: <TbDog />,
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
