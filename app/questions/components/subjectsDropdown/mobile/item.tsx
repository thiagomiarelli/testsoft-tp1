import { Disclosure } from "@headlessui/react";
import selectStyleByCondition from "@/utils/selectStyleByCondition";

interface Props {
  name: string;
  icon: any;
  active: boolean;
  onClick: Function;
}

export default function mobileSubjectItem(props: Props) {
  return (
    <Disclosure.Panel
      key={props.name}
      as="a"
      href=""
      className={selectStyleByCondition(
        props.active ? "bg-primary text-white" : "text-gray-900",
        "block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7"
      )}
      onClick={(e) => {
        e.preventDefault();
        props.onClick();
      }}
    >
      {props.name}
    </Disclosure.Panel>
  );
}
