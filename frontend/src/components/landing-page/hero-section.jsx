import { FaRegCircleCheck } from "react-icons/fa6";
import { HeaderAction } from "../header-action";

export const HeroSection = () => (
  <header className="bg-[#031f39] flex flex-col gap-8 lg:gap-10 pb-16">
    <div className="app-container text-center mx-auto flex gap-4 flex-col pt-12 lg:pt-24 px-4 lg:px-0">
      <h1 className="text-4xl lg:text-5xl font-bold">
        Build stronger digital connections
      </h1>
      <p className="lg:text-2xl">
        Use our URL shortener, QR Codes, and landing pages to engage your
        audience and connect them to the right information. Build, edit, and
        track everything inside the Bitly Connections Platform.
      </p>
    </div>
    <HeaderAction />

    <div className="mx-auto">
      <p className="text-2xl font-bold max-w-[340px] lg:max-w-fit mx-auto text-left lg:text-center">
        Sign up for free. Your free plan includes:
      </p>
      <div className="flex gap-3 px-8 lg:px-0 lg:mx-auto w-fit mt-3 lg:flex-row flex-col">
        {[
          "5 short links/month",
          "3 custom back-halves/month",
          "Unlimited link clicks",
        ].map((el, index) => (
          <div key={index} className="flex items-center text-sm gap-2">
            <FaRegCircleCheck className="text-xl text-orange-600" />{" "}
            <span>{el}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-6 w-fit mx-auto gap-4 justify-between mt-6">
        {[1, 2, 3, 4, 5, 6].map((el) => (
          <div
            className="bg-gray-700 p-4 h-[60px] rounded-xl w-[150px]"
            key={el}
          />
        ))}
      </div>
    </div>
  </header>
);
