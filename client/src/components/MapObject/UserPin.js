import React from 'react';
import './UserPin.css';
import SpeechBubble from "./SpeechBubble";

function UserAvatar({scale}) {
    return (
        // todo: avatar
        <div/>
    )
}

function UserPin({details}) {
    const {chatMessage, iconColor, name} = details;
    return (
        <div className={"user"}>
            {chatMessage && <SpeechBubble color={iconColor}>{chatMessage}</SpeechBubble>}
            <div style={iconColor && {backgroundColor: iconColor}} className={"user-avatar"}>
                <UserAvatar/>
            </div>
            <p className={"user-name"}>{name || "Un-named"}</p>
        </div>
    )
}

export default UserPin