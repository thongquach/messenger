function Conversations({ accountId, setAccountId }) {
  return (
    <div>
      <button onClick={() => setAccountId(null)}>Back</button>
      <p>{accountId}</p>
    </div>
  );
}

export default Conversations;
