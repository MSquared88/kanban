import {Auth0Provider} from '@auth0/auth0-react'
import React, {PropsWithChildren} from 'react'

interface Auth0ProviderWithConfigProps {
  children: React.ReactNode
}

export const Auth0ProviderWithConfig = ({
  children,
}: PropsWithChildren<Auth0ProviderWithConfigProps>): JSX.Element | null => {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE

  if (!(domain && clientId && redirectUri)) {
    return null
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
      audience={audience}
      scope="read:current_user update:current_user_metadata"
    >
      {children}
    </Auth0Provider>
  )
}
