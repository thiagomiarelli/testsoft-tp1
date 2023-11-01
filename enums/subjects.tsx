import {
  AcademicCapIcon,
  GlobeAltIcon,
  LightBulbIcon,
  UsersIcon,
  BeakerIcon,
  SparklesIcon,
  BookOpenIcon,
  PaintBrushIcon,
  CalculatorIcon,
  ComputerDesktopIcon,
  GlobeAmericasIcon,
  FireIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/24/outline";

const subjectsData = [
  {
    area: "Humanas",
    subjects: [
      { icon: AcademicCapIcon, name: "História" },
      { icon: GlobeAltIcon, name: "Geografia" },
      { icon: LightBulbIcon, name: "Filosofia" },
      { icon: UsersIcon, name: "Sociologia" },
    ],
  },
  {
    area: "Natureza",
    subjects: [
      { icon: ViewfinderCircleIcon, name: "Biologia" },
      { icon: BeakerIcon, name: "Química" },
      { icon: SparklesIcon, name: "Física" },
    ],
  },
  {
    area: "Linguagens",
    subjects: [
      { icon: BookOpenIcon, name: "Língua Portuguesa e Literatura" },
      { icon: GlobeAmericasIcon, name: "Língua Estrangeira Moderna" },
      { icon: PaintBrushIcon, name: "Artes" },
      { icon: FireIcon, name: "Educação Física" },
      {
        icon: ComputerDesktopIcon,
        name: "Tecnologias da Informação e Comunicação",
      },
    ],
  },
  {
    area: "Matemática",
    subjects: [{ icon: CalculatorIcon, name: "Matemática" }],
  },
];

export default subjectsData;
