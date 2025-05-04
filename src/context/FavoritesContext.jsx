// src/context/FavoritesContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useSession } from './SessionProvider';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);
    const { user } = useSession();

    // Load favorites from localStorage when user logs in
    useEffect(() => {
        if (user) {
            const storedFavorites = localStorage.getItem(`favorites-${user.username}`);
            if (storedFavorites) {
                try {
                    setFavorites(JSON.parse(storedFavorites));
                } catch (error) {
                    console.error('Error parsing favorites:', error);
                    setFavorites([]);
                }
            }
        } else {
            setFavorites([]);
        }
    }, [user]);

    // Save favorites to localStorage when they change
    useEffect(() => {
        if (user && favorites.length > 0) {
            localStorage.setItem(`favorites-${user.username}`, JSON.stringify(favorites));
        }
    }, [favorites, user]);

    const addFavorite = (country) => {
        if (!favorites.some(fav => fav.name.common === country.name.common)) {
            setFavorites([...favorites, country]);
        }
    };

    const removeFavorite = (countryName) => {
        setFavorites(favorites.filter(country => country.name.common !== countryName));
    };

    const isFavorite = (countryName) => {
        return favorites.some(country => country.name.common === countryName);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);
