import React from 'react';

function HelloWorld () {
  return (
    <div>
      <h1>{'Hola Oscar!'}</h1>
      <p>{'Bienvenido al curso de Next.js'}</p>
      <img src="/static/platzi-logo.png" alt="Platzi logo"/>
      <style jsx>
        {`
          h1 {
            color: red;
          }
          p {
            color: green;
          }
          img {
            max-width: 50%;
            display: block;
            margin: 0 auto;
          }
        `}
      </style>
      <style jsx global>
        {`
          body {
            background: white;
          }
        `}
      </style>
    </div>
  );
}

export default HelloWorld;
