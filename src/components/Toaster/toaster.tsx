'use client';
import { Toaster as ToasterComponent } from 'react-hot-toast';

const position: any = [
  "top-center",
  "top-right",
  "top-left",
  "bottom-center",
  "bottom-right",
  "bottom-left",
]

const Toaster = () => {
  return (
    <ToasterComponent
      position={position[1]}
      reverseOrder={false}
      toastOptions={{
        duration: 4000,
        style: {
          background: '#363636',
          color: '#fff',
        },
        success: {
          duration: 3000,
          style: {
            background: '#10b981',
            color: '#fff',
          },
        },
        error: {
          duration: 3000,
          style: {
            background: '#ef4444',
            color: '#fff',
          },
        },
      }}
    />
  );
};

export default Toaster;
