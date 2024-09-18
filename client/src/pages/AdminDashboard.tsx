import React from 'react';
import { useEffect, useState } from 'react';
import config from '../config.js';

const AdminDashboard: React.FC = () => {
    const [code, setCode] = useState<string>("");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [remember, setRemember] = useState<boolean>(false);
    //@ts-ignore
    const SERVER:string = config[process.env.NODE_ENV]["SERVER"]; 

    useEffect(() => {
        if (localStorage.getItem('admin')) {
            setIsLoggedIn(true);
        }
    }
    , []);

    const checkCode = async (code: string) => {
        try {
            const res = await fetch(`${SERVER}/admin/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({code: code})
            });
            const data = await res.json();
            if (data.success) {
                if (remember) {
                    localStorage.setItem('admin', 'true');
                }
                setIsLoggedIn(true);
            } else {
                alert('Invalid code');
            }
        } catch (err) {
            console.log("Error: ", err);
        }
    }

    return (
        <div className="w-full flex justify-center items-center flex-col relative min-h-screen">
            {isLoggedIn ? (
                <div>Welcome</div>
            ) :
            (
                <form className='flex flex-col gap-5 justify-center items-center' onSubmit={(e) => { e.preventDefault(); checkCode(code); }}>
                    <div className='flex flex-col gap-5 justify-center items-start'>
                        <input type="text" value={code} onChange={(e) => setCode(e.target.value)} className='outline-zinc-900 border-2 border-black p-2'/>
                        <div className='flex gap-2 items-center justify-center'>
                            <input type="checkbox" id="rememberCode" name="rememberCode" onChange={(e) => setRemember(e.target.checked)} checked={remember}></input>
                            <label htmlFor="rememberCode">
                                Remember me
                            </label>
                        </div>
                    </div>
                    <button type="submit" className={`text-white p-2 rounded-md transition duration-300  ${!code ? 'bg-zinc-500 cursor-not-allowed' : 'bg-zinc-900 hover:bg-zinc-700'}`} disabled={!code}>Submit</button>
                </form>
            )}
        </div>
    )
}

export default AdminDashboard;