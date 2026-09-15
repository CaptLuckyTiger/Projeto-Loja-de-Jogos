import { useEffect, useRef, useState } from 'react';

export default function AuthModal({ mode, onClose, onModeChange, onLogin, onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const closeButtonRef = useRef(null);
  useEffect(() => {
    closeButtonRef.current?.focus();
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  function submit(event) {
    event.preventDefault();
    mode === 'login' ? onLogin(name) : onRegister({ name, email, password });
  }
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button ref={closeButtonRef} className="modal-close" onClick={onClose} aria-label="Fechar">
          ×
        </button>
        <span className="eyebrow">Checkpoint account</span>
        <h2 id="auth-modal-title">{mode === 'login' ? 'Entre na sua conta' : 'Crie sua conta'}</h2>
        <form onSubmit={submit}>
          <label>
            Nome
            <input value={name} onChange={(event) => setName(event.target.value)} required />
          </label>
          {mode === 'register' && (
            <label>
              E-mail
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
          )}
          <label>
            Senha
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength="8"
              required
            />
          </label>
          <button className="primary-button" type="submit">
            {mode === 'login' ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>
        <button
          className="link-button"
          onClick={() => onModeChange(mode === 'login' ? 'register' : 'login')}
        >
          {mode === 'login' ? 'Ainda não tenho conta' : 'Já tenho uma conta'}
        </button>
      </section>
    </div>
  );
}
