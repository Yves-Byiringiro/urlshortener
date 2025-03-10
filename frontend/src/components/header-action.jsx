import classNames from "classnames";
import { useState } from "react";
import { HiLink } from "react-icons/hi";
import { FaQrcode } from "react-icons/fa";
import { Button } from "./button";
import { MdArrowForward } from "react-icons/md";
// import { QRCode } from "qrcode.react";

export const HeaderAction = () => {
  const [selected, setSelected] = useState("url");

  return (
    <div className="flex flex-col gap-2 px-4 lg:px-0">
      <div className="flex items-center gap-3 lg:gap-4 w-fit mx-auto">
        <button
          className={classNames(
            "flex gap-2 rounded-2xl p-3 items-center text-lg font-bold px-4",
            {
              "bg-white text-black": selected === "url",
            }
          )}
          onClick={() => setSelected("url")}
        >
          <HiLink className="text-4xl text-orange-600" />
          <span className="hidden lg:inline-block">Short link</span>
        </button>
        <button
          className={classNames(
            "flex gap-2 rounded-2xl p-3 items-center text-lg font-bold px-4",
            {
              "bg-white text-black": selected === "qr-code",
            }
          )}
          onClick={() => setSelected("qr-code")}
        >
          <FaQrcode className="text-2xl text-orange-600" />
          <span className="hidden lg:inline-block">Qr code</span>
        </button>
      </div>

      <div className="w-full max-w-[960px] flex h-[283px] lg:h-[383px] text-black bg-white rounded-[3rem] mx-auto mt-8">
        {selected === "url" ? (
          <div className="flex flex-1 flex-col justify-between p-8">
            <div>
              <h2 className="text-2xl lg:text-4xl font-bold">
                Shorten a long link
              </h2>
              <p className="pt-1 lg:pt-3">No credit card required.</p>
            </div>

            <div>
              <div className="flex flex-col">
                <label htmlFor="" className="text-lg block mb-2 font-bold">
                  Paste your long link here
                </label>
                <input
                  className="p-2 lg:p-3 border text-lg lg:text-2xl rounded"
                  placeholder="https://example.com/my-long-url"
                />
              </div>
              <div className="pt-6">
                <Button size="lg" variant="blue">
                  Get your link for free{" "}
                  <MdArrowForward className="text-3xl inline-block ml-2" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <QrCodeGenerator />
        )}
      </div>
    </div>
  );
};

const QrCodeGenerator = () => {
  const [qrCodeText, setQrCodeText] = useState("");
  const [generatedQR, setGeneratedQR] = useState("");

  return (
    <>
      <div className="flex flex-1 flex-col justify-between p-8">
        <div>
          <h2 className="text-2xl lg:text-4xl font-bold">Create a QR Code</h2>
          <p className="pt-1 lg:pt-3">No credit card required.</p>
        </div>

        <div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-lg block mb-2 font-bold">
              Enter your QR Code destination
            </label>
            <input
              className="p-2 lg:p-3 border text-lg lg:text-2xl rounded"
              placeholder="https://example.com/my-long-url"
              value={qrCodeText}
              onChange={(e) => setQrCodeText(e.target.value)}
            />
          </div>
          <div className="pt-6">
            <Button
              size="lg"
              variant="blue"
              onClick={() => setGeneratedQR(qrCodeText)}
            >
              Get your link for free{" "}
              <MdArrowForward className="text-3xl inline-block ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex w-[350px] items-center justify-center m-6 bg-gray-100 rounded-3xl border border-gray-400">
        {generatedQR ? (
          <QRCode
            value={generatedQR}
            size={300}
            fgColor="#f54a00"
            level="M"
            includeMargin={true}
          />
        ) : (
          <img
            src="/qr-code-card-tall.png"
            alt="QR code placeholder"
            width={400}
            height={400}
            className="w-full h-full"
          />
        )}
      </div>
    </>
  );
};
