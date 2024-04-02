import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [correoElectronico, setCorreoElectronico] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          CorreoElectronico: correoElectronico,
          Contrasena: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Inicio de sesión exitoso:', data);
        sessionStorage.setItem('userData', JSON.stringify(data.usuario));
        switch (data.Tipo) {
          case 'Super Administrador':
            navigate('/agregarUsuario'); 
            break;
          case 'Administrador':
            navigate('/agregarSede'); 
            break;
          default:
            console.log('Tipo de usuario desconocido');
            break;
        }
      } else {
        setMensaje(data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setMensaje('Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#2477b5', boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ width: '100%', maxWidth: 400, background: 'white', borderRadius: 20, padding: 30 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 20, fontSize: 28, fontFamily: 'Arial, sans-serif', fontWeight: 'bold', color: '#333'}}>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 30 }}>
            <label htmlFor="correoElectronico" style={{ display: 'block', marginBottom: 15, fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: 16 }}>Correo Electrónico:</label>
            <input type="text" id="correoElectronico" value={correoElectronico} onChange={(e) => setCorreoElectronico(e.target.value)} style={{ width: '100%', height: 50, borderRadius: 8, border: '2px solid #ccc', padding: '0 15px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: 30 }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: 15, fontFamily: 'Arial, sans-serif', fontWeight: 'bold', fontSize: 16 }}>Contraseña:</label>
            <input type={showPassword ? 'text' : 'password'} id="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', height: 50, borderRadius: 8, border: '2px solid #ccc', padding: '0 15px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: 30, textAlign: 'left' }}>
            <input type="checkbox" id="showPassword" checked={showPassword} onChange={() => setShowPassword(!showPassword)} style={{ marginRight: 5 }} />
            <label htmlFor="showPassword" style={{ fontFamily: 'Arial, sans-serif', fontSize: 16, fontWeight: 'bold', color: '#333' }}>Mostrar contraseña</label>
          </div>
          <button type="submit" style={{ width: '100%', height: 50, background: '#0c5699', color: 'white', fontSize: 18, borderRadius: 10, border: 'none', cursor: 'pointer', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', outline: 'none', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', transition: 'background 0.3s' }} 
                  onMouseEnter={(e) => e.target.style.background = '#0c3d66'} 
                  onMouseLeave={(e) => e.target.style.background = '#0c5699'}>
            Ingresar
          </button>
        </form>
        {mensaje && <p style={{ marginTop: 25, textAlign: 'center', fontFamily: 'Arial, sans-serif', fontWeight: 'bold', color: 'red' }}>{mensaje}</p>}
      </div>
    </div>
  );
}

export default Login;
