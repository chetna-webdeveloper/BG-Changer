import { useCallback, useEffect, useRef, useState } from "react"


function App() {
  let [password, setPassword] = useState("")
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*(){}"

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])


  const passwordRef = useRef(null)
  const copyToClipboard =useCallback(()=>{
passwordRef.current?.select()

    window.navigator.clipboard.writeText(password)
  },[password])


  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center text-center bg-black ">

        <div className="w-2/4 py-5 px-5 justify-center items-center h-auto flex flex-col rounded-2xl bg-gray-400">
          <h1 className="text-3xl my-2">Password Generator</h1>
          <div className="flex w-full bg-white rounded-xl overflow-hidden">
            <input
            className="outline-0 px-2 py-2  flex flex-1 "
              type="text"
              value={password}
              placeholder="password"
              readOnly
              ref={passwordRef}
            />
            <button 
            className="bg-blue-600 px-3 hover:bg-blue-500"
            onClick={copyToClipboard}
            >Copy</button>
          </div>


      <div className="flex w-full my-3 justify-around  ">
            <div className="flex  text-xl">
            <input
              className="text-black"
              type="range"
              min={8}
              max={30}
              onChange={(e) => { setLength(e.target.value) }}
              value={length}
              placeholder="password"
            />
            <label >Length:{length}</label>
            </div>
            <div className="flex  text-xl mx-2">
            <input type="checkbox"
              value={charAllowed}
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
            />
            <label>CharAllowed</label>
</div>
<div className="flex  text-xl m-x">

            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev)
              }}
            />
            <label>NumberAllowed</label>
</div>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
