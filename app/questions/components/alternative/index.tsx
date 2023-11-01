import selectStyleByCondition from "@/utils/selectStyleByCondition";
import parse from "html-react-parser";

interface Props {
  text: string;
  index: number;
  id: string;
  selected: boolean;
  correct: boolean | null;
  on_click?: () => void;
}
export default function QuestionAlternative(props: Props) {
  const getClassesByCondition = (
    selected: boolean,
    correct: boolean | null
  ) => {
    const standard =
      "w-full border-2 rounded-md p-4 px-2 lg:p-4 flex flex-row gap-2";
    if (correct === null) {
      return selectStyleByCondition(
        selected ? "bg-secondary border-primary" : "hover:bg-gray-100",
        standard
      );
    } else {
      if (!correct) {
        return selectStyleByCondition(
          selected ? "bg-red-200 border-red-600" : "",
          standard
        );
      } else {
        return "bg-green-200 border-green-600 " + standard;
      }
    }
  };

  return (
    <div
      className={getClassesByCondition(props.selected, props.correct)}
      onClick={props.correct === null ? props.on_click : () => {}}
    >
      <h4 className="font-semibold text-primary">
        {String.fromCharCode(97 + props.index) + ")"}
      </h4>
      {parse(props.text)}
    </div>
  );
}
