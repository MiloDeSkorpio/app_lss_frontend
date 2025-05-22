import  { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

type SearchResult = {
  id: string
  name: string
  [key: string]: any
}

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [fileError, setFileError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleTextSearch = async () => {
    setLoading(true)
    // Simula una búsqueda
    setTimeout(() => {
      setResults([
        { id: '1', name: `Resultado para "${searchTerm}"` },
        { id: '2', name: `Otro resultado relacionado` }
      ])
      setLoading(false)
    }, 1000)
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return

    const file = acceptedFiles[0]
    const formData = new FormData()
    formData.append('file', file)

    setLoading(true)
    setFileError(null)

    try {
      // Aquí iría tu lógica real con `fetch` o mutation
      setTimeout(() => {
        setResults([
          { id: 'a', name: `Resultado desde archivo ${file.name}` },
          { id: 'b', name: `Coincidencia extraída del CSV` }
        ])
        setLoading(false)
      }, 1500)
    } catch (error) {
      setFileError('Error al procesar el archivo')
      setLoading(false)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'], 'text/plain': ['.csv'] },
    multiple: false,
  })

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 bg-white rounded shadow-md">
      {/* Búsqueda por texto */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por Hexadecimal"
          className="flex-1 border border-gray-300 rounded px-4 py-2 text-black"
        />
        <button
          onClick={handleTextSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
      </div>

      {/* Drag & Drop */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive ? 'bg-blue-50 border-blue-400' : 'bg-gray-50 border-gray-300'
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">
          {isDragActive
            ? 'Suelta el archivo aquí...'
            : 'Arrastra un archivo CSV aquí o haz clic para seleccionarlo'}
        </p>
        <p className="text-sm text-gray-400">Formato aceptado: .csv</p>
      </div>
      {fileError && <p className="text-red-600 text-sm">{fileError}</p>}

      {/* Resultados */}
      {loading ? (
        <p className="text-gray-500 text-center">Buscando...</p>
      ) : results.length > 0 ? (
        <ul className="divide-y divide-gray-200 border rounded">
          {results.map((r) => (
            <li key={r.id} className="p-4 hover:bg-gray-50">
              {r.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 text-center">No hay resultados aún.</p>
      )}
    </div>
  )
}

export default Search
