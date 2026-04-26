import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads")

// POST /api/upload — guarda la imagen en /public/uploads/ y devuelve la URL pública
export async function POST(request: NextRequest) {
  try {
    // Asegurarse de que la carpeta de uploads exista
    if (!fs.existsSync(UPLOADS_DIR)) {
      fs.mkdirSync(UPLOADS_DIR, { recursive: true })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No se recibió ningún archivo" }, { status: 400 })
    }

    // Validar tipo de archivo
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Tipo de archivo no permitido. Solo JPEG, PNG, WEBP y GIF." },
        { status: 400 }
      )
    }

    // Validar tamaño (máx 5MB)
    const MAX_SIZE = 5 * 1024 * 1024
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "El archivo es demasiado grande. Máximo 5MB." },
        { status: 400 }
      )
    }

    // Generar nombre único para evitar colisiones
    const extension = file.name.split(".").pop() ?? "jpg"
    const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`
    const filePath = path.join(UPLOADS_DIR, uniqueName)

    // Convertir el archivo a Buffer y guardarlo en disco
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    fs.writeFileSync(filePath, buffer)

    // La URL pública que Next.js sirve desde /public
    const publicUrl = `/uploads/${uniqueName}`

    return NextResponse.json({ url: publicUrl }, { status: 201 })
  } catch (error) {
    console.error("Error al subir imagen:", error)
    return NextResponse.json({ error: "Error interno al subir la imagen" }, { status: 500 })
  }
}
