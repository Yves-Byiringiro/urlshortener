import { Button } from "../components/button";
import { IoClose } from "react-icons/io5";
import { FiCopy } from "react-icons/fi"; 
import { useEffect, useState } from "react";
import { AdminLayout } from "../components/admin-layout/admin-layout";
import { useDispatch, useSelector } from "react-redux";
import { shortenUrl, resetShortenUrlState } from "../context/slices/urls.slice";

export default function Dashboard() {
  const dispatch = useDispatch();

  const [longUrl, setLongUrl] = useState("");
  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [urlError, setUrlError] = useState("");
  const [copied, setCopied] = useState(false);

  const {
    usershortenUrlLoading,
    shortenUrlError,
    shortenUrlSuccess,
    shortURL,
  } = useSelector((state) => state.urls);

  const isValidUrl = (url) => {
    const urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}.*$/;
    return urlPattern.test(url);
  };

  const handleSubmit = () => {
    if (!longUrl.trim()) {
      setUrlError("We'll need a valid URL like www.google.com.");
      return;
    }

    if (!isValidUrl(longUrl)) {
      setUrlError("We need a valid URL like www.google.com");
      return;
    }

    setUrlError("");
    dispatch(shortenUrl({ long_url: longUrl, title }));
  };


  const handleCopy = () => {
    navigator.clipboard.writeText(shortURL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (shortenUrlSuccess) {
      setShowModal(true);
    }
  }, [shortenUrlSuccess]);

  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(resetShortenUrlState());
    setTitle("");
    setLongUrl("");
  }

  return (
    <>
      <AdminLayout>
        <div className="mx-auto app-container pt-14 w-[70%]">
          <div className="flex-col">
            <h2 className="text-3xl font-bold">Create a link</h2>
            <div className="mt-4 flex space-x-2">
              <p className="font-normal">
                You can create <span className="font-bold">5</span> more links this month.
              </p>
              <a href="#" className="underline hover:opacity-55">
                Upgrade for more
              </a>
            </div>
          </div>

          <div className="mt-10 bg-white p-6 rounded-xl space-y-6">
            <div>
              <label className="block text-sm text-gray-900 mb-2 font-semibold">
                Destination
              </label>
              <input
                value={longUrl}
                onChange={(e) => {
                  setLongUrl(e.target.value);
                  setUrlError("");
                }}
                className={`w-full px-3 py-2 rounded-lg border-2 ${
                  urlError ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:border-blue-500`}
                placeholder="https://example.com/my-long-url"
              />
              {urlError && <p className="text-red-500 text-sm mt-1">{urlError}</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-900 mb-2 font-semibold">
                Title <span className="font-light">(optional)</span>
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder="Title"
              />
            </div>

            {usershortenUrlLoading && <p className="text-blue-500 text-sm">Loading...</p>}
            {shortenUrlError && <p className="text-red-500 text-sm">{shortenUrlError}</p>}
            
            <div>
              <Button
                size=""
                variant="blue"
                className="font-semibold"
                onClick={handleSubmit}
                disabled={usershortenUrlLoading}
              >
                {usershortenUrlLoading ? "Creating..." : "Create your link"}
              </Button>
            </div>
          </div>
        </div>
      </AdminLayout>

      {showModal && (
        <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative w-[40%] bg-white p-6 rounded-lg shadow-lg">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <IoClose size={24} />
            </button>
            <h3 className="text-xl font-bold text-black">You link is ready!</h3>
            <p className="text-black py-5 font-normal">Copy the link below to share it</p>
            <div className="w-full bg-slate-100 rounded-lg">
                <div className="flex justify-center p-4">
                  <a
                  href={shortURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-800 font-bold text-lg"
                  >
                    {shortURL}
                  </a>
                </div>
                <div className="flex justify-center p-4">
                <button
                  onClick={handleCopy}
                  className="flex items-center bg-blue-800 text-white px-4 py-2 rounded-lg hover:opacity:80 transition duration-200"
                >
                  <FiCopy className="mr-2" size={20} />
                  {copied ? "Copied!" : "Copy link"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
