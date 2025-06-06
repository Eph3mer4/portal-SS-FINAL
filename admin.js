export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    const { password } = req.body;

    // Si req.body está vacío, intenta forzar el parseo manual (por si Vercel no lo hace):
    if (!password) {
      const body = await new Promise((resolve, reject) => {
        let data = '';
        req.on('data', chunk => data += chunk);
        req.on('end', () => resolve(JSON.parse(data)));
        req.on('error', err => reject(err));
      });
      password = body.password;
    }

    const PASSWORD_SECRETA = process.env.PASSWORD_SECRETA;

    if (password === PASSWORD_SECRETA) {
      return res.status(200).json({ message: 'Acceso concedido' });
    } else {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}
