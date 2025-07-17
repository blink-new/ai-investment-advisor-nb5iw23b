import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Brain, TrendingUp, Shield, Zap, Target, Users } from 'lucide-react'

interface LandingPageProps {
  onGetStarted: () => void
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">InvestIQ</span>
            </div>
            <Button onClick={onGetStarted} className="bg-primary hover:bg-primary/90">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 bg-primary/10 text-primary border-primary/20">
              AI-Powered Investment Intelligence
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Your Personal
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> AI Investment </span>
              Advisor
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your investment fears into confidence with personalized mutual fund and equity recommendations. 
              Our AI analyzes your financial profile to suggest the perfect investment strategy with detailed reasoning.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={onGetStarted}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
              >
                Start Your Investment Journey
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary/20 hover:bg-primary/10 px-8 py-3 text-lg"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose InvestIQ?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced AI technology meets personalized investment guidance
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card/50 border-border/50 hover:bg-card/80 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">AI-Powered Analysis</h3>
                <p className="text-muted-foreground">
                  Advanced algorithms analyze your financial profile, risk tolerance, and goals to provide personalized recommendations.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 hover:bg-card/80 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Smart Recommendations</h3>
                <p className="text-muted-foreground">
                  Get curated mutual fund and equity suggestions with detailed reasoning and performance projections.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 hover:bg-card/80 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Risk Management</h3>
                <p className="text-muted-foreground">
                  Comprehensive risk assessment helps you understand and manage investment risks effectively.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 hover:bg-card/80 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Instant Insights</h3>
                <p className="text-muted-foreground">
                  Real-time market analysis and portfolio optimization suggestions to maximize your returns.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 hover:bg-card/80 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Goal-Based Planning</h3>
                <p className="text-muted-foreground">
                  Set and track financial goals with personalized investment timelines and milestone tracking.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 hover:bg-card/80 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Educational Support</h3>
                <p className="text-muted-foreground">
                  Learn as you invest with personalized educational content and investment psychology insights.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Transform Your Investment Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of investors who have overcome their fears and built successful portfolios with InvestIQ.
          </p>
          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-4 text-lg"
          >
            Start Free Analysis
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-md flex items-center justify-center">
                <Brain className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground">InvestIQ</span>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2024 InvestIQ. Empowering smart investment decisions with AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}