import  { useState } from 'react';

const TestPushNotification = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const sendNotification = () => {
    fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      headers: {
        Authorization: "key=AIzaSyB4qJYyBrfkC-JMw1h5g4Tubj0xTlnsevQ", // Thay bằng server key của bạn từ Firebase
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notification: {
          title: title,
          body: body,
        },
        to: "cNH4jGytS4O8QxDjGp8xTb:APA91bFEsepyHTHIIPkL-Gl7hoYqv9yj-BLg7DfKgVUk3_f5TU_aGPXGSOvh8zX4v_5Ovpnp-um9qJX3WM-Mu2kErayEvGrHA09i1pT3M3DwXRDYyuYxGB3yqmLdQOIo2OHwrHpghRsG", // Thay bằng token của thiết bị di động
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h1>Test Push Notification</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button onClick={sendNotification}>Send Notification</button>
    </div>
  );
};

export default TestPushNotification;
