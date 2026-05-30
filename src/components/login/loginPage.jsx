import {useState} from 'react';

export default function LoginPage() {
    const [name, setName] = useState('');
    const [theme, setTheme]= useState('light');

    const handleSubmit = (e) => {
        e.preventDefault();

    };

    return (
        <div className="login-page">
            <button
                type="button"
                className="login-theme-toggle"
                onClick={()=> setTheme((theme === 'light') ? 'dark' : 'light')}
                aria-label="Toggle theme"
            >
                {theme === 'light' ? 'Switch to dark' : 'Switch to light'}
            </button>        
            
            <form onSubmit={handleSubmit} className = "login-form">            
                <h1 className="tile">Welcome to EventBook</h1>
                <p className="subTitle">Please enter your name to continue:</p>
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