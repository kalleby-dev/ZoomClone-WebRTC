let roomID;
const myVideo = document.createElement('video');
const videoGrid = document.querySelector('.video-grid');

const midiaConstraints = {
  video: true,
  audio: true,
};

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

function start(room) {
  roomID = room;
  console.log(roomID);
  streaming();
}
