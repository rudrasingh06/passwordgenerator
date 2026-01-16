import { useCallback, useEffect, useState, useRef } from 'react'
import './App.css'

function App() {

  const[password , setpassword] = useState("");
  const[numberAllowed , setnumberAllowed] = useState(false);
  const[charAllowed , setcharAllowed] = useState(false);
  const[length , setlength] = useState(8);

  const passwordRef = useRef(null);
  const passwordgenerator= useCallback(()=>  {
     let pass = ""
     let str= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyxz"
     if(numberAllowed) str+= "0123456789"
     if(charAllowed) str+= "!@#$%^&*()-_=+[]{};:,.<>/?`~"

     for(let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);

     }
     setpassword(pass);

   }, [length, numberAllowed, charAllowed, setpassword]);

   const copyPasswordtoclipBoard = useCallback(() => {
     passwordRef.current?.select()
     passwordRef.current?.setSelectionRange(0, 4)
     window.navigator.clipboard.writeText(password)
    }, [password])

     useEffect(()=> {
      passwordgenerator();

     }, [passwordgenerator, numberAllowed, charAllowed, length]);

  return (
    <div className="main-container">

      <h1 className="heading">Password Generator</h1>

      <div className='Text-container'>
        <input type='text' value= {password} className='text-field' placeholder='password' readOnly ref={passwordRef}></input>
        <button onClick={passwordgenerator}>Generate Password</button>
        <button onClick={copyPasswordtoclipBoard}
          className="">copy</button>

        </div>

        <div className='length-container'>
          <input type = "number" value={length} min="8" max="20" onChange={(e)=> setlength(Number(e.target.value))}/>
          <label htmlFor='length-input'>Password length</label>

        </div>

        <div className='num-container'>
          <input type='checkbox' id= 'number-input' defaultChecked= {numberAllowed} onChange={(e)=> setnumberAllowed((prev) => !prev)}/>
          <label htmlFor='number-input'>Include numbers</label>

        </div>

        <div className='char-container'>
          <input type= "checkbox" id='char-input' defaultChecked= {charAllowed} onChange={(e)=> setcharAllowed((prev) => !prev)}/>
          <label htmlFor='char-input'>Include special characters</label>

        </div>

    </div>
  )
}

export default App;



