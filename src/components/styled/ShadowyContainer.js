import { FiLoader } from "react-icons/fi";

function ShadowyContainer({ header: Header, children, loading = false }) {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="sticky top-12 w-full shadow-header z-20 bg-gray-400"></div>
      <div className="relative w-full">
        <div className="absolute bg-gray-200 h-[5px] z-20 w-full" />
        {loading ? (
          <div className="flex w-full">
            <FiLoader className="animate-spin-slow m-auto mt-20" />
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}

export default ShadowyContainer;
