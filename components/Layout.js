import React, { Component } from 'react';
import Link from 'next/link';
import Head from 'next/head';

class Layout extends Component {
  render() {
    const { children, title } = this.props;

    return (
      <div>
        <Head>
          <title>{title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <header>
          <Link href={'/'}>
            <a>{'Podcast'}</a>
          </Link>
        </header>
        {children}
        <style jsx>
          {`
            header {
              color: #FFF;
              background: #8756CA;
              padding: 15px;
              text-align: center;
            }
            header a {
              color: #FFF;
              text-decoration: none;
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
    )
  }
}

export default Layout;
