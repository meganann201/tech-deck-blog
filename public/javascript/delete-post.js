async function handleDeletePost(post_id) {
   
    const response = await fetch(`/api/posts/${post_id}`, {
      method: 'DELETE'
    });
  
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
  
  