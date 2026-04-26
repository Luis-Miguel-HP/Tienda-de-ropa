"use client"

import { useState } from "react"
import { useAdminAuth } from "@/lib/admin-auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Eye, EyeOff, AlertCircle, ShoppingBag, ArrowRight } from "lucide-react"
import Link from "next/link"

export function AdminLogin() {
  const { login } = useAdminAuth()
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const success = login(password)
    if (!success) {
      setError("Contrasena incorrecta")
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-12 flex-col justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-white/20">
            <ShoppingBag className="size-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">MODA</span>
        </div>
        
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Gestiona tu tienda<br />de manera simple
          </h1>
          <p className="text-lg text-white/80 max-w-md">
            Accede al panel de administracion para gestionar productos, inventario y mas.
          </p>
        </div>

        <p className="text-sm text-white/60">
          Admin Panel v1.0
        </p>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="flex items-center justify-center gap-3 lg:hidden">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary">
              <ShoppingBag className="size-5 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">MODA</span>
          </div>

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10">
              <Lock className="size-7 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Panel de Administracion</h2>
            <p className="text-muted-foreground">
              Ingresa tu contrasena para acceder
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Contrasena</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu contrasena"
                  className="h-12 rounded-xl pr-12"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="size-4 shrink-0" />
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              size="lg"
              className="w-full h-12 rounded-xl gap-2 text-base font-medium" 
              disabled={isLoading}
            >
              {isLoading ? "Verificando..." : "Ingresar"}
              {!isLoading && <ArrowRight className="size-4" />}
            </Button>
          </form>

          {/* Back to store */}
          <div className="text-center">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowRight className="size-4 rotate-180" />
              Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
