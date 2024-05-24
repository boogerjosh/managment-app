import Card from "./Card";
import SidebarLink from "./SidebarLink";

const links = [
  { label: "Home", icon: "Grid", linkUrl: "/home" },
  {
    label: "Calendar",
    icon: "Calendar",
    linkUrl: "/calendar",
  },
  { label: "Profile", icon: "User", linkUrl: "/profile" },
  {
    label: "Settings",
    icon: "Settings",
    linkUrl: "/settings",
  },
];

const Sidebar = () => {
  return (
    <Card className="h-full w-40 flex items-center justify-between flex-wrap">
      {links.map((link, index) => (
        <SidebarLink link={link} key={index} />
      ))}
    </Card>
  );
};

export default Sidebar;
