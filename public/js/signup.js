const signupFormHandler = async function(event) {
  event.preventDefault();

  const username = document.querySelector('#usernameSignup').value.trim();
  const password = document.querySelector('#passwordSignup').value.trim();
  console.log(username);
  console.log(password);
  const fetchresp = await fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify({
      username, password
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (fetchresp.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Could not sign up!');
  }
};

document
  .querySelector('.thesignup')
  .addEventListener('submit', signupFormHandler);
