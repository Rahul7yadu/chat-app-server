import React, { useState } from 'react';

const AudioRecorder: React.FC = () => {
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [recording, setRecording] = useState(false);
const [audioUrl,setAudioUrl] = useState("")
  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            setAudioChunks((prevChunks) => [...prevChunks, event.data]);
          }
        };
        
        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioUrl(audioUrl)
          // Now you can send the audioBlob to your server using fetch or any other method
          sendAudioToServer(audioBlob);
          
          setAudioChunks([]);
        };
        
        mediaRecorder.start();
        setRecording(true);
        
        setTimeout(() => {
          mediaRecorder.stop();
          setRecording(false);
        }, 4000); // Stop recording after 5 seconds (adjust as needed)
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });
  };

  const sendAudioToServer = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob);

    try {
      const response = await fetch('http://localhost:8000/upload/audio',  {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Audio uploaded successfully');
      } else {
        console.error('Failed to upload audio');
      }
    } catch (error) {
      console.error('Error uploading audio:', error);
    }
  };

  return (
    <div>
      <button onClick={startRecording} disabled={recording}>
        {recording ? 'Recording...' : 'Start Recording'}
      </button>
      {audioUrl&&<audio src={audioUrl}></audio>}
    </div>
  );
};

export default AudioRecorder;
