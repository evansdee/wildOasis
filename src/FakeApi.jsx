import { createContext, useContext, useReducer } from "react";


const AuthContext = createContext()

const init = {
    user:null,
    isAuth:false
}

function reducer(state,action){
    switch(action.type){
        case "login":
            return {...state,user:action.payload,isAuth:true}
        case "logout":
            return {...state,...init}
        default:
            return state
    }
}

const FAKE_USER ={
    name:'Jack',
    email:"evan@jjjg.ocom",
    pass:'qwerty',
    avatar:"../src/asset/img-1.jpg"
}
function AuthProvider({children}){

    const [{user,isAuth},dispatch] = useReducer(reducer,init)
  
    function login({email,pass}){
        if(email === FAKE_USER.email && pass===FAKE_USER.pass) dispatch({type:'login',payload:FAKE_USER})
    }
    
    function logout(){
        dispatch({type:"logout"})
    }
    return <AuthContext.Provider
    value={{user,isAuth,login,logout}}
    >
        {children}
    </AuthContext.Provider>
}


function useAuth(){
    const context = useContext(AuthContext)
    return context
}


export {useAuth,AuthProvider}