const postId = document.querySelector('input[name="post-id"]').value;
console.log("testing");
console.log(postId);

const editFormHandler = async (event) => {
  event.preventDefault();

  const titlePost = document.querySelector('input[name="post-title"]').value;
  const postContent = document.querySelector('textarea[name="post-body"]').value;

  console.log(titlePost);
  console.log(postContent);

  const fetchresp = await fetch(`/api/post/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      titlePost: titlePost,
      postContent,
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  console.log(fetchresp);
  if (fetchresp.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to update your post');
  }
  document.location.replace('/dashboard');
};

const deleteClickHandler = async () => {
  await fetch(`/api/post/${postId}`, {
    method: 'DELETE'
  });

  document.location.replace('/dashboard');
};
// WHY ONE BUTTON IS SUBMIT AND THE OTHER IS CLICK?
document
  .querySelector('#edit-post-form')
  .addEventListener('submit', editFormHandler);
document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteClickHandler);
