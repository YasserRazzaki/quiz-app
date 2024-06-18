"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { createUser } from '../lib/actions';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    motdepasse: ''
  });
  const router = useRouter();
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append('nom', formData.nom);
    data.append('email', formData.email);
    data.append('motdepasse', formData.motdepasse);

    try {
      const response = await createUser({}, data);
      setMessage(response.message);

      if (response.message === 'User created successfully!') {
        Swal.fire({
          icon: 'success',
          title: 'Inscription réussie',
          text: 'Votre compte a été créé avec succès !',
          confirmButtonText: 'OK'
        }).then(() => {
          router.push('/login'); // Redirection vers la page de connexion
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: response.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: `Une erreur est survenue. Veuillez réessayer plus tard. Erreur: ${error}`,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-6">Inscription</h1>
        {message && <p className="mb-4 text-red-500">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nom" className="block text-gray-700">Nom</label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="motdepasse" className="block text-gray-700">Mot de passe</label>
            <input
              type="password"
              id="motdepasse"
              name="motdepasse"
              value={formData.motdepasse}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            S'inscrire
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/login" legacyBehavior>
            <a className="text-blue-500 hover:underline">Se connecter</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;