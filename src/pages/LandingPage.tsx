import { Link } from 'react-router-dom'
import { Smartphone, Zap, Users, CheckCircle, ArrowRight, Star, Play, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import './CSS/LandingPage.css'

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    
    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: <Smartphone className="w-12 h-12" />,
      title: "QR Code Ordering",
      description: "Instant menu access with QR scanning",
      color: "from-amber-700 to-brown-600"
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Faster Table TurnOver",
      description: "Orders directly reach kitchen under 5 seconds",
      color: "from-amber-800 to-brown-700"
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Boost Efficiency",
      description: "Reduce staff workload by 60%, with reduced mistakes and delays",
      color: "from-orange-700 to-amber-800"
    }
  ]

  const stats = [
    { number: "--", label: "Happy Restaurants" },
    { number: "--", label: "Orders Processed" },
    { number: "--", label: "Customer Rating" },
    { number: "--", label: "Cost Reduction" }
  ]

  return (
    <div className="landing-container">
      {/* Animated Background */}
      <div className="bg-animation">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`navbar ${isVisible ? 'nav-visible' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">
            <div className="logo-icon">
              <span className="logo-text">T</span>
              <div className="logo-pulse"></div>
            </div>
            <span className="brand-name">TapTable</span>
          </div>
          
          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <Link to="/admin/login" className="login-btn">
              Restaurant Login
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className={`hero-content ${isVisible ? 'hero-visible' : ''}`}>
            <div className="hero-badge">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>Trusted by 10,000+ Restaurants</span>
            </div>
            
            <h1 className="hero-title">
              Transform Your
              <span className="gradient-text"> Restaurant Experience</span>
              <br />
              with Smart QR Ordering
            </h1>
            
            <p className="hero-description">
              Eliminate wait times, reduce operational costs, and create seamless dining experiences 
              that your customers will love. Join the digital revolution today.
            </p>
            
            <div className="hero-actions">
              <Link to="/admin/login" className="cta-primary">
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <button className="cta-secondary">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>
            
            {/* Stats */}
            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={`hero-visual ${isVisible ? 'visual-visible' : ''}`}>
            {/* First Phone */}
            <div className="phone-mockup phone-1">
              <div className="phone-screen">
                <div className="menu-demo">
                  <div className="demo-header">
                    <div className="demo-logo">TapTable Menu</div>
                    <div className="table-badge">Table 7</div>
                  </div>
                  <div className="food-grid">
                    <div className="food-grid-item">
                      <img 
                        src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop" 
                        alt="Pizza"
                      />
                    </div>
                    <div className="food-grid-item">
                      <img 
                        src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop" 
                        alt="Burger"
                      />
                    </div>
                    <div className="food-grid-item">
                      <img 
                        src="https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=400&fit=crop" 
                        alt="Chicken Wings"
                      />
                    </div>
                    <div className="food-grid-item">
                      <img 
                        src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=400&fit=crop" 
                        alt="Noodles"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Phone */}
            <div className="phone-mockup phone-2">
              <div className="phone-screen">
                <div className="menu-demo">
                  <div className="demo-header">
                    <div className="demo-logo">TapTable Menu</div>
                    <div className="table-badge">Table 12</div>
                  </div>
                  <div className="food-grid">
                    <div className="food-grid-item">
                      <img 
                        src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop" 
                        alt="Pepperoni Pizza"
                      />
                    </div>
                    <div className="food-grid-item">
                      <img 
                        src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=400&fit=crop" 
                        alt="Pasta"
                      />
                    </div>
                    <div className="food-grid-item">
                      <img 
                        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop" 
                        alt="Salad"
                      />
                    </div>
                    <div className="food-grid-item">
                      <img 
                        src="https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=400&fit=crop" 
                        alt="Sushi"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Our Features</h2>
            <p className="section-description">
              Everything you need to revolutionize your restaurant operations
            </p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`feature-card ${activeFeature === index ? 'active' : ''}`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                {index === 0 && (
                  <div className="feature-image">
                    <img 
                      src="https://img.freepik.com/free-vector/mobile-ordering-concept-illustration_114360-6652.jpg" 
                      alt="QR Code Ordering System"
                      style={{ 
                        width: '150px', 
                        height: '150px', 
                        objectFit: 'contain',
                        margin: '0.5rem auto 0',
                        display: 'block'
                      }}
                    />
                  </div>
                )}
                {index === 1 && (
                  <div className="feature-image">
                    <img 
                      src="https://img.freepik.com/free-vector/restaurant-staff-concept-illustration_114360-9080.jpg" 
                      alt="Faster Table Turnover"
                      style={{ 
                        width: '150px', 
                        height: '150px', 
                        objectFit: 'contain',
                        margin: '0.5rem auto 0',
                        display: 'block'
                      }}
                    />
                  </div>
                )}
                {index === 2 && (
                  <div className="feature-image">
                    <img 
                      src="https://img.freepik.com/free-vector/chef-concept-illustration_114360-1157.jpg" 
                      alt="Boost Efficiency"
                      style={{ 
                        width: '150px', 
                        height: '150px', 
                        objectFit: 'contain',
                        margin: '0.5rem auto 0',
                        display: 'block'
                      }}
                    />
                  </div>
                )}
                <div className="feature-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">How it works</h2>
            <p className="section-description">
              Get started in 4 simple steps
            </p>
          </div>
          
          <div className="steps-wrapper">
            <div className="step-card">
              <div className="step-number-badge">1</div>
              <h4 className="step-title">Create your account</h4>
              <p className="step-description">Get started in seconds and access your restaurant dashboard</p>
            </div>
            
            <div className="step-card">
              <div className="step-number-badge">2</div>
              <h4 className="step-title">Set up your menu</h4>
              <p className="step-description">Add items, prices, and photos in a few clicks</p>
            </div>
            
            <div className="step-card">
              <div className="step-number-badge">3</div>
              <h4 className="step-title">Generate QR codes</h4>
              <p className="step-description">Create unique QR codes for each table instantly</p>
            </div>
            
            <div className="step-card">
              <div className="step-number-badge">4</div>
              <h4 className="step-title">Start serving</h4>
              <p className="step-description">Customers scan, order, and pay seamlessly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing-section">
        <div className="pricing-container">
          <div className="section-header">
            <h2 className="section-title">Pricing</h2>
            <p className="section-subtitle">No commission. No per-order fee. Flat pricing.</p>
          </div>

          <div className="pricing-cards">
            {/* Starter Plan */}
            <div className="pricing-card">
              <div className="plan-header">
                <h3 className="plan-name">Starter</h3>
                <div className="plan-price">
                  <span className="price">$29</span>
                  <span className="period">/month</span>
                </div>
              </div>
              <ul className="plan-features">
                <li><CheckCircle className="w-5 h-5" /> Up to 5 tables</li>
                <li><CheckCircle className="w-5 h-5" /> Basic menu management</li>
                <li><CheckCircle className="w-5 h-5" /> QR code ordering</li>
                <li><CheckCircle className="w-5 h-5" /> Email support</li>
                <li><CheckCircle className="w-5 h-5" /> Basic analytics</li>
              </ul>
              <button className="plan-button secondary">Get Started</button>
            </div>

            {/* Professional Plan */}
            <div className="pricing-card featured">
              <div className="popular-badge">Most Popular</div>
              <div className="plan-header">
                <h3 className="plan-name">Professional</h3>
                <div className="plan-price">
                  <span className="price">$79</span>
                  <span className="period">/month</span>
                </div>
              </div>
              <ul className="plan-features">
                <li><CheckCircle className="w-5 h-5" /> Up to 20 tables</li>
                <li><CheckCircle className="w-5 h-5" /> Advanced menu management</li>
                <li><CheckCircle className="w-5 h-5" /> QR code ordering</li>
                <li><CheckCircle className="w-5 h-5" /> Priority support</li>
                <li><CheckCircle className="w-5 h-5" /> Advanced analytics</li>
                <li><CheckCircle className="w-5 h-5" /> Custom branding</li>
                <li><CheckCircle className="w-5 h-5" /> Multiple locations</li>
              </ul>
              <button className="plan-button primary">Start Free Trial</button>
            </div>

            {/* Enterprise Plan */}
            <div className="pricing-card">
              <div className="plan-header">
                <h3 className="plan-name">Enterprise</h3>
                <div className="plan-price">
                  <span className="price">Custom</span>
                </div>
              </div>
              <ul className="plan-features">
                <li><CheckCircle className="w-5 h-5" /> Unlimited tables</li>
                <li><CheckCircle className="w-5 h-5" /> Full menu customization</li>
                <li><CheckCircle className="w-5 h-5" /> White-label solution</li>
                <li><CheckCircle className="w-5 h-5" /> 24/7 dedicated support</li>
                <li><CheckCircle className="w-5 h-5" /> Custom integrations</li>
                <li><CheckCircle className="w-5 h-5" /> Advanced reporting</li>
                <li><CheckCircle className="w-5 h-5" /> On-premise option</li>
              </ul>
              <button className="plan-button secondary">Contact Sales</button>
            </div>
          </div>

          <div className="pricing-footer">
            <p>All plans include 14-day free trial. Cancel anytime.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Your Restaurant?</h2>
            <p className="cta-description">
              Join thousands of restaurants already using TapTable to delight customers and boost profits
            </p>
            <Link to="/admin/login" className="cta-button">
              <span>Start Your Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="cta-bg-effects">
            <div className="effect-circle circle-1"></div>
            <div className="effect-circle circle-2"></div>
            <div className="effect-circle circle-3"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon">
                <span className="logo-text">T</span>
              </div>
              <span className="brand-name">TapTable</span>
            </div>
            <p className="footer-description">
              Revolutionizing restaurant experiences with smart QR ordering technology
            </p>
          </div>
          
          <div className="footer-links">
            <div className="link-group">
              <h5>Product</h5>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#demo">Demo</a>
            </div>
            <div className="link-group">
              <h5>Company</h5>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
              <a href="#careers">Careers</a>
            </div>
            <div className="link-group">
              <h5>Support</h5>
              <a href="#help">Help Center</a>
              <a href="#docs">Documentation</a>
              <a href="#api">API</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 TapTable. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
