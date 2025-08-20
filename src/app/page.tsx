'use client'

import { ChangeEvent, useState } from "react";
import axios from "axios";


export default function Home() {

  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState("");

  const validaForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!usuario) {
      setMsg("Por favor, preencha o campo de Usuário.");
      return;
    } if (!senha) {
      setMsg("Por favor, preencha o campo de senha.");
      return;
    } 
      setMsg("")
  }

    const logar = async () => {
      try {
        const response = await axios.post("http://cloud.geraisinformatica.com:44594/usuarios/login", {
          usuario: usuario,
          senha: senha
        });

        if (response.status === 200) {
          console.log(response.data);
        } else {
          setMsg("Usuário ou senha inválidos.");
        }
      } catch (error) {
        console.log(error);
        setMsg("Ocorreu um erro ao fazer login.");
      }
    }

  return (
    <>
      <form onSubmit={validaForm}>
        <div>
          <h1>Tela De Login</h1>
          <input
            className="InputEmail"
            type="text"
            placeholder="Digite seu Usuário..."
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
          <input
            className="InputSenha"
            type="password"
            placeholder="Digite sua senha..."
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button className="btnEntrada" type="submit" onClick={logar}>Entrar</button>
          {msg && <p>{msg}</p>}
        </div>
      </form>
    </>
  );
}
