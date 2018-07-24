import 'isomorphic-fetch';
import React, { Component } from 'react';
import Error from './_error';

import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';
import PodcastListWithClick from '../components/PodcastListWithClick';
import PodcastPlayer from '../components/PodcastPlayer';

class Channel extends Component {
  state = {
    openPodcast: null,
  };

  static async getInitialProps ({ query, res }) {
    const channelId = query.id;

    try {
      const [reqChannel, reqAudios, reqSeries] = await Promise.all([
        fetch(`https://api.audioboom.com/channels/${channelId}`),
        fetch(`https://api.audioboom.com/channels/${channelId}/audio_clips`),
        fetch(`https://api.audioboom.com/channels/${channelId}/child_channels`),
      ])

      if (reqChannel.status >= 400) {
        res.statusCode = reqChannel.status;
        return {
          channel: null,
          audioClips: null,
          series: null,
          statusCode: 404,
        };
      }

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
        statusCode: 200,
      };
    } catch (e) {
      res.statusCode = 503;
      return {
        channel: null,
        audioClips: null,
        series: null,
        statusCode: 503,
      };
    }
  }

  openPodcast = (event, podcast) => {
    event.preventDefault();
    this.setState({
      openPodcast: podcast,
    });
  }

  closePodcast = (event) => {
    event.preventDefault();
    this.setState({
      openPodcast: null,
    });
  }

  render() {
    const {
      state: {
        openPodcast,
      },
      props: {
        channel,
        audioClips,
        series,
        statusCode,
      },
    } = this;

    if (statusCode !== 200) {
      return <Error statusCode={statusCode} />
    }


    return (
      <Layout title={channel.title}>
        <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }} />
        {
          openPodcast && (
            <div className={'modal'}>
              <PodcastPlayer
                clip={openPodcast}
                onClose={this.closePodcast}
              />
            </div>
          )
        }
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
        <PodcastListWithClick
          podcasts={audioClips}
          onClickPodcast={this.openPodcast}
        />
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
            .modal {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              z-index: 99999;
            }
          `}
        </style>
      </Layout>
    )
  }
}

export default Channel;
