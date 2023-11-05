import React, { useState } from 'react';


function Sidebar() {
  const [isMessageModalOpen, setMessageModalOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  const openMessageModal = () => {
    setMessageModalOpen(true);
  };

  const closeMessageModal = () => {
    setMessageModalOpen(false);
  };

  const openProfileModal = () => {
    setProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setProfileModalOpen(false);
  };

  return (
    <div className="sidebar" style={{backgroundColor: 'black'}}>
      <button className="message-button" onClick={openMessageModal}>
        Message
      </button>

      {isMessageModalOpen && (
        <div className="message-modal">
          <button className="close-modal" onClick={closeMessageModal}>
            &times;
          </button>
          <div className="modal-content">
            {/* Add your message content here */}
          </div>
        </div>
      )}

      <button className="profile-button" onClick={openProfileModal}>
        Profile
      </button>

      {isProfileModalOpen && (
        <div className="profile-modal">
          <button className="close-modal" onClick={closeProfileModal}>
            &times;
          </button>
          <div className="modal-content">
            {/* Add your profile content here */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
