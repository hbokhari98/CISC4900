# TruWalks
A Business-to-Business product for dog-walking/related companies to enable their customers to schedule appointments with their clients.

## Stack

*API*

- express
- sequelize
- expressSession
- passport

*React client*

- Built using `create-react-app` and configured to work with the api.
- Bootstrap 4.x added to `/client/public/index.html`
- React Router

*Project Structure*

<pre>
.
|   package-lock.json
|   package.json
|
+---<strong>api</strong>
|   |   app.js
|   |
|   +---<strong>config</strong>
|   |       config.json
|   |
|   +---<strong>controllers</strong>
|   |       appConfig.js
|   |       appointments.js
|   |       auth.js
|   |       index.js
|   |       pets.js
|   |       services.js
|   |       users.js
|   |
|   +---<strong>middlewares</strong>
|   |       authentication.js
|   |
|   +---<strong>migrations</strong>
|   |       xxx-migration-skeleton.js
|   |
|   +---<strong>models</strong>
|   |       appointment.js
|   |       index.js
|   |       pet.js
|   |       service.js
|   |       user.js
|   |
|   +---<strong>seeders</strong>
|   |       xxx-demo-user.js
|   |
|   \---<strong>utils</strong>
|           verification.js
|
\---<strong>client</strong>
    |   .gitignore
    |   package-lock.json
    |   package.json
    |   README.md
    |
    +---<strong>public</strong>
    |   |   index.html
    |   |   manifest.json
    |   |   robots.txt
    |   |
    |   \---<strong>assets</strong>
    |           DogWalking.png
    |           login.png
    |           loginlogo.png
    |           tempDogFaceProfile.png
    |
    \---<strong>src</strong>
            AddPet.css
            AddPet.js
            App.js
            App.test.js
            Calendar.js
            Day.js
            Hour.js
            index.css
            index.js
            Info.js
            Login.css
            Login.js
            Navbar.js
            Pet.js
            serviceWorker.js
            SignUp.js
            SwitchMonths.js
</pre>