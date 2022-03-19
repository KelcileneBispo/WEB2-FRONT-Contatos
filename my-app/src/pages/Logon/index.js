import React, {useState, useEffect} from "react";
import {useNavigate, Link} from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import contatos from '../../assets/contatos.jpg'
import '../Logon/styles.css';

import {useAuth} from  '../../contexts/auth';
import api from '../../services/api';

export default function Logon() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const {login, signed} = useAuth();

    
    const navigate = useNavigate();

    
    useEffect(() => {
        setEmail("");
        setPassword("");
      }, []);
    
      function autenticar(e) {
        e.preventDefault();
        login(email, password).then(navigate("/inicial")).catch(error => (alert('ERRO','Email ou senha invalida')));
        
      }
        
       
      
     // useEffect(() => {
     //   if(signed)
      //      navigate("/inicial")
     // }, [navigate, signed]);
     
    async function validar(e) {
        e.preventDefault();
        console.log(token)
        try{
            await api.post('/users/verificarUser', {token});
            alert('usuario verificado... faça seu login');
            
        }catch(err){
            alert('Erro ao verificar conta '+ err );
        }
    }
    

    return (
        <div className="logon-container">

            <section className="form">

                <form onSubmit={autenticar}>
                    <h1>Faça seu Login</h1>

                    <input type="text" placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input type="text" placeholder="senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button className="button" type="submit">Entrar</button>
                 

                </form>

                <form onSubmit={validar}>
                   <h4> Seu cadastro acabou de ser feito ... insira o seu codigo aqui </h4>

                   <input className="inputCodigo" type="text" placeholder="Codigo"
                        value={token}
                        onChange={e => setToken(e.target.value)}
                    />
                    <button className="buttonCodigo" type="submit">Validar Conta</button>
                </form>

                <Link className="back-link" to="/cadastro">
                        <FiLogIn size={16} color="#469536" />
                        Cadastre-se
                </Link>

            </section>

            <img className="imagem" src={contatos} alt="contatos" />
        </div>
    )
}