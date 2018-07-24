import React from 'react';

function About() {
  return (
    <div className={'container'}>
      <img
        src={'https://static.platzi.com/media/achievements/badge-reactnative-9c23a814-e9c3-4041-afbd-ff8083fbf32f.png'}
        alt={'React logo'}
      />
      <div>
        <h2>{'Oscar Zambrano'}</h2>
        <p>{'curso de next.js'}</p>
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            height: 100%;
          }
          h2 {
            color: white;
          }
          p {
            color: lightblue;
            text-align: center;
          }
          img {
            max-width: 150px;
            display: block;
          }
        `}
      </style>
      <style jsx global>
        {`
          body {
            background-color: #022c43;
            margin: 0;
          }
          #__next, body, html {
            height: 100%;
          }
        `}
      </style>
    </div>
  );
}

export default About;
