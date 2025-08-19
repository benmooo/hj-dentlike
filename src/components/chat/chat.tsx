import { defineComponent, ref, computed, nextTick, onMounted, watch } from 'vue'
import UButton from '@nuxt/ui/components/Button.vue'
import UInput from '@nuxt/ui/components/Input.vue'
import UCard from '@nuxt/ui/components/Card.vue'
import UAvatar from '@nuxt/ui/components/Avatar.vue'
import UBadge from '@nuxt/ui/components/Badge.vue'
import UTextarea from '@nuxt/ui/components/Textarea.vue'

// Mathematical model: Message type definition
interface Message {
  id: string
  content: string
  sender: 'user' | 'assistant' | 'system'
  timestamp: Date
  type: 'text' | 'error' | 'info'
}

// State transformation functions
const createMessage = (
  content: string,
  sender: Message['sender'],
  type: Message['type'] = 'text',
): Message => ({
  id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
  content,
  sender,
  timestamp: new Date(),
  type,
})

const formatTime = (date: Date): string =>
  date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

const getMessageVariant = (sender: Message['sender'], type: Message['type']) => {
  if (type === 'error') return 'destructive'
  if (type === 'info') return 'secondary'
  return sender === 'user' ? 'primary' : 'muted'
}

export default defineComponent({
  name: 'ChatComponent',
  props: {
    placeholder: {
      type: String,
      default: 'Type your message...',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    autoScroll: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['send-message', 'message-sent'],
  setup(props, { emit }) {
    // State: S = (messages: M, inputValue: string, isLoading: boolean)
    const messages = ref<Message[]>([
      createMessage('Hello! How can I help you today?', 'assistant', 'info'),
    ])
    const inputValue = ref('')
    const isLoading = ref(false)
    const chatContainer = ref<HTMLElement>()
    const inputRef = ref<HTMLInputElement>()

    // Computed properties for derived state
    const hasMessages = computed(() => messages.value.length > 0)
    const canSend = computed(
      () => inputValue.value.trim().length > 0 && !isLoading.value && !props.disabled,
    )

    // Pure function: Message validation
    const validateMessage = (content: string): { isValid: boolean; error?: string } => {
      const trimmed = content.trim()
      if (trimmed.length === 0) return { isValid: false, error: 'Message cannot be empty' }
      if (trimmed.length > 1000) return { isValid: false, error: 'Message too long' }
      return { isValid: true }
    }

    // State update function: Add message to conversation
    const addMessage = (message: Message) => {
      messages.value = [...messages.value, message]
    }

    // Auto-scroll to bottom
    const scrollToBottom = async () => {
      if (!props.autoScroll || !chatContainer.value) return
      await nextTick()
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }

    // Action: Send message
    const sendMessage = async () => {
      const validation = validateMessage(inputValue.value)
      if (!validation.isValid) {
        if (validation.error) {
          addMessage(createMessage(validation.error, 'system', 'error'))
        }
        return
      }

      const userMessage = createMessage(inputValue.value, 'user')
      addMessage(userMessage)

      emit('send-message', userMessage)
      emit('message-sent', userMessage)

      // Clear input and set loading state
      const messageContent = inputValue.value
      inputValue.value = ''
      isLoading.value = true

      try {
        // Simulate processing time (replace with actual API call)
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Add response message
        const responseMessage = createMessage(
          `I received your message: "${messageContent}". This is a placeholder response.`,
          'assistant',
        )
        addMessage(responseMessage)
      } catch (error) {
        addMessage(
          createMessage('Sorry, something went wrong. Please try again.', 'system', 'error'),
        )
      } finally {
        isLoading.value = false
      }
    }

    // Handle Enter key
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault()
        if (canSend.value) {
          sendMessage()
        }
      }
    }

    // Clear chat history
    const clearChat = () => {
      messages.value = []
    }

    // Focus input on mount
    onMounted(() => {
      // inputRef.value?.focus()
    })

    // Watch messages for auto-scroll
    watch(messages, scrollToBottom, { deep: true })

    return {
      messages,
      inputValue,
      isLoading,
      hasMessages,
      canSend,
      chatContainer,
      inputRef,
      sendMessage,
      handleKeyPress,
      clearChat,
      formatTime,
      getMessageVariant,
    }
  },
  render() {
    return (
      <div class="flex flex-col h-full max-h-[600px] bg-background border border-muted rounded-lg overflow-hidden">
        {/* Header */}
        <div class="flex items-center justify-between p-4 border-b border-muted bg-primary/20">
          <div class="flex items-center space-x-3">
            <UAvatar
              size="sm"
              src="/api/placeholder/32/32"
              alt="Chat Assistant"
              class="ring-2 ring-primary/20"
            />
            <div>
              <h3 class="font-medium text-foreground">AI Assistant</h3>
              <p class="text-xs text-muted-foreground">{this.isLoading ? 'Typing...' : 'Online'}</p>
            </div>
          </div>

          {this.hasMessages && (
            <UButton variant="ghost" size="sm" onClick={this.clearChat} icon="i-heroicons-trash">
              Clear conversation
            </UButton>
          )}
        </div>

        {/* Messages Area */}
        <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
          {this.messages.map((message) => (
            <div
              key={message.id}
              class={['flex', message.sender === 'user' ? 'justify-end' : 'justify-start']}
            >
              <div
                class={[
                  'flex items-start space-x-2 max-w-[80%]',
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row',
                ]}
              >
                <UAvatar
                  size="xs"
                  src={
                    message.sender === 'user' ? '/api/placeholder/24/24' : '/api/placeholder/24/24'
                  }
                  alt={message.sender}
                  class={[
                    'ring-1',
                    message.sender === 'user' ? 'ring-primary/30' : 'ring-muted/30',
                  ]}
                />

                <div
                  class={['flex flex-col', message.sender === 'user' ? 'items-end' : 'items-start']}
                >
                  <UCard
                    class={[
                      'max-w-none transition-all duration-200',
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground border-border',
                    ]}
                    ui={{ body: '!p-3' }}
                  >
                    {{
                      default: () => (
                        <p class="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                      ),
                    }}
                  </UCard>

                  <UBadge variant="soft" size="xs" class="mt-1 opacity-60">
                    {this.formatTime(message.timestamp)}
                  </UBadge>
                </div>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {this.isLoading && (
            <div class="flex justify-start">
              <div class="flex items-start space-x-2 max-w-[80%]">
                <UAvatar
                  size="xs"
                  src="/api/placeholder/24/24"
                  alt="assistant"
                  class="ring-1 ring-muted/30"
                />
                <UCard class="bg-muted border-border">
                  <div class="flex space-x-1">
                    <div class="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" />
                    <div class="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce delay-100" />
                    <div class="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce delay-200" />
                  </div>
                </UCard>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div class="border-t border-border p-4 bg-background">
          <div class="flex space-x-2">
            <div class="flex-1">
              <UTextarea
                ref="inputRef"
                v-model={this.inputValue}
                placeholder={this.placeholder}
                disabled={this.disabled || this.isLoading}
                rows={1}
                // resize={false}
                autoresize={true}
                maxrows={4}
                // onKeydown={this.handleKeyPress}
                class="min-h-[40px] resize-none"
              />
            </div>

            <UButton
              variant={this.canSend ? 'solid' : 'subtle'}
              disabled={!this.canSend}
              onClick={this.sendMessage}
              size="sm"
              square
              class="transition-all duration-200 aspect-square"
              icon={this.isLoading ? 'i-heroicons-arrow-path' : 'i-heroicons-paper-airplane'}
              ui={{ leadingIcon: [this.isLoading ? 'animate-spin' : ''] }}
            ></UButton>
          </div>
        </div>
      </div>
    )
  },
})
