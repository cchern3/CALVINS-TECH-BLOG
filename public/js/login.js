const loginFormHandler = async function(event) {
  event.preventDefault();

  const username1 = document.querySelector('#usernameInput');
  const password1 = document.querySelector('#passwordInput');

  const fetchresp = await fetch('/api/user/login', {
    method: 'POST',
    body: JSON.stringify({
      username: username1.value,
      password: password1.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (fetchresp.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to login');
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
