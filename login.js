export default function handler(req, res) {
  const { password } = req.body;

  const PASSWORD_SECRETA = process.env.PASSWORD_SECRETA;

  if (req.method === 'POST') {
    if (password === PASSWORD_SECRETA) {
      res.status(200).json({ message: 'Contraseña correcta. Acceso concedido.' });
    } else {
      res.status(401).json({ message: 'Contraseña incorrecta. Acceso denegado.' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
