const logout = async function() {
  const fetchresp = await fetch('/api/user/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (fetchresp.ok) {
    document.location.replace('/');
    alert('You are logged out!')
  } else {
    alert('Could not log out!');
  }
};

document.querySelector('#logout-link').addEventListener('click', logout);
