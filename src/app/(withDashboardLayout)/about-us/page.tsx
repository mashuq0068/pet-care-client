/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import React from 'react';

const AboutUsPage = () => {
  return (
    <div className="py-16 max-w-6xl mx-auto">
      <div className="m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div className="space-y-6 lg:space-y-0  gap-6 lg:items-center lg:gap-12">
          <div className="rounded-lg flex lg:items-end md:items-center  lg:flex-row flex-col justify-center gap-4">
            <Image src={"https://i.ibb.co.com/7QkLzWF/th-8.jpg"} width={400} height={400} alt='Pet Care Image' className='rounded-lg object-cover mb-7' />
            <Image src={"https://i.ibb.co.com/T0TM8N6/Getty-Images-471119053-5751917e5f9b5892e86270ef.jpg"} width={400} height={400} alt='Pet Care Image' className='rounded-lg  mb-7' />
          </div>
          <div className="text-center">
            <h2 className="text-xl text-gray-900 theme-text font-bold md:text-3xl">Our Mission and Vision</h2>
            <p className="mt-6 text-gray-600 theme-text">
              At PetCarePro, we believe that your pets deserve the best care, attention, and tips to live a healthy and happy life. Our passionate team of pet lovers is here to provide you with the latest advice on pet health, grooming, training, and emotional well-being.
            </p>
            <p className="mt-4 text-gray-600 theme-text">
              From expert grooming tips to heartwarming stories of pets, we’re here to guide you on every step of your pet parent journey. Whether you're a first-time pet owner or a seasoned pro, you'll find all the resources you need to nurture your furry friends and help them thrive.
            </p>
          </div>
        </div>
      </div>
      {/* team */}
     
     
<div className="py-20 ">
    <div className=" mx-auto px-6 md:px-12 xl:px-32">
        <div className="mb-16 text-center">
            <h2 className="mb-4 text-center text-2xl text-gray-900 theme-text font-bold md:text-3xl">Our Team Organizer and Leaders</h2>
            <p className="text-gray-600 theme-text lg:w-8/12 lg:mx-auto">we believe that your pets deserve the best care, attention, and tips to live a healthy and happy life. </p>
        </div>
        <div className="grid gap-12 items-center lg:grid-cols-3">
            <div className="space-y-4 text-center">
                <img className="w-64 h-64 mx-auto object-cover rounded-xl md:w-40 md:h-40 lg:w-64 lg:h-64" 
                    src="https://s.yimg.com/uu/api/res/1.2/yUWbIjLMY89.5p4Qp0CgTQ--~B/aD0xMzM0O3c9MjAwMDtzbT0xO2FwcGlkPXl0YWNoeW9u/http://media.zenfs.com/en-US/homerun/bloomberg_technology_68/86f6a8fc3817d382ae92edd6c23c6243" alt="woman" loading="lazy" width="640" height="805"/>
                <div>
                    <h4 className="text-2xl">Hentoni Doe</h4>
                    <span className="block text-sm text-gray-500 theme-text">CEO-Founder</span>
                </div>
            </div>
            <div className="space-y-4 text-center">
                <img className="w-64 h-64 mx-auto object-cover rounded-xl md:w-48 md:h-64 lg:w-64 lg:h-80" 
                    src="https://tailus.io/sources/blocks/classic/preview/images/man.jpg" alt="man" loading="lazy" width="1000" height="667"/>
                <div>
                    <h4 className="text-2xl">Jonathan Doe</h4>
                    <span className="block text-sm text-gray-500 theme-text">Pet Technical Officer</span>
                </div>
            </div>
            <div className="space-y-4 text-center">
                <img className="w-64 h-64 mx-auto object-cover rounded-xl md:w-40 md:h-40 lg:w-64 lg:h-64" 
                    src="https://img.freepik.com/premium-photo/corporate-official-man_951949-126.jpg" alt="woman" loading="lazy" width="1000" height="667"/>
                <div>
                    <h4 className="text-2xl">Anabelle Doe</h4>
                    <span className="block text-sm text-gray-500 theme-text">Pet observer and doctor</span>
                </div>
            </div>
        </div>
    </div>
</div>
    </div>
  );
};

export default AboutUsPage;
