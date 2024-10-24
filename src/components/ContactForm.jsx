import { useState } from 'react';
import { X } from "lucide-react"; // Importando o ícone de fechar

const ContactForm = ({ onClose }) => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    subject: 'StaticForms - Contact Form',
    honeypot: '',
    message: '',
    replyTo: '@',
    accessKey: 'ebc858a1-72b5-4c4b-ac2b-db5fec912a0c'
  });

  const [response, setResponse] = useState({
    type: '',
    message: ''
  });

  const handleChange = (e) => setContact({ ...contact, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://api.staticforms.xyz/submit', {
        method: 'POST',
        body: JSON.stringify(contact),
        headers: { 'Content-Type': 'application/json' }
      });

      const json = await res.json();

      if (json.success) {
        setResponse({
          type: 'success',
          message: 'Enviado com sucesso!'
        });
        // Opcionalmente, pode-se fechar o formulário após a submissão
        // onClose();
      } else {
        setResponse({
          type: 'error',
          message: json.message
        });
      }
    } catch (e) {
      console.log('An error occurred', e);
      setResponse({
        type: 'error',
        message: 'An error occurred while submitting the form'
      });
    }
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <div className="box p-6 rounded-lg  bg-white max-w-lg mx-auto relative">
          
          {/* Botão de fechar */}
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 transition-all duration-300"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Mensagem de sucesso ou erro */}
          {response.type === 'success' && (
            <div className="text-green-600 font-semibold text-center mb-4">
              <p>{response.message}</p>
            </div>
          )}

          {response.type === 'error' && (
            <div className="text-red-600 font-semibold text-center mb-4">
              <p>{response.message}</p>
            </div>
          )}

          {/* Formulário de contato */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="field">
              <label className="label text-lg">Seu nome</label>
              <div className="control">
                <input
                  className="input border border-gray-300 rounded-lg pl-2 focus:border-sky-500 focus:ring focus:ring-sky-200 transition-all duration-200"
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label text-lg">Seu e-mail</label>
              <div className="control">
                <input
                  className="input border border-gray-300 rounded-lg pl-2 focus:border-sky-500 focus:ring focus:ring-sky-200 transition-all duration-200"
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Hidden honeypot and subject */}
            <div className="field" style={{ display: 'none' }}>
              <div className="control">
                <input
                  type="text"
                  name="honeypot"
                  style={{ display: 'none' }}
                  onChange={handleChange}
                />
                <input
                  type="hidden"
                  name="subject"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label className="label text-lg">Mensagem</label>
              <div className="control">
                <textarea
                  className="textarea border border-gray-300 rounded-lg pl-2 focus:border-sky-500 focus:ring focus:ring-sky-200 transition-all duration-200"
                  placeholder="Your Message"
                  name="message"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <button
                  className="button is-primary w-full bg-sky-700 text-white rounded-lg hover:bg-sky-800 transition-all duration-200 py-2 font-semibold"
                  type="submit"
                >
                  Enviar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
