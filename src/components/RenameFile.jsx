import React, { useCallback, useState } from 'react';

// Adjust these imports based on your file structure
import { suggestedKeywords, suggestedTags, suggestedPrefixes } from '../data/suggestions';

const RenameFile = ({
  customFileName = '',
  setCustomFileName,
  prefix = '',
  setPrefix,
  triggerDownload,
  convertedFile,
  generateFileName,
}) => {
  const [removeSmartConvert, setRemoveSmartConvert] = useState(false);
  const [tag, setTag] = useState('');
  const [customTag, setCustomTag] = useState('');
  const [customPrefix, setCustomPrefix] = useState('');

  const handleFileNameChange = useCallback((e) => {
    const sanitizedFileName = e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, '');
    setCustomFileName(sanitizedFileName);
  }, [setCustomFileName]);

  const handlePrefixChange = useCallback((e) => setPrefix(e.target.value), [setPrefix]);
  const handleCustomPrefixChange = (e) => setCustomPrefix(e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-'));
  const handleTagChange = (e) => setTag(e.target.value);
  const handleCustomTagChange = (e) => setCustomTag(e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-'));

  const toggleSmartConvert = () => setRemoveSmartConvert(!removeSmartConvert);

  const finalFileName = generateFileName(`${prefix}${customFileName}${tag ? `-${tag}` : ''}${removeSmartConvert ? '' : '-smart-convert'}.webp`);

  return (
    <div className="w-full md:w-[610px] max-w-5xl mx-auto p-4">
      <h1 className="text-center text-[#1e1e1e] text-2xl font-bold mb-2">Boost SEO with Naming

      </h1>
      <h1 className="text-center text-[#1e1e1e] text-lg font-regular mb-4">Elevate Your SEO with Better File Naming
      </h1>


      <div className="flex flex-wrap justify-between text-center bg-white p-2 border-2 border-[#36D900] rounded-lg">
        <div className="w-full lg:w-1/2 p-4">
          <div className="bg-white p-2  rounded">
         
            <div className='border rounded-xl mt-4 p-4'>
              <button className="mt-2 bg-[#FAEC54] w-full rounded-sm text-[#1e1e1e] font-medium px-4 py-2 hover:bg-yellow-600 transition">Best Practices</button>
              <p className='mt-4 text-xs'>between words use “-”, no spaces, use lowercase letters</p>
              <p className="text-sm mt-8">Good Example:</p>
              <p className='text-sm font-medium'>best-coffee-beans.webp</p>
              <p className='text-sm mt-8'>Bad Example: </p>
              <p className='text-sm font-medium'>best_coffee_beans.webp</p>
              <p className='text-sm font-normal'>or</p>
              <p className='text-sm font-medium mb-4'>best coffee beans.jpg</p>
            </div>
          </div>
        </div>
        <div className="w-full mt-8 lg:w-1/2 p-4">
          <label className="block text-base font-semibold">
            New File Name:
            <p className='font-normal text-sm mt-2'>Brand, client, project or version...</p>
            <input type="text" value={customFileName} onChange={handleFileNameChange} className="mt-4 text-sm font-normal block w-full px-4 py-2 border border-gray-300 rounded"/>
          </label>
          <div className="mt-8">
            <label className="block text-base font-semibold">Choose a Prefix (Optional):</label>
            <p className='font-normal text-sm mt-2'>Banner, product, ad ...</p>

            <select value={prefix} onChange={handlePrefixChange} className="mt-2 block w-full text-sm px-4 py-2 border border-gray-300 rounded">
              <option value="">Select a prefix</option>
              {suggestedPrefixes.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
            <input type="text" value={customPrefix} onChange={handleCustomPrefixChange} className="mt-2 block text-sm w-full px-4 py-2 border border-gray-300 rounded" placeholder="Enter custom prefix"/>
          </div>
          <div className="mt-8">
            <label className="block text-base font-semibold">Choose a Tag (Optional):</label>
            <p className='font-normal text-sm mt-2'>Sales, discount, limited...</p>

            <select value={tag} onChange={handleTagChange} className="mt-2 block text-sm w-full px-4 py-2 border border-gray-300 rounded">
              <option value="">Select a tag</option>
              {suggestedTags.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <input type="text" value={customTag} onChange={handleCustomTagChange} className="mt-2 block text-sm w-full px-4 py-2 border border-gray-300 rounded" placeholder="Enter custom tag"/>
          </div>
          <p className="mt-6 text-[gray-700] font-semibold">Final File Name: </p>
          <p className='text-[#2C5FF1] font-semibold mt-2 border-2 p-2'>{finalFileName}</p>

          <button onClick={() => triggerDownload(convertedFile)} className="mt-6 px-4 py-2 bg-[#EA552B] w-full uppercase font-semibold text-white rounded hover:bg-[#1e1e1e] transition">Download</button>

          <button onClick={toggleSmartConvert} className="mt-4 px-4 py-2 text-[#1e1e1e] text-xs rounded hover:font-semibold transition">{removeSmartConvert ? 'Add "smart-convert"' : 'Remove "smart-convert"'}</button>
        </div>
      </div>
    </div>
  );
};

export default RenameFile;
