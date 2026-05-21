'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WelcomeStep } from '@/components/onboarding/WelcomeStep'
import { ProfileStep } from '@/components/onboarding/ProfileStep'
import { GroupStep } from '@/components/onboarding/GroupStep'
import { sendMagicLink } from '@/app/actions/auth'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

type Step = 'welcome' | 'email' | 'email-sent' | 'profile' | 'group'

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>('welcome')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [emailLoading, setEmailLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [color, setColor] = useState('#3B82F6')
  const [avatar, setAvatar] = useState('⚽')
  const [pendingCode, setPendingCode] = useState<string | undefined>()

  useEffect(() => {
    // Read pending invite code from cookie
    const match = document.cookie.match(/pending_invite_code=([^;]+)/)
    if (match) setPendingCode(match[1])

    // Check URL step param (after magic link redirect)
    const params = new URLSearchParams(window.location.search)
    if (params.get('step') === 'profile') {
      setStep('profile')
    }
  }, [])

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) { setEmailError('Bitte eine gültige E-Mail-Adresse eingeben'); return }
    setEmailLoading(true)
    setEmailError('')
    try {
      const result = await sendMagicLink(email)
      if (result.error) {
        setEmailError(result.error)
      } else {
        setStep('email-sent')
      }
    } catch {
      setEmailError('Verbindungsfehler. Bitte erneut versuchen.')
    } finally {
      setEmailLoading(false)
    }
  }

  function handleProfileNext(u: string, c: string, a: string) {
    setUsername(u)
    setColor(c)
    setAvatar(a)
    setStep('group')
  }

  const stepIndex = { welcome: 0, email: 1, 'email-sent': 1, profile: 2, group: 3 }
  const totalSteps = 3

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Step dots */}
      {step !== 'welcome' && (
        <div className="flex justify-center gap-2 pt-6 pb-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i < stepIndex[step] ? 'w-6 bg-brand-blue' :
                i === stepIndex[step] - 1 ? 'w-6 bg-brand-blue' : 'w-1.5 bg-gray-200'
              }`}
            />
          ))}
        </div>
      )}

      <div className="flex-1 px-5 py-6 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <WelcomeStep onNext={() => setStep('email')} />
            </motion.div>
          )}

          {(step === 'email' || step === 'email-sent') && (
            <motion.div
              key="email"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-6"
            >
              <div>
                <h2 className="text-2xl font-black text-gray-900 mb-1">Anmelden</h2>
                <p className="text-gray-500 text-sm">
                  {step === 'email-sent'
                    ? 'Schau in dein E-Mail-Postfach — wir haben dir einen Anmelde-Link gesendet.'
                    : 'Gib deine E-Mail-Adresse ein. Wir schicken dir einen Anmelde-Link.'}
                </p>
              </div>

              {step === 'email-sent' ? (
                <div className="bg-green-50 rounded-2xl p-5 text-center">
                  <p className="text-3xl mb-2">✉️</p>
                  <p className="font-semibold text-green-800">{email}</p>
                  <p className="text-green-700 text-sm mt-1">
                    Klick auf den Link in der E-Mail, um fortzufahren.
                  </p>
                  <p className="text-green-600 text-xs mt-3">
                    Nichts angekommen? Schau auch im Spam-Ordner nach.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
                  <Input
                    type="email"
                    label="E-Mail-Adresse"
                    placeholder="du@beispiel.de"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError('') }}
                    error={emailError}
                    autoFocus
                  />
                  <Button type="submit" size="lg" className="w-full" loading={emailLoading}>
                    Anmelde-Link senden
                  </Button>
                </form>
              )}

              <button
                type="button"
                onClick={() => setStep('welcome')}
                className="text-sm text-gray-400 text-center"
              >
                Zurück
              </button>
            </motion.div>
          )}

          {step === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <ProfileStep onNext={handleProfileNext} />
            </motion.div>
          )}

          {step === 'group' && (
            <motion.div
              key="group"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <GroupStep
                username={username}
                color={color}
                avatar={avatar}
                pendingInviteCode={pendingCode}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
