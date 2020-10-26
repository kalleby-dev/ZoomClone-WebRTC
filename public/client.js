const socket = io('/');
const myVideo = document.createElement('video');
const videoGrid = document.querySelector('.video-grid');

const midiaConstraints = {
  video: true,
  audio: true,
};

// Only for tests
socket.on('response', () => {
  console.log('Respondido');
});
// -------------

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

const connectToNewUser = () => {
  console.log('New connection');
};

function start(room) {
  const id = room;
  socket.emit('join-room', { id });

  socket.on('user-connected', () => {
    connectToNewUser();
  });
  streaming();
}
