export function Button({label , onClick}){
    return (

        <button onClick={onClick} type= "button" className="w-11/12 h-10 mx-4 text-white bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-2xl "> {label}</button>
        
    )
}