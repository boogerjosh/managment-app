import { Task } from '../lib/types';
import clsx from 'clsx'
import React from 'react'

type ButtonDropDown = {
  id: string;
  text: string;
  icon: React.ReactNode;
  color: string;
}

type DropDownMenuProps = {
  buttonDropDown: ButtonDropDown[];
  handleEditAndDelete: (action: string) => void;
  isDropdownOpen: boolean;
  menuRef: React.RefObject<HTMLDivElement>; // Added ref prop
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({ buttonDropDown, handleEditAndDelete, isDropdownOpen, menuRef}) => {
  return (
          <div
        ref={menuRef}
        className={clsx(
          "w-64 shadow-md rounded-md absolute p-2 bg-white right-[-35px] top-7 z-40",
          isDropdownOpen ? "visible" : "invisible"
        )}
      >
        {buttonDropDown.map((button) => (
          <button
            onClick={() => handleEditAndDelete(button.text)}
            key={button.id}
            draggable="false"
            className={clsx(
              "flex items-center p-2 whitespace-nowrap rounded-md text-sm hover:bg-[#F0F1F3] w-full hover:transition-all hove:ease-in-out",
              button.color
            )}
          >
            <div className="text-base mr-2.5">{button.icon}</div>
            {button.text}
          </button>
        ))}
      </div>
  )
}

export default DropDownMenu