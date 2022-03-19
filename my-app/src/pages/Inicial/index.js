import React, { useState, useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

import './styles.css';

export default function Inicial() {
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");
    const [contatos, setContatos] = useState([]);

    var { id } = useParams();
    const navigate = useNavigate();

    function Logout() {

        navigate("/");
    }

    async function cadastrarContato(e) {
        e.preventDefault();
        try {
            const token = await JSON.parse(localStorage.getItem('TOKEN'));
            console.log(token)
            await api.post('/contato', { nome, telefone },
                {
                    headers: {
                        "Auth-Token": token
                    }
                });

            setContatos(contatos.filter(contato => contato.id !== id));
            alert("Contato cadastrado")
            

        } catch (err) {
            alert('erro ao cadastrar contato');
            alert(err);
            console.log(err);
        }

    }

    const token = JSON.parse(localStorage.getItem('TOKEN'));
    useEffect(() => {
                 
        api.get('/contato',{headers: {"Auth-Token": token}}).then(res => { 
             setContatos( res.data.contatos);    
        }).catch(err => console.log(err)) 
      }, [token]);                          
         console.log(contatos)


    async function excluirUser(id){
          
            try {
                const token = await JSON.parse(localStorage.getItem('TOKEN'));
                console.log(token)
                await api.delete(`/contato/${id}`,{headers: {"Auth-Token": token}
                    });
                setContatos(contatos.filter(contato => contato.id !== id));
                alert("Contato Excluido")
    
            } catch (err) {
                alert('erro ao excluir contato');
                alert(err);
                console.log(err);
            }
        }

    
        function editUser(data){
            localStorage.setItem('userNome',data.nome);
            localStorage.setItem('userTelefone',data.telefone);
            localStorage.setItem('userId',data.id )
            navigate(`/contato/${data.id}`);
            
    
          }
    

    return (

        <div className="container">

        <button className="logout" onClick={() => Logout()}>Sair</button>
            <section className="formulario">
                <form onSubmit={cadastrarContato} >
                    <h4 className="titulo"> Cadastre um novo contato</h4>

                    <input className="inputCodigo" type="text" placeholder="Nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />

                    <input className="inputCodigo" type="text" placeholder="Numero"
                        value={telefone}
                        onChange={e => setTelefone(e.target.value)}
                    />
                    <button className="buttonCodigo" type="submit">Cadastrar </button>
                </form>

            </section>

        

            <ul>
                {contatos.map(i => (
                    <li key={i.id}>

                            <strong>Nome: </strong>
                            <p>{i.nome}</p> 
                            <strong>Telefone:</strong>
                            <p>{i.telefone}</p>
                           
                            <button
                             onClick={() => excluirUser(i.id)} type="button">X
                            </button>

                            <button className="editar"
                            onClick={() => editUser(i)} type="submit"  value="Atualizar" >Editar
                            </button>
                          
                          
                        </li>
                        ))}

                </ul>
              
        
           
        </div>


    )
}