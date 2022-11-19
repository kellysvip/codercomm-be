CoderComm
Functional Specification
    CoderComm is a social network that allows people to join by creating accounts. Each
user should provide a name, an email, and a password to create an account. The email
address should not link to any account in the system.
After joining CoderComm, users can update their profile info like Avatar, Company,
JobTitle, Social links, and a short description about themselves.
    Users can write Posts that contain text content and an image. The new posts will be
shown on the user profile page, allowing other users to comment. Users can also react
with like or dislike on a post or a comment.
Users can send friend requests to other users who have an open relationship with them.
Users can accept or decline a friend request. After accepting a friend request, both
become friends, and they can see posts of each other.

### Authentication

- As a user, I can register for a new account with name, email, and password
- As a user, I can sign in with my email and password


### Users

- [] As a user, I can see a list of other users so that I can send, accept, or decline friend requests.
- [] As a user, I can get my current profile info (stay signed in after page refresh)
- [] As a user, I can see the profile of a specific user given a user ID
- [] As a user, I can update my profile info like Avatar, Company, Job Title, Social Links, and short description.

### Posts


- [] As a user, I can see a list of posts.
- [] As a user, I can create a new post with text content and an image.
- [] As a user, I can edit my posts.
- [] As a user, I can delete my posts.

### Comments

- [] As a user, I can see a list of comments on a post.
- [] As a user, I can write comments on a post.
- [] As a user, I can update my comments.
- [] As a user, I can delete my comments.

### Reactions

- [] As a user, I can react like or dislike to a post or a comment.

### Friends

- [] As a user, I can send a friend request to another use who is not my friend.
- [] As a user, I can see a list of friend requests I have received.
- [] As a user, I can see a list of friend requests I have sent.
- [] As a user, I can see a list of my friends.
- [] As a user, I can accept or decline a friend request.
- [] As a user, I can cancel a friend request I sent.
- [] As a user, I can unfriend a user in my friend list.

## Endpoints APIs

### Authentication
```java
/**
* @route POST /auth/login
* @description Log in with email and password
* @body {email, password}
* @access Public
*/ ...
```

## Summary
- Start with functional specification
- List down user stories
- Design endpoint APIs
- Entity Relationship Diagrams
- Code