const socket = io('/');
const room = ROOMID;
const myVideo = document.createElement('video');
const videoGrid = document.querySelector('.video-grid');
const midiaConstraints = {
  video: true,
  audio: true,
};

let myUserID;
let myStream;
const myPeer = new Peer(undefined, {
  path: '/peerjs',
  host: '/',
  port: '3030',
});

myPeer.on('open', (id) => {
  myUserID = id;
});

// Creates a new video element and load the data stream
const addVideoStream = (stream, element) => {
  const video = element || document.createElement('video');
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => video.play());
  videoGrid.append(video);
};

const connectToNewUser = (remoteUser, localStream) => {
  const call = myPeer.call(remoteUser, localStream);
  console.log(call);
  const video = document.createElement('video');

  call.on('stream', (remoteStream) => {
    addVideoStream(remoteStream, video);
  });
};

socket.on('user-connected', (data) => {
  connectToNewUser(data.user, myStream);
});

navigator.mediaDevices.getUserMedia(midiaConstraints)
  .then((stream) => {
    myStream = stream;
    myVideo.muted = true;
    addVideoStream(myStream, myVideo);

    socket.emit('join-room', { room, user: myUserID });

    myPeer.on('call', (call) => {
      call.answer(myStream);
      console.log(call);
      const video = document.createElement('video');

      call.on('stream', (remoteStream) => {
        addVideoStream(remoteStream, video);
      });
    });
  });

// Receives user stream data inputs
const streaming = () => {
};

function start() {
  streaming();
}
