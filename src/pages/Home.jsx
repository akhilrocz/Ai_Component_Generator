import React, { useState } from 'react'
import Navbar from "../../src/components/GlobalComponets/Navbar"
import Select from 'react-select'
import { TbCode } from "react-icons/tb";
import Editor from '@monaco-editor/react';
import { FiCopy, FiShare2, FiRefreshCcw } from "react-icons/fi"
import { LuExternalLink } from "react-icons/lu"
import { toast } from 'react-toastify';
import { ClipLoader } from "react-spinners"

import { GoogleGenAI } from "@google/genai";

const Home = () => {
  const options = [
    { value: 'html-css', label: 'HTML + CSS' },
    { value: 'html-tailwind', label: 'HTML + Tailwind CSS' },
    { value: 'html-css-js', label: 'HTML + CSS + JS' },
    { value: 'html-tailwind-bootstrap', label: 'HTML + Tailwind + Bootstrap' },
  ]

  const [outputScreen, setOutputScreen] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const [tab, setTab] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [framework, setFramework] = useState(options[0].value);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

  function extractCode(interaction) {
    const match = interaction.match(/```(?:\w+)?\n?([\s\S]*?)```/);
    return match ? match[1].trim() : interaction.trim();
  }

  async function getResponse() {

    setLoading(true);

    try {
      const interaction = await ai.interactions.create({
        model: "gemini-3.6-flash",
        input: prompt,
      });
      setOutputScreen(true);
      setError("");
      setCode(extractCode(interaction.output_text))
    } catch (error) {
      if (error.message?.includes("429")) {
        setError("Rate limit exceeded. Please try again later.");
        alert("Rate limit exceeded. Please wait a few seconds and try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard")
    } catch (err) {
      toast.error("Failed to copy");
    }
  }

  const shareCode = async () => {
    try {
      if (!code) {
        toast.error("No code to share");
        return;
      }

      if (navigator.share) {
        await navigator.share({
          title: "Ai generated output",
          text: code
        })

        toast.success("Code shared successfully");
      } else {
        await navigator.clipboard.writeText(code);
        toast.error("Share not supported, code copied instead");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to share");
    }
  }

  const openInNewTab = () => {

    if (!code) {
      toast.error("No code available to preview.")
      return;
    }

    const newWindow = window.open("", "_blank");

    if (!newWindow) {
      toast.error("Popup blocked by browser");
      return;
    }
    newWindow.document.write(code);
    newWindow.document.close();

  }

  const refreshPage = () => {
    setPreviewKey((prev) => prev + 1);
  }


  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#141319',
      borderColor: '#374151',
      boxShadow: 'none',
      minHeight: '48px',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#141319',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#2a2930' : '#141319',
      color: '#fff',
      cursor: 'pointer',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',
    }),
    input: (provided) => ({
      ...provided,
      color: '#fff',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#9ca3af',
    }),
  }
  return (
    <div>
      <Navbar />

      <div className="px-4 sm:px-6 lg:px-8 xl:px-12 py-5">
        <div className="flex flex-col lg:flex-row gap-5">

          <div className="w-full lg:w-1/2 min-h-[400px] lg:h-[80vh] rounded-md bg-[#141319] p-4 sm:p-5 md:p-6">

            <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-6">
              Describe your component, and let AI code it for you.
            </p>

            <div className="mb-3">
              <h4 className="font-semibold text-lg sm:text-xl md:text-2xl">
                Framework
              </h4>
            </div>

            <Select
              options={options}
              styles={customStyles}
              onChange={(selectedOption) => setFramework(selectedOption.value)}
              placeholder="Select a framework..."
            />

            <div className="mt-6">
              <h4 className="font-semibold text-lg sm:text-xl md:text-2xl mb-3">
                Describe your component
              </h4>

              <textarea
                onChange={(e) => setPrompt(e.target.value)}
                value={prompt}
                placeholder="Example: Create a responsive pricing card with a gradient header and call-to-action button..."
                className="w-full min-h-[150px] md:min-h-[200px] rounded-md bg-[#09090B] border border-gray-700 p-4 text-sm sm:text-base resize-none focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="mt-6">
              <button onClick={getResponse}
                disabled={loading}
                className="
                cursor-pointer
      w-full sm:w-auto
      min-w-[140px]
      px-6 py-3
      rounded-lg
      bg-gradient-to-r from-purple-500 to-purple-600
      hover:from-purple-600 hover:to-purple-700
      text-white
      font-semibold
      shadow-lg
      transition-all duration-300
      flex items-center justify-center
    "
              >
                Generate
              </button>
            </div>

          </div>

          <div className="w-full lg:w-1/2 min-h-[400px] lg:h-[80vh] rounded-md bg-[#141319] p-5">
            {error && (
              <div className="text-red-500 text-center py-4">
                {error}
              </div>
            )}
            {loading ? (
              <div className='h-full flex flex-col items-center justify-center gap-4'>
                <ClipLoader color="#a855f7" size={50} />
                <p className='text-gray-400'>Generating component...</p>
              </div>
            ) : !outputScreen ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center max-w-md">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl border border-gray-700 bg-[#09090B] flex items-center justify-center">
                    <TbCode size={30} className="text-purple-400" />
                  </div>

                  <h3 className="text-2xl font-semibold gradient-colors mb-3">
                    Generated Component
                  </h3>

                  <p className="text-gray-400 leading-relaxed">
                    Your component preview and generated code will appear here after generation.
                  </p>
                </div>
              </div>

            ) : (
              <div className="h-full overflow-hidden rounded-md border border-gray-700 flex flex-col">
                <div className="flex items-center justify-between p-3 border-b border-gray-700 bg-[#09090B]">

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setTab(1)}
                      className={`px-4 py-2 rounded-md text-white text-sm font-medium ${tab === 1 ? "bg-purple-600" : "bg-[#333]"
                        }`}
                    >
                      Code
                    </button>

                    <button
                      onClick={() => setTab(2)}
                      className={`px-4 py-2 rounded-md text-white text-sm font-medium ${tab === 2 ? "bg-purple-600" : "bg-[#333]"
                        }`}
                    >
                      Preview
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {tab === 1 ? (
                      <>
                        <button
                          onClick={copyText}
                          className="flex items-center gap-2 px-3 py-2 rounded-md bg-[#333] hover:bg-[#444] transition-all text-sm"
                        >
                          <FiCopy size={16} />
                          Copy
                        </button>

                        <button
                          onClick={shareCode}
                          className="flex items-center gap-2 px-3 py-2 rounded-md bg-[#333] hover:bg-[#444] transition-all text-sm"
                        >
                          <FiShare2 size={16} />
                          Share
                        </button>
                      </>
                    ) : (
                      <>
                        <button onClick={openInNewTab}
                          className="flex items-center gap-2 px-3 py-2 rounded-md bg-[#333] hover:bg-[#444] transition-all text-sm"
                        >
                          <LuExternalLink size={16} />
                          Open in New Tab
                        </button>

                        <button onClick={refreshPage}
                          className="flex items-center gap-2 px-3 py-2 rounded-md bg-[#333] hover:bg-[#444] transition-all text-sm"
                        >
                          <FiRefreshCcw size={16} />
                          Refresh
                        </button>
                      </>
                    )}
                  </div>

                </div>

                <div className="flex-1">
                  {tab === 1 ? (
                    <Editor
                      value={code}
                      height="100%"
                      language="html"
                      theme="vs-dark"
                    />
                  ) : (
                    <iframe
                      key={previewKey}
                      srcDoc={code}
                      title="Preview"
                      className="w-full h-full border-0 bg-white"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home