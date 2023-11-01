import selectStyleByCondition from "@/utils/selectStyleByCondition";

interface Props {
  text: string;
  correct: boolean;
}

export default function Chips(props: Props) {
  return (
    <div
      className={selectStyleByCondition(
        props.correct
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700",
        "rounded-full px-4 py-2 text-sm font-semibold"
      )}
    >
      {props.text}
    </div>
  );
}
