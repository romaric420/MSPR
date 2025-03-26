import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Connexion.css';

function Connexion() {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		setErrors({ ...errors, [e.target.name]: '' });
	};

	const validate = () => {
		const newErrors = {};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!formData.email.trim()) {
			newErrors.email = 'Email requis.';
		} else if (!emailRegex.test(formData.email)) {
			newErrors.email = 'Format email invalide.';
		}

		if (!formData.password.trim()) {
			newErrors.password = 'Mot de passe requis.';
		} else if (formData.password.length < 6) {
			newErrors.password = 'Min 6 caractères.';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (validate()) {
			console.log('Connexion réussie ✅', formData);
			navigate('/acceuil');
		}
	};

	return (
		<div className="wrapper">
			<div className="overlay">
				<form className="login-form" onSubmit={handleSubmit}>
					<h1>Wildlens</h1>

					<div className="input-data">
						<input
							type="text"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
						/>
						<label>Email</label>
						<span className="underline"></span>
						{errors.email && <div className="error">{errors.email}</div>}
					</div>

					<div className="input-data">
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
						/>
						<label>Mot de passe</label>
						<span className="underline"></span>
						{errors.password && <div className="error">{errors.password}</div>}
					</div>

					<div className="checkbox-container">
						<input type="checkbox" name="rememberMe" id="rememberMe" />
						<label htmlFor="rememberMe" className="remember" >Se souvenir de moi</label>
					</div>

					<div className="btn">
						<button type="submit">Connexion</button>
					</div>
				</form>
			</div >
		</div >
	);
}

export default Connexion;
