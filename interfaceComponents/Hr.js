export default function Hr(props){
    return(
        <>
        <div className="text-center mt-5 flex justify-center items-center">
            <hr className="w-1/3 border-yellow-400" />
                <h1 className="font-bold text-yellow-500 text-2xl lg:text-4xl p-6">{props.titre}</h1>
            <hr className="w-1/3 border-yellow-400" />
        </div>
        </>
    );
}