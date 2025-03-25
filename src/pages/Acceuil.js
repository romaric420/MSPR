import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Acceuil.css';
import logo from '../assets/logo.webp';  // Importation de l'image du logo
import elephantBackground from '../assets/elephant.jpeg';  // Importation du fond d'écran de l'éléphant

function Acceuil() {
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false); // State to manage loading
	const [progress, setProgress] = useState(0); // Progress state for the loader
	const [loadingMessage, setLoadingMessage] = useState("Chargement de l'image...");
	const navigate = useNavigate();

	const handleImageUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			// Validation pour s'assurer que le fichier est bien une image
			if (!file.type.startsWith("image/")) {
				alert('Veuillez télécharger uniquement une image.');
				return;
			}

			setLoading(true);
			setProgress(0); // Reset progress to 0
			setLoadingMessage("Chargement de l'image...");

			// Simulate a 5-second loading delay
			let progressInterval = 0;
			const interval = setInterval(() => {
				if (progressInterval < 100) {
					progressInterval += 2; // Increase progress by 2% each interval
					setProgress(progressInterval);
				} else {
					clearInterval(interval);
				}
			}, 100); // Set the interval to 100ms

			const reader = new FileReader();

			// Simulate the 5-second delay for loading
			setTimeout(() => {
				reader.onloadstart = () => {
					setProgress(100); // Complete progress
				};

				reader.onloadend = () => {
					setImage(reader.result); // Set the image once loading is complete
					setLoading(false); // Stop loading
				};

				reader.readAsDataURL(file); // Start reading the file
			}, 5000); // 5 seconds delay before displaying the image
		}
	};

	const handleLogout = () => {
		// Redirect to the login page (connexion page)
		navigate("/connexion");
	};

	return (
		<div className="home-container">
			<header className="navbar">
				<div className="logo-container">
					<img src={logo} alt="Logo Wildlens" className="navbar-logo" /> {/* Modifié pour éviter l'avertissement */}
					<span className="navbar-title">WILDLENS</span> {/* Texte à côté du logo */}
				</div>
				<div className="navbar-links">
					<Link to="/" className="lienPage">
						<button className="navbar-button" onClick={handleLogout}>Déconnexion</button> {/* Déconnexion redirige vers la page de connexion */}
					</Link>
					<Link to="/inscription">
						<button className="navbar-button">Inscription</button>
					</Link>
				</div>
			</header>

			<div className="main-content">
				<div className="left-block" style={{ backgroundImage: `url(${elephantBackground})` }}>
					<div className="image-upload">
						<input type="file" accept="image/*" onChange={handleImageUpload} />
					</div>
				</div>

				<div className="right-block">
					{loading ? (
						<div className="loader">
							<div className="progress-bar" style={{ width: `${progress}%` }}></div>
							<p>{loadingMessage}</p>
						</div>
					) : (
						image && <img src={image} alt="pictures téléchargée" />
					)}
				</div>
			</div>
		</div>
	);
}

export default Acceuil;
