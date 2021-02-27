## Install

````
yarn create next-app web-next                                       <- Create using Next.js
yarn add typescript @types/react @types/react-dom @types/node -D    <- Just for development
yarn add js-cookie
yarn add @types/js-cookie -D

yarn remove typecript
````

## Run

````
yarn dev
````

## About
````
SPA - Single page application (Don't work on the google search engines)
SSR - Server Side Rendering - The Next.js resolve this, it consume React and returne HTML, CSS
The Next.js is a interceptor server for use google search engines
SSG - Steck Site Generate   - HTML, CSS updated by times

Local Storage   - You can close and open tab and it continue, jus 
Session Storage - When you close the tab it clean
Cookies         - Equals Local Storage but has more options, use this because do Next.js

Deploying your website
https://www.netlify.com/

https://vercel.com/
sudo npm i -g vercel
vercel -h                   <- Verify options
vercel login
vercel                      <- In your project
Set up and deploy:          y
Link to existing project?   N
What’s your project’s name? moveit-gus
enter
Override the settings?      N

After deploys, open the page and execute:
vercel                      <- Deploy in QA
vercel --prod               <- Deploy in production
````