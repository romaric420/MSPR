import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Acceuil.css';
import logo from '../assets/logo.png';
import elephantBackground from '../assets/elephant.jpeg';

function Acceuil() {
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);
	const [progress, setProgress] = useState(0);
	const [loadingMessage, setLoadingMessage] = useState("Chargement de l'image...");
	const navigate = useNavigate();

	const stats = {
		totalImages: 253,
		averagePredictionTime: 320,
		averageConfidence: 91.3,
		topSpecies: [
			{ name: 'Éléphant', count: 87 },
			{ name: 'Lion', count: 63 },
			{ name: 'Zèbre', count: 42 },
			{ name: 'Girafe', count: 38 },
			{ name: 'Guépard', count: 23 },
		],
	};

	const handleImageUpload = (e) => {
		const file = e.target.files[0];
		if (file) {
			if (!file.type.startsWith("image/")) {
				alert('Veuillez télécharger uniquement une image.');
				return;
			}

			setLoading(true);
			setProgress(0);
			setLoadingMessage("Chargement de l'image...");

			let progressInterval = 0;
			const interval = setInterval(() => {
				if (progressInterval < 100) {
					progressInterval += 2;
					setProgress(progressInterval);
				} else {
					clearInterval(interval);
				}
			}, 100);

			const reader = new FileReader();

			setTimeout(() => {
				reader.onloadstart = () => setProgress(100);
				reader.onloadend = () => {
					setImage(reader.result);
					setLoading(false);
				};
				reader.readAsDataURL(file);
			}, 3000);
		}
	};

	const handleLogout = () => {
		navigate("/connexion");
	};

	return (
		<div className="home-container">
			<header className="navbar">
				<div className="logo-container">
					<img src={logo} alt="Logo Wildlens" className="navbar-logo" />
					<span className="navbar-title">WILDLENS</span>
				</div>
				<div className="navbar-links">
					<Link to="/" className="lienPage">
						<button className="navbar-button" onClick={handleLogout}>Déconnexion</button>
					</Link>
					<Link to="/inscription">
						<button className="navbar-button">Inscription</button>
					</Link>
				</div>
			</header>

			<div className="main-content">
				<div className="left-block" style={{ backgroundImage: `url(${elephantBackground})` }}>
					<div className="left-top">
						<h3>Importer une image</h3>
						<div className="image-upload">
							<input type="file" accept="image/*" onChange={handleImageUpload} />
						</div>
					</div>

					<div className="left-bottom">
						<h3>Scanner une image</h3>
						<label className="camera-button">
							Ouvrir la caméra
							<input
								type="file"
								accept="image/*"
								capture="environment"
								style={{ display: 'none' }}
								onChange={handleImageUpload}
							/>
						</label>
					</div>
				</div>

				<div className="right-block">
					{loading ? (
						<div className="loader">
							<div className="progress-bar" style={{ width: `${progress}%` }}></div>
							<p>{loadingMessage}</p>
						</div>
					) : (
						image && <img src={image} alt="Image téléchargée" />
					)}
				</div>
			</div>

			{/* DASHBOARD SECTION */}
			<div className="dashboard-container">
				<h2 className="dashboard-title">📊 Dashboard</h2>
				<div className="stats-grid">
					<div className="stat-card">
						<h3>Images analysées</h3>
						<p>{stats.totalImages}</p>
					</div>

					<div className="stat-card">
						<h3>Temps moyen</h3>
						<p>{stats.averagePredictionTime} ms</p>
					</div>

					<div className="stat-card">
						<h3>Taux de confiance</h3>
						<p>{stats.averageConfidence} %</p>
					</div>

					<div className="stat-card">
						<h3>Espèces détectées</h3>
						<ul>
							{stats.topSpecies.map((s, i) => (
								<li key={i}>{s.name} ({s.count})</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Acceuil;
