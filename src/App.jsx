import { useState,useCallback ,useEffect,useRef} from 'react'

function App() {
  
const[length,setLength] =useState(8)
const[numberAllow,setNumberAllow] =useState(false)
const[charAllow,setCharAllow] = useState(false)
const[password, setPassword] =useState("")

//use ref hook
const passwordRef = useRef(null)

const passwordGenrater = useCallback(() =>{
  let pass ="" 
  let str= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

   if(numberAllow) str  += '0123456789'
   if(charAllow) str += '@#$%^&*'
    for( let i =1; i<=length;i++){
let char = Math.floor(Math.random() * str.length)
 pass += str.charAt(char)
    }

    setPassword(pass)
  
  }
, [length,numberAllow,charAllow,setPassword])

const copyPasswordToClipboard = useCallback(() =>{
  passwordRef.current?.select();
  passwordRef.current?.setSelectionRange(0, 100);
  window.navigator.clipboard.writeText(password)
},
[password])

useEffect(() =>{
  passwordGenrater()
},[length,numberAllow,charAllow ,passwordGenrater])
  return (
    <>

   <div className="w-full max-w-md shadow-md rounded-lg
   px-2 my-10  text-orange-500 bg-gray-700">
<h1 className='text-white text-center my-3'>password generator</h1>

  <div clasName ="flex shadow rounded-lg overflow-hidden mb-2">
<input
type="text"
value={password}
className="outline-none min-w-max mb-2 px-10"
placeholder='password'
readOnly
ref={passwordRef}
/>
<button
onClick={copyPasswordToClipboard}
className='outline-none bg-blue-700 text-white 
px-2 py-0.5 shrink-0'
>copy</button>
  </div>
  
<div className ='flex text-sm gap-x-2'>
<div className='flex items-center gap-x-1'>
<input
type ="range"
min={6}
max={100}
value={length}
className='cursor-pointer'
onChange={(e) => {setLength(parseInt(e.target.value))}}
/>
<label>Length:{length}</label>
</div>
<div className='flex items-center gap-x-1 py-4'>
<input
type ="checkbox"
defaultChecked={numberAllow}
id='numberInput'
onChange={()=>{
setNumberAllow((prev) => !prev);

}}

/>
<label htmlFor='numberInput'>Numbers</label>
</div>

<div className='flex items-center gap-x-1 py-4'>
<input
type ="checkbox"
defaultChecked={charAllow}
id='characterInput'
onChange={()=>{
setCharAllow((prev) => !prev);

}}

/>
<label htmlFor='characterInput'>Characters</label>
</div>
   </div>
</div>
    </>
  )
}

export default App
