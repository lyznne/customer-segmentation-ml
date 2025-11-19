'use client';

import { useState } from 'react';
import { Upload, Download, Users, TrendingUp, Clock, DollarSign, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { ThemeSwitcher } from '@/components/theme-switcher';

interface ClusterData {
  name: string;
  size: number;
  percentage: number;
  metrics: {
    recency: number;
    frequency: number;
    monetary: number;
    timeSpent: number;
    itemsViewed: number;
    supportTickets: number;
    device: string;
    location: string;
  };
  recommendations: string[];
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [clusters, setClusters] = useState<ClusterData[]>([]);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Please upload a CSV file');
        setFile(null);
      }
    }
  };

  const simulateAnalysis = () => {
    setIsAnalyzing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    setTimeout(() => {
      setClusters([
        {
          name: 'High-value customers',
          size: 1298,
          percentage: 25.96,
          metrics: {
            recency: 21.54,
            frequency: 6.0,
            monetary: 428.53,
            timeSpent: 16.16,
            itemsViewed: 15.05,
            supportTickets: 1.35,
            device: 'Mobile',
            location: 'North America',
          },
          recommendations: [
            'Implement loyalty rewards program',
            'Provide exclusive early access to new products',
            'Offer premium services with personalized attention',
          ],
        },
        {
          name: 'At-risk customers',
          size: 723,
          percentage: 14.46,
          metrics: {
            recency: 22.68,
            frequency: 6.02,
            monetary: 473.88,
            timeSpent: 44.85,
            itemsViewed: 14.64,
            supportTickets: 0.34,
            device: 'Mobile',
            location: 'North America',
          },
          recommendations: [
            'Launch re-engagement campaigns with special offers',
            'Implement win-back emails with personalized discounts',
            'Conduct surveys to understand reasons for decreased activity',
          ],
        },
        {
          name: 'New customers',
          size: 1561,
          percentage: 31.22,
          metrics: {
            recency: 20.03,
            frequency: 6.04,
            monetary: 383.48,
            timeSpent: 14.63,
            itemsViewed: 14.86,
            supportTickets: 0.0,
            device: 'Mobile',
            location: 'North America',
          },
          recommendations: [
            'Create onboarding email series with product education',
            'Offer first-time purchase incentives',
            'Recommend entry-level products with good reviews',
          ],
        },
        {
          name: 'Loyal browsers',
          size: 549,
          percentage: 10.98,
          metrics: {
            recency: 93.34,
            frequency: 5.85,
            monetary: 492.53,
            timeSpent: 18.34,
            itemsViewed: 14.62,
            supportTickets: 0.45,
            device: 'Mobile',
            location: 'North America',
          },
          recommendations: [
            'Implement cart abandonment recovery emails',
            'Optimize website UX to improve conversion rates',
            'Offer limited-time discounts on frequently viewed items',
          ],
        },
        {
          name: 'Support-intensive customers',
          size: 869,
          percentage: 17.38,
          metrics: {
            recency: 21.99,
            frequency: 6.13,
            monetary: 834.78,
            timeSpent: 15.85,
            itemsViewed: 15.24,
            supportTickets: 0.33,
            device: 'Mobile',
            location: 'North America',
          },
          recommendations: [
            'Improve customer service experience',
            'Create educational content to address common issues',
            'Implement proactive support outreach',
          ],
        },
      ]);
      setIsAnalyzing(false);
    }, 3500);
  };

  const getClusterColor = (index: number) => {
    const colors = [
      'hsl(var(--chart-1))',
      'hsl(var(--chart-2))',
      'hsl(var(--chart-3))',
      'hsl(var(--chart-4))',
      'hsl(var(--chart-5))',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <div className="relative bg-primary rounded-xl p-2.5">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Customer Segmentation</h1>
              <p className="text-sm text-muted-foreground">RFM Analysis & K-Means Clustering</p>
            </div>
          </div>
          <ThemeSwitcher />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-8">
          <section className="text-center space-y-4 py-8">
            <div className="inline-block">
              <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium">
                Machine Learning Powered
              </Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
              Understand Your Customers Better
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
              Upload your customer data and get actionable insights through advanced clustering analysis.
              Identify customer segments and receive personalized marketing recommendations.
            </p>
          </section>

          <Card className="border-2 border-dashed border-primary/30 bg-secondary/30">
            <CardHeader>
              <CardTitle>Upload Customer Data</CardTitle>
              <CardDescription>
                Upload a CSV file containing customer behavioral data for segmentation analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed border-border rounded-lg bg-background/50 hover:bg-accent/5 transition-colors">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div className="text-center space-y-2">
                  <label
                    htmlFor="file-upload"
                    className="text-sm font-medium cursor-pointer hover:text-primary transition-colors"
                  >
                    <span className="underline underline-offset-4">Choose a file</span> or drag and drop
                  </label>
                  <p className="text-xs text-muted-foreground">CSV file with customer metrics</p>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {file && (
                <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded">
                      <Upload className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <Button onClick={simulateAnalysis} disabled={isAnalyzing}>
                    {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                  </Button>
                </div>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {isAnalyzing && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Processing your data...</span>
                    <span className="font-medium">{progress}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {clusters.length > 0 && (
            <>
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight">Customer Segments</h3>
                    <p className="text-muted-foreground">
                      Identified {clusters.length} distinct customer groups
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {clusters.map((cluster, index) => (
                    <Card
                      key={index}
                      className="relative overflow-hidden transition-all hover:shadow-lg hover:scale-[1.02]"
                    >
                      <div
                        className="absolute top-0 left-0 w-full h-1"
                        style={{ backgroundColor: getClusterColor(index) }}
                      />
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-lg">{cluster.name}</CardTitle>
                            <CardDescription>
                              {cluster.size.toLocaleString()} customers
                            </CardDescription>
                          </div>
                          <Badge
                            variant="secondary"
                            className="text-xs font-semibold"
                            style={{ backgroundColor: getClusterColor(index) + '20' }}
                          >
                            {cluster.percentage.toFixed(1)}%
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>Recency</span>
                            </div>
                            <p className="text-sm font-semibold">
                              {cluster.metrics.recency.toFixed(1)} days
                            </p>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <TrendingUp className="h-3 w-3" />
                              <span>Frequency</span>
                            </div>
                            <p className="text-sm font-semibold">
                              {cluster.metrics.frequency.toFixed(1)}
                            </p>
                          </div>
                          <div className="space-y-1 col-span-2">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <DollarSign className="h-3 w-3" />
                              <span>Avg. Monetary Value</span>
                            </div>
                            <p className="text-sm font-semibold">
                              ${cluster.metrics.monetary.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">Marketing Recommendations</h3>
                  <p className="text-muted-foreground">
                    Actionable strategies tailored for each customer segment
                  </p>
                </div>

                <div className="space-y-4">
                  {clusters.map((cluster, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div
                        className="h-1.5"
                        style={{ backgroundColor: getClusterColor(index) }}
                      />
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-xl">{cluster.name}</CardTitle>
                            <CardDescription>
                              {cluster.size.toLocaleString()} customers ({cluster.percentage.toFixed(1)}%)
                            </CardDescription>
                          </div>
                          <Badge
                            variant="outline"
                            className="font-mono text-xs"
                            style={{ borderColor: getClusterColor(index) }}
                          >
                            Cluster {index}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid gap-3 md:grid-cols-4 p-4 bg-muted/50 rounded-lg">
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Recency</p>
                            <p className="text-sm font-semibold">
                              {cluster.metrics.recency.toFixed(2)} days
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Frequency</p>
                            <p className="text-sm font-semibold">
                              {cluster.metrics.frequency.toFixed(2)}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Monetary Value</p>
                            <p className="text-sm font-semibold">
                              ${cluster.metrics.monetary.toFixed(2)}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs text-muted-foreground">Time Spent</p>
                            <p className="text-sm font-semibold">
                              {cluster.metrics.timeSpent.toFixed(2)} min
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold">Recommended Actions:</h4>
                          <ul className="space-y-2">
                            {cluster.recommendations.map((rec, recIndex) => (
                              <li
                                key={recIndex}
                                className="flex items-start gap-3 text-sm text-muted-foreground"
                              >
                                <div
                                  className="mt-0.5 h-1.5 w-1.5 rounded-full flex-shrink-0"
                                  style={{ backgroundColor: getClusterColor(index) }}
                                />
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </main>

      <footer className="border-t border-border/50 mt-16 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>E-Commerce Customer Segmentation</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Powered by K-Means Clustering & RFM Analysis
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
