"use client"; // This is a client component 👈🏽
import { useState } from "react";
import Image from "next/image";
import { Dialog, Popover } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";

import SubjectsDropdown from "./components/subjectsDropdown";
import logo from "../../public/smartquiz.svg";

import subjectsList from "../../enums/subjects";

export default function Menu({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <header className="z-40">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-16"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">SmartQuiz</span>
              <Image className="h-8 w-auto" src={logo} alt="" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            {subjectsList.map((item) => (
              <SubjectsDropdown
                type="desktop"
                key={item.area}
                area={item.area}
                subjects={item.subjects}
              />
            ))}
          </Popover.Group>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-white"
              onClick={() =>
                signOut({ callbackUrl: `${window.location.origin}/` })
              }
            >
              Log out <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <Image className="h-8 w-auto" src={logo} alt="" />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root grid gap-4 content-between">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {subjectsList.map((item) => (
                    <SubjectsDropdown
                      type="mobile"
                      key={item.area}
                      area={item.area}
                      subjects={item.subjects}
                    />
                  ))}
                </div>
              </div>
              <a
                href="#"
                className="text-md font-semibold leading-6 text-gray-900"
                onClick={() =>
                  signOut({ callbackUrl: `${window.location.origin}/` })
                }
              >
                Sair <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      {children}
    </div>
  );
}
