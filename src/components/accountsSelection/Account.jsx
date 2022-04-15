function Account({ name, email, onClick }) {
  return (
    <button onClick={onClick}>
      <h4>{name}</h4>
      <p>{email}</p>
    </button>
  );
}

export default Account;
