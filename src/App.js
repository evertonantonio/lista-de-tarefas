import { useState } from 'react';
import './App.css';
import Formulario from './assets/Formulario';
import Tabela from './assets/Tabela';
import { useEffect } from 'react';

function App() {

  const tarefa = {
    descricao : ''
  }
  
  const [btnCadastrar, setBtnCadastrar] = useState(true);

  const [tarefas, setTarefas] = useState([]);

  const [objTarefa, setObjTarefa] = useState(tarefa)

  useEffect(() =>{
    fetch("http://localhost:8080/listar").then(retorno => retorno.json()).then(retornoConvertido => setTarefas(retornoConvertido));
  }, []);

  const digitar = (e) =>{
    setObjTarefa({...objTarefa, [e.target.name]:e.target.value})
  }

  const adicionar = () => {
    fetch('http://localhost:8080/cadastrar', {
      method: 'post',
      body: JSON.stringify(objTarefa),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retornoConvertido =>{
      if(retornoConvertido.mensagem !== undefined){
        alert(retornoConvertido.mensagem);
      }else{
        setTarefas([...tarefas, retornoConvertido]);
        alert('Tarefa adicionado com sucesso!')
        limparFormulario();
      }
    })
  }

  const alterar = () => {
    fetch('http://localhost:8080/alterar', {
      method: 'put',
      body: JSON.stringify(objTarefa),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retornoConvertido =>{
      if(retornoConvertido.mensagem !== undefined){
        alert(retornoConvertido.mensagem);
      }else{
        alert('Tarefa alterado com sucesso!')

        let vetorTemporario = [... tarefas];
      
        let indice = vetorTemporario.findIndex((t) =>{
          return t.id === objTarefa.id;
        });
  
        vetorTemporario[indice] = objTarefa;
  
        setTarefas(vetorTemporario);

        limparFormulario();
      }
    })
  }

  const remover = () => {
    fetch('http://localhost:8080/remover/'+ objTarefa.id, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(retorno => retorno.json())
    .then(retornoConvertido =>{

      alert(retornoConvertido.mensagem);

      let vetorTemporario = [... tarefas];

      let indice = vetorTemporario.findIndex((t) =>{
        return t.id === objTarefa.id;
      });

      vetorTemporario.splice(indice, 1);

      setTarefas(vetorTemporario);

      limparFormulario();
    })
  }

  const limparFormulario = () =>{
    setObjTarefa(tarefa);
    setBtnCadastrar(true);

  }

  const selecionarTarefa = (indice) =>{
    setObjTarefa(tarefas[indice]);
    setBtnCadastrar(false);
  }

  return (
    <div >
      <Formulario botao={btnCadastrar} eventoTeclado={digitar} adicionar={adicionar} obj={objTarefa} cancelar={limparFormulario} remover={remover} alterar={alterar}/>
      <Tabela vetor={tarefas} selecionar={selecionarTarefa}/>
    </div>
  );
}

export default App;
