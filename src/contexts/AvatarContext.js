import { createContext, useContext, useState, useEffect } from 'react';
import { getRandomAvatar } from '../utils/avatarUtils';

const AvatarContext = createContext();

export function AvatarProvider({ children }) {
  const [userAvatar, setUserAvatar] = useState(localStorage.getItem('userAvatar'));
  const [username, setUsername] = useState(localStorage.getItem('username') || 'Anonymous');

  useEffect(() => {
    if (!userAvatar) {
      const generateAvatar = async () => {
        const avatar = await getRandomAvatar(Math.random().toString());
        setUserAvatar(avatar);
        localStorage.setItem('userAvatar', avatar);
      };
      generateAvatar();
    }
  }, [userAvatar]);

  const updateUsername = (newName) => {
    setUsername(newName);
    localStorage.setItem('username', newName);
  };

  return (
    <AvatarContext.Provider value={{ userAvatar, username, updateUsername }}>
      {children}
    </AvatarContext.Provider>
  );
}

export const useAvatar = () => useContext(AvatarContext);
