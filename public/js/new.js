const newFormHandler = async function(event) {
  event.preventDefault();

  const titlePost = document.querySelector('input[name="post-title"]').value;
  const postInfo = document.querySelector('textarea[name="post-body"]').value;

  console.log(titlePost);
  console.log(postInfo);

  await fetch(`/api/post`, {
    method: 'POST',
    body: JSON.stringify({
      titlePost: titlePost,
      postContent: postInfo,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
};

document
  .querySelector('#newPost')
  .addEventListener('submit', newFormHandler);