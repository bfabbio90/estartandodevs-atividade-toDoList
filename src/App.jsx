import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Concluidas from "./pages/TarefasConcluidas";
import "./App.css";

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
      tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
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
    <Router>
      <div className="app-container">
        <h1>📋 To-Do List</h1>

        <nav className="nav-links">
          <Link to="/">Todas</Link>
          <Link to="/concluidas">Concluídas</Link>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <form onSubmit={adicionarTarefa} className="form-tarefa">
                  <input
                    type="text"
                    placeholder="Digite uma tarefa"
                    value={novaTarefa}
                    onChange={(e) => setNovaTarefa(e.target.value)}
                  />
                  <button type="submit">Adicionar</button>
                </form>

                <div className="filtros">
                  <button onClick={() => setFiltro("todas")}>Todas</button>
                  <button onClick={() => setFiltro("ativas")}>Ativas</button>
                  <button onClick={() => setFiltro("concluidas")}>Concluídas</button>
                  <button onClick={limparConcluidas}>Limpar concluídas</button>
                </div>

                <ul className="lista-tarefas">
                  {tarefasFiltradas.length === 0 && <p>Nenhuma tarefa</p>}

                  {tarefasFiltradas.map((tarefa) => (
                    <li key={tarefa.id} className="tarefa-item">
                      <div>
                        <input
                          type="checkbox"
                          checked={tarefa.concluida}
                          onChange={() => alternarConcluida(tarefa.id)}
                        />
                        <span
                          className={
                            tarefa.concluida ? "tarefa-concluida" : "tarefa-ativa"
                          }
                        >
                          {tarefa.titulo}
                        </span>
                      </div>
                      <button onClick={() => removerTarefa(tarefa.id)}>Remover</button>
                    </li>
                  ))}
                </ul>
              </>
            }
          />

          <Route
            path="/concluidas"
            element={
              <Concluidas
                tarefas={tarefas}
                alternarConcluida={alternarConcluida}
                removerTarefa={removerTarefa}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
