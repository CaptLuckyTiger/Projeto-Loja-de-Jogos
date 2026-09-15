import { useState } from 'react';

export default function ContactView() {
  const [sent, setSent] = useState(false);
  function submit(event) {
    event.preventDefault();
    setSent(true);
  }
  return (
    <section className="section-block contact-page">
      <div className="page-intro">
        <div>
          <span className="eyebrow">Fale com a equipe</span>
          <h1>Contato</h1>
        </div>
        <p>Respondemos mensagens em até um dia útil.</p>
      </div>
      <form className="contact-form" onSubmit={submit}>
        <label>
          Nome
          <input required />
        </label>
        <label>
          E-mail
          <input type="email" required />
        </label>
        <label>
          Mensagem
          <textarea rows="6" required />
        </label>
        <button className="primary-button" type="submit">
          Enviar mensagem
        </button>
        {sent && <p className="success-message">Mensagem enviada com sucesso!</p>}
      </form>
    </section>
  );
}
