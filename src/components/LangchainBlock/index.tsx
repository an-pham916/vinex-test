import { ChatOpenAI } from '@langchain/openai';
import { Button, Row, Space } from 'antd';
import Search from 'antd/lib/input/Search';
import TextArea from 'antd/lib/input/TextArea';
import { useState } from 'react';
import { TFunction, withTranslation } from "react-i18next"
import { LangchainBlockSection, BotSearch } from "./styles"

interface LangchainBlockProps {
  title?: string;
  content?: string;
  button?: string;
  t: TFunction;
}

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY

const LangchainBlock = ({ title, content, button, t }: LangchainBlockProps) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [errMsg, setErrMsg] = useState('')
  console.log('errMsg :>> ', errMsg);
  console.log('messages :>> ', messages);
  const handleSend = async () => {
    setErrMsg('')
    try {
      const userMessage = { role: 'user', content: input };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput('');
  
      // Initialize Langchain OpenAI model
      const chatModel = new ChatOpenAI({ apiKey: API_KEY });
  
      // Get response from the model
      const response = await chatModel.call(updatedMessages);
      console.log('response :>> ', response);
      const botMessage = { role: 'assistant', content: response.content };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      setErrMsg(error?.message || '')
    }
  };

  return (
    <LangchainBlockSection>
      <h6>CHAT BOT</h6>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '300px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          // <div key={index} style={{ textAlign: msg.role === 'user' ? 'right' : 'left' }}>
          <div key={index} style={{ textAlign: 'left', background: index % 2 != 0 ? '#eaeaea' : 'initial' }}>
            <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div>
        <BotSearch
          placeholder="Ask something..."
          value={input}
          allowClear
          enterButton="Send"
          size="large"
          onSearch={handleSend}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </LangchainBlockSection>
  );
}

export default withTranslation()(LangchainBlock)