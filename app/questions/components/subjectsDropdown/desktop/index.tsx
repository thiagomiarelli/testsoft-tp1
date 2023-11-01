"use client"; // This is a client component 👈🏽
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import Item from "./item";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

interface Subject {
  name: string;
  icon: any;
}

interface Props {
  subjects: Subject[];
  area: string;
  activeSubjects: string[];
  setActiveSubjects: Function;
}

export default function SubjectsDropdownDesktop(props: Props) {
  const is_active = (subject: string) => {
    return props.activeSubjects.includes(subject);
  };

  const toggle = (subject: string) => {
    if (is_active(subject)) {
      props.setActiveSubjects(
        props.activeSubjects.filter((item) => item !== subject)
      );
    } else {
      props.setActiveSubjects([...props.activeSubjects, subject]);
    }
  };

  return (
    <Popover className="relative">
      <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white">
        {props.area}
        <ChevronDownIcon
          className="h-5 w-5 flex-none text-gray-400"
          aria-hidden="true"
        />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-sm overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
          <div className="p-4">
            {props.subjects.map((item) => (
              <Item
                name={item.name}
                icon={item.icon}
                active={is_active(item.name)}
                key={item.name}
                onClick={() => toggle(item.name)}
              />
            ))}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
