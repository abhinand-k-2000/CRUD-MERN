import React, {useState, createContext, useContext, lazy, Suspense, useReducer} from "react"
 
const LanguageContext = React.createContext({
    language: 'en',
    setLanguage: () => {}
})


const App = () => {

    const [language, setLanguage] = useState('en')


    return(
        <>
        <Component setLanguage={setLanguage}/>
        </>
    )
}


const Component = () => {
    return(
        <button onClick={() => setLanguage('jp')}>change</button>
    )
}



const LazyComponent = React.lazy(()=> import("./AdminHeader"))

// const App = () => {
//     return(
//         <>
//         <Suspense fallback={<div>loading</div>}>
//         <LazyComponent/>
//         </Suspense>
//         </>
//     )
// }


const valueReducer = (state, action) => {
    
    if(action === 'increment'){
        return state + 1;
    }else {
        return state - 1;
    }
}


const Usage = () => {

    const [value, dispatch] = useReducer(valueReducer, 0)

    return (
        <>
        <button onClick={()=> dispatch("increment")}>add</button>
        <button onClick={()=> dispatch("decrement")}>minus</button>
        </>
    )
}