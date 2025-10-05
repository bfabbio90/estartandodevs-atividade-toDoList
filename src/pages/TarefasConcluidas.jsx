
export default function Concluidas({ tarefas, alternarConcluida, removerTarefa }) {
  const concluidas = tarefas.filter((tarefa) => tarefa.concluida);

  return (
    <div>
      <h2>Tarefas Concluídas ✅</h2>

      {concluidas.length === 0 ? (
        <p>Nenhuma tarefa concluída ainda.</p>
      ) : (
        <ul></ul>
      )}
    </div>
  );
}
