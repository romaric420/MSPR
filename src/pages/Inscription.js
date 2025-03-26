import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Inscription.css';

function Inscription() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
        setSuccessMessage('');
    };

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9]{8,15}$/;

        if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis.';
        if (!formData.prenom.trim()) newErrors.prenom = 'Le prénom est requis.';
        if (!formData.email.trim()) newErrors.email = 'L\'email est requis.';
        else if (!emailRegex.test(formData.email)) newErrors.email = 'Email invalide.';
        if (!formData.telephone.trim()) newErrors.telephone = 'Le numéro est requis.';
        else if (!phoneRegex.test(formData.telephone)) newErrors.telephone = 'Numéro invalide (8 à 15 chiffres).';
        if (!formData.password) newErrors.password = 'Mot de passe requis.';
        else if (formData.password.length < 6) newErrors.password = 'Minimum 6 caractères.';
        if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirmation requise.';
        else if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = 'Les mots de passe ne correspondent pas.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('Formulaire validé ✔️', formData);
            setSuccessMessage('Inscription réussie !');
            setFormData({
                nom: '',
                prenom: '',
                email: '',
                telephone: '',
                password: '',
                confirmPassword: '',
            });
            setErrors({});
        }
    };

    const fields = [
        { label: 'Nom', name: 'nom', type: 'text' },
        { label: 'Prénom', name: 'prenom', type: 'text' },
        { label: 'Email', name: 'email', type: 'text' }, // ← ⚠️ type text pour garder comportement identique
        { label: 'Téléphone', name: 'telephone', type: 'tel' },
        { label: 'Mot de passe', name: 'password', type: 'password' },
        { label: 'Confirmer le mot de passe', name: 'confirmPassword', type: 'password' },
    ];

    return (
        <div className="wrapper">
            <div className="overlay">

                {/* BOUTON ACCUEIL */}
                <Link to="/Acceuil" className="lienPage">
                    <button className="btn-retour" onClick={() => navigate('/acceuil')}>
                        ← Accueil
                    </button>
                </Link>

                <div className="login-form">
                    <h1>Inscription Wildlens </h1>
                    <form onSubmit={handleSubmit}>
                        {fields.map(({ label, name, type }) => (
                            <div className="input-data" key={name}>
                                <input
                                    type={type}
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    required
                                />
                                <label>{label}</label>
                                <span className="underline"></span>
                                {errors[name] && <div className="error">{errors[name]}</div>}
                            </div>
                        ))}

                        <div className="btn">
                            <button type="submit">S'inscrire</button>
                        </div>

                        {successMessage && <p className="success">{successMessage}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Inscription;
