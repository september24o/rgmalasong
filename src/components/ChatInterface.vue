<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import ChatMessage from './ChatMessage.vue';

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const messages = ref<Message[]>([
  {
    id: 1,
    content: '你好！我是容桂马拉松助手，请问有什么可以帮助你的吗？',
    isUser: false,
    timestamp: new Date()
  }
]);

const inputMessage = ref('');
const loading = ref(false);
const messagesContainer = ref<HTMLElement | null>(null);

const scrollToBottom = () => {
  setTimeout(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  }, 100);
};

const sendMessage = async () => {
  if (!inputMessage.value.trim()) return;
  
  // 添加用户消息
  messages.value.push({
    id: Date.now(),
    content: inputMessage.value,
    isUser: true,
    timestamp: new Date()
  });

  scrollToBottom();

  const userQuestion = inputMessage.value;
  inputMessage.value = '';
  loading.value = true;

  try {
    // 调用API获取回答
    const response = await axios.post('https://api.lightrag.com/chat', {
      question: userQuestion
    });

    // 添加助手回复
    messages.value.push({
      id: Date.now() + 1,
      content: response.data.answer,
      isUser: false,
      timestamp: new Date()
    });
  } catch (error) {
    messages.value.push({
      id: Date.now() + 1,
      content: '抱歉，系统出现了一些问题，请稍后再试。',
      isUser: false,
      timestamp: new Date()
    });
  } finally {
    loading.value = false;
    scrollToBottom();
  }
};
</script>

<template>
  <div class="chat-container">
    <div class="chat-header">
      <h2>容桂马拉松助手</h2>
    </div>
    
    <div class="messages-container" ref="messagesContainer">
      <ChatMessage
        v-for="message in messages"
        :key="message.id"
        :content="message.content"
        :is-user="message.isUser"
        :timestamp="message.timestamp"
      />
    </div>

    <div class="input-container">
      <van-field
        v-model="inputMessage"
        placeholder="请输入您的问题"
        :disabled="loading"
        @keyup.enter="sendMessage"
      >
        <template #button>
          <van-button 
            :loading="loading"
            :disabled="!inputMessage.trim()"
            type="primary" 
            size="small"
            @click="sendMessage"
          >
            发送
          </van-button>
        </template>
      </van-field>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f7f7f7;
}

.chat-header {
  background-color: #007AFF;
  color: white;
  padding: 1rem;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.chat-header h2 {
  margin: 0;
  font-size: 1.2rem;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  margin-top: 3.5rem;
  margin-bottom: 4rem;
}

.input-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  padding: 0.5rem;
  border-top: 1px solid #eee;
}
</style>