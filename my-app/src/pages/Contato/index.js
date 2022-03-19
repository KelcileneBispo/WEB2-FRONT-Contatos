import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import api from '../../services/api';


import './styles.css';

export default function Contato(){
    
    const userNome = localStorage.getItem('userNome');
    const userTelefone = localStorage.getItem('userTelefone');
    const userId = localStorage.getItem('userId')
   
   
    const [nome, setNome] = useState(userNome);
    const [telefone, setTelefone] = useState(userTelefone);
    const [id, setId] = useState(userId)

    const navigate = useNavigate();

  async function atualizarContato(e){
    e.preventDefault();        
        try{
            console.log(nome, telefone)
           const token = await JSON.parse(localStorage.getItem('TOKEN'));
           await api.patch( `contato/${id}`, {nome, telefone}, {headers: {"Auth-Token": token}});

           alert('Editado com sucesso.');
           localStorage.clear();
           navigate('/inicial');

        }catch(err){
            alert('erro ao salvar, tente novamente');
            console.log(err)
        }


    }


    

    return (
        <div className="containerEdit">
           

            <ul>
                    <form onSubmit={atualizarContato}>
                    <li>

                    <strong>Nome:</strong>
                    <input type="text" value={nome}
                    onChange={e => setNome(e.target.value)}  />

                    <strong>Numero:</strong>
                    <input type="text" value={telefone} 
                    onChange={e => setTelefone(e.target.value)} />

                    <button className="button" type="submit">Atualizar</button>
                    </li>

                     </form>


            </ul>
            
        </div>
    )
}