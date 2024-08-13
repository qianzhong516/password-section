import 'remixicon/fonts/remixicon.css'
import PasswordInput from "./PasswordInput";
import { TickIcon } from "./TickIcon";
import { Button } from "./Button";
import { useState } from 'react';

const validationRules = [
  { label: '8 - 64 characters', validate: (input) => input.length >= 8 && input.length <= 64 },
  { label: 'One uppercase letter', validate: (input) => /[A-Z]/.test(input) },
  { label: 'One lowercase letter', validate: (input) => /[a-z]/.test(input) },
  { label: 'One number', validate: (input) => /[0-9]/.test(input) },
  { label: 'One special character (e.g..! @ # $ % ^ & *)', validate: (input) => /[,.`!@#$%%^&*]/.test(input) },
]

const Checklist = ({ input, validationRules }) => {
  return <ul className='flex flex-col gap-1'>
    {validationRules.map((item, i) =>
      <li key={i} className='flex gap-2 items-center text-sm text-neutral-500'><TickIcon isActive={item.validate(input)} />{item.label}</li>
    )}
  </ul>
}

function App() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const onSaveChanges = (e) => {
    e.preventDefault();
    const errors = validationRules.filter(rule => !rule.validate(newPassword)).map(({ label }) => `The new password must have ${label.toLowerCase()}`);
    setErrors(errors);
  }

  return (
    <div className='container max-w-lg flex flex-col gap-4'>
      <div>
        <h1 className='text-lg font-bold'>Manage Security</h1>
        <p className="text-sm text-neutral-400">Protect your data and ensure secure interactions.</p>
      </div>

      <form className="flex flex-col gap-4">
        <PasswordInput
          label='Current password'
          placeholder='Enter your current password'
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)} />
        <PasswordInput
          label='New password'
          placeholder='Enter your new password'
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setErrors([]);
          }} />
        <Checklist input={newPassword} validationRules={validationRules} />
        {errors.length > 0 && <ul className='text-red-400 text-sm'>
          {errors.map((err, i) => <li key={i}>{err}</li>)}
        </ul>}
        <PasswordInput
          label='Confirm new password'
          placeholder='Repeat your new password'
          value={repeatedPassword}
          onChange={(e) => setRepeatedPassword(e.target.value)}
          isValid={newPassword && newPassword === repeatedPassword} />
        <Button onClick={onSaveChanges} >Save Changes</Button>
      </form>
    </div>
  );
}

export default App;
