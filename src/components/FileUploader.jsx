import React from 'react';
import UploadIcon from '../assets/icons/imageupload.svg';
import UploadWhite from '../assets/icons/imageuploadwhite.svg';

const FileUploader = ({
  handleUploadClick,
  handleDrop,
  handleDragOver,
  handleDragLeave,
  isDragging,
  fileInputRef,
  handleFileChange,
}) => (
  <div className="flex justify-center items-center w-[320px] md:w-[700px] h-full">
    <div className="flex justify-center items-center w-[535px] h-full">
      <div className="shadow-xl bg-white hover:bg-zinc-50 hover:shadow-2xl items-center rounded-xl p-4 w-full">
        <div
          className={`w-full rounded-lg p-6 md:p-8 cursor-pointer relative flex flex-col items-center border-4 border-dashed justify-center ${
            isDragging ? 'bg-green-100 text-black' : ''
          } hover:border-zinc-300 hover:bg-blue-50`}
          style={{
            height: '100%', // Full height
          }}
          onClick={handleUploadClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div
            className={`w-full h-full flex flex-col items-center justify-center ${
              isDragging ? 'border-green-500' : 'border-gray-400'
            }`}
          >
            <div
              className="bg-[#FAEC54] rounded-md p-1"
              style={{ width: '72px', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <img
                src={UploadIcon}
                alt="Upload Icon"
                className="w-8 h-8"
              />
            </div>
            <button
              className="py-3 px-6 bg-[#2C5FF1] w-[220px] md:w-[260px] text-base md:text-xl text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center mt-8"
              type="button"
            >
              <img
                src={UploadWhite}
                alt="Upload"
                className="w-6 h-6 mr-4"
              />
              Browse File
            </button>
            <p className="text-center text-base font-light mt-4">
              or drop the files here
            </p>
          </div>
          <p className="text-center text-base font-semibold mt-12">PNG, JPG, AVIF, HEIC</p>
          <input
            type="file"
            ref={fileInputRef}
            accept=".png, .jpg, .jpeg, .avif, .heic, .heif, image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  </div>
);

export default FileUploader;
