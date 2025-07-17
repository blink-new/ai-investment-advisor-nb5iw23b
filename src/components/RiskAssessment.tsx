import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Alert, AlertDescription } from './ui/alert'
import { Shield, AlertTriangle, TrendingUp, Target, Brain, CheckCircle } from 'lucide-react'

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

interface RiskAssessmentProps {
  userProfile: UserProfile
}

export default function RiskAssessment({ userProfile }: RiskAssessmentProps) {
  // Calculate risk score based on user profile
  const calculateRiskScore = () => {
    let score = 0
    
    // Age factor (younger = higher risk capacity)
    if (userProfile.age < 30) score += 30
    else if (userProfile.age < 40) score += 25
    else if (userProfile.age < 50) score += 20
    else score += 10
    
    // Experience factor
    if (userProfile.investmentExperience === 'experienced') score += 25
    else if (userProfile.investmentExperience === 'intermediate') score += 15
    else score += 5
    
    // Risk tolerance
    if (userProfile.riskTolerance === 'aggressive') score += 30
    else if (userProfile.riskTolerance === 'moderate') score += 20
    else score += 10
    
    // Time horizon
    if (userProfile.timeHorizon === 'long') score += 15
    else if (userProfile.timeHorizon === 'medium') score += 10
    else score += 5
    
    return Math.min(score, 100)
  }

  const riskScore = calculateRiskScore()
  
  const getRiskLevel = (score: number) => {
    if (score >= 70) return { level: 'High', color: 'text-red-500', bgColor: 'bg-red-500/10' }
    if (score >= 40) return { level: 'Moderate', color: 'text-yellow-500', bgColor: 'bg-yellow-500/10' }
    return { level: 'Conservative', color: 'text-green-500', bgColor: 'bg-green-500/10' }
  }

  const riskLevel = getRiskLevel(riskScore)

  const riskFactors = [
    {
      factor: 'Age',
      score: userProfile.age < 30 ? 85 : userProfile.age < 40 ? 70 : userProfile.age < 50 ? 55 : 30,
      description: `At ${userProfile.age} years, you have ${userProfile.age < 40 ? 'high' : userProfile.age < 50 ? 'moderate' : 'limited'} time to recover from market volatility`,
      icon: Target
    },
    {
      factor: 'Experience',
      score: userProfile.investmentExperience === 'experienced' ? 80 : userProfile.investmentExperience === 'intermediate' ? 60 : 30,
      description: `${userProfile.investmentExperience} investors can handle ${userProfile.investmentExperience === 'experienced' ? 'complex' : userProfile.investmentExperience === 'intermediate' ? 'moderate' : 'simple'} investment strategies`,
      icon: Brain
    },
    {
      factor: 'Risk Tolerance',
      score: userProfile.riskTolerance === 'aggressive' ? 90 : userProfile.riskTolerance === 'moderate' ? 60 : 30,
      description: `Your ${userProfile.riskTolerance} risk tolerance suggests ${userProfile.riskTolerance === 'aggressive' ? 'high growth' : userProfile.riskTolerance === 'moderate' ? 'balanced' : 'stable'} investments`,
      icon: TrendingUp
    },
    {
      factor: 'Time Horizon',
      score: userProfile.timeHorizon === 'long' ? 85 : userProfile.timeHorizon === 'medium' ? 60 : 35,
      description: `${userProfile.timeHorizon}-term investment horizon allows for ${userProfile.timeHorizon === 'long' ? 'aggressive growth' : userProfile.timeHorizon === 'medium' ? 'moderate growth' : 'conservative'} strategies`,
      icon: Shield
    }
  ]

  const riskMitigationStrategies = [
    {
      strategy: 'Diversification',
      description: 'Spread investments across different asset classes, sectors, and geographies',
      implemented: true
    },
    {
      strategy: 'Systematic Investment',
      description: 'Use SIP to average out market volatility over time',
      implemented: true
    },
    {
      strategy: 'Emergency Fund',
      description: 'Maintain 6-12 months of expenses in liquid funds',
      implemented: false
    },
    {
      strategy: 'Regular Review',
      description: 'Quarterly portfolio review and rebalancing',
      implemented: true
    },
    {
      strategy: 'Goal-based Allocation',
      description: 'Align investments with specific financial goals and timelines',
      implemented: true
    }
  ]

  const portfolioRisks = [
    {
      risk: 'Market Risk',
      level: 'High',
      impact: 'Portfolio value may fluctuate with market conditions',
      mitigation: 'Long-term investment horizon and diversification'
    },
    {
      risk: 'Inflation Risk',
      level: 'Medium',
      impact: 'Returns may not keep pace with inflation',
      mitigation: 'Equity allocation and inflation-indexed bonds'
    },
    {
      risk: 'Concentration Risk',
      level: 'Low',
      impact: 'Over-exposure to specific sectors or assets',
      mitigation: 'Diversified mutual fund portfolio'
    },
    {
      risk: 'Liquidity Risk',
      level: 'Low',
      impact: 'Difficulty in converting investments to cash quickly',
      mitigation: 'Balanced allocation with liquid funds'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Risk Score Overview */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-primary" />
            <span>Your Risk Profile</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className={`w-24 h-24 mx-auto mb-4 rounded-full ${riskLevel.bgColor} flex items-center justify-center`}>
              <span className={`text-2xl font-bold ${riskLevel.color}`}>{riskScore}</span>
            </div>
            <h3 className={`text-xl font-semibold ${riskLevel.color} mb-2`}>{riskLevel.level} Risk Profile</h3>
            <p className="text-muted-foreground">
              Based on your age, experience, goals, and risk tolerance
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-foreground mb-3">Risk Capacity</h4>
              <Progress value={riskScore} className="h-3 mb-2" />
              <p className="text-sm text-muted-foreground">
                Your ability to take investment risks based on financial situation
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-3">Recommended Allocation</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Equity</span>
                  <span className="font-medium">{riskScore > 70 ? '70-80%' : riskScore > 40 ? '50-60%' : '30-40%'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Debt</span>
                  <span className="font-medium">{riskScore > 70 ? '20-30%' : riskScore > 40 ? '40-50%' : '60-70%'}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Factors Analysis */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-accent" />
            <span>Risk Factors Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {riskFactors.map((factor, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <factor.icon className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-foreground">{factor.factor}</h4>
                  <Badge variant="secondary" className="ml-auto">
                    {factor.score}/100
                  </Badge>
                </div>
                <Progress value={factor.score} className="h-2" />
                <p className="text-sm text-muted-foreground">{factor.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Risks */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            <span>Portfolio Risk Analysis</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {portfolioRisks.map((risk, index) => (
              <div key={index} className="border border-border/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground">{risk.risk}</h4>
                  <Badge 
                    className={
                      risk.level === 'High' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                      risk.level === 'Medium' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                      'bg-green-500/10 text-green-500 border-green-500/20'
                    }
                  >
                    {risk.level}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{risk.impact}</p>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-accent">Mitigation:</span>
                  <span className="text-sm text-muted-foreground">{risk.mitigation}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Mitigation Strategies */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Risk Mitigation Strategies</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskMitigationStrategies.map((strategy, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                  strategy.implemented ? 'bg-green-500/10' : 'bg-yellow-500/10'
                }`}>
                  <CheckCircle className={`w-4 h-4 ${
                    strategy.implemented ? 'text-green-500' : 'text-yellow-500'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-foreground">{strategy.strategy}</h4>
                    <Badge 
                      variant={strategy.implemented ? 'default' : 'secondary'}
                      className={strategy.implemented ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}
                    >
                      {strategy.implemented ? 'Implemented' : 'Recommended'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{strategy.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Recommendations */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Risk Management Recommendation:</strong> Based on your {riskLevel.level.toLowerCase()} risk profile, 
          consider implementing an emergency fund strategy and review your portfolio allocation quarterly. 
          Your current risk score of {riskScore} suggests you can handle moderate market volatility while 
          maintaining a balanced approach to wealth creation.
        </AlertDescription>
      </Alert>
    </div>
  )
}