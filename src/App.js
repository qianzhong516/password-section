import PasswordInput from "./PasswordInput";
import { useState } from 'react';

const Checklist = ({ input, validationRules }) => {
  return <ul className=''>
    {validationRules.map((item, i) =>
      <li key={i}>{item.validate(input) ? 'Y ' : 'N '}{item.label}</li>
    )}
  </ul>
}

const validationRules = [
  { label: '8 - 64 characters', validate: (input) => input.length >= 8 && input.length <= 64 },
  { label: 'One uppercase letter', validate: (input) => /[A-Z]/.test(input) },
  { label: 'One lowercase letter', validate: (input) => /[a-z]/.test(input) },
  { label: 'One number', validate: (input) => /[0-9]/.test(input) },
  { label: 'One special character (e.g..! @ # $ % ^ & *)', validate: (input) => /[,.`!@#$%%^&*]/.test(input) },
]

function App() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const onSaveChanges = (e) => {
    e.preventDefault();
    const errors = validationRules.filter(rule => !rule.validate(newPassword)).map(({ label }) => `The new password has to have ${label.toLowerCase()}`);
    setErrors(errors);
  }

  return (
    <div className='container max-w-lg flex flex-col gap-4'>
      <div>
        <h1 className='text-lg font-bold'>Manage Security</h1>
        <p className="text-sm text-neutral-400">Protect your data and ensure secure interactions.</p>
      </div>

      <form className="flex flex-col gap-4">
        <PasswordInput label='Current password' placeholder='Enter your current password' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        <PasswordInput label='New password' placeholder='Enter your new password' value={newPassword} onChange={(e) => {
          setNewPassword(e.target.value);
          setErrors([]);
        }} />
        <Checklist input={newPassword} validationRules={validationRules} />
        <ul className='text-red-400'>
          {errors.map((err, i) => <li key={i}>{err}</li>)}
        </ul>
        <input type="button" value="Save Changes" onClick={onSaveChanges} />
      </form>
    </div>
  );
}

export default App;
