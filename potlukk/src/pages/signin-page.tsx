



export function SignIn(){


    return <>
        <div style={{display:"flex", width:"100%", height:"100vh", backgroundColor:"wheat", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
            <div>
                <h1>Sign In</h1>
                <hr />
            </div>
            <div>
                <label htmlFor="userName" style={{display:"block"}}>Username</label>
                <input id="userName" type="text" />
            </div>
            <div>
                <label htmlFor="password" style={{display:"block"}}>Password</label>
                <input id="password" type="password" />
            </div>    
            <div>
                <button>Sign In</button>
            </div>
            <div>
                <hr />
                <label htmlFor="signUp" style={{display:"block"}}>New User</label>
                <button id="signUp">Sign Up</button>
            </div>
        </div>
    </>
}
//onChange={e=>dispatchForm({type:"UPDATE_USER_NAME", payload:e.target.value})}