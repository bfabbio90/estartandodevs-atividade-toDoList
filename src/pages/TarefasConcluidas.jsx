
export default function Concluidas({ tarefas, alternarConcluida, removerTarefa }) {
  const concluidas = tarefas.filter((t) => t.concluida);

  return (
    <div className="pagina-concluidas">
      <h2>Tarefas Concluídas </h2>

      {concluidas.length === 0 ? (
        <p>Nenhuma tarefa concluída ainda.</p>
      ) : (
        <ul className="lista-concluidas">
          {concluidas.map((tarefa) => (
            <li key={tarefa.id} className="item-concluido">
              <span className="texto-concluido">{tarefa.titulo}</span>
              <div className="acoes">
                <button onClick={() => alternarConcluida(tarefa.id)}>Reabrir</button>
                <button onClick={() => removerTarefa(tarefa.id)}>Remover</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
