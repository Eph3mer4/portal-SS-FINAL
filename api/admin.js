// api/admin.js
export default function handler(req, res) {
  // 1. Configuración básica de seguridad
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      message: 'Método no permitido' 
    });
  }

  // 2. Obtener la contraseña del cuerpo de la solicitud
  const { password } = req.body;

  // 3. Obtener la contraseña de administrador de las variables de entorno
  // (Configura esto en Vercel: Settings -> Environment Variables)
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  // 4. Verificación básica
  if (!ADMIN_PASSWORD) {
    console.error('ADMIN_PASSWORD no está configurado en las variables de entorno');
    return res.status(500).json({
      success: false,
      message: 'Configuración del servidor incompleta'
    });
  }

  // 5. Validar la contraseña
  try {
    if (password === ADMIN_PASSWORD) {
      // 6. Respuesta exitosa
      return res.status(200).json({
        success: true,
        message: 'Autenticación exitosa',
        // Datos adicionales que podrías querer enviar al frontend
        adminData: {
          accessLevel: 'full',
          lastLogin: new Date().toISOString()
        }
      });
    } else {
      // 7. Contraseña incorrecta
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }
  } catch (error) {
    // 8. Manejo de errores
    console.error('Error en el endpoint /api/admin:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
}
