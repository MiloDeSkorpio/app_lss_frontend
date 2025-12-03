import { useState, type FormEvent } from "react"
import { useVerifyEmail } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

const VerifyEmailView = () => {
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const verifyMutation = useVerifyEmail()

  const navigate = useNavigate()
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    try {
      await verifyMutation.mutateAsync({ email, code })
      setSuccess("Correo verificado correctamente")
      navigate("/login")
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Error al verificar correo")
    }
  }

  const handleResend = async () => {
    navigate("/resend-code-account")
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-100 rounded-xl shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Verificar correo electrónico
        </h2>

        {error && (
          <div className="mb-4 p-3 rounded bg-red-100 text-red-800 text-sm">{error}</div>
        )}
        {success && (
          <div className="mb-4 p-3 rounded bg-green-100 text-green-800 text-sm">{success}</div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
            id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@ejemplo.com"
              required
              className="mt-1 block w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm text-gray-700"
            />
          </div>

          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700">Código de verificación</label>
            <input
            id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Ingresa tu código"
              required
              className="mt-1 block w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm text-gray-700"
            />
          </div>

          <button
            type="submit"
            disabled={verifyMutation.isPending}
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 disabled:bg-indigo-300 transition"
          >
            {verifyMutation.isPending ? "Verificando..." : "Verificar"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          ¿No recibiste el código?{" "}
          <button
            type="button"
            onClick={handleResend}
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Reenviar código
          </button>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmailView
