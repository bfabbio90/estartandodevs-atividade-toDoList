import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Concluidas from "./pages/Concluidas";

const STORAGE_KEY = "guardaTarefas";

export default function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [filtro, setFiltro] = useState("todas"); 

  useEffect(() => {
    const salvas = localStorage.getItem(STORAGE_KEY);
    if (salvas) {
      setTarefas(JSON.parse(salvas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tarefas));
  }, [tarefas]);

 
  function adicionarTarefa(e) {
    e.preventDefault();
    if (novaTarefa.trim() === "") return;

    const nova = {
      id: uuidv4(),
      titulo: novaTarefa.trim(),
      concluida: false,
      criadaEm: new Date().toISOString(),
    };

    setTarefas([nova, ...tarefas]);
    setNovaTarefa("");
  }

  function alternarConcluida(id) {
    const novas = tarefas.map((tarefa) =>
      t.id === id ? { ...tarefa, concluida: !tarefa.concluida } : t
    );
    setTarefas(novas);
  }

  function removerTarefa(id) {
    const novas = tarefas.filter((tarefa) => tarefa.id !== id);
    setTarefas(novas);
  }

  function limparConcluidas() {
    const novas = tarefas.filter((tarefa) => !tarefa.concluida);
    setTarefas(novas);
  }

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    if (filtro === "ativas") return !tarefa.concluida;
    if (filtro === "concluidas") return tarefa.concluida;
    return true;
  });

  return (
  <div></div>
);
}
