import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDwoWhL712Al1E0HxAeh5MfKbYw9Di6bLU",
  authDomain: "booking-ui-5d327.firebaseapp.com",
  projectId: "booking-ui-5d327",
  storageBucket: "booking-ui-5d327.firebasestorage.app",
  messagingSenderId: "231411971105",
  appId: "1:231411971105:web:df18be9fe03fdc0a6b1f60",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const ticketbtn = document.querySelector("#submitTicket");
const nextbtn = document.querySelector("#next");
const cancel = document.querySelector("#cancel");
const back = document.querySelector("#back");
const book = document.querySelector("#book");
const download = document.querySelector(".tickets");
const downloadBtn = document.querySelector(".ticket");
if (download) {
  download.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Kindly Check Your Email For A Copy Of Your Ticket");
  });
}
if (downloadBtn) {
  downloadBtn.addEventListener("click", () => {
    alert("Kindly Check Your Email For A Copy Of Your Ticket");
  });
}
if (book) {
  book.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}
if (cancel) {
  cancel.addEventListener("click", () => {
    window.location.reload();
  });
}
if (back) {
  back.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

if (nextbtn) {
  nextbtn.addEventListener("click", async () => {
    const number = document.querySelector("#ticketno").value;

    const data = {
      number,
    };

    try {
      const docRef = await addDoc(collection(db, "number of ticket"), data);
      localStorage.setItem("ticketno", number);
      window.location.href = "attendee.html";
    } catch (err) {
      console.log("Cannot validate ticket number");
      alert("Select a Number of ticket");
    }
  });
}

if (ticketbtn) {
  ticketbtn.addEventListener("click", async () => {
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const message = document.querySelector("#message").value;
    const imgInput = document.getElementById("file");

    if (!name || !email || !message || !imgInput.files[0]) {
      alert("Please fill in all fields");
      return;
    }

    const data = { name, email, message };

    try {
      const docRef = await addDoc(collection(db, "User Info"), data);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("message", message);

      const file = imgInput.files[0];
      const reader = new FileReader();
      reader.onload = function () {
        const base64Image = reader.result;
        localStorage.setItem("ticketImage", base64Image);
        alert("Ticket Booked Successfully");
        window.location.href = "book.html";
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.log("Could Not Book Ticket", err);
      alert("Could Not Create Ticket");
    }
  });
}

if (window.location.pathname.includes("book.html")) {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const message = localStorage.getItem("message");
  const number = localStorage.getItem("ticketno");
  const image = localStorage.getItem("ticketImage");

  if (name) {
    document.getElementById("noname").textContent = name;
  }
  if (email) {
    document.getElementById("nomail").textContent = email;
  }
  if (message) {
    document.getElementById("nomsg").textContent = message;
  }
  if (number) {
    document.getElementById("noticketno").textContent = number;
  }
  if (image) {
    const imgElement = document.getElementById("userImg");
    imgElement.src = image;
    imgElement.style.display = "block";
  }
}
