const postId = document.querySelector('input[name="post-id"]').value;

console.log("testing");
console.log(postId);

const commentFormHandler = async (event) => {
  event.preventDefault();

  const commentInfo = document.querySelector('textarea[name="comment-body"]').value;
  console.log(commentInfo);

  if(commentInfo) {
    const fetchresp = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({
        postId,
        commentInfo: commentInfo
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (fetchresp.ok) {
      document.location.reload();
    } else {
      alert(fetchresp.statusText);
    }
  };
}

document
  .querySelector('#newComment')
  .addEventListener('submit', commentFormHandler);
