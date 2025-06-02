import React, { useState } from 'react';
import './App.css';

function App() {
    const [currentView, setCurrentView] = useState('home');
    const [temperature, setTemperature] = useState(18);
    const [weather, setWeather] = useState('Bewolkt');
    const [activities, setActivities] = useState([]);

    const updateWeather = () => {
        const randomTemp = Math.floor(Math.random() * 20) + 5;
        const conditions = ['Zonnig', 'Bewolkt', 'Regenachtig', 'Mistig', 'Winderig'];
        const randomWeather = conditions[Math.floor(Math.random() * conditions.length)];

        setTemperature(randomTemp);
        setWeather(randomWeather);
    };

    const addActivity = (activity) => {
        setActivities([...activities, { ...activity, id: Date.now() }]);
    };

    const renderHome = () => (
        <div className="home-view">
            <h1 className="title">
                <span role="img" aria-label="weer icoon">🌤️</span> FitForecast
            </h1>

            <div className="weather-card">
                <h2>Weer vandaag:</h2>
                <p className="temperature">
                    <span role="img" aria-label="thermometer">🌡️</span> {temperature}°C
                </p>
                <p className="weather-condition">
                    <span role="img" aria-label="weersomstandigheden">☁️</span> {weather}
                </p>
            </div>

            <button className="update-button" onClick={updateWeather}>
                <span role="img" aria-label="vernieuwen">🔄</span> Weer Updaten
            </button>

            {activities.length > 0 && (
                <div className="activities-preview">
                    <h3>Vandaag gepland:</h3>
                    <div className="activity-list">
                        {activities.slice(0, 2).map(activity => (
                            <div key={activity.id} className="activity-item">
                                <span className="activity-icon">{getActivityIcon(activity.type)}</span>
                                <span>{activity.type} om {activity.time}</span>
                            </div>
                        ))}
                        {activities.length > 2 && (
                            <p className="more-activities">+{activities.length - 2} meer...</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

    const renderActivityInput = () => (
        <ActivityInput onAddActivity={addActivity} onBack={() => setCurrentView('home')} />
    );

    const getActivityIcon = (type) => {
        const icons = {
            'Buiten sporten': '🏃',
            'Wandelen': '🚶',
            'Fietsen': '🚴',
            'Reizen': '✈️',
            'Werk': '💼',
            'Winkelen': '🛍️',
            'Uitgaan': '🎉'
        };
        return icons[type] || '📅';
    };

    return (
        <div className="app-container">
            <div className="app-content">
                {currentView === 'home' && renderHome()}
                {currentView === 'activities' && renderActivityInput()}
                
                <div className="navigation">
                    <button 
                        className={`nav-button ${currentView === 'home' ? 'active' : ''}`}
                        onClick={() => setCurrentView('home')}
                    >
                        <span role="img" aria-label="home">🏠</span>
                        Home
                    </button>
                    <button 
                        className={`nav-button ${currentView === 'activities' ? 'active' : ''}`}
                        onClick={() => setCurrentView('activities')}
                    >
                        <span role="img" aria-label="activiteiten">📅</span>
                        Activiteiten
                    </button>
                </div>
            </div>
        </div>
    );
}

function ActivityInput({ onAddActivity, onBack }) {
    const [formData, setFormData] = useState({
        type: 'Buiten sporten',
        time: '',
        duration: '60',
        location: 'Buiten',
        notes: ''
    });

    const activityTypes = [
        'Buiten sporten',
        'Wandelen', 
        'Fietsen',
        'Reizen',
        'Werk',
        'Winkelen',
        'Uitgaan'
    ];

    const locationTypes = [
        'Buiten',
        'Binnen',
        'Auto/OV',
        'Kantoor',
        'Gym/Sporthal'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.time) {
            alert('Vul een tijd in!');
            return;
        }
        
        onAddActivity(formData);
        setFormData({
            type: 'Buiten sporten',
            time: '',
            duration: '60',
            location: 'Buiten',
            notes: ''
        });
        
        // Show success message
        alert('Activiteit toegevoegd! 🎉');
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="activity-input-view">
            <div className="view-header">
                <button className="back-button" onClick={onBack}>
                    ← Terug
                </button>
                <h2>
                    <span role="img" aria-label="activiteit">📅</span> 
                    Nieuwe Activiteit
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="activity-form">
                <div className="form-group">
                    <label>Activiteit Type:</label>
                    <select 
                        name="type" 
                        value={formData.type} 
                        onChange={handleChange}
                        className="form-select"
                    >
                        {activityTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Tijd:</label>
                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Duur (minuten):</label>
                    <input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        className="form-input"
                        min="15"
                        max="480"
                        step="15"
                    />
                </div>

                <div className="form-group">
                    <label>Locatie:</label>
                    <select 
                        name="location" 
                        value={formData.location} 
                        onChange={handleChange}
                        className="form-select"
                    >
                        {locationTypes.map(location => (
                            <option key={location} value={location}>{location}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Notities (optioneel):</label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="form-textarea"
                        placeholder="Extra info over je activiteit..."
                        rows="3"
                    />
                </div>

                <button type="submit" className="submit-button">
                    <span role="img" aria-label="toevoegen">➕</span>
                    Activiteit Toevoegen
                </button>
            </form>
        </div>
    );
}

export default App;