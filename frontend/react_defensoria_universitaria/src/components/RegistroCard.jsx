export function RegistroCard({registro}){
    return(

        
        
            <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                    <a>{registro.id}</a> {/* ID */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                     {registro.nombre} {/* Nombre */}
                </td>
            </tr>
            
       
    );
}