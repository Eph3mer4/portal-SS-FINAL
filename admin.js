export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { password } = req.body;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (password === ADMIN_PASSWORD) {
    return res.status(200).json({ message: 'Acceso admin concedido' });
  } else {
    return res.status(401).json({ message: 'Contraseña admin incorrecta' });
  }
}
