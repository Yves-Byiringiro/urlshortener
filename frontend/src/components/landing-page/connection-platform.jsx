import { FaRegCircleCheck } from "react-icons/fa6";
import { IoQrCode } from "react-icons/io5";
import { LuLink } from "react-icons/lu";
import { MdArrowForward, MdArrowUpward } from "react-icons/md";
import { RiPagesFill } from "react-icons/ri";
import { Button } from "../button";

export const ConnectionPlatform = () => {
  const featuresList = [
    {
      icon: <LuLink />,
      title: "URL Shortener",
      description:
        "A comprehensive solution to help make every point of connection between your content and your audience more powerful",
      featuresTitle: "Popular URL Shortening Features",
      features: [
        "URL shortening at scale",
        "AI-generated custom domains",
        "URL redirects",
        "Advanced analytics & tracking",
      ],
      url: "/short-link-card-opt.png",
    },
    {
      icon: <IoQrCode />,
      title: "QR Codes",
      description:
        "QR Code solutions for every customer, business and brand experience",
      featuresTitle: "Popular QR Code Features",
      features: [
        "Fully customizable QR Codes",
        "Dynamic QR Codes",
        "QR Code types & destination options",
        "Advanced analytics & tracking",
      ],
      url: "/qr-code-card-opt.png",
    },
    {
      icon: <RiPagesFill />,
      title: "Landing Pages",
      description:
        "Bitly Pages helps you create engaging, mobile-optimized landing pages in minutes.",
      featuresTitle: "Popular Landing Page Features",
      features: [
        "Custom URLs for social media",
        "Customizable landing page",
        "Easy-to-manage links",
        "Link and landing page tracking",
      ],
      url: "/pages-card-opt.png",
    },
  ];

  return (
    <section className="bg-[#f7f4ee] text-black text-center px-8 lg:px-0 ">
      <div className="app-container mx-auto py-20">
        <h3 className="uppercase lg:text-xl text-gray-600">
          Great Connections Start with a click OR SCAN
        </h3>
        <h2 className="text-2xl lg:text-4xl font-extrabold mt-3">
          The Bitly Connections Platform
        </h2>
        <p className="text- lg:text-xl lg:w-[80%] mx-auto mt-4 leading-6 lg:leading-8">
          All the products you need to build brand connections, manage links and
          QR Codes, and connect with audiences everywhere, in a single unified
          platform.
        </p>

        <div className="flex gap-3 mx-auto w-fit mt-8 lg:flex-row flex-col">
          <Button variant="blue" size="lg">
            Get started for free
            <MdArrowForward className="text-3xl inline-block ml-2" />
          </Button>
          <Button variant="blue-outline" size="lg">
            Get started for free
            <MdArrowForward className="text-3xl inline-block ml-2" />
          </Button>
        </div>

        <div className="mt-14 grid-cols-1 lg:grid-cols-3 grid gap-6 app-container">
          {featuresList.map(
            (
              { description, features, featuresTitle, icon, title, url },
              index
            ) => (
              <div
                key={index}
                className="border h-[562px] rounded-3xl overflow-hidden bg-[#eeeae3] relative group border-[#b9b7b0] transition"
              >
                <img 
                  src={url}
                  alt="cover"
                  width={400}
                  height={400}
                  className="w-full"
                />

                <div className="border-t p-5 px-6 border-[#b9b7b0] top-[25.5rem] group-hover:top-16 absolute rounded-4xl bg-white h-[562px] transition  ">
                  <div className="flex items-center gap-3 text-3xl font-bold">
                    <span className="text-orange-500">{icon}</span>
                    <h2 className="flex-1 text-left">{title}</h2>
                    <div>
                      <MdArrowUpward className="transition group-hover:rotate-180" />
                    </div>
                  </div>

                  <p className="text-left pt-5 text-sm">{description}</p>

                  <h4 className="text-left font-bold text-lg pt-8">
                    {featuresTitle}
                  </h4>
                  <div className="text-left flex item-center gap-3 pt-3 flex-col">
                    {features.map((el) => (
                      <div key={el} className="flex items-center gap-2">
                        <FaRegCircleCheck className="text-xl text-orange-600" />
                        <span className="text-gray-600">{el}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3 mt-4">
                    <Button variant="blue" size="md">
                      Get started for free
                    </Button>
                    <Button variant="blue-outline" size="md">
                      Learn more
                    </Button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};
