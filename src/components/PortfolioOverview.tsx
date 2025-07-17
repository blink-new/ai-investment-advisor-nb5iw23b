import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { TrendingUp, Target, DollarSign, Calendar, PieChart as PieChartIcon } from 'lucide-react'

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

interface PortfolioOverviewProps {
  userProfile: UserProfile
}

export default function PortfolioOverview({ userProfile }: PortfolioOverviewProps) {
  // Sample portfolio data based on user profile
  const portfolioData = [
    { name: 'Large Cap Equity', value: 35, color: '#6366F1' },
    { name: 'Mid Cap Equity', value: 25, color: '#10B981' },
    { name: 'Hybrid Funds', value: 20, color: '#F59E0B' },
    { name: 'Debt Funds', value: 15, color: '#EF4444' },
    { name: 'International', value: 5, color: '#8B5CF6' }
  ]

  const performanceData = [
    { month: 'Jan', returns: 8.5, benchmark: 7.2 },
    { month: 'Feb', returns: 12.3, benchmark: 9.8 },
    { month: 'Mar', returns: -2.1, benchmark: -1.5 },
    { month: 'Apr', returns: 15.7, benchmark: 12.4 },
    { month: 'May', returns: 9.8, benchmark: 8.9 },
    { month: 'Jun', returns: 11.2, benchmark: 10.1 }
  ]

  const goalProgress = [
    {
      goal: 'Emergency Fund',
      target: 500000,
      current: 125000,
      progress: 25,
      timeframe: '6 months'
    },
    {
      goal: 'House Down Payment',
      target: 2000000,
      current: 450000,
      progress: 22.5,
      timeframe: '5 years'
    },
    {
      goal: 'Retirement Fund',
      target: 10000000,
      current: 180000,
      progress: 1.8,
      timeframe: '25 years'
    }
  ]

  const totalInvested = 755000
  const currentValue = 823000
  const totalReturns = currentValue - totalInvested
  const returnPercentage = ((totalReturns / totalInvested) * 100).toFixed(1)

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Invested</p>
                <p className="text-xl font-bold text-foreground">₹{totalInvested.toLocaleString()}</p>
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
                <p className="text-sm text-muted-foreground">Current Value</p>
                <p className="text-xl font-bold text-foreground">₹{currentValue.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Returns</p>
                <p className="text-xl font-bold text-green-500">+₹{totalReturns.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Return %</p>
                <p className="text-xl font-bold text-green-500">+{returnPercentage}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Asset Allocation Chart */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChartIcon className="w-5 h-5 text-primary" />
              <span>Asset Allocation</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {portfolioData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm text-foreground">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Chart */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              <span>Performance vs Benchmark</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                    formatter={(value) => [`${value}%`, '']}
                  />
                  <Legend />
                  <Bar dataKey="returns" fill="#6366F1" name="Your Portfolio" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="benchmark" fill="#10B981" name="Benchmark" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goal Progress */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-primary" />
            <span>Goal Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {goalProgress.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">{goal.goal}</h4>
                    <p className="text-sm text-muted-foreground">
                      ₹{goal.current.toLocaleString()} of ₹{goal.target.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {goal.progress}%
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {goal.timeframe}
                    </p>
                  </div>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly SIP Tracker */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-accent" />
            <span>Monthly SIP Tracker</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-lg font-bold text-primary">₹{userProfile.monthlyInvestment.toLocaleString()}</span>
              </div>
              <p className="text-sm font-medium text-foreground">Monthly SIP</p>
              <p className="text-xs text-muted-foreground">Auto-debit on 5th</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-lg font-bold text-accent">₹{(userProfile.monthlyInvestment * 12).toLocaleString()}</span>
              </div>
              <p className="text-sm font-medium text-foreground">Annual Investment</p>
              <p className="text-xs text-muted-foreground">Projected for 2024</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-green-500/10 flex items-center justify-center">
                <span className="text-lg font-bold text-green-500">6/6</span>
              </div>
              <p className="text-sm font-medium text-foreground">SIPs Completed</p>
              <p className="text-xs text-muted-foreground">This year</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}