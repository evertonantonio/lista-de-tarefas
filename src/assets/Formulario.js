function Formulario({botao, eventoTeclado, adicionar, obj, cancelar, remover, alterar}){
    return(
        <form>
            <input type="text" placeholder="Tarefa" className='form-control' onChange={eventoTeclado} name='descricao'value={obj.descricao}/>

            {
                botao
                 ?
                <input type="button" value="Adicionar" className='btn btn-primary' onClick={adicionar}/>
                :
                <div>
                    <input type="button" value="Alterar" className='btn btn-warning' onClick={alterar}/>
                    <input type="button" value="Remover" className='btn btn-danger' onClick={remover}/>
                    <input type="button" value="Cancelar" className='btn btn-secondary' onClick={cancelar}/>
                </div>
             }
           

        </form>
    )
}

export default Formulario;