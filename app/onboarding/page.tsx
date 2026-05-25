'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WelcomeStep } from '@/components/onboarding/WelcomeStep'
import { ProfileStep } from '@/components/onboarding/ProfileStep'
import { GroupStep } from '@/components/onboarding/GroupStep'
import { sendMagicLink, verifyEmailOtp } from '@/app/actions/auth'
import { createClient } from '@/lib/supabase/client'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

type Step = 'welcome' | 'email' | 'email-sent' | 'profile' | 'group'

const RESEND_COOLDOWN = 60

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>('welcome')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [emailLoading, setEmailLoading] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const [otpCode, setOtpCode] = useState('')
  const [otpLoading, setOtpLoading] = useState(false)
  const [otpError, setOtpError] = useState('')
  const [username, setUsername] = useState('')
  const [color, setColor] = useState('#3B82F6')
  const [avatar, setAvatar] = useState('⚽')
  const [pendingCode, setPendingCode] = useState<string | undefined>()

  // On mount: read pending invite code + URL step param
  useEffect(() => {
    const match = document.cookie.match(/pending_invite_code=([^;]+)/)
    if (match) setPendingCode(match[1])

    const params = new URLSearchParams(window.location.search)
    if (params.get('step') === 'profile') setStep('profile')
    if (params.get('error') === 'auth') setStep('email')
  }, [])

  // When profile step is shown, check if user already has a player record
  useEffect(() => {
    if (step !== 'profile') return
    const check = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return
        const { data: player } = await supabase
          .from('players')
          .select('id')
          .eq('user_id', user.id)
          .single()
        if (player) window.location.href = '/'
      } catch { /* new user — show profile step */ }
    }
    check()
  }, [step])

  // Resend cooldown countdown
  useEffect(() => {
    if (resendCooldown <= 0) return
    const t = setTimeout(() => setResendCooldown((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [resendCooldown])

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
        setResendCooldown(RESEND_COOLDOWN)
      }
    } catch {
      setEmailError('Verbindungsfehler. Bitte erneut versuchen.')
    } finally {
      setEmailLoading(false)
    }
  }

  async function handleResend() {
    if (resendCooldown > 0) return
    setEmailLoading(true)
    setEmailError('')
    setOtpError('')
    try {
      const result = await sendMagicLink(email)
      if (result.error) { setEmailError(result.error) } else { setResendCooldown(RESEND_COOLDOWN) }
    } catch {
      setEmailError('Verbindungsfehler.')
    } finally {
      setEmailLoading(false)
    }
  }

  async function handleOtpSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (otpCode.trim().length < 6) { setOtpError('Bitte den vollständigen 6-stelligen Code eingeben'); return }
    setOtpLoading(true)
    setOtpError('')
    try {
      const result = await verifyEmailOtp(email, otpCode)
      if (result.error) {
        setOtpError(result.error)
      } else {
        setStep('profile')
      }
    } catch {
      setOtpError('Verbindungsfehler. Bitte erneut versuchen.')
    } finally {
      setOtpLoading(false)
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
      {step !== 'welcome' && (
        <div className="flex justify-center gap-1.5 pt-6 pb-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i <= stepIndex[step] - 1 ? 'w-8 bg-brand-blue' : 'w-2 bg-gray-200'
              }`}
            />
          ))}
        </div>
      )}

      <div className="flex-1 px-5 py-6 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          {step === 'welcome' && (
            <motion.div key="welcome" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.2 }}>
              <WelcomeStep onNext={() => setStep('email')} />
            </motion.div>
          )}

          {(step === 'email' || step === 'email-sent') && (
            <motion.div key="email" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.2 }} className="flex flex-col gap-6">
              <div>
                <h2 className="text-2xl font-black text-gray-900 mb-1">Anmelden</h2>
                <p className="text-gray-500 text-sm">
                  {step === 'email-sent'
                    ? `Code gesendet an ${email}`
                    : 'Gib deine E-Mail-Adresse ein. Wir schicken dir einen Anmelde-Code.'}
                </p>
              </div>

              {step === 'email-sent' ? (
                <div className="flex flex-col gap-4">
                  {/* OTP Code input — primary action */}
                  <form onSubmit={handleOtpSubmit} className="flex flex-col gap-3">
                    <label className="text-sm font-semibold text-gray-700">
                      6-stelliger Code aus der E-Mail
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => { setOtpCode(e.target.value.replace(/\D/g, '')); setOtpError('') }}
                      placeholder="000000"
                      autoFocus
                      className="w-full text-center text-3xl font-black tracking-[0.4em] py-4 border-2 rounded-xl border-gray-200 focus:border-brand-blue focus:outline-none transition-colors"
                    />
                    {otpError && <p className="text-xs text-red-500 text-center">{otpError}</p>}
                    <Button type="submit" size="lg" className="w-full" loading={otpLoading} disabled={otpCode.length < 6}>
                      Code bestätigen
                    </Button>
                  </form>

                  {/* Divider */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-xs text-gray-400 shrink-0">oder</span>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>

                  {/* Magic link hint */}
                  <div className="bg-blue-50 rounded-xl p-4 text-sm text-blue-700">
                    <p className="font-medium mb-0.5">Link in E-Mail klicken</p>
                    <p className="text-blue-600 text-xs">Öffne die E-Mail auf diesem Gerät und klick auf den Anmelde-Link.</p>
                  </div>

                  {/* Spam + resend */}
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-xs text-gray-400">Nichts angekommen? Spam-Ordner prüfen.</p>
                    {emailError && <p className="text-xs text-red-500">{emailError}</p>}
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={resendCooldown > 0 || emailLoading}
                      className="text-sm text-brand-blue disabled:text-gray-300 font-medium"
                    >
                      {emailLoading ? 'Wird gesendet…' : resendCooldown > 0 ? `Erneut senden (${resendCooldown}s)` : 'Neuen Code senden'}
                    </button>
                  </div>
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
                    Code senden
                  </Button>
                </form>
              )}

              <button type="button" onClick={() => setStep('welcome')} className="text-sm text-gray-400 text-center">
                Zurück
              </button>
            </motion.div>
          )}

          {step === 'profile' && (
            <motion.div key="profile" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.2 }}>
              <ProfileStep onNext={handleProfileNext} />
            </motion.div>
          )}

          {step === 'group' && (
            <motion.div key="group" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.2 }}>
              <GroupStep username={username} color={color} avatar={avatar} pendingInviteCode={pendingCode} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
