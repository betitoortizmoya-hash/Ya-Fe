// Reemplaza SOLO la parte del Login de tu AdminPanel.tsx actual:

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-6 font-sans">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 border border-stone-200"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-[#1a2b4c] text-white rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-[#1a2b4c]">Acceso Administrativo</h2>
          </div>

          {authError && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center mb-4 border border-red-200">
              {authError}
            </div>
          )}

          {/* Formulario 100% privado sin autocompletado ni sugerencias */}
          <form onSubmit={handleLogin} className="space-y-5" autoComplete="off">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1">Usuario</label>
              <input
                type="text"
                required
                autoComplete="new-password" // Engaña al navegador para que no sugiera correos
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
                className="w-full border border-stone-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1a2b4c]/50 focus:border-[#1a2b4c]"
                placeholder="Ingresar usuario"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1">Contraseña</label>
              <input
                type="password"
                required
                autoComplete="new-password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full border border-stone-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1a2b4c]/50 focus:border-[#1a2b4c]"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#1a2b4c] text-white font-bold py-3 rounded-lg hover:bg-[#111c33] transition-colors mt-2"
            >
              Iniciar Sesión
            </button>
            
            <button
              type="button"
              onClick={onBackToStore}
              className="w-full flex items-center justify-center gap-2 text-stone-500 hover:text-stone-800 text-sm mt-4 transition-colors"
            >
              <Store className="w-4 h-4" />
              Volver a la Tienda
            </button>
          </form>
        </motion.div>
      </div>
    );
  }
