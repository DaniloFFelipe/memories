/* eslint-disable no-undef */
import { Redirect } from 'expo-router'
import { useIsAuthenticated } from '../../stores/authentication'
import React from 'react'

export function withAuth(Component: React.FC) {
  return function NewComponent() {
    const isAuthenticated = useIsAuthenticated()

    if (isAuthenticated) {
      return <Component />
    }

    return <Redirect href="index" />
  }
}
