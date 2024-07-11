### Bugs

#### Fixed bugs

- Refreshing the page gives a brief flash of a view as though the user isn't authenticated.

  - This leads to more than just an odd visual. It can also generate faulty API requests where the logged in users id is used, but before the AuthContext useEffect hook has set the loggedInUser state the loggedInUser.pk will = undefined.

    - So instead of making a get request to "/posts/?likes**owner**profile=1" we end up making a get request to "/posts/?likes**owner**profile=undefined" until the loggedInUser state has been set.

  - The solution to this is to store the user data in a loggedInUser local storage object and use that object as the defualt value for the loggedInUser state:
    ```js
    const [loggedInUser, setLoggedInUser] = useState(() => {
      const savedUser = localStorage.getItem("loggedInUser");
      return savedUser ? JSON.parse(savedUser) : null;
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
        } else if (savedLogin && data && savedLogin != data) {
          setLoggedInUser(data);
          localStorage.setItem("loggedInUser", JSON.stringify(data));
        }
      };
      verifyLogin();
    }, []);
    ```

    A request will still be made on mount to ensure that the user should still have access and if they don't then the localStorage object is managed accordingly.

### Credits

#### Media

Image upload icon vector - https://www.freepik.com/free-vector/illustration-uploading-icon_2609994.htm#fromView=search&page=1&position=2&uuid=9be541e0-fa06-4684-9405-d17041835be8
