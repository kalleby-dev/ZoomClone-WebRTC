const socket = io('/');
const myVideo = document.createElement('video');
const videoGrid = document.querySelector('.video-grid');
const midiaConstraints = {
  video: true,
  audio: true,
};

let myUserID;
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

// Receives user stream data inputs
const streaming = () => {
  navigator.mediaDevices.getUserMedia(midiaConstraints)
    .then((myStream) => {
      myVideo.muted = true;
      addVideoStream(myStream, myVideo);
    });
};

const connectToNewUser = (userId) => {
  console.log('New user: ', userId);
};

function start(room) {
  socket.emit('join-room', { room, user: myUserID });

  socket.on('user-connected', (data) => {
    connectToNewUser(data.user);
  });
  streaming();
}
