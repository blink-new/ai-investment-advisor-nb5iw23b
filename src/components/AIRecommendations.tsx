import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { Brain, TrendingUp, Shield, Star, RefreshCw, ExternalLink } from 'lucide-react'
import { blink } from '../lib/blink'

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

interface Recommendation {
  id: string
  type: 'mutual_fund' | 'equity'
  name: string
  category: string
  riskLevel: 'Low' | 'Medium' | 'High'
  expectedReturn: string
  minInvestment: number
  reasoning: string
  pros: string[]
  cons: string[]
  allocation: number
}

interface AIRecommendationsProps {
  userProfile: UserProfile
}

export default function AIRecommendations({ userProfile }: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(false)
  const [analysisText, setAnalysisText] = useState('')

  useEffect(() => {
    generateRecommendations()
  }, [userProfile.id]) // eslint-disable-line react-hooks/exhaustive-deps

  const generateRecommendations = async () => {
    setLoading(true)
    try {
      // Create a comprehensive prompt for AI analysis
      const prompt = `
        As an expert investment advisor, analyze this user profile and provide personalized investment recommendations:

        User Profile:
        - Age: ${userProfile.age}
        - Income: ${userProfile.income}
        - Investment Experience: ${userProfile.investmentExperience}
        - Risk Tolerance: ${userProfile.riskTolerance}
        - Investment Goals: ${userProfile.investmentGoals}
        - Time Horizon: ${userProfile.timeHorizon}
        - Monthly Investment: ₹${userProfile.monthlyInvestment}
        - Current Investments: ${userProfile.currentInvestments}
        - Financial Concerns: ${userProfile.financialConcerns}

        Please provide:
        1. A detailed analysis of their financial profile
        2. 4-5 specific investment recommendations (mix of mutual funds and equities)
        3. Asset allocation strategy
        4. Risk management advice

        Format your response as a comprehensive investment analysis with specific fund/stock recommendations.
      `

      const { text } = await blink.ai.generateText({
        prompt,
        model: 'gpt-4o-mini',
        maxTokens: 2000
      })

      setAnalysisText(text)

      // Generate sample recommendations based on user profile
      const sampleRecommendations = generateSampleRecommendations(userProfile)
      setRecommendations(sampleRecommendations)

    } catch (error) {
      console.error('Error generating recommendations:', error)
      setAnalysisText('Unable to generate recommendations at this time. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const generateSampleRecommendations = (profile: UserProfile): Recommendation[] => {
    const baseRecommendations: Recommendation[] = [
      {
        id: '1',
        type: 'mutual_fund',
        name: 'SBI Bluechip Fund',
        category: 'Large Cap Equity',
        riskLevel: 'Medium',
        expectedReturn: '12-15%',
        minInvestment: 500,
        reasoning: 'Suitable for long-term wealth creation with moderate risk. Invests in established large-cap companies.',
        pros: ['Diversified portfolio', 'Professional management', 'Good track record'],
        cons: ['Market risk', 'No guaranteed returns'],
        allocation: 30
      },
      {
        id: '2',
        type: 'mutual_fund',
        name: 'HDFC Mid-Cap Opportunities Fund',
        category: 'Mid Cap Equity',
        riskLevel: 'High',
        expectedReturn: '15-18%',
        minInvestment: 500,
        reasoning: 'Higher growth potential through mid-cap companies. Suitable for aggressive investors.',
        pros: ['High growth potential', 'Emerging companies', 'Good diversification'],
        cons: ['Higher volatility', 'Market timing risk'],
        allocation: 25
      },
      {
        id: '3',
        type: 'mutual_fund',
        name: 'ICICI Prudential Balanced Advantage Fund',
        category: 'Hybrid',
        riskLevel: 'Medium',
        expectedReturn: '10-12%',
        minInvestment: 500,
        reasoning: 'Balanced approach with equity and debt allocation. Good for moderate risk tolerance.',
        pros: ['Balanced risk', 'Dynamic allocation', 'Stable returns'],
        cons: ['Lower growth potential', 'Fund manager dependency'],
        allocation: 25
      },
      {
        id: '4',
        type: 'equity',
        name: 'Reliance Industries Ltd',
        category: 'Large Cap Stock',
        riskLevel: 'Medium',
        expectedReturn: '12-16%',
        minInvestment: 2500,
        reasoning: 'Strong fundamentals and diversified business model. Good for long-term investment.',
        pros: ['Market leader', 'Diversified business', 'Strong financials'],
        cons: ['Single stock risk', 'Market volatility'],
        allocation: 10
      },
      {
        id: '5',
        type: 'mutual_fund',
        name: 'SBI Short Term Debt Fund',
        category: 'Debt',
        riskLevel: 'Low',
        expectedReturn: '6-8%',
        minInvestment: 500,
        reasoning: 'Provides stability and regular income. Good for emergency fund and short-term goals.',
        pros: ['Low risk', 'Regular income', 'Liquidity'],
        cons: ['Lower returns', 'Interest rate risk'],
        allocation: 10
      }
    ]

    // Adjust recommendations based on risk tolerance
    if (profile.riskTolerance === 'conservative') {
      return baseRecommendations.filter(r => r.riskLevel !== 'High').map(r => ({
        ...r,
        allocation: r.type === 'mutual_fund' && r.category === 'Debt' ? 40 : r.allocation
      }))
    } else if (profile.riskTolerance === 'aggressive') {
      return baseRecommendations.filter(r => r.riskLevel !== 'Low')
    }

    return baseRecommendations
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'Medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
      case 'High': return 'bg-red-500/10 text-red-500 border-red-500/20'
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
    }
  }

  const getTypeIcon = (type: string) => {
    return type === 'mutual_fund' ? <TrendingUp className="w-4 h-4" /> : <Star className="w-4 h-4" />
  }

  return (
    <div className="space-y-6">
      {/* AI Analysis Section */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-primary" />
              <span>AI Investment Analysis</span>
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={generateRecommendations}
              disabled={loading}
              className="flex items-center space-x-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Analyzing your profile...</p>
              </div>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none text-foreground">
              <div className="whitespace-pre-wrap">{analysisText}</div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recommendations Grid */}
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-foreground">Personalized Recommendations</h3>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            {recommendations.length} Recommendations
          </Badge>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {recommendations.map((rec) => (
            <Card key={rec.id} className="bg-card/50 border-border/50 hover:bg-card/80 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      {getTypeIcon(rec.type)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{rec.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{rec.category}</p>
                    </div>
                  </div>
                  <Badge className={getRiskColor(rec.riskLevel)}>
                    {rec.riskLevel} Risk
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Expected Return</p>
                    <p className="font-semibold text-accent">{rec.expectedReturn}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Min Investment</p>
                    <p className="font-semibold">₹{rec.minInvestment.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Allocation</p>
                    <p className="font-semibold text-primary">{rec.allocation}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Type</p>
                    <p className="font-semibold capitalize">{rec.type.replace('_', ' ')}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Why This Investment?</h4>
                  <p className="text-sm text-muted-foreground">{rec.reasoning}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-green-500 mb-1">Pros</h5>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {rec.pros.map((pro, index) => (
                        <li key={index}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-500 mb-1">Considerations</h5>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {rec.cons.map((con, index) => (
                        <li key={index}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Asset Allocation Summary */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-accent" />
            <span>Recommended Asset Allocation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recommendations.map((rec) => (
                <div key={rec.id} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">{rec.allocation}%</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{rec.name}</p>
                  <p className="text-xs text-muted-foreground">{rec.category}</p>
                </div>
              ))}
            </div>
            <div className="bg-secondary/20 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> This allocation is based on your risk profile and investment goals. 
                Consider rebalancing your portfolio quarterly to maintain optimal allocation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}