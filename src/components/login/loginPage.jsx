import {useState} from 'react';
import {useTheme} from '../../context/ThemeContext';

export default function LoginPage() {
    const [name, setName] = useState('');
    // const [theme, setTheme]= useState('light');
    const { theme, toggle } = useTheme();

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (name.trim().length >= 2) login(name);
    };

    return (
        <div className="login-page">
            <button
                type="button"
                className="login-theme-toggle"
                // onClick={()=>((theme === 'light') ? 'dark' : 'light')}
                onClick={toggle}
                aria-label="Toggle theme"
            >
                {theme === 'light' ? 'Switch to dark' : 'Switch to light'}
            </button>        
            
            <form onSubmit={handleSubmit} className = "login-form">            
                <h1>Welcome to EventBook</h1>
                <p className="muted">Please enter your name to continue:</p>

                <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                />

                <button
                    type="button"
                    className="btn-primary"
                    disabled={name.trim().length <2}
                >
                    Enter
                </button>
            </form>
        </div>
    );
}