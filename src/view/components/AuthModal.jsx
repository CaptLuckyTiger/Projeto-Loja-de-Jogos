import { useState } from 'react';

export default function AuthModal({ mode, onClose, onModeChange, onLogin, onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function submit(event) { event.preventDefault(); mode === 'login' ? onLogin(name) : onRegister({ name, email, password }); }
  return <div className="modal-backdrop" onClick={onClose}><section className="auth-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Fechar">×</button><span className="eyebrow">Checkpoint account</span><h2>{mode === 'login' ? 'Entre na sua conta' : 'Crie sua conta'}</h2><form onSubmit={submit}><label>Nome<input value={name} onChange={(event) => setName(event.target.value)} required /></label>{mode === 'register' && <label>E-mail<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>}<label>Senha<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} minLength="8" required /></label><button className="primary-button" type="submit">{mode === 'login' ? 'Entrar' : 'Cadastrar'}</button></form><button className="link-button" onClick={() => onModeChange(mode === 'login' ? 'register' : 'login')}>{mode === 'login' ? 'Ainda não tenho conta' : 'Já tenho uma conta'}</button></section></div>;
}
