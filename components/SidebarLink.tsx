"use client";

import Link from "next/link";
import { Settings, User, Grid, Calendar } from "react-feather";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const icons = { Settings, User, Grid, Calendar };
type SidebarLink = {
  link: {
    label: string;
    icon: string;
    linkUrl: string
  }
}
const SidebarLink: React.FC<SidebarLink> = ({ link }) => {
  const pathname = usePathname();
  let isActive = false;
  if (pathname === link.linkUrl) {
    isActive = true;
  }

  const Icon = icons[link.icon];
  return (
    <Link href={link.linkUrl} className="w-full flex" prefetch={true}>
      <Icon
        size={40}
        className={clsx(
          "stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out mx-auto",
          isActive && "stroke-violet-600"
        )}
      />
    </Link>
  );
};

export default SidebarLink;
