import 'isomorphic-fetch';
import React, { Component } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';

class Index extends Component {
  static async getInitialProps() {
    const req = await fetch('https://api.audioboom.com/channels/recommended');
    const { body: channels } = await req.json();

    return { channels }
  }

  render () {
    const { channels } = this.props;
    return (
      <Layout title={'Podcast'}>
        <ChannelGrid channels={channels} />
      </Layout>
    );
  }
}

export default Index;
