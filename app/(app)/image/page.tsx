"use client";
import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import Image from 'next/image';

const EcosystemCallCard = () => {
  const [name, setName] = useState('');
  const [userImage, setUserImage] = useState('');
  const [location, setLocation] = useState('Philippines');
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
        // Add a small delay to ensure all images are loaded
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const canvas = await html2canvas(cardRef.current, {
          scale: 3,
          backgroundColor: '#0F172A',
          useCORS: true,
          allowTaint: true,
          scrollX: -window.scrollX,
          scrollY: -window.scrollY,
          windowWidth: document.documentElement.offsetWidth,
          windowHeight: document.documentElement.offsetHeight,
          logging: false,
          onclone: (clonedDoc) => {
            // Ensure the cloned element maintains the same dimensions
            const clonedElement = clonedDoc.querySelector('[data-card-container]');
            if (clonedElement) {
              clonedElement.style.width = `${cardRef.current.offsetWidth}px`;
              clonedElement.style.height = `${cardRef.current.offsetHeight}px`;
            }
          }
        });

        const link = document.createElement('a');
        link.download = 'ecosystem-call-card.jpg';
        link.href = canvas.toDataURL('image/jpeg', 1.0);
        link.click();
      } catch (err) {
        console.error('Error generating image:', err);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        style={{ display: 'none' }}
        accept="image/*"
      />

      <div
        ref={cardRef}
        data-card-container
        className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-[#0F172A] text-white"
      >
        {/* Container to ensure proper positioning */}
        <div className="absolute inset-0 w-full h-full">
          {/* Left side with city image */}
          <div className="absolute left-0 top-0 bottom-0 w-2/5 h-full">
            <Image
              src="/philips.png"
              alt="City Image"
              className="h-full w-full object-cover"
              width={468}
              height={900}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/50 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/20 rounded-tr-[100px] pointer-events-none" />
          </div>

         
          <div className="absolute top-1/2 right-[50%] transform -translate-y-1/2 w-64 h-64 z-50">
  <div className="w-full h-full bg-gradient-to-r from-[rgba(0,0,7,1)] to-[rgba(4,4,32,1)] p-[17px] rounded-full opacity-98">
    <div className="w-full h-full bg-red rounded-full overflow-hidden">
      {userImage ? (
        <img
          src={userImage}
          alt="User"
          className="w-full h-full object-fill"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full bg-gray-500 text-xs">
          No Image
        </div>
      )}
    </div>
  </div>
</div>



          {/* Right side with content */}
          <div className="absolute right-0 top-0 bottom-0 w-3/5 h-full bg-[url('/background.png')] bg-cover bg-center">
            <div className="relative z-10 w-full h-full p-8 flex flex-col">
              <div className="mb-8 flex justify-between items-center">
                <img
                  src="/ecosystemcallnew.png"
                  alt="Ecosystem Call"
                  className="h-9 object-contain"
                />
                <Image
                  src="/reglink.png"
                  alt="Reg Link"
                  width={170}
                  height={90}
                />
              </div>

              <div className="flex items-center mb-6 gap-4 translate-x-[80px]">
                <div className="bg-main rounded-3xl px-2 py-2 flex items-center gap-2">
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
              <div className="text-5xl font-bold tracking-tight px-10 py-2 mb-4 translate-x-[50px]">
  <div className="flex items-center space-x-6 text-lightpurple">
    <span>I'm</span>
    <Image src='/line.png' alt='Line' width={175} height={30} className="inline-block mt-11" />
  </div>
  <p className="text-lightpurple">ATTENDING</p>
</div>


<div className="flex bg-gradient-to-r from-[rgba(0,0,7,1)] to-[rgba(4,4,32,1)] shadow-lg rounded-3xl border-[1px_0px_0px_0px] justify-between items-center p-4 mt-12 opacity-80">
  <input
    type="text"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    className="bg-transparent text-white text-xl font-medium outline-none border-none placeholder-white/70"
    style={{ minWidth: '180px' }}
    readOnly
  />
  <div className="flex items-center gap-4 text-white">
    <input
      type="text"
      //placeholder="Enter time"
      value={'6pm'}
      className="bg-transparent text-white text-lg font-medium outline-none border-none text-center form-normal"
      style={{ width: '100px' }}
      readOnly
    />
    <input
      type="text"
      value="|"
      readOnly
      className="bg-transparent text-white text-lg opacity-50 outline-none border-none text-center font-normal"
      style={{ width: '20px' }}
    />
    <input
      type="text"
      value="09 Nov."
      readOnly
      className="bg-transparent text-white text-lg font-normal outline-none border-none text-center"
      style={{ width: '80px' }}
    />
  </div>

              </div>
            </div>
          </div>
        </div>
      </div>

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