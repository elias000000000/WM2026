import { redirect } from 'next/navigation'

interface Props {
  params: { code: string }
}

// When a user with a session visits this page, allow them to join directly.
// Users without a session are handled by middleware (saves code to cookie, redirects to onboarding).
export default function GruppePage({ params }: Props) {
  const { code } = params
  // Redirect to onboarding with the code in the URL for display
  redirect(`/onboarding?invite=${code}`)
}
