export default function handler(req, res) {
  const { password } = req.body;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "adminBLURKIT22"; // Cambia esto

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  if (password === ADMIN_PASSWORD) {
    return res.status(200).json({ access: true });
  } else {
    return res.status(401).json({ error: 'Contraseña incorrecta' });
  }
}
