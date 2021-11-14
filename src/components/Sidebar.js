import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../styles/Sidebar.css';
import { Avatar } from '@material-ui/core';
import {
  Add,
  // Call,
  ExpandMore,
  // Headset,
  // InfoOutlined,
  // Mic,
  Settings,
  SignalCellularAlt,
} from '@material-ui/icons';

import SidebarChannel from '../components/SidebarChannel';

import db, { auth } from '../app/firebase';
import { selectUser } from '../slice/userSlice';

function Sidebar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection('channels').onSnapshot((snapshot) =>
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      )
    );
  }, []);

  const handleAddChannel = () => {
    const channelName = prompt('Enter a new channel name');

    if (channelName) {
      db.collection('channels').add({
        channelName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
      <img className='logo' src="https://images-na.ssl-images-amazon.com/images/I/61p10BsEN-L.png" alt="" />
        <h3>Chat with me</h3>
        <ExpandMore className="sidebar__expandMoreIcon" />
      </div>

      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMore className="sidebar__expandMoreIcon" />
           
            <h4>Text Channels</h4>
          </div>

          <Add onClick={handleAddChannel} className="sidebar__addChannelIcon" />
        </div>

        <div className="sidebar__channelsList">
          {channels.map(({ id, channel }) => (
            <SidebarChannel
              key={id}
              id={id}
              channelName={channel.channelName}
            />
          ))}
        </div>
      </div>

      <div className="sidebar__voice">
        <SignalCellularAlt className="sidebar__voiceIcon" fontSize="large" />

        <div className="sidebar__voiceInfo">
          <h3>Chat Connected</h3>
          <p>Welcome!!</p>
        </div>

         {/* <div className="sidebar__voiceIcons">
          <InfoOutlined />
          <Call />
        </div> */}
      </div> 

      <div className="sidebar__profile">
        <Avatar onClick={() => auth.signOut()} src={user.photo} />
        <div className="sidebar__profileInfo">
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0, 5)}</p>
        </div>

        <div className="sidebar__profileIcons">
          {/* <Mic />
          <Headset /> */}
          <Settings />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
