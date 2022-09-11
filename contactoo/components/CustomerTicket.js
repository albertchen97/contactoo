import React from 'react';
import { API, Auth, withSSRContext, graphqlOperation } from 'aws-amplify';

export default function CustomerTicket({ name, email, roomId }) {
  const handleShowChat = (event) => {
    const roomId = event.target.getAttribute('roomId');
    var chatWindow = window.open(
      `/chatpopup?roomId=${roomId}`,
      '',
      'width=512, height=512, top=300, left=600'
    );
  };

  return (
    // container for each list item
    <li className="w-full h-1/6 max-h-32">
      <div className="flex items-center h-full gap-5 justify-evenly pl-9">
        {/* checkbox? */}
        <div className="">Box</div>

        {/* customer pic + name/email */}
        <div className="flex items-center w-1/6 gap-3 break-words">
          <div>PFP</div>
          <div className="max-w-full text-xl">
            {name} <br />
            {email}
          </div>
        </div>

        {/* subject description */}
        <div className="flex items-center w-1/3 p-3 overflow-auto text-xl border-2 border-dashed border-slate-200 h-4/5">
          {roomId}
        </div>

        {/* status? */}
        <div className="p-2 text-white bg-cyan-400 rounded-2xl">Open</div>

        {/* open chat button */}
        <button
          className="h-10 pl-5 pr-5 text-xl text-white bg-black md:h-16 md:text-2xl"
          roomId={roomId}
          onClick={handleShowChat}
        >
          Live Chat
        </button>
      </div>
    </li>
  );
}
