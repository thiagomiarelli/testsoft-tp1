// SubjectsProvider.js
import React, { createContext, useState, useMemo, useCallback } from "react";

type SubjectsProviderProps = {
  children: React.ReactNode;
};

export const SubjectsContext = createContext<{
  subjects: string[];
  defineSubjects: (subjects: string[]) => void;
}>({
  subjects: [],
  defineSubjects: () => {},
});

export default function SubjectsProvider({ children }: SubjectsProviderProps) {
  const [subjects, setSubjects] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    const localSubjects = localStorage.getItem("subjects");

    return localSubjects ? JSON.parse(localSubjects) : [];
  });

  // Wrap the defineSubjects function in useCallback
  const defineSubjects = useCallback((newSubjects: string[]) => {
    setSubjects(newSubjects);
    if (typeof window === "undefined") return;
    localStorage.setItem("subjects", JSON.stringify(newSubjects));
  }, []);

  const contextValue = useMemo(
    () => ({ subjects, defineSubjects }),
    [subjects, defineSubjects]
  );

  return (
    <SubjectsContext.Provider value={contextValue}>
      {children}
    </SubjectsContext.Provider>
  );
}
