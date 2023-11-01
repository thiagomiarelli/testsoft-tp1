"use client";
import googleLogo from "../../public/google.svg";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function GoogleSignupButton() {
  return (
    <button
      className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-4 rounded shadow w-full"
      onClick={() => {
        signIn("google", {
          callbackUrl: `${window.location.origin}/questions`,
        });
      }}
    >
      <div className="flex items-center">
        <div className="ml-2 flex flex-column gap-x-3">
          <Image src={googleLogo} alt="Google Logo" width={20} height={20} />
          <div className="text-md font-semibold text-gray-700">
            Continuar com o Google
          </div>
        </div>
      </div>
    </button>
  );
}
