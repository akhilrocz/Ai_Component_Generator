import React from 'react'
import Navbar from "../../src/components/GlobalComponets/Navbar"
import Select from 'react-select'

const Home = () => {
  const options = [
    { value: 'react', label: 'React' },
    { value: 'nextjs', label: 'Next.js' },
    { value: 'tailwind', label: 'Tailwind CSS' },
    { value: 'typescript', label: 'TypeScript' },
  ]

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

          <div className="w-full lg:w-1/2 min-h-[400px] lg:h-[80vh] rounded-md bg-[#141319] p-5">

            <p className="text-gray-300 mt-3 text-base md:text-lg">
              Describe your component, and let AI code it for you.

              <Select options={options} styles={customStyles} placeholder="Select a framework..." />
            </p>
          </div>

          <div className="w-full lg:w-1/2 min-h-[400px] lg:h-[80vh] rounded-md bg-[#141319] p-5">
            {/* Generated code preview */}
          </div>

        </div>
      </div>

    </div>
  )
}

export default Home