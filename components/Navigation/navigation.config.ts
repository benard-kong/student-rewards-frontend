import { SvgIcon } from "@material-ui/core";
import { Person, PersonAdd } from "@material-ui/icons";

type SvgIconComponent = typeof SvgIcon;

export interface LinkObject {
  id: string;
  displayText: string;
  href: string;
  Icon?: SvgIconComponent;
}

export const primaryLinks: LinkObject[] = [
  {
    id: "all-students",
    displayText: "All Students",
    href: "/student/all",
    Icon: Person,
  },
  {
    id: "all-teachers",
    displayText: "All Teachers",
    href: "/admin/teacher/all",
    Icon: Person,
  },
];

export const adminLinks = [
  {
    id: "create-new-student",
    displayText: "Create New Student",
    href: "/student/create-new",
    Icon: PersonAdd,
  },
  {
    id: "create-new-teacher",
    displayText: "Create New Teacher",
    href: "/admin/teacher/create-new",
    Icon: PersonAdd,
  },
];
