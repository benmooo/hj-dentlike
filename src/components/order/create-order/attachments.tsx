import { defineComponent, ref, computed } from 'vue'
import UFileUpload from '@nuxt/ui/components/FileUpload.vue'
import UButton from '@nuxt/ui/components/Button.vue'
import UFormField from '@nuxt/ui/components/FormField.vue'

export default defineComponent({
  name: 'AttachmentsComponent',
  emits: ['prev-step', 'next-step'],
  setup(_, { emit }) {
    const isNextDisabled = computed(() => false) // Always enabled

    const onNext = () => {
      emit('next-step', {})
    }

    const onPrev = () => {
      emit('prev-step')
    }

    return () => (
      <div class="space-y-8">
        <UFormField name="attachments" label="Attachments" description="upload files here">
          <UFileUpload
            position="outside"
            layout="list"
            multiple
            label="Drop your files here"
            description="SVG, PNG, JPG or GIF (max. 2MB)"
            class="w-full"
            ui={{
              base: 'min-h-48',
            }}
          />
        </UFormField>

        {/* Navigation Buttons */}
        <div class="flex justify-center gap-4 mt-8">
          <UButton label="Return" size="lg" variant="outline" onClick={onPrev} />
          <UButton label="Next Step" size="lg" disabled={isNextDisabled.value} onClick={onNext} />
        </div>
      </div>
    )
  },
})
