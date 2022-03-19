import React, {useState}from "react";

import contatos from '../../assets/contatos.jpg'
import './styles.css';

import api from '../../services/api';

export default function Cadastro() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function cadastroAluno(e){
        e.preventDefault();

        const data = {
            username, 
            email,
            password
        };
        console.log(data)

        try{
            await api.post('/users/register', data);
            alert('Cadastro feito');
            
        }catch(err){
            alert('Erro ao cadastrar'+ err );
        }
    }


    return (
        <div className="logon-container">

            <section className="form">

                <form onSubmit={cadastroAluno}>
                    <h1>Cadastre-se</h1>

                    <input type="text" placeholder="Nome"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />

                    <input type="text" placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input type="text" placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button className="button" type="submit">Entrar</button>

                </form>

            </section>

            <img className="imagem" src={contatos} alt="contatos" />
        </div>
    )
}