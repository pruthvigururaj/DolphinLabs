import React, {useState,useEffect} from "react";
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";

const Content=()=>{
  const [images,setImages]=useState([]); // to store images
  const [query, setQuery] = useState("nature"); // user input
  const [selectedImage, setSelectedImage] = useState(null); // image modal
  

    const imagesfetch=async ()=>{
        const API_KEY = 'kGmPaEWmNinr5pdn7vuBO9mdpGIjCJuXof10vB8SM-Q'; 
        const URL = `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${API_KEY}`;

        try {
            const response = await axios.get(URL);
            setImages(response.data.results);
            
          } catch (error) {
            console.error('Error fetching images:', error);
          }
          
      }
    
    
      useEffect(()=>{
         imagesfetch();
      },[])

      const handleSearch = (e) => {
        e.preventDefault();
        
        imagesfetch();
      };
      return (

        <div>
           <header className="w-3/4 my-6 m-auto ">
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            placeholder="Search for images..."
            className="flex-1 p-2 border rounded-l-md"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="px-4 bg-blue-500 text-white rounded-r-md">
            Search
          </button>
        </form>
      </header>

        <main>
        <div className="xl:ml-20 mr-10 ml-10 sm:mr-0 sm:ml-10 flex flex-wrap pt-4 gap-4 overflow-x-auto">
          {images.map((image) => (
            <motion.div 
              key={image.id} 
              className=" lg:w-80 lg:h-80 sm:w-64 sm:h-64 w-full h-96 overflow-hidden rounded-md" 
              whileHover={{ scale: 1.1, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.3)" }}
              onClick={() => setSelectedImage(image)}
            >
              <motion.img
                src={image.urls.small}
                alt={image.alt_description || 'Unsplash Image'}
                className="w-full h-full rounded-md cursor-pointer object-cover"
              />
            </motion.div>
          ))}
        </div>
      </main>

      {selectedImage && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.div className="bg-white p-6 rounded-md shadow-md max-w-lg w-full relative"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-black text-4xl"
            >
              &times;
            </button>
            <img
              src={selectedImage.urls.regular}
              alt={selectedImage.alt_description || 'Unsplash Image'}
              className="w-full h-60 rounded-md mt-6"
            />
            <h2 className="text-lg font-bold mt-4">{selectedImage.alt_description || 'Untitled'}</h2>
            <p className="text-sm text-gray-600">By: {selectedImage.user.name}</p>
            <p className="text-sm mt-2">{selectedImage.description || 'No description available.'}</p>
          </motion.div>
        </motion.div>
      )}


      </div>
      );
      
}
export default Content;