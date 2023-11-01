import selectStyleByCondition from "@/utils/selectStyleByCondition";

interface Props {
  name: string;
  icon: any;
  active: boolean;
  onClick: () => void;
}

export default function desktopSubjectItem(props: Props) {
  return (
    <div
      key={props.name}
      className={selectStyleByCondition(
        props.active ? "bg-primary m-2 p-2" : "hover:bg-gray-50 p-4",
        "group relative flex items-center gap-x-6 rounded-lg text-sm leading-6"
      )}
      onClick={props.onClick}
    >
      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
        <props.icon
          className={selectStyleByCondition(
            props.active
              ? "text-primary group-hover:text-primary"
              : "text-gray-600 group-hover:text-primary",
            "h-6 w-6"
          )}
          aria-hidden="true"
        />
      </div>
      <div
        className={selectStyleByCondition(
          props.active ? "text-white" : "text-gray-900",
          "block font-semibold flex-auto"
        )}
      >
        {props.name}
        <span className="absolute inset-0" />
      </div>
    </div>
  );
}
