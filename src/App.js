import 'remixicon/fonts/remixicon.css'
import PasswordInput from "./PasswordInput";
import { TickIcon } from "./TickIcon";
import { Button } from "./Button";
import { useRef, useState } from 'react';

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
  const [currentPassword, setCurrentPassword] = useState('$uPah4ckr');
  const [newPassword, setNewPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const currentPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);
  const repeatedPasswordRef = useRef(null);

  const validationErrors = validationRules.filter(rule => !rule.validate(newPassword));
  const newPasswordIsInvalid = newPassword !== repeatedPassword && repeatedPassword;

  const resetForm = () => {
    setCurrentPassword('');
    setNewPassword('');
    setRepeatedPassword('');
  }

  const onSaveChanges = async (e) => {
    e.preventDefault();
    setErrors([]);
    let errors = [];

    const res = await fetch('https://www.greatfrontend.com/api/projects/challenges/auth/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'user_id': 1234,
        password: currentPassword,
        'new_password': newPassword
      }),
    }).then(data => data.json());

    if (res.error === 'Current password is not correct.') {
      errors.push('Sorry, the password that you have provided is incorrect.');
      currentPasswordRef.current.focusOnError();
    } else if (res.user && newPassword === currentPassword) {
      errors.push('New password is the same as the current password.');
      newPasswordRef.current.focusOnError();
    } else if (validationErrors.length) {
      errors.push(...validationErrors.map(({ label }) => `The new password should contain ${label.toLowerCase()}`));
      newPasswordRef.current.focusOnError();
    }

    if (!errors.length) {
      resetForm();
    } else {
      setErrors(errors);
    }
  }

  return (
    <div className='container max-w-lg flex flex-col gap-4 h-svh justify-center -translate-y-[150px]'>
      <div className='flex flex-col gap-4'>
        <div>
          <h1 className='text-lg font-bold'>Manage Security</h1>
          <p className="text-sm text-neutral-400">Protect your data and ensure secure interactions.</p>
        </div>
        {errors.length > 0 && <ul className='text-red-400 text-sm'>
          {errors.map((err, i) => <li key={i}>{err}</li>)}
        </ul>}
        <form className="flex flex-col gap-4" onSubmit={onSaveChanges}>
          <PasswordInput
            required={true}
            label='Current password'
            placeholder='Enter your current password'
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            ref={currentPasswordRef} />
          <PasswordInput
            required={true}
            label='New password'
            placeholder='Enter your new password'
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setErrors([]);
            }}
            ref={newPasswordRef} />
          <Checklist input={newPassword} validationRules={validationRules} />
          <div>
            <PasswordInput
              required={true}
              label='Confirm new password'
              placeholder='Repeat your new password'
              value={repeatedPassword}
              onChange={(e) => setRepeatedPassword(e.target.value)}
              isValid={newPassword && newPassword === repeatedPassword}
              ref={repeatedPasswordRef} />
            {newPasswordIsInvalid && <p className='text-sm text-red-400'>Not matched with the new password</p>}
          </div>
          <Button disabled={newPasswordIsInvalid}>Save Changes</Button>
        </form>
      </div>
    </div>
  );
}

export default App;
