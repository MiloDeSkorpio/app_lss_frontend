import { useState, type FormEvent } from "react"
import { useRequestPasswordReset, useVerifyResetCode, useResetPassword } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

const ResetPasswordView = () => {
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isVerified, setIsVerified] = useState(false)

  const requestMutation = useRequestPasswordReset()
  const verifyMutation = useVerifyResetCode()
  const resetMutation = useResetPassword()
  const navigate = useNavigate()

  // Paso 1: solicitar código
  const handleRequestCode = async () => {
    setError(null)
    setSuccess(null)
    try {
      await requestMutation.mutateAsync({ email })
      setSuccess("Se ha enviado un código de verificación a tu correo")
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Error al solicitar código")
    }
  }

  // Paso 2: verificar código
  const handleVerifyCode = async () => {
    setError(null)
    setSuccess(null)
    try {
      await verifyMutation.mutateAsync({ email, code })
      setSuccess("Código verificado. Ahora puedes cambiar tu contraseña")
      setIsVerified(true)
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Código inválido o expirado")
    }
  }

  // Paso 3: resetear contraseña
  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    try {
      await resetMutation.mutateAsync({ email, code, newPassword })
      setSuccess("Contraseña actualizada correctamente")
      setEmail("")
      setCode("")
      setNewPassword("")
      setConfirmPassword("")
      setIsVerified(false)
      navigate("/login")
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Error al cambiar contraseña")
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-100 rounded-xl shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Restablecer contraseña
        </h2>

        {error && <div className="mb-4 p-3 rounded bg-red-100 text-red-800 text-sm">{error}</div>}
        {success && <div className="mb-4 p-3 rounded bg-green-100 text-green-800 text-sm">{success}</div>}

        <form onSubmit={handleResetPassword} className="space-y-4">

          {/* EMAIL */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
            id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@ejemplo.com"
              required
              disabled={isVerified}
              className="mt-1 block w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm text-gray-700"
            />
          </div>

          {/* BOTÓN SOLICITAR CÓDIGO */}
          {!isVerified && (
            <button
              type="button"
              onClick={handleRequestCode}
              disabled={!email || requestMutation.isPending}
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 disabled:bg-indigo-300 transition"
            >
              {requestMutation.isPending ? "Enviando código..." : "Solicitar código"}
            </button>
          )}

          {/* CÓDIGO */}
          {!isVerified && (
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">Código de verificación</label>
              <input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Ingresa el código"
                required
                className="mt-1 block w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm text-gray-700"
              />
              <button
                type="button"
                onClick={handleVerifyCode}
                disabled={!code || verifyMutation.isPending}
                className="w-full mt-2 py-2 px-4 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 disabled:bg-green-300 transition"
              >
                {verifyMutation.isPending ? "Verificando..." : "Verificar código"}
              </button>
            </div>
          )}

          {/* NUEVA CONTRASEÑA */}
          {isVerified && (
            <>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Nueva contraseña</label>
                <input
                  id="password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm text-gray-700"
                />
              </div>

              <div>
                <label htmlFor="confPassword" className="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
                <input
                  id="confPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm text-gray-700"
                />
              </div>

              <button
                type="submit"
                disabled={resetMutation.isPending}
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 disabled:bg-indigo-300 transition"
              >
                {resetMutation.isPending ? "Actualizando..." : "Cambiar contraseña"}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  )
}

export default ResetPasswordView
