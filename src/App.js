import PasswordInput from "./PasswordInput";

function App() {
  return (
    <div className='container max-w-lg flex flex-col gap-4'>
      <div>
        <h1 className='text-lg font-bold'>Manage Security</h1>
        <p className="text-sm text-neutral-400">Protect your data and ensure secure interactions.</p>
      </div>

      <form className="flex flex-col gap-4">
        <PasswordInput label='Current password' placeholder='Enter your current password' />
        <PasswordInput label='New password' placeholder='Enter your new password' />
      </form>
    </div>
  );
}

export default App;
