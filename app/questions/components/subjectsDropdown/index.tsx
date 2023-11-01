"use client"; // This is a client component 👈🏽

import SubjectsDropdownDesktop from "./desktop";
import SubjectsDropdownMobile from "./mobile";

import { useContext } from "react";
import { SubjectsContext } from "@/context/subjectsContext";

interface Subject {
  name: string;
  icon: any;
}

interface Props {
  subjects: Subject[];
  area: string;
  type: "mobile" | "desktop";
}

export default function SubjectsDropdown(props: Props) {
  const { subjects, defineSubjects } = useContext(SubjectsContext);

  return props.type === "mobile" ? (
    <SubjectsDropdownMobile
      {...props}
      activeSubjects={subjects}
      setActiveSubjects={defineSubjects}
    />
  ) : (
    <SubjectsDropdownDesktop
      {...props}
      activeSubjects={subjects}
      setActiveSubjects={defineSubjects}
    />
  );
}
