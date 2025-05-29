import { useState } from "react";
import Search from "../../components/features/Search";
import { getSamCVByHexId, useUploadListCV } from "../../hooks/SamsHooks";
import LoaderCSV from "../../components/features/LoaderCSV";

const SamsCVSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearchTerm, setActiveSearchTerm] = useState("");

  const { data, isLoading, error } = getSamCVByHexId(activeSearchTerm);
  const uploadMutation = useUploadListCV()
  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    setActiveSearchTerm(searchTerm.trim());
  };


  return (
    <>
      <h1>Buscar SAMS CV</h1>
      <div className="max-w-2xl mx-auto p-6 space-y-6 bg-white rounded shadow-md">
        <div className="flex space-x-2 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por Hexadecimal"
            className="flex-1 border border-gray-300 rounded px-4 py-2 text-black"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isLoading ? "Buscando..." : "Buscar"}
          </button>
        </div>
      </div>
        <LoaderCSV uploadMutation={uploadMutation}/>
        <Search data={data} isLoading={isLoading} error={error} />
    </>
  );
};

export default SamsCVSearch;
