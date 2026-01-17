import React, { useState } from 'react';

const DarkModal = ({ isOpen, onClose, onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with Blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Popup Container */}
      <div className="relative w-[75%] h-[75%] max-w-6xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col p-8 overflow-hidden">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
        >
          ✕
        </button>

        <div className="flex-1 flex flex-col justify-between items-center gap-8">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Enter Details
          </h2>

          <div className="w-full max-w-2xl flex flex-col gap-8">
            {/* Label and Input on same line */}
            <div className="flex flex-row items-center gap-4 w-full">
              <label className="text-sm font-medium text-zinc-400 whitespace-nowrap">
                Title:
              </label>
              <input
                required
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter title here..."
                className="flex-1 bg-zinc-800 border border-zinc-700 text-white rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <button
              onClick={() => onSubmit(inputValue)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-blue-900/20"
            >
              Post Meme
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DarkModal;