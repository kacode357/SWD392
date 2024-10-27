// firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// Cấu hình Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyBaE8gzfn-c4t8166E1KiTl6FVlkxDP71A",
  authDomain: "t-shirt-football-shop.firebaseapp.com",
  projectId: "t-shirt-football-shop",
  storageBucket: "t-shirt-football-shop.appspot.com",
  messagingSenderId: "288638129865",
  appId: "1:288638129865:web:ae540393c999169e299f18"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Yêu cầu người dùng cấp quyền và lấy token
export const requestForToken = () => {
  return getToken(messaging, { vapidKey: "BHQKOvJzlt8nEVq1-z3msmScBzOQk4g-JoPe1uqV388GCUQ7LAIEHknnBOqx8NqUADSWZQnyRJ2d_GA2K8Qly6I" })
    .then((currentToken) => {
      if (currentToken) {
        console.log("Current token for client: ", currentToken);
        // Bạn có thể lưu token này hoặc gửi lên server
      } else {
        console.log("No registration token available.");
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
};

export default app;
