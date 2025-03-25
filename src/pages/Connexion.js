import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Connexion.css';

function Connexion() {
	return (
		<div className="wrapper">
			<div className="overlay">
				<form className="login-form">
					<h1>Wildlens</h1>
					<div className="input-data">
						<input type="email" name="email" required />
						<div className="underline"></div>
						<label>Email</label>
					</div>
					<div className="input-data">
						<input type="password" name="password" required />
						<div className="underline"></div>
						<label>Mot de passe</label>
					</div>
					<div>
						<input type="checkbox" name="rememberMe" id="rememberMe" />
						<label htmlFor="rememberMe" className="remember">
							Se souvenir de moi
						</label>
					</div>
					<div className="btn">
						<Link to="/acceuil" className="lienPage">
							<button type="submit">Connexion</button>
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Connexion;
