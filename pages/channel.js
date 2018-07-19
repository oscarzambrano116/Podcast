import 'isomorphic-fetch';
import React, { Component } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';
import PodcastList from '../components/PodcastList';

class Channel extends Component {
  static async getInitialProps ({ query }) {
    const channelId = query.id;

    const [reqChannel, reqAudios, reqSeries] = await Promise.all([
      fetch(`https://api.audioboom.com/channels/${channelId}`),
      fetch(`https://api.audioboom.com/channels/${channelId}/audio_clips`),
      fetch(`https://api.audioboom.com/channels/${channelId}/child_channels`),
    ])

    const dataChannel = await reqChannel.json();
    const channel = dataChannel.body.channel;

    const dataAudios = await reqAudios.json();
    const audioClips = dataAudios.body.audio_clips;

    const dataSeries = await reqSeries.json();
    const series = dataSeries.body.channels;

    return {
      channel,
      audioClips,
      series,
    };
  }

  render() {
    const {
      channel,
      audioClips,
      series,
    } = this.props;

    return (
      <Layout title={channel.title}>
        <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />
        <h1>{channel.title}</h1>
        {
          series && series.length > 0 && (
            <div>
              <h2>{'Series'}</h2>
              <ChannelGrid channels={series} />
            </div>
          )
        }
        <h2>{'Ultimos Podcasts'}</h2>
        <PodcastList podcasts={audioClips} />
        <style jsx>
          {`
           .banner {
             width: 100%;
             padding-bottom: 25%;
             background-position: 50% 50%;
             background-size: cover;
             background-color: #aaa;
           }
           h1 {
             font-weight: 600;
             padding: 15px;
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
      </Layout>
    )
  }
}

export default Channel;
