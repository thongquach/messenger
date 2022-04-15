import Account from './Account';

function AccountsSelection({ setAccountId }) {
  const accounts = [
    { name: 'Thong Quach', email: 'thong.quach@gmail.com' },
    { name: 'Phat Tran', email: 'phat.tran@gmail.com' }
  ];

  return (
    <div>
      <h1>Select an Account</h1>
      {accounts.map(({ name, email }) => (
        <Account name={name} email={email} key={email} onClick={() => setAccountId(email)} />
      ))}
    </div>
  );
}

export default AccountsSelection;
