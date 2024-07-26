# ShareSphere

Welcome to ShareSphere, a dynamic and interactive platform designed for seamless media sharing and social networking. With ShareSphere, you can create and share posts that include images, titles, and content, making it easy to express yourself and share your moments with the world. Our app allows you to like posts, follow other users, and leave comments to engage with the community. Connect more deeply with private conversations and explore user profiles to discover more about your fellow ShareSphere members. Join ShareSphere today and be part of a vibrant and connected community. \
![Am I responsive overview](readme-assets/am-i-responsive.png)

[Link to live site](https://sharesphere-web-9f70d26dc82a.herokuapp.com/)


## UI/UX

- UI

  - The overall look and design of ShareSphere aim to create a calm and visually pleasing experience. This is achieved by utilizing a clean, modern design with an intuitive layout that is easy on the eyes.

  - The dark theme and carefully selected color palette enhance readability and reduce eye strain, while maintaining a stylish and contemporary feel.

  - Layout, responsiveness, and navigation follow familiar patterns to ensure users can effortlessly navigate the site without confusion, providing a seamless and intuitive experience.

- UX

  - Interactivity is a core focus of ShareSphere, promoting rich user-to-user engagement through features such as likes, comments, and follows.

  - The design ensures a fluid experience when interacting with posts and comments. By utilizing react and react states any operation performed can be instantly reflected to the user, like editing or deleting a comment updating the list of comments already rendered.

  - ShareSphere provides a responsive and adaptive user interface that works seamlessly across all devices, ensuring that users have a consistent experience whether they are on a desktop, tablet, or mobile device.

  - Navigating different types of content is intuitive and easy. The user may simply infinitely scroll until there is no more content to display. This goes for posts, comments, conversations, and conversation replies.

### Agile

The entirety of this project has been built utilizing the agile development approach. The agile approach, combined with GitHub projects, has served as a tool that has helped visualize, plan, and execute different phases of the project development. The [GitHub project](https://github.com/users/Felteng/projects/4) created for this project features a kanban board where the various issues and their status can be seen. This backend application's repository as well as the backend API repository share the same project board to ensure a seamless integration of development between the two.

To view the user stories set out for this project please refer to the project link in the above paragraph. By clicking on any user story on the board a detailed view containing the user story and its acceptance criteria will be made visible. All the issues on the kanban board have received different labels to convey things like relevancy and importance. Frontend and backend related issues have their own separate labels and issues may be filtered as such.

### Wireframes

The initial Balsamiq wireframes are very simplified mockups of site layout to help steer development and design.

<details>
    <summary>
        Wireframes
    </summary>
    <img src="readme-assets/home-sharesphere-wireframe.png" alt="home wireframe">
    <img src="readme-assets/create-post-wireframe.png" alt="create post wireframe">
    <img src="readme-assets/conversations-wireframe.png" alt="conversatiions wireframe">
    <img src="readme-assets/mobile-post-wireframes.png" alt="mobile wireframes">
</details>

### Site Goals

ShareSphere aims to create a vibrant and engaging platform for individuals who love to share and connect through media. The primary purpose is to provide a space where users can effortlessly share their thoughts, experiences, and creativity with others. Targeting a diverse demographic ranging from casual social media users to avid content creators, ShareSphere intends to foster a community-driven environment that emphasizes interaction and connection. By enabling features such as posting, liking, commenting, and following, we strive to cultivate meaningful interactions and relationships among users.

### 5 Planes of UX

### 1. Strategy

**Objectives**

- **Primary Goal**: Create a community hub for media enthusiasts where users can share posts, images, and content, engage with others through comments and likes, and follow other users.

- **Secondary Goal**: Provide a seamless and interactive platform that fosters user engagement, creativity, and meaningful connections among users.

**User Needs**

- **Post Sharing**: Users need an easy way to create and share posts with images, titles, and content.

- **Engagement Tools**: Users need features like likes, comments, and the ability to follow other users to interact and connect.

- **User Profiles**: Users need detailed profiles to share more about themselves and view other users' profiles.

- **Private Conversations**: Users need a private conversation feature to communicate directly with each other. When editing the profile the user may opt out of conversations being sent to them.

### 2. Scope

**Functional Requirements**

- **Post Creation**: Functionality to create and share posts with images, titles, and content.

- **Engagement Features**: Ability to like, comment on posts, and follow other users.

- **User Profiles**: Detailed user profile pages displaying post count, followers, following information, biography, name if povided, and the ability to start a conversation.

- **Private Messaging**: Private conversation feature to facilitate direct communication between 2 users.

- **User Authentication**: Registration and login functionality to access personalized features.

**Content Requirements**

- **Home Page**: Introduction to what the site offers, a feed of recent posts, and options to interact with posts.

- **Following Page**: A feed of recent posts by users followed by the logged in site user.

- **Likes Page**: A feed of posts liked by the logged in site user.

- **Profile Page**: User information, amount of posts created by the user, followers, following details, biography, and name if given.

- **Post Details Page**: Detailed view of individual posts with the ability to leave comments.

- **Conversations Page**: List sorted by most recent conversations the logged in user is engaged in.

- **Conversation Details Page**: Detailed view of an individual conversation with all its replies and the ability to leave replies.

### 3. Structure

**Interaction Design**

- **Home Page**: Users are greeted with a feed of the latest posts.

- **Create Post Page**: A logged in user can access the create post page from the navbar with a straightforward post creation form.

- **Profile Page**: Users can view and edit their profile, see their post amount, followers, following count.

- **Post Details Page**: Users can view detailed information about a post, leave comments, and see other comments.

- **Conversations Page**: A straightforward interface for users to view and manage their private conversations and replies.

- **Starting Conversations**: A simple interface modal accessed by clicking the envelope/message icon when visitng another users profile.

**Information Architecture**

- **Navigation**: Clear and intuitive navigation bar with links to Home, Following, Likes, Create post, Profile, and Conversations.

**Content Hierarchy**:

- **Home Page**: Recent posts feed, with the most active posters visible.

- **Profile Page**: User information, user’s post count, followers count, and following count.

- **Post Details Page**: Post content followed by the comments section.

- **Create Post Page**: Form containing image input, post title, and post content fields with a submit button.

- **Conversations Page**: Feed of recent conversations with topic, content, replies count, sender information.

- **Conversation Details Page**: Conversation content followed by the reply section.

### 4. Skeleton

**Layout**

- **Home Page**: Header with navigation, main content area displaying recent posts, list of active posters, and infinite scroll.

- **Profile Page**: Header with navigation, main content area showing user details and stats, start conversation icon/edit profile icon.

- **Post Details Page**: Header with navigation, main content area for post details and comments, choosing to edit post converts the post into a form for editing.

- **Create Post Page**: Header with navigation, main content area for create post form.

- **Conversations Page**: Header with navigation, main content area for recent conversations.

- **Conversation Details Page**: Header with navigation, main content area for conversation details and replies.

**Interface Elements**

- **Buttons**: Clear call-to-action buttons for navigation, post creation, liking, commenting, replying, following, unfollowing, and CRUD actions where avaialable.

- **Forms**: Simple forms for user authentication, post creation, comment submission, and reply submission.

- **Links**: Clearly labeled links for navigating to profiles, post details, and starting conversations.

**Navigation**

- **Top Navigation Bar**: Persistent across all pages with links to Home, Feeds, Post creation, Profile, and Conversations.
  - Links to home, sign in, and sign up for a signed out user.

- **Authentication Prompts**: Clear links to sign in and sign up pages with appropriate redirection after authentication.

### 5. Surface

**Visual Design**

- **Color Scheme**: A modern and calming color palette with dark themes and contrasting off-white text for accessibility.

- **Typography**: Clean, readable fonts for headers and body text to ensure clarity and legibility.

- **Imagery**: High-quality images for posts to enhance visual appeal and engagement.

**Branding**

- **Logo**: Prominently display the ShareSphere name/logo in the header for consistent branding.

- **Consistency**: Maintain a uniform look and feel across all pages with consistent colors, fonts, and button styles.

**User Feedback**

- **Interactivity**: Real-time updates for likes, comments, posts, replies, and follows to provide an engaging experience.

- **Notifications**: Alerts for successful or failed actions that may otherwise be unclear, such as authentication, starting a conversation with another user, etc..

- **Authentication Status**: Clear indication of the user’s authentication status in the header navigation bar.

### Visual Design Ideology

**Color Scheme:**

- The base scheme of the site is built with "dark theme" in mind as it's a theme becoming increasingly popular and tends to be a lot easier on the eyes for the user. There is not sacrifice in contrast or user experience to achieve the darker aestetic. The goal is to provide a friendly looking interface that won't appall the user from using the site for any extended periods of time.

- To achieve the darker theme every page features shade of woodsmoke as the background. \
  ![Background color](readme-assets/background-hex.png)

- The navbar aims to contrast the woodsmoke background with a more shark-like color and stand out a bit more as a call to action for navigation. The color for the nav links is more grey shade of white to ensure the visibility is in line with the WCAG standards. \
  ![Navbar color](readme-assets/navbar-hex.png) \
  ![Navbar text color](readme-assets/navbar-text-hex.png)

- The follow button to follow a user features a fiord blue color which provides a clear call to action when paired with the dark woodsmoke color whilst still fitting the calm overview of colors. \
  ![Follow button color](readme-assets/follow-button-hex.png)

- All the main content text elements feature an ever so slightly off-shade of white which simply provides a good contrast against the dark background \
  ![Content text color](readme-assets/text-hex.png)

**Fonts:**

- Montserrat

  - The Montserrat font has been used in the navbar elements as well as the heading for most active posters. It's featured across various smaller elements like the profile name and join date. This font is chosen for its clean, modern appearance and excellent readability, which ensures that essential navigational and informational elements stand out clearly to users. Its geometric style conveys a professional feel, enhancing the overall user experience by making text easy to scan and aesthetically pleasing.

- Open Sans

  - The Open Sans font is used across most other elements and user-created content, with different font weights to convey the difference, for example, in a title. This font is chosen for its versatility and readability, making it ideal for body text and longer passages. Its clean and friendly appearance ensures that user-generated content is easy to read and engage with, while the variety of font weights allows for clear distinctions, enhancing the overall visual structure and user experience of the application.

- sans-serif
  - sans-serif is utlized as the fallback font in the event that the google fonts import would seize to function.

**Images:**

- Standardized imagery does not see a whole lot of use throughout this project, the focus lies heavily in user-posted imagery.
  
  - 2 simple default images are used for new users, and the other one for posts that have not had a custom image added to them.

  - A standard image upload icon is present for the post creation form.

  - Lastly there are 2 different illustrations of a sphere used as a feature image for the sign up and sign in pages respectively. They are present on tablet sizes and larger with the purpose of simply filling out some of the space on the pages.



### Addressed bugs

- Refreshing the page gives a brief flash of a view as though the user isn't authenticated.

  - This leads to more than just an odd visual. It can also generate faulty API requests where the logged in users id is used, but before the AuthContext useEffect hook has set the loggedInUser state the loggedInUser.pk will = undefined.

    - So instead of making a get request to "/posts/?likes**owner**profile=1" we end up making a get request to "/posts/?likes**owner**profile=undefined" until the loggedInUser state has been set.

  - The solution to this is to store the user data in a loggedInUser local storage object and use that object as the defualt value for the loggedInUser state:
    ```js
    const [loggedInUser, setLoggedInUser] = useState(() => {
      const savedLogin = localStorage.getItem("loggedInUser");
      return savedLogin ? JSON.parse(savedUser) : null;
    });
    ```
  - The logic used for managing the loggedInUser object:

    ```js
    useEffect(() => {
      const verifyLogin = async () => {
        const data = await checkLoginStatus();
        const savedLogin = localStorage.getItem("loggedInUser");

        if (!savedLogin && data) {
          setLoggedInUser(data);
          localStorage.setItem("loggedInUser", JSON.stringify(data));
        } else if (savedLogin && !data) {
          setLoggedInUser(null);
          localStorage.removeItem("loggedInUser");
        } else if (savedLogin && data && savedLogin !== data) {
          setLoggedInUser(data);
          localStorage.setItem("loggedInUser", JSON.stringify(data));
        }
      };
      verifyLogin();
    }, []);
    ```

  - A request will still be made on mount to ensure that the user should still have access and if they don't then the localStorage object is managed accordingly.

- Repeatedly clicking the like button on a post leads to faulty duplicate requests and error spam in console.

  ![Console logs after spamming the like button](readme-assets/like-spam.png)

  - This is because clicking the button will keep triggering the function that handles the API request even if a request is alreadt being made.

  - The solution to the problem is simply to disable the functions from trying API requests if one is in progress.

    - This was done by adding a new useState hook and and using it's condition for the like and unlike functions:

    ```js
      * const [loading, setLoading] = useState(false); *

      const handleLike = async () => {
        * if (loading) return; *
        * setLoading(true); *
        try {
          const { data } = await axiosRes.post("/likes/", { post: id });
          setLikeCount(likeCount + 1);
          setLike(data.id);
        } catch (error) {
          console.log("Error when liking", error);
        } finally {
          * setLoading(false); *
        }
      };

      const handleUnlike = async () => {
        * if (loading) return; *
        * setLoading(true); *
        try {
          await axiosRes.delete(`likes/${like}`);
          setLikeCount(likeCount - 1);
          setLike(null);
        } catch (error) {
          console.log("Error when unliking", error);
        } finally {
          * setLoading(false); *
        }
      };
    ```

### Unaddressed bugs

- Whenever a comment, a post, or a reply that is part of a page that has a next value is deleted the amount of objects deleted will be missed when fetching the next page.

  - For example a post with 17 comments would have 2 comments on the next page for infinite scroll to fetch when needed, but if I delete 2 of my comments from the first page of 15 comments those 2 comments on the next page will have moved to the first page on the backend, but when infiniteScroll tries to fetch the next page they will not be there and will therefore not be rendered.

    - I haven't landed on a specfic solution for it that would keep the neat responsive flow of react rendering.

      - A possible fix would be to fetch the first object on the next page before performing the deletion.

- Similar to the bug above when adding a comment or reply, the older objects on the current page will get pushed to the next page, and when the next page is fetched they will be added again as duplicates.

## Credits

### Technical

### Media

- Image upload icon vector from [Freepik](https://www.freepik.com/free-vector/illustration-uploading-icon_2609994.htm#fromView=search&page=1&position=2&uuid=9be541e0-fa06-4684-9405-d17041835be8)

- Default post icon created by [Freepik - Flaticon](https://www.flaticon.com/free-icons/picture)

#### Icons

- All icons featured are from [Font Awesome](https://fontawesome.com)

#### Fonts

- All fonts from [Google Fonts](https://fonts.google.com)

#### Favicon

- Site favicon generated with [logoai](https://www.logoai.com/icon-generator).

#################################################################################



