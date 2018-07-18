import 'isomorphic-fetch';
import React, { Component } from 'react';
import Link from 'next/link';

class Index extends Component {
  static async getInitialProps() {
    const req = await fetch('https://api.audioboom.com/channels/recommended');
    const { body: channels } = await req.json();

    return { channels }
  }

  render () {
    const { channels } = this.props;
    return (
      <div>
        <header>{'Podcast'}</header>
        <div className="channels">
          {
            channels.map((channel) => (
              <Link href={`/channel?id=${channel.id}`} prefetch>
                <a key={channel.id} className={'channel'}>
                  <img src={channel.urls.logo_image.original} alt="Logo"/>
                  <h2>{channel.title}</h2>
                </a>
              </Link>
            ))
          }
        </div>
        <style jsx>
          {`
            header {
              color: #FFF;
              background: #8756CA;
              padding: 15px;
              text-align: center;
            }
            .channels {
              display: grid;
              grid-gap: 15px;
              padding: 15px;
              grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            }
            .channel {
              display: block;
              border-radius: 3px;
              box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
              margin-bottom: 0.5em;
            }
            a.channel {
              display: block;
              margin-bottom: 0.5em;
              color: #333;
              text-decoration: none;
            }
            .channel img {
              width: 100%;
            }
            h2 {
              padding: 5px;
              font-size: 0.9em;
              font-weight: 600;
              margin: 0;
              text-align: center;
            }
          `}
        </style>
        <style jsx global>
          {`
            body {
              margin: 0;
              font-family: system-ui;
              background: white;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Index;
