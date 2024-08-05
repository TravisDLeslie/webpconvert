import React, { useCallback, useState } from 'react';

// Example keywords for auto-suggestion
const suggestedKeywords = [
  'product',
  'category',
  'featured',
  'banner',
  'post',
  'cover',
  'profile',
  'ad',
  'facebook-ad',
  'google-ad',
  'instagram-ad',
  'twitter-ad',
  'mockup',
  'final',
  'draft',
  'template',
  'thumbnail',
  'optimized',
  'hero',
  'background',
];

// Example suggested tags
const suggestedTags = [
  'new',
  'sale',
  'discount',
  'exclusive',
  'limited-edition',
  'bestseller',
  'holiday',
  'summer',
  'winter',
  'spring',
  'autumn',
  'event',
  'special',
  'announcement',
  'promotion',
];

// Example suggested prefixes with labels
const suggestedPrefixes = [
  { value: 'prod-', label: 'Product (Shopify)' },
  { value: 'cat-', label: 'Category (Shopify)' },
  { value: 'feat-', label: 'Featured (Shopify)' },
  { value: 'banner-', label: 'Banner (Shopify)' },
  { value: 'post-', label: 'Post (Facebook)' },
  { value: 'cover-', label: 'Cover (Facebook)' },
  { value: 'profile-', label: 'Profile (Facebook)' },
  { value: 'ad-', label: 'Ad (General)' },
  { value: 'fbad-', label: 'Facebook Ad' },
  { value: 'gad-', label: 'Google Ad' },
  { value: 'insta-', label: 'Instagram Ad' },
  { value: 'twad-', label: 'Twitter Ad' },
  { value: 'mock-', label: 'Mockup (Design)' },
  { value: 'final-', label: 'Final (Design)' },
  { value: 'draft-', label: 'Draft (Design)' },
  { value: 'temp-', label: 'Template (Design)' },
  { value: 'thumb-', label: 'Thumbnail (Web)' },
  { value: 'opt-', label: 'Optimized (Web)' },
  { value: 'hero-', label: 'Hero (Web)' },
  { value: 'bg-', label: 'Background (Web)' },
];

const RenameFile = ({
  customFileName = '', // Default to an empty string if not provided
  setCustomFileName,
  prefix = '', // Default to an empty string if not provided
  setPrefix,
  triggerDownload,
  convertedFile, // Ensure this is a Blob or File object
  generateFileName,
}) => {
  // State to track if "smart-convert" should be removed
  const [removeSmartConvert, setRemoveSmartConvert] = useState(false);
  // State for managing tags, custom input, and prefixes
  const [tag, setTag] = useState('');
  const [customTag, setCustomTag] = useState('');
  const [customPrefix, setCustomPrefix] = useState('');

  // Use useCallback to memoize event handlers and avoid unnecessary re-renders
  const handleFileNameChange = useCallback(
    (e) => {
      const sanitizedFileName = e.target.value
        .toLowerCase() // Convert to lowercase for consistency
        .replace(/[^a-z0-9-]+/g, '-') // Replace non-alphanumeric characters with hyphens
        .replace(/^-+|-+$/g, ''); // Remove leading or trailing hyphens
      setCustomFileName(sanitizedFileName);
      trackInteraction('file-name-change', sanitizedFileName);
    },
    [setCustomFileName]
  );

  const handlePrefixChange = useCallback(
    (e) => {
      setPrefix(e.target.value);
      trackInteraction('prefix-change', e.target.value);
    },
    [setPrefix]
  );

  const handleCustomPrefixChange = (e) => {
    const sanitizedCustomPrefix = e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-');
    setCustomPrefix(sanitizedCustomPrefix);
    setPrefix(sanitizedCustomPrefix);
    trackInteraction('custom-prefix-change', sanitizedCustomPrefix);
  };

  const handleTagChange = (e) => {
    setTag(e.target.value);
    trackInteraction('tag-change', e.target.value);
  };

  // Handle custom tag input
  const handleCustomTagChange = (e) => {
    const sanitizedCustomTag = e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-');
    setCustomTag(sanitizedCustomTag);
    setTag(sanitizedCustomTag);
    trackInteraction('custom-tag-change', sanitizedCustomTag);
  };

  // Toggle the removal of "smart-convert"
  const toggleSmartConvert = () => {
    setRemoveSmartConvert(!removeSmartConvert);
    trackInteraction('toggle-smart-convert', !removeSmartConvert ? 'removed' : 'added');
  };

  // Function to generate SEO-friendly file name
  const getSeoFriendlyFileName = (baseName) => {
    const seoFileName = `${prefix}${baseName || ''}`.toLowerCase();
    return seoFileName;
  };

  // Generate the final file name based on the current state
  const finalFileName = getSeoFriendlyFileName(
    `${customFileName}${tag ? `-${tag}` : ''}${removeSmartConvert ? '' : '-smart-convert'}.webp`
  );

  // Filter keywords based on user input
  const filteredKeywords = suggestedKeywords.filter((keyword) =>
    keyword.includes(customFileName)
  );

  // Basic mock analytics function for demonstration
  const trackInteraction = (action, label) => {
    console.log(`Tracked action: ${action}, label: ${label}`);
  };

  // Generate a preview URL for the image if available and valid
  const previewUrl = convertedFile instanceof Blob ? URL.createObjectURL(convertedFile) : '';

  return (
    <div className="text-center border border-zinc-400 h-full rounded-lg p-4 mb-4 md:mb-0">
            <p className="text-gray-700 font-bold mt-2 mb-2">Would you like to rename your file?</p>
            <p className="text-gray-500 text-sm font-light mt-1">Brand name, Project, Client, Version</p>
<div className='bg-[#1ABCFE] rounded-lg p-2 mt-6'>
              <p className="text-[#1E1E1E] w-full p-2 rounded-lg text-xs font-regular mt-1">*For best practice use " - ", no spaces</p>
              <p className="text-[#1E1E1E] w-full p-2  text-xs font-regular">Example: best-coffee-beans.jpg instead of best_coffee_beans.jpg or best coffee beans.jpg</p>
              </div>

      <label className="block text-sm font-normal text-gray-800 mt-8">
        New File Name:
        
        <input
          type="text"
          value={customFileName}
          onChange={handleFileNameChange}
          className="mt-2 p-4 border font-semibold border-gray-300 rounded w-full focus:border-[#EA552B] hover:border-[#EA552B] focus:outline-none focus:ring-2 focus:ring-purp"
          placeholder="Enter custom file name"
          list="keyword-suggestions"
        />
        <datalist id="keyword-suggestions">
          {filteredKeywords.map((keyword) => (
            <option key={keyword} value={keyword} />
          ))}
        </datalist>
        <p className="text-gray-500 text-xs mt-1">{`Character count: ${finalFileName.length} / 60`}</p>

      </label>
      <label className="block text-sm font-normal text-gray-800 mt-6">
        Choose a Prefix (Optional):
        <select
          value={prefix}
          onChange={handlePrefixChange}
          className="mt-2 p-4 border font-semibold text-gray-00 border-gray-300 rounded w-full focus:border-[#EA552B] hover:border-[#EA552B] focus:outline-none focus:ring-2 focus:ring-[#1e1e1e]"
        >
          <option value="">Choose a prefix (optional)</option>
          {suggestedPrefixes.map((suggestedPrefix) => (
            <option key={suggestedPrefix.value} value={suggestedPrefix.value}>
              {suggestedPrefix.label}
            </option>
          ))}
        </select>
        {/* Separate input for custom prefix */}
        <input
          type="text"
          value={customPrefix}
          onChange={handleCustomPrefixChange}
          className="mt-2 p-4 border font-semibold border-gray-300 rounded w-full focus:border-[#EA552B] hover:border-[#EA552B] focus:outline-none focus:ring-2 focus:ring-purp"
          placeholder="Enter custom prefix"
        />
      </label>
      <label className="block text-sm font-normal text-gray-800 mt-6">
        Choose a Tag (Optional):
        <select
          value={tag}
          onChange={handleTagChange}
          className="mt-2 p-4 border font-semibold text-gray-00 border-gray-300 rounded w-full focus:border-[#EA552B] hover:border-[#EA552B] focus:outline-none focus:ring-2 focus:ring-[#1e1e1e]"
        >
          <option value="">Choose a tag (optional)</option>
          {suggestedTags.map((suggestedTag) => (
            <option key={suggestedTag} value={suggestedTag}>
              {suggestedTag}
            </option>
          ))}
        </select>
        {/* Separate input for custom tag */}
        <input
          type="text"
          value={customTag}
          onChange={handleCustomTagChange}
          className="mt-2 p-4 border font-semibold border-gray-300 rounded w-full focus:border-[#EA552B] hover:border-[#EA552B] focus:outline-none focus:ring-2 focus:ring-purp"
          placeholder="Enter custom tag"
        />
      </label>

      {/* Display the new file name above the download button */}
      <p className="text-gray-700 font-bold mt-6">{generateFileName(finalFileName)}</p>
      <p className="text-gray-500 text-sm font-light mt-2">This is the most SEO-friendly file name</p>

      {/* Buttons Container */}
      <div className="flex flex-col items-center space-y-6 mt-6">
        {/* Download button */}
        <button
          onClick={() => triggerDownload(convertedFile)}
          className="py-2 px-4 bg-[#EA552B] font-bold uppercase text-white rounded hover:bg-[#1e1e1e]"
          disabled={!customFileName} // Disable button until a name is provided
        >
          Download
        </button>

        {/* Button to remove "smart-convert" from the file name */}
        <button
          onClick={toggleSmartConvert}
          className="py-2 px-4 font-regular text-gray-800 rounded hover:font-semibold"
        >
          {removeSmartConvert ? 'Add "smart-convert"' : 'Remove "smart-convert"'}
        </button>
      </div>

      {/* Image preview with the file name */}
      {previewUrl && (
        <div className="mt-4">
          <img src={previewUrl} alt={finalFileName} className="max-w-full h-auto mx-auto" />
          <p className="text-gray-700 text-xs mt-2">{finalFileName}</p>
        </div>
      )}
    </div>
  );
};

export default RenameFile;
