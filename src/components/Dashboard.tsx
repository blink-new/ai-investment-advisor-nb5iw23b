import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Brain, TrendingUp, Shield, Target, LogOut, Sparkles } from 'lucide-react'
import { blink } from '../lib/blink'
import AIRecommendations from './AIRecommendations'
import PortfolioOverview from './PortfolioOverview'
import RiskAssessment from './RiskAssessment'

interface User {
  id: string
  email: string
  displayName?: string
}

interface UserProfile {
  id: string
  userId: string
  age: number
  income: string
  investmentExperience: string
  riskTolerance: string
  investmentGoals: string
  timeHorizon: string
  currentInvestments: string
  monthlyInvestment: number
  financialConcerns: string
  createdAt: string
  updatedAt: string
}

interface DashboardProps {
  user: User
}

export default function Dashboard({ user }: DashboardProps) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('recommendations')
  const [dataSource, setDataSource] = useState<'database' | 'localStorage' | null>(null)

  useEffect(() => {
    loadUserProfile()
  }, [user.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const loadUserProfile = async () => {
    try {
      let profileLoaded = false
      
      // First try localStorage (faster and more reliable for now)
      const localProfile = localStorage.getItem(`userProfile_${user.id}`)
      if (localProfile) {
        try {
          const profileData = JSON.parse(localProfile)
          setUserProfile(profileData)
          setDataSource('localStorage')
          profileLoaded = true
          console.log('Profile loaded from localStorage')
        } catch (parseError) {
          console.error('Error parsing local profile data:', parseError)
          localStorage.removeItem(`userProfile_${user.id}`) // Clean up corrupted data
        }
      }

      // Try database as secondary option (when available)
      if (!profileLoaded) {
        try {
          const profiles = await blink.db.userProfiles.list({
            where: { userId: user.id },
            limit: 1
          })
          
          if (profiles.length > 0) {
            setUserProfile(profiles[0])
            setDataSource('database')
            profileLoaded = true
            console.log('Profile loaded from database successfully')
            
            // Sync to localStorage for faster future access
            localStorage.setItem(`userProfile_${user.id}`, JSON.stringify(profiles[0]))
          }
        } catch (dbError) {
          console.warn('Database not available:', dbError)
          // This is expected during demo mode, so don't treat as error
        }
      }

      // If still no profile found, user needs to complete onboarding
      if (!profileLoaded) {
        console.log('No profile found - user needs to complete onboarding')
      }
    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    blink.auth.logout()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground mb-4">Profile not found. Please complete the onboarding process.</p>
            <Button onClick={() => window.location.reload()}>Refresh</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">InvestIQ</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {user.displayName || user.email}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout} className="flex items-center space-x-2">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Your Investment Dashboard</h2>
            {dataSource === 'localStorage' && (
              <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                Local Storage
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">
            AI-powered insights tailored to your financial goals and risk profile
            {dataSource === 'localStorage' && (
              <span className="block text-sm text-blue-600 mt-1">
                Your data is securely stored locally and fully functional
              </span>
            )}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Risk Level</p>
                  <p className="font-semibold text-foreground capitalize">{userProfile.riskTolerance}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly SIP</p>
                  <p className="font-semibold text-foreground">₹{userProfile.monthlyInvestment.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time Horizon</p>
                  <p className="font-semibold text-foreground capitalize">{userProfile.timeHorizon}-term</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Brain className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p className="font-semibold text-foreground capitalize">{userProfile.investmentExperience}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-secondary/20">
            <TabsTrigger value="recommendations" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              AI Recommendations
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Portfolio Overview
            </TabsTrigger>
            <TabsTrigger value="risk" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Risk Assessment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations">
            <AIRecommendations userProfile={userProfile} />
          </TabsContent>

          <TabsContent value="portfolio">
            <PortfolioOverview userProfile={userProfile} />
          </TabsContent>

          <TabsContent value="risk">
            <RiskAssessment userProfile={userProfile} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}