
  function toggleComments(blogId) {
    // Hide all other comment sections
    document.querySelectorAll('.comments-section').forEach(section => {
      section.style.display = 'none';
    });

    // Show the clicked blog's comment section
    const commentsSection = document.getElementById('comments-' + blogId);
    commentsSection.style.display = 'block';
  }

  function likeComment(commentId) {
    alert("You liked comment with ID: " + commentId);
    // Here you can add AJAX or other logic to handle the like action
  }

  function dislikeComment(commentId) {
    alert("You disliked comment with ID: " + commentId);
    // Here you can add AJAX or other logic to handle the dislike action
  }

