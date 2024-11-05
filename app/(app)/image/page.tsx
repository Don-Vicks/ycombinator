"use client";
import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import Image from 'next/image';

const EcosystemCallCard = () => {
  const [name, setName] = useState('');
  const [userImage, setUserImage] = useState('');
  const [location, setLocation] = useState('Maiduguri, Borno State');
  const fileInputRef = useRef(null);
  const cardRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const downloadCard = async () => {
    if (cardRef.current) {
      try {
        const canvas = await html2canvas(cardRef.current, {
          scale: 2,
          backgroundColor: null,
          logging: false
        });
        
        const link = document.createElement('a');
        link.download = 'ecosystem-call-card.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (err) {
        console.error('Error generating image:', err);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      {/* Card Preview */}
      <div 
        ref={cardRef}
        className="relative w-full aspect-[16/9] rounded-lg overflow-hidden"
      >
        {/* Left side with city image */}
        <div className="absolute left-0 top-0 bottom-0 w-2/5 h-full">
          <Image 
            src="/cityimage.png" 
            alt="City Image" 
            className="h-full w-full object-cover"
            width={468}
            height={900}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/50 to-transparent" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/20 rounded-tr-[100px]" />
        </div>

        {/* Right side with content */}
        <div className="absolute right-0 top-0 bottom-0 w-3/5 h-full bg-[url('/backgroundimage.png')] bg-cover bg-center">
          <div className="relative z-10 w-full h-full p-8 flex flex-col text-white">
            <div className="mb-8 flex justify-between items-center">
              <img 
                src="/ecosystemcallnew.png" 
                alt="Ecosystem Call" 
                className="h-8 object-contain"
              />
              <Image 
                src="/reglink.png"
                alt="Reg Link"
                width={165}
                height={80}
              />
            </div>

            {/* Profile section */}
            <div className="flex items-center gap-4 mb-6 ">
            <div 
  className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-800 cursor-pointer border-2 border-main z-20 right-[338.37px] top-24 translate-x-[229px] outline-[8px] outline-red-500" 
  onClick={triggerFileInput}
>

    <div className=''>{userImage ? (
        <Image
  src={userImage}
  alt="Profile"
  className="object-cover outline-8 outline-black"
  width={432}
  height={387}
/>
    ) : (
       // <Image
//   src={userImage}
//   alt="Profile"
//   className="w-[432px] h-[387px] object-cover outline-8 outline-black"
//   width={432}
//   height={387}
// />
      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm text-center p-2">
        Click to upload photo
      </div>
    )}
    <input
      ref={fileInputRef}
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
      className="hidden"
    />
    </div>
  </div>

  <div className="flex justify-start translate -translate-x-[120px]">
  <div className="bg-main rounded-3xl px-6 py-2 flex items-center gap-2 ">
    <Image 
      src="/verified.png"
      alt="Verified tag"
      width={46}
      height={46}
    />
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter your name"
      className="bg-transparent text-white text-xl font-semibold placeholder-white/70 outline-none border-none w-full"
      style={{ minWidth: '120px' }}
    />
  </div>
</div>
            </div>

            {/* I'M ATTENDING text */}
            <div className="text-5xl font-bold mb-auto tracking-tight">
              I'M<br />ATTENDING
            </div>

            {/* Bottom info */}
            <div className="bg-black/0 backdrop-blur-[15.1px] shadow-lg rounded-[25px_0px_0px_0px] border-[1px_0px_0px_0px] flex justify-between items-center">
            <input
    type="text"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    className="bg-transparent text-white text-xl font-medium outline-none border-none placeholder-white/70"
    style={{ minWidth: '180px' }}
  />
              <div className="flex items-center gap-4">
                <span className="text-xl">2:00PM UTC</span>
                <span className="text-xl opacity-50">|</span>
                <span className="text-xl">07 Nov.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        <button
          onClick={triggerFileInput}
          className="flex-1 bg-main text-white py-3 px-4 rounded-lg hover:bg-main transition-colors font-medium"
        >
          Upload Profile Picture
        </button>
        <button
          onClick={downloadCard}
          className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          Download Card
        </button>
      </div>
    </div>
  );
};

export default EcosystemCallCard;