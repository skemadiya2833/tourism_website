// import React from 'react';

// const Card: React.FC<{ image: string; title: string; description: string }> = ({ image, title, description }) => {
//   return (
//     <div className="group relative w-[280px] h-[360px] bg-white rounded-lg p-6 flex items-end transition-transform duration-500 ease-out shadow-lg hover:translate-y-[-20px]">
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/60 rounded-lg transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-10"></div>

//       {/* Image */}
//       <img
//         src={image}
//         alt={title}
//         className="absolute inset-0 w-full h-full object-cover rounded-lg z-0"
//       />

//       {/* Card Info */}
//       <div className="relative z-20 text-white opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500">
//         <h1 className="text-xl mb-2">{title}</h1>
//         <p className="text-sm mb-4">{description}</p>
//         <button className="px-3 py-2 bg-white text-black font-bold rounded hover:bg-blue-500 hover:text-white transition duration-300">
//           Read More
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Card;


import React from 'react';

const Card: React.FC<{ image: string; title: string; description: string }> = ({ image, title, description }) => {
  return (
    <div className="group relative w-[380px] h-[500px] bg-white rounded-lg p-6 flex items-end transition-transform duration-500 ease-out shadow-lg hover:translate-y-[-20px]">
      <div className="absolute inset-0 bg-black/60 rounded-lg transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-10"></div>
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover rounded-lg z-0"
      />
      <div className="relative z-20 text-white opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500">
        <h1 className="text-xl mb-2">{title}</h1>
        <p className="text-sm mb-4 line-clamp-2">{description}</p>
        <button className="px-3 py-2 bg-white text-black font-bold rounded hover:bg-green-900 hover:text-white transition duration-300">
          Read More
        </button>
      </div>
    </div>
  );
};

export default Card;
 