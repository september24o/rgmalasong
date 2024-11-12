<script setup lang="ts">
interface Props {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

defineProps<Props>();
</script>

<template>
  <div class="message-wrapper" :class="{ 'user-message': isUser }">
    <div class="avatar">
      <img :src="isUser ? '/user-avatar.png' : '/assistant-avatar.png'" :alt="isUser ? '用户头像' : '助手头像'" />
    </div>
    <div class="message-content">
      <div class="bubble">{{ content }}</div>
      <div class="time">{{ new Date(timestamp).toLocaleTimeString() }}</div>
    </div>
  </div>
</template>

<style scoped>
.message-wrapper {
  display: flex;
  gap: 8px;
  margin: 16px 0;
  padding: 0 12px;
}

.user-message {
  flex-direction: row-reverse;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.message-content {
  max-width: 70%;
  display: flex;
  flex-direction: column;
}

.bubble {
  padding: 12px;
  border-radius: 16px;
  word-break: break-word;
  text-align: left;
  font-size: 15px;
  line-height: 1.4;
}

.user-message .bubble {
  background-color: #007AFF;
  color: white;
  border-radius: 16px 16px 4px 16px;
}

.message-wrapper:not(.user-message) .bubble {
  background-color: white;
  color: #333;
  border-radius: 16px 16px 16px 4px;
}

.time {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
  text-align: left;
}

.user-message .time {
  text-align: right;
}
</style>