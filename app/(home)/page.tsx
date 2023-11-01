"use client";
import Image from "next/image";
import logo from "../../public/smartquiz.svg";
import GoogleSignupButton from "./GoogleButton";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/questions");
    }
  }, [status, router]);

  return (
    <main className="flex flex-col h-screen">
      <div className="bg-white flex flex-col items-center content-center justify-center">
        <div className="p-4 flex flex-col items-center">
          <Image
            src={logo}
            alt="Logo"
            width={300}
            height={200}
            className="mt-32"
          />
          <h2 className="mt-16 text-3xl text-slate-800 text-center mb-12 font-decorative">
            As questões certas para você. Escolhidas usando inteligência
            artificial.
          </h2>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            className="fill-primary"
            fillOpacity="1"
            d="M0,192L80,192C160,192,320,192,480,170.7C640,149,800,107,960,85.3C1120,64,1280,64,1360,64L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="bg-primary text-slate-800	flex flex-col h-full items-center content-center -mt-6 lg:-mt-24 pt-6 lg:pt-3">
        <div className="w-10/12 lg:w-72 flex flex-col gap-3">
          <h3 className="text-xl text-left text-white w-full font-semibold">
            {" "}
            Entre ou cadastre-se{" "}
          </h3>
          <GoogleSignupButton />
        </div>
      </div>
    </main>
  );
}
