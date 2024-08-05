// src/components/RenameFile.js

import React, { useCallback } from 'react';

const RenameFile = ({
  customFileName,
  setCustomFileName,
  prefix,
  setPrefix,
  triggerDownload,
  convertedFile,
  generateFileName,
}) => {
  // Use useCallback to memoize event handlers and avoid unnecessary re-renders
  const handleFileNameChange = useCallback(
    (e) => {
      setCustomFileName(e.target.value);
    },
    [setCustomFileName]
  );

  const handlePrefixChange = useCallback(
    (e) => {
      setPrefix(e.target.value);
    },
    [setPrefix]
  );

  return (
    <div className="text-center border border-gray-200 h-full rounded-lg p-4 mb-4 md:mb-0">
      <p className="text-gray-700 font-bold mt-4 mb-2">Would you like to rename your file?</p>
      <p className="text-zinc-700 text-xs font-bold mt-4 mb-2">Brand name, Project, Client, Version</p>
      <label className="block text-sm font-normal text-gray-800 mt-6">
        New File Name:
        <input
          type="text"
          value={customFileName}
          onChange={handleFileNameChange}
          className="mt-2 p-4 border font-semibold border-gray-300 rounded w-full focus:border-[#EA552B] hover:border-[#EA552B] focus:outline-none focus:ring-2 focus:ring-purp"
          placeholder="Enter custom file name"
        />
      </label>
      <label className="block text-sm font-normal text-gray-800 mt-6">
        Select a prefix:
        <select
          value={prefix}
          onChange={handlePrefixChange}
          className="mt-2 p-4 border font-semibold text-gray-00 border-gray-300 rounded w-full focus:border-[#EA552B] hover:border-[#EA552B] focus:outline-none focus:ring-2 focus:ring-[#1e1e1e]"
        >
          <option value="">Choose a prefix (optional)</option>
          <option value="prod-">Product (Shopify)</option>
          <option value="cat-">Category (Shopify)</option>
          <option value="feat-">Featured (Shopify)</option>
          <option value="banner-">Banner (Shopify)</option>
          <option value="post-">Post (Facebook)</option>
          <option value="cover-">Cover (Facebook)</option>
          <option value="profile-">Profile (Facebook)</option>
          <option value="ad-">Ad (General)</option>
          <option value="fbad-">Facebook Ad</option>
          <option value="gad-">Google Ad</option>
          <option value="insta-">Instagram Ad</option>
          <option value="twad-">Twitter Ad</option>
          <option value="mock-">Mockup (Design)</option>
          <option value="final-">Final (Design)</option>
          <option value="draft-">Draft (Design)</option>
          <option value="temp-">Template (Design)</option>
          <option value="thumb-">Thumbnail (Web)</option>
          <option value="opt-">Optimized (Web)</option>
          <option value="hero-">Hero (Web)</option>
          <option value="bg-">Background (Web)</option>
        </select>
      </label>

      {/* Display the new file name above the download button */}
      <p className="text-gray-700 font-bold mt-6">{generateFileName(`${customFileName}-smart-convert.webp`)}</p>

      <button
        onClick={() => triggerDownload(convertedFile)}
        className="mt-6 mb-2 py-2 px-4 bg-[#EA552B] font-bold uppercase text-white rounded hover:bg-[#1e1e1e]"
        disabled={!customFileName} // Disable button until a name is provided
      >
        Download
      </button>
    </div>
  );
};

export default RenameFile;
