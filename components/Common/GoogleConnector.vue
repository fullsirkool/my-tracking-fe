<template>
  <div>
    <UButton
      color="black"
      label=""
      icon="i-simple-icons-github"
      block
      @click="signinRedirect()"
    >
      <Icon name="simple-icons:google" width="1.25rem" height="1.25rem" />
      Login with Google
    </UButton>
  </div>
</template>
<script setup lang="ts">
import { useFirebaseAuth } from 'vuefire'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

interface IGoogleConnectorPros {
  handleSignIn: Function
}
const props = withDefaults(defineProps<IGoogleConnectorPros>(), {})

const auth = useFirebaseAuth()
const googleAuthProvider = new GoogleAuthProvider()

const signinRedirect = async () => {
  console.log('signinRedirect')
  if (!auth) {
    console.log('auth null')
    return
  }
  const { user } = await signInWithPopup(auth, googleAuthProvider)
  const token = await user.getIdToken()
  await props.handleSignIn(token)
}
</script>
