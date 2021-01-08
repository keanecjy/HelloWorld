# socket.on(eventToAccept, function receiving params)

## Possible eventsToAccept:

### status

Backend will emit this whenever an invalid input is received

Params to be received: String

### outputUser

Backend will emit this as a reply for inputUser.

Params to be received: [{_id, username, avatar, lat, long}]

Frontend can iterate over the users by using map as it is an array of objects. Example:

```
socket.on("outputUser", users => {
console.log(users.map(user => user.username))
})
```

### outputMessage

Emitted by backend to frontend (all users) as a reply for inputMessage.

Params to be received: [{username, text}]

### outputPosition

Emitted by backend to frontend (all users) as a reply for inputPosition.

Params to be received: [{_id, username, avatar, lat, long}]

### userLeft

Emitted by backend to frontend when someone disconnected.

Params to be received: id

id is the id (String) of the user that left

### outputUpdateUser

Emitted by backend to frontend (all users) when a user's data is changed (e.g. changing username/avatar).

Params to be received: {\_id, username, avatar, lat, lng}.

# socket.emit(eventToEmit, params to be sent)

## Possible eventsToEmit:

### connection

Automatically called when a user is initially connected (Done by socket.io)

### inputUser

Emitted by frontend to backend when the user entered a username and chose an avatar.

Params to be sent: {username, avatar, lat, long}

Example:

```
const newUser = {username: "john", avatar: "male1", lat: "3000", long: "40000"}
socket.emit("inputUser", newUser);
```

### inputMessage

Emitted by frontend to backend when a user sent a message.

Params to be sent: {text}

### inputPosition

Emitted by frontend to backend when a user moves to another location (For example, you might want to emit this event every 5 seconds)

Params to be sent: {lat, long}

### inputUpdateUser

Emitted by frontend to backend when a user updates its data.

Params to be sent: {username, avatar, lat, long}. All optional (no need to include all 4)
