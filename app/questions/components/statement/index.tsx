import React from "react";
import parse from "html-react-parser";

interface Props {
  statement: string;
}

export default function QuestionStatement(props: Props) {
  return <div className="mb-4">{parse(props.statement)}</div>;
}
