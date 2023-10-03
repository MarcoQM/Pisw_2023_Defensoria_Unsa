export function RegistroCard({registro}){
    return(
        <div>
            <h1>{registro.nombre}    /   {registro.rol}</h1>
            <hr />
        </div>
    );
}