import React from 'react';
import {
  EditLocationRounded,
  
  Notifications,
  PeopleAltRounded,
  SearchRounded,
  
} from '@material-ui/icons';
import '../styles/ChatHeader.css';
import { auth } from '../app/firebase';
import { Button } from '@material-ui/core';



function ChatHeader({ channelName }) {
  return (
    <div className="chatHeader">
      <div className="chatHeader__left">
        <h3>
          <span className="chatHeader__hash">#</span>
          {channelName}
        </h3>
      </div>

      <div className="chatHeader__right">
        <Notifications />
        <EditLocationRounded />
        <PeopleAltRounded />

        <div className="chatHeader__search">
          <input placeholder="Search" type="text" />
          <SearchRounded />
        </div>

        {/* <SendRounded />
        <HelpRounded /> */}
        <Button onClick={() => auth.signOut()}>Sign Out</Button>
      </div>
    </div>
  );
}

export default ChatHeader;
