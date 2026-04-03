import api from '../axios/api'
import { useState, useRef } from 'react'

function MyComponent(){
    const [msg, setMsg] = useState('there is no msg!');
    async function getMessage () {
        const message = await api.get('/test')
        setMsg(message.data)
    }

    return (<>
        <p>The message getted from the backend is: {msg}</p><br />
        <button onClick={getMessage}>Test Backend</button>
    </>)
}

export default MyComponent;