import { useState, useEffect } from 'react'
import { blink } from './lib/blink'
import LandingPage from './components/LandingPage'
import OnboardingWizard from './components/OnboardingWizard'
import Dashboard from './components/Dashboard'

interface User {
  id: string
  email: string
  displayName?: string
}

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState<'landing' | 'onboarding' | 'dashboard'>('landing')

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
      
      if (state.user && currentStep === 'landing') {
        // Check if user already has a profile to determine next step
        checkUserProfile(state.user)
      }
    })
    return unsubscribe
  }, [currentStep])

  const checkUserProfile = async (user: User) => {
    try {
      let hasProfile = false
      
      // Check localStorage first (faster and more reliable)
      const localProfile = localStorage.getItem(`userProfile_${user.id}`)
      if (localProfile) {
        try {
          JSON.parse(localProfile) // Validate it's valid JSON
          hasProfile = true
          console.log('Found valid profile in localStorage')
        } catch (parseError) {
          console.warn('Invalid profile data in localStorage, cleaning up')
          localStorage.removeItem(`userProfile_${user.id}`)
        }
      }
      
      // If no local profile, try database (when available)
      if (!hasProfile) {
        try {
          const profiles = await blink.db.userProfiles.list({
            where: { userId: user.id },
            limit: 1
          })
          if (profiles.length > 0) {
            hasProfile = true
            // Sync to localStorage for faster future access
            localStorage.setItem(`userProfile_${user.id}`, JSON.stringify(profiles[0]))
            console.log('Found profile in database, synced to localStorage')
          }
        } catch (dbError) {
          console.warn('Database not available for profile check:', dbError)
          // This is expected during demo mode
        }
      }
      
      if (hasProfile) {
        setCurrentStep('dashboard')
      } else {
        setCurrentStep('onboarding')
      }
    } catch (error) {
      console.error('Error checking user profile:', error)
      // Default to onboarding if we can't determine profile status
      setCurrentStep('onboarding')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading InvestIQ...</p>
        </div>
      </div>
    )
  }

  const handleGetStarted = () => {
    if (user) {
      setCurrentStep('onboarding')
    } else {
      blink.auth.login()
    }
  }

  const handleOnboardingComplete = () => {
    setCurrentStep('dashboard')
  }

  if (currentStep === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} />
  }

  if (currentStep === 'onboarding' && user) {
    return <OnboardingWizard user={user} onComplete={handleOnboardingComplete} />
  }

  if (currentStep === 'dashboard' && user) {
    return <Dashboard user={user} />
  }

  return <LandingPage onGetStarted={handleGetStarted} />
}

export default App