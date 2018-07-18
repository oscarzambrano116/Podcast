import React, { Component } from 'react';

class Channel extends Component {
  static async getInitialProps ({ query }) {
    const channelId = query.id;
    const reqChannel = await fetch(`https://api.audioboom.com/channels/${channelId}`);
    const dataChannel = await reqChannel.json();
    const channel = dataChannel.body.channel;

    const reqAudios = await fetch(`https://api.audioboom.com/channels/${channelId}/audio_clips`);
    const dataAudios = await reqAudios.json();
    const audioClips = dataAudios.body.audio_clips;

    const reqSeries = await fetch(`https://api.audioboom.com/channels/${channelId}/child_channels`);
    const dataSeries = await reqSeries.json();
    const series = dataSeries.body.channels;

    return { channel, audioClips, series };
  }

  render() {
    const {
      channel,
      audioClips,
      series,
    } = this.props;

    return (
      <div>
        <header>{'Podcast'}</header>
        <h1>{channel.title}</h1>
        <h2>{'Series'}</h2>
        {
          audioClips.map((clip) => (
            <div key={clip.id}>
              {clip.title}
            </div>
          ))
        }
        {
          series && series.length > 0 && (
            <div>
              <h2>{'Ultimos Podcast'}</h2>
              {
                series.map((serie) => (
                  <div>
                    {serie.title}
                  </div>
                ))
              }
            </div>
          )
        }
        <style jsx>
          {`
            header {
              color: #FFF;
              background: #8756CA;
              padding: 15px;
              text-align: center;
            }
            h1 {
              font-weight: 600;
              padding: 15px;
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

export default Channel;
