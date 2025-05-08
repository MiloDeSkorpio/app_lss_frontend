import OperatorCard from "../components/common/OperatorCard";
import { getLatestVersionWLCV } from "../hooks/hooksWLCV";

const SamsView = () => {
  const { data: samsCV, isLoading, error } = getLatestVersionWLCV();
  const totalSAMSCV = samsCV?.length || 0;
  const lastVersionCV = samsCV?.[0]?.VERSION || "N/A";

  const countOperator = (op: string) =>
    samsCV?.filter((s: { OPERATOR: string }) => s.OPERATOR === op).length || 0;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="space-y-4">
      <h1 className="font-bold">SAMS</h1>
      <div className="flex flex-wrap space-x-2">
        <OperatorCard
          title="Lista Blanca CV"
          lastVersion={lastVersionCV}
          totalRecords={totalSAMSCV}
          operators={[
            { label: "STE", value: countOperator("3C") + countOperator("5A") },
            { label: "STC", value: countOperator("32") },
            {
              label: "MB",
              value:
                countOperator("01") + countOperator("02") + countOperator("03"),
            },
            { label: "ORT", value: countOperator("15") },
            { label: "RTP", value: countOperator("46") },
          ]}
          onDownload={() => console.log("Descargar CV")}
          onUpdate={() => console.log("Actualizar CV")}
          onSearch={() => console.log("Buscar en CV")}
          onHistory={() => console.log("Ver histórico CV")}
        />

        {/* Este seria el inicio del componente */}
        <div className=" space-y-1 border-2 border-amber-50 p-4">
          <h2 className="font-bold">Lista Blanca CL</h2>
          <div className="flex space-y-2 space-x-3">
            <div className="">
              <p>Ultima Version: 2</p>
              <p>Registros: 14864</p>
              <p>STE: 14864</p>
              <p>STC: 14864</p>
              <p>MB: 14864</p>
              <p>ORT: 14864</p>
              <p>RTP: 14864</p>
              <button>Descargar</button>
            </div>
            <div className="flex flex-col space-y-3">
              <button>Actualizar</button>
              <button>Buscar</button>
              <button>Historico</button>
            </div>
          </div>
        </div>
        {/* Aqui termina el primer componente */}
        {/* Este seria el inicio del componente */}
        <div className=" space-y-1 border-2 border-amber-50 p-4">
          <h2 className="font-bold">Inventario</h2>
          <div className="flex space-y-2 space-x-3">
            <div className="">
              <p>Ultima Version: 2</p>
              <p>Registros: 14864</p>
              <p>STE: 14864</p>
              <p>STC: 14864</p>
              <p>MB: 14864</p>
              <p>ORT: 14864</p>
              <p>RTP: 14864</p>
              <button>Descargar</button>
            </div>
            <div className="flex flex-col space-y-3">
              <button>Actualizar</button>
              <button>Buscar</button>
              <button>Historico</button>
            </div>
          </div>
        </div>
        {/* Aqui termina el primer componente */}
      </div>
    </div>
  );
};

export default SamsView;
