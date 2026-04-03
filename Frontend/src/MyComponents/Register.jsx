import axios from "axios";
import { useState, useEffect, useRef } from "react";
// import api from '../api/api';

function Register () {
    //const validator = require('validator');
    const nameInput = useRef(null);
    const emailInput = useRef(null);
    const passInput = useRef(null);
    const genderInput = useRef(null);

    const api = axios.create({
        baseURL: 'http://127.0.0.1:8000/api'
    });

    const [errMsg, setErrMsg] = useState('');

    const [isValide, setIsValide] = useState(true);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [gender, setGender] = useState('male');

    const EmailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
    const PassRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const NameRegex = /^[a-zA-Z][\w.\s]{2, 50}$/;

    useEffect(()=>{
        if (NameRegex.test(nameInput.current.value)) {
            setIsValide(true);
            setName(nameInput.current.value);
            setErrMsg('');            
        }
        else {
            setIsValide(false);
            setErrMsg('Please give valide data.');
        }
    }, [name]);

    useEffect(()=>{
        if (EmailRegex.test(emailInput.current.value)) {
            setIsValide(true);
            setEmail(emailInput.current.value);
            setErrMsg('');
        }
        else {setIsValide(false); setIsValide(false); setErrMsg('Please give valide data.');}
    }, [email]);

    useEffect(()=>{
        if (PassRegex.test(passInput.current.value)) {
            setIsValide(true)
            setPass(passInput.current.value);
            setErrMsg('');
        } else {setIsValide(false); setIsValide(false); setErrMsg('Please give valide data.');}
    }, [pass]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('we are inside the handleSubmit function');
        if (!EmailRegex.test(email) || !PassRegex.test(pass) || !NameRegex.test(name) || (gender != 'Male' || gender != 'Female')) {
            setIsValide(false);
            setErrMsg('Please give valide data before submiting.');
            return;
        }
        console.log('the inputs are valide, sending them to backend');
        console.log(api.getUri);
        const data = {name: name, email: email, password: pass, gender: gender};
        const sended_data = JSON.stringify(data);
        console.log(data);
        const request = await api.post('/register', data)
        .then(res => {
            if (res.status == 201){
                console.log('Your account created successfully');
                console.log(res.data);
            }
        }).catch(err => {
            setIsValide(false);
            setErrMsg(err.response.data.message);
        });
    }

    return (
        <>
            <div className="register_container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name:</label><br />
                    <input type="text" name="name" required ref={nameInput} onChange={(e) => { setName(e.target.value) }}/><br /><br />
                    <label htmlFor="email">Email:</label><br />
                    <input type="email" name="email" required ref={emailInput} onChange={(e) => { setEmail(e.target.value) }}/><br /><br /><br />
                    <label htmlFor="password">Password:</label><br />
                    <input type="password" required ref={passInput} name="password" onChange={(e) => { setPass(e.target.value) }}/><br /><br /><br />
                    <label htmlFor="gender">Gender:</label><br />
                    {/* <p>Male: <input type="checkbox" name="gender" value="Male" /></p>
                    <p>Female: <input type="checkbox" name="gender" value="Female" /></p><br /> */}
                    <select name="gender" ref={genderInput} onChange={(e) => { setGender(e.target.value) }} defaultValue="Male">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select><br /><br />
                    <button>Create Account</button>
                    {!isValide && <div><br /><span className="text-red-500">{errMsg}</span></div>}
                </form>
            </div>
        </>
    );
}

export default Register;
