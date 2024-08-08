import React, { useCallback, useState } from 'react';
import BestPracticesModal from './BestPracticesModal';
import infoIcon from '../assets/icons/info.svg';
import { suggestedTags, suggestedPrefixes } from '../data/suggestions';
import ExcelJS from 'exceljs'; // Import exceljs
import { saveAs } from 'file-saver'; // Import file-saver to save files on the client-side

const RenameFile = ({
  customFileName = '',
  setCustomFileName,
  triggerDownload,
  convertedFile,
  generateFileName,
}) => {
  const [tag, setTag] = useState('');
  const [customTag, setCustomTag] = useState('');
  const [prefix, setPrefix] = useState('');
  const [customPrefix, setCustomPrefix] = useState('');
  const [removeSmartConvert, setRemoveSmartConvert] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [altText, setAltText] = useState(''); // State for alt text

  const handleFileNameChange = useCallback(
    (e) => {
      const sanitizedFileName = e.target.value
        .toLowerCase()
        .replace(/[^a-z0-9-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setCustomFileName(sanitizedFileName);
    },
    [setCustomFileName]
  );

  const handlePrefixChange = (e) => {
    const selectedPrefix = e.target.value;
    setPrefix(selectedPrefix);
    setCustomPrefix(''); // Clear custom prefix when a suggestion is selected
  };

  const handleCustomPrefixChange = (e) => {
    const sanitizedCustomPrefix = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setCustomPrefix(sanitizedCustomPrefix);
    setPrefix(''); // Clear selected prefix when custom input is used
  };

  const handleTagChange = (e) => {
    const sanitizedTag = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setTag(sanitizedTag);
    setCustomTag(''); // Clear custom tag when a suggestion is selected
  };

  const handleCustomTagChange = (e) => {
    const sanitizedCustomTag = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setCustomTag(sanitizedCustomTag);
    setTag(''); // Clear selected tag when custom input is used
  };

  // Toggle the smart-convert suffix
  const toggleSmartConvert = () => {
    setRemoveSmartConvert((prev) => !prev);
  };

  // Generate the final file name dynamically
  const finalFileName = `${
    prefix || customPrefix ? `${(prefix || customPrefix).replace(/-$/, '')}-` : ''
  }${customFileName}${tag || customTag ? `-${tag || customTag}` : ''}${
    removeSmartConvert ? '' : '-smart-convert'
  }.webp`;

  const handleDownload = async () => {
    // Trigger the image download
    triggerDownload({ ...convertedFile, fileName: finalFileName });

    const reader = new FileReader();
    reader.onload = async (event) => {
        const dataUrl = event.target.result;
        const base64 = dataUrl.split(',')[1];

        try {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Image Info');

            // Define columns with increased width
            worksheet.columns = [
                { header: 'Image', key: 'image', width: 20 }, // Increased width
                { header: 'Filename', key: 'filename', width: 50 }, // Increased width
                { header: 'Alt Text', key: 'altText', width: 50 }, // Increased width
            ];

            // Set the header row (this step is crucial for defining titles)
            const headerRow = worksheet.getRow(1);
            headerRow.getCell(1).value = 'Image'; // Column A
            headerRow.getCell(2).value = 'Filename'; // Column B
            headerRow.getCell(3).value = 'Alt Text'; // Column C
            headerRow.commit(); // Finalize the header row

            // Add data to the second row
            const dataRow = worksheet.getRow(2);
            dataRow.height = 150; // Adjust this based on your image size

            // Add filename and alt text to the row
            dataRow.getCell('B').value = finalFileName;
            dataRow.getCell('C').value = altText;

            const imageId = workbook.addImage({
                base64,
                extension: 'webp',
            });

            // Position the image in the first column
            worksheet.addImage(imageId, {
                tl: { col: 0.1, row: 1.1 }, // Position at the start of the second row
                ext: { width: 150, height: 150 }, // Size the image 3x larger
            });

            // Commit changes to the data row
            dataRow.commit();

            const buffer = await workbook.xlsx.writeBuffer();
            saveAs(new Blob([buffer]), `${finalFileName.split('.')[0]}.xlsx`);
        } catch ( error ) {
            console.error('Error creating Excel file:', error);
        }
    };

    reader.readAsDataURL(convertedFile.file);
};


  return (
    <div className="w-full md:w-[610px] max-w-5xl mx-auto p-4">
      <h1 className="text-center text-[#1e1e1e] text-2xl font-bold mb-2">
        Boost SEO with Naming
      </h1>
      <h1 className="text-center text-[#1e1e1e] text-lg font-regular mb-4">
        Elevate Your SEO with Better File Naming
      </h1>

      <div className="flex flex-wrap justify-between text-center bg-white p-2 border-2 border-[#36D900] rounded-lg">
        <div className="w-full md:w-full p-4">
          <div className="rounded-xl p-4">
            <button
              className="bg-zinc-300 w-full rounded-sm text-[#1e1e1e] font-medium px-4 py-2 hover:bg-zinc-400 transition flex items-center justify-center"
              onClick={() => setModalOpen(true)}
            >
              Best Practices
              <img src={infoIcon} alt="Info" className="ml-2 h-5 w-5" />
            </button>
          </div>
          <p className="mt-4 font-semibold">New File Name</p>
          <label className="block text-base font-semibold">
            <p className="text-[#2C5FF1] font-semibold mt-2 border-2 p-2">
              {finalFileName}
            </p>
            <button
              onClick={toggleSmartConvert}
              className="mt-2 px-4 py-2 text-[#1e1e1e] text-xs rounded hover:font-semibold mb-4 transition"
            >
              {removeSmartConvert ? 'Add "smart-convert"' : 'Remove "smart-convert"'}
            </button>
            <span className="block font-bold text-lg mt-4">Step 1:</span> {/* Step 1 on its own line */}
            Add the name related to the image
            <p className="font-normal text-sm mt-2">
              Brand, client, project or version...
            </p>
            <input
              type="text"
              value={customFileName}
              onChange={handleFileNameChange}
              className="mt-4 text-sm font-normal block w-full px-4 py-2 border border-gray-300 rounded"
            />
          </label>

          <div className="mt-8">
            <label className="block text-base font-semibold">
              <span className="block font-bold text-lg">Step 2:</span> {/* Step 2 on its own line */}
              Add a prefix (optional)
            </label>
            <p className="text-sm mt-2">
              <stong>Prefixes:</stong> Indicate the type of content, such as banner, product, or ad. This helps in quickly identifying the purpose of the image.
            </p>

            <select
              value={prefix}
              onChange={handlePrefixChange}
              className="mt-4 block w-full text-sm px-4 py-2 border border-gray-300 rounded"
            >
              <option value="">Select a prefix</option>
              {suggestedPrefixes.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={customPrefix} // Show the custom prefix without the trailing hyphen
              onChange={handleCustomPrefixChange}
              className="mt-2 block text-sm w-full px-4 py-2 border border-gray-300 rounded"
              placeholder="Enter custom prefix"
            />
          </div>
          <div className="mt-8">
            <label className="block text-base font-semibold">
              <span className="block font-bold text-lg">Step 3:</span> {/* Step 3 on its own line */}
              Add a tag (optional)
            </label>
            <p className="text-sm mt-2">
              Tags: Describe specific attributes or contexts, like sales, discount, or limited, which can be useful for categorizing and filtering.
            </p>
          

            <select
              value={tag}
              onChange={handleTagChange}
              className="mt-4 block w-full text-sm px-4 py-2 border border-gray-300 rounded"
            >
              <option value="">Select a tag</option>
              {suggestedTags.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={tag || customTag} // Show the selected or custom tag
              onChange={handleCustomTagChange}
              className="mt-2 block text-sm w-full px-4 py-2 border border-gray-300 rounded"
              placeholder="Enter custom tag"
            />
          </div>

          {/* New Step for Alt Text */}
          <div className="mt-8">
            <label className="block text-base font-semibold">
              <span className="block font-bold text-lg">Step 4:</span> {/* Step 4 on its own line */}
              Add Alt Text for SEO
            </label>
            <p className="text-sm mt-2">
              Describe your image. Alt text helps search engines understand the content of your image.
            </p>
            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              className="mt-4 block text-sm w-full px-4 py-2 border border-gray-300 rounded"
              placeholder="Enter alt text"
            />
          </div>
            <p className="text-[#2C5FF1] font-semibold mt-8 border-2 p-2">
              {finalFileName}
            </p>
            <button
              onClick={toggleSmartConvert}
              className="mt-2 px-4 py-2 text-[#1e1e1e] text-xs rounded hover:font-semibold mb-4 transition"
            >
              {removeSmartConvert ? 'Add "smart-convert"' : 'Remove "smart-convert"'}
            </button>

          <button
            onClick={handleDownload}
            className="mt-0 px-4 py-2 bg-[#EA552B] w-full uppercase font-semibold text-white rounded hover:bg-[#1e1e1e] transition"
          >
            Step 5: Download SEO Optimized File Name
          </button>
          <div className='text-xs'>
          <p className='mt-4'>Both the Image and an Excel File will download</p>
          <p className="mt-1">The Excel file will contain the image, filename & Alt Text</p>
          </div>
        </div>
      </div>
      <BestPracticesModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default RenameFile;
