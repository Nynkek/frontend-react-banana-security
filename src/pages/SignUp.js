import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from "axios";

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/register', {
                email: email,
                password: password,
                username: username,
            })
            console.log(username,email,password);
            history.push("/signin");
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <h1>Registreren</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque
                eligendi
                harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
                deserunt
                doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email
                    <input type="email" id="email" value={email} name="email"
                           onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label htmlFor="username">Username
                    <input type="text" id="username" value={username} name="username"
                           onChange={(e) => setUsername(e.target.value)}/>
                </label>
                <label htmlFor="password">Password
                    <input type="password" id="password" value={password} name="password"
                           onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <button type="submit">Registreren</button>
            </form>
            <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
        </>
    );
}

export default SignUp;