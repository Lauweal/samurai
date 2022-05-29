import { useEffect } from 'react';
import { StreamChat } from 'stream-chat'
import { Chat as ChatBox, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';

const client = StreamChat.getInstance("dz5f4d5kzrue");
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoid2lzcHktZmllbGQtMiIsImV4cCI6MTY1Mzc5NzY0Nn0.392mS7PGn7jRcTWpkqhVoYv-IZqH-aUFES2G6ck8BLQ';

client.connectUser({
  id: 'wispy-field-2',
  name: 'wispy',
  image: 'https://getstream.io/random_png/?id=wispy-field-2&name=wispy',
}, token).then((res) => {
  console.log('====>', res)
  return client
})
const channel = client.channel('messaging', 'custom_channel_id', {
  // add as many custom fields as you'd like
  image: 'https://www.drupal.org/files/project-images/react.png',
  name: 'Talk about React',
  members: ['wispy-field-2'],
});

export function Chat() {
  return (
    <ChatBox client={client} theme='messaging light'>
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </ChatBox>
  );
}
