function Account({ name, id, onClick }) {
  return (
    <button onClick={onClick}>
      <h4>{name}</h4>
      <p>{id}</p>
    </button>
  );
}

export default Account;
