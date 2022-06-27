import React, { useState, useContext, createContext } from 'react';

export const SharedContext = React.createContext();

export const SharedProvider = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [isDarkMode, toggleDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(width <= 768);
  const [showAddFriendComponent, toggleAddFriendVisibility] = useState(false);
  const [showUploadAvatarComponent, toggleUploadAvatarVisibility] =
    useState(false);
  const [showChangePasswordComponent, toggleChangePasswordVisibility] =
    useState(false);
  const [showChatFeed, toggleChatFeedVisibility] = useState(true);
  const [showChat, toggleChatVisibility] = useState(false);
  const [showSettings, toggleSettingsVisibility] = useState(false);
  const [showLogOutModal, toggleLogOutModalVisibility] = useState(false);
  const [chosenUser, setChosenUser] = useState('');

  return (
    <SharedContext.Provider
      value={{
        width,
        setWidth,
        isDarkMode,
        toggleDarkMode,
        isMobile,
        setIsMobile,
        showAddFriendComponent,
        toggleAddFriendVisibility,
        showUploadAvatarComponent,
        toggleUploadAvatarVisibility,
        showChangePasswordComponent,
        toggleChangePasswordVisibility,
        showChatFeed,
        toggleChatFeedVisibility,
        showChat,
        toggleChatVisibility,
        showSettings,
        toggleSettingsVisibility,
        showLogOutModal,
        toggleLogOutModalVisibility,
        chosenUser,
        setChosenUser,
      }}
    >
      {children}
    </SharedContext.Provider>
  );
};
