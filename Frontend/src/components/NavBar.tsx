import React, { useState } from 'react';
import { Heart, X, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from '../context/AuthContext';

// Mock Avatar component for displaying user profile picture
const Avatar = ({ src, alt, fallback }: { src: string | null, alt: string, fallback: React.ReactNode }) => (
    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
        {src ? (
            <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
            fallback
        )}
    </div>
);

interface NavBarProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ darkMode, toggleDarkMode }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const isOnDashboard = window.location.pathname.startsWith('/dashboard');
    const isPhonePending = user?.phoneNumber && user.phoneNumber.startsWith("phone-pending-");

    const handleLogout = async () => {
        try {
            await logout();
            // Redirect to index page after logout
            window.location.href = '/';
        } catch (error) {
            console.error('Logout error:', error);
            // Even if there's an error, redirect to index page
            window.location.href = '/';
        }
    };

    return (
        <header className="sticky top-0 bg-white backdrop-blur-md z-50 border-b shadow-md">
            <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo and App Title */}
                <Link to="/" className="flex items-center gap-2">
                    <Heart className="w-7 h-7 text-red-600 fill-red-600" />
                    <span className="font-extrabold text-2xl text-gray-900 dark:text-gray-200 tracking-tight">
                        Heart Disease Predictor
                    </span>
                </Link>
                {/* Conditional Auth/Navigation Buttons and User Details */}
                <div className="hidden md:flex items-center gap-4">
                    {user ? (
                        <>
                            <div className="flex items-center gap-3">
                                {/* Dark Mode Toggle */}
                                <div className="flex items-center border-l border-muted pl-4">
                                    <Button
                                        variant="ghost"
                                        title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                                        onClick={toggleDarkMode}
                                        className="p-2 text-muted-foreground dark:text-muted-foreground"
                                    >
                                        {darkMode ? "🌙" : "☀️"}
                                    </Button>
                                </div>
                                {user.avatar && (
                                    <img
                                        src={user.avatar}
                                        alt={user.username}
                                        className="w-8 h-8 rounded-full object-cover border-2 border-primary/20"
                                    />
                                )}
                                <div className="flex flex-col items-start">
                                    <span className="text-sm text-gray-900 dark:text-gray-200">
                                        Hi, {user.username}
                                    </span>
                                    {user.phoneNumber && (
                                        <span
                                            className={`text-xs flex items-center gap-1 text-muted-foreground dark:text-muted-foreground`}
                                        >
                                            {user.phoneNumber}
                                            {isPhonePending && (
                                                <span className="text-xs bg-amber-100 text-amber-700 px-1 rounded">
                                                    Pending
                                                </span>
                                            )}
                                        </span>
                                    )}
                                </div>
                            </div>
                            {/* Only show Dashboard button when not on dashboard page */}
                            {!isOnDashboard && (
                                <Button variant="ghost" asChild>
                                    <a href="/dashboard">Dashboard</a>
                                </Button>
                            )}
                            <Button variant="ghost" onClick={handleLogout}>Logout</Button>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            {/* Dark Mode Toggle */}
                            <div className="flex items-center border-l border-muted pl-4">
                                <Button
                                    variant="ghost"
                                    title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                                    onClick={toggleDarkMode}
                                    className="p-2 text-muted-foreground dark:text-muted-foreground"
                                >
                                    {darkMode ? "🌙" : "☀️"}
                                </Button>
                            </div>
                            <Link to="/login">
                                <Button size="sm" variant="ghost">Sign In</Button>
                            </Link>
                            <Link to="/signup">
                                <Button size="sm" variant="default">Sign Up</Button>
                            </Link>
                        </div>
                    )}
                </div>
                {/* Mobile Menu Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
            </nav>
        </header>
    );
};

export default NavBar;
