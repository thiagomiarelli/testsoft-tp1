"use client"; // This is a client component 👈🏽
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import selectStyleByCondition from "@/utils/selectStyleByCondition";

import Item from "./item";

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

export default function SubjectsDropdownMobile(props: Props) {
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
    <Disclosure as="div" className="-mx-3">
      {({ open }) => (
        <>
          <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-    hover:bg-gray-50">
            {props.area}
            <ChevronDownIcon
              className={selectStyleByCondition(
                open ? "rotate-180" : "",
                "h-5 w-5 flex-none"
              )}
              aria-hidden="true"
            />
          </Disclosure.Button>
          <Disclosure.Panel className="mt-2 space-y-2">
            {props.subjects.map((item) => (
              <Item
                name={item.name}
                icon={item.icon}
                active={is_active(item.name)}
                onClick={() => toggle(item.name)}
              />
            ))}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
