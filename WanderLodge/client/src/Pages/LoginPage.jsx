import { Link ,Navigate} from "react-router-dom";
import { useState,useContext } from "react";
import { UserContext} from "../UserContext";
import axios from "axios";

export default function LoginPage(){
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[redirect,setRedirect] = useState(false);

    const {setUser} = useContext(UserContext);

    async function handleLoginSubmit(ev){
        ev.preventDefault();
        try{
            const {data} = await axios.post('/api/login',{email,password});
            setUser(data);
            alert('Login successful');
            setRedirect(true);
        }
        catch(e){
            alert('Login failed');
        }
    }
    
    if(redirect){
        return <Navigate to={'/'}/>
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
            <h1 className="text-3xl text-center mb-4">Login</h1>
            <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
            <input type="email" 
                   placeholder="your@gmail.com" 
                   value={email} 
                   onChange={ev => setEmail(ev.target.value)}/>
            <input type="password" 
                   placeholder="password" 
                   value={password} 
                   onChange={ev => setPassword(ev.target.value)}/>
            <button className="primary">Login</button>
            <div className="text-center p-2 text-gray-500">
                Don't have an account? <Link to={'/register'} className="underline italic text-black">Register Now</Link>
            </div>
            </form>
            </div>
         </div>
    );
}