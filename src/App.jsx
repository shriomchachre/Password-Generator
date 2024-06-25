import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(6)
  const [num, setNum] = useState(false)
  const [chr, setchr] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGen = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcefghijklmnopqrstuvwxyz"

    if(num)  str += "0123467895"
    if(chr)  str += "!@#$%^&*~`:/*-+?"

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str[char] 
    }
 
    setPassword(pass)
  }, [length, num, chr, setPassword])
  
  const copyPasswordToClip = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 9);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGen()
  }, [length, num, chr, passwordGen])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md 
      rounded-lg px-3 py-3 my-8  bg-gray-800 text-orange-500">
        <h1 className='text-white text-center my-3'> Password Generator</h1>

        <div className="flex shadow rounded-lg 
          overflow-hidden mb-4">
          <input 
          type="text" 
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='password'
          readOnly
          ref={passwordRef}
          />
          <button 
            onClick={copyPasswordToClip}
            className='outline-none bg-blue-700
           text-white px-3 py-0.5'
           >Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={35}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
              type="checkbox"
              defaultChecked={num}
              id="numberInput"
              onChange={() => {
                setNum((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
              type="checkbox"
              defaultChecked={chr}
              id="charInput"
              onChange={() => {
                setchr((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
