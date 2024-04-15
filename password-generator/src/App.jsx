import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8); // State for password length
  const [numAllowed, setNumAllowed] = useState(false); // State for allowing numbers in password
  const [specialAllowed, setSpecialAllowed] = useState(false); // State for allowing special characters in password
  const [uppercase, setUpperCase] = useState(false); // State for allowing uppercase letters in password
  const [lowercase, setLowerCase] = useState(false); // State for allowing lowercase letters in password
  const [password, setPassword] = useState(""); // State for generated password

  const pwdRef = useRef(null); // Reference to password input field

  // Function to copy password to clipboard
  const copyPwdToClipboard = useCallback(() => {
    pwdRef.current?.select();
    pwdRef.current?.setSelectionRange(0, 25);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  // Function to generate password
  const passGenerator = useCallback(() => {
    const uppercaseData = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseData = "abcdefghijklmnopqrstuvwxyz";
    const numbersData = "0123456789";
    const specialData = '!@#$%^&*()_+:"<>?|[]';

    let pwd = "";
    let pwdData = "";

    uppercase ? (pwdData += uppercaseData) : "";
    lowercase ? (pwdData += lowercaseData) : "";
    numAllowed ? (pwdData += numbersData) : "";
    specialAllowed ? (pwdData += specialData) : "";

    for (let i = 0; i < length; i++) {
      pwd += pwdData.charAt(Math.floor(Math.random() * pwdData.length + 1));
    }

    setPassword(pwd);
  }, [length, numAllowed, specialAllowed, setPassword, uppercase, lowercase]);

  // Generate password when component mounts or when relevant state changes
  useEffect(() => {
    passGenerator();
  }, [length, numAllowed, specialAllowed, uppercase, lowercase]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-10 my-10 text-slate-200 bg-slate-700 text-xl  border border-slate-400">
        <h1 className="text-slate-200 text-center text-2xl font-bold py-4">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden text-slate-400 font-semibold">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={pwdRef}
          />
          <button className="outline-none bg-blue-500 text-white px-3 py-1 hover:bg-blue-600 active:bg-blue-800 " onClick={copyPwdToClipboard}>
            COPY
          </button>
        </div>
        <div className="flex-col items-center text-sm gap-x-2 py-4">
          <div className="flex items-center justify-center gap-x-1 mb-4">
            <input
              type="range"
              min={6}
              max={25}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="length">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numInput"
              className="cursor-pointer"
              onChange={() => setNumAllowed((prev) => !prev)}
            />
            <label htmlFor="numInput" className="cursor-pointer">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={specialAllowed}
              id="specialInput"
              className="cursor-pointer"
              onChange={() => setSpecialAllowed((prev) => !prev)}
            />
            <label htmlFor="specialInput" className="cursor-pointer">Special</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={uppercase}
              id="UpperCaseInput"
              className="cursor-pointer"
              onChange={() => setUpperCase((prev) => !prev)}
            />
            <label htmlFor="UpperCaseInput" className="cursor-pointer">Uppercase</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={lowercase}
              id="LowerCaseInput"
              className="cursor-pointer"
              onChange={() => setLowerCase((prev) => !prev)}
            />
            <label htmlFor="LowerCaseInput" className="cursor-pointer">Lowercase</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
