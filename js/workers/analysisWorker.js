






/**
 * Purpose: Background web worker for performance analysis and optimization
 * Key features: Performance monitoring, data analysis, statistics calculation, optimization recommendations
 * Dependencies: Performance APIs, statistical algorithms, memory monitoring
 * Related helpers: Data aggregation, trend analysis, performance metrics, optimization suggestions
 * Function names: analyzePerformance, calculateStatistics, monitorMemory, generateReports, optimizeData
 * MIT License: https://github.com/AllieBaig/LingoQuest/blob/main/LICENSE
 * Timestamp: 2024-06-06 20:30 | File: js/workers/analysisWorker.js
 */

// Web Worker for LingoQuest performance analysis and optimization
// Handles CPU-intensive analytics to maintain smooth user experience

let performanceData = [];
let analysisConfig = {};
let isInitialized = false;
let analysisInterval = null;

// Message handler for communication with main thread
self.addEventListener('message', async function(event) {
    const { type, payload, id } = event.data;
    
    try {
        let result;
        
        switch (type) {
            case 'INIT_ANALYSIS':
                result = await initializeAnalysis(payload);
                break;
                
            case 'ANALYZE_PERFORMANCE':
                result = await analyzePerformance(payload);
                break;
                
            case 'CALCULATE_STATISTICS':
                result = calculateStatistics(payload);
                break;
                
            case 'ANALYZE_USER_BEHAVIOR':
                result = analyzeUserBehavior(payload);
                break;
                
            case 'GENERATE_REPORT':
                result = generateReport(payload);
                break;
                
            case 'OPTIMIZE_DATA':
                result = optimizeData(payload);
                break;
                
            case 'MONITOR_MEMORY':
                result = monitorMemoryUsage(payload);
                break;
                
            case 'ANALYZE_GAME_SESSION':
                result = analyzeGameSession(payload);
                break;
                
            case 'DETECT_PATTERNS':
                result = detectPatterns(payload);
                break;
                
            case 'GET_RECOMMENDATIONS':
                result = getOptimizationRecommendations(payload);
                break;
                
            default:
                throw new Error(`Unknown analysis type: ${type}`);
        }
        
        // Send success response
        self.postMessage({
            type: 'ANALYSIS_SUCCESS',
            id,
            result
        });
        
    } catch (error) {
        // Send error response
        self.postMessage({
            type: 'ANALYSIS_ERROR',
            id,
            error: {
                message: error.message,
                stack: error.stack
            }
        });
    }
});

// Initialize analysis worker
async function initializeAnalysis(config) {
    try {
        console.log('📊 Initializing AnalysisWorker...');
        
        analysisConfig = {
            sampleRate: 1000, // ms
            memoryThreshold: 50 * 1024 * 1024, // 50MB
            performanceWindow: 60 * 1000, // 1 minute
            reportInterval: 5 * 60 * 1000, // 5 minutes
            ...config
        };
        
        // Initialize performance data storage
        performanceData = [];
        
        // Start continuous monitoring if enabled
        if (analysisConfig.continuousMonitoring) {
            startContinuousAnalysis();
        }
        
        isInitialized = true;
        console.log('✅ AnalysisWorker initialized successfully');
        
        return {
            success: true,
            message: 'Analysis worker initialized',
            config: analysisConfig
        };
        
    } catch (error) {
        console.error('❌ Analysis worker initialization failed:', error);
        throw error;
    }
}

// Start continuous performance analysis
function startContinuousAnalysis() {
    if (analysisInterval) {
        clearInterval(analysisInterval);
    }
    
    analysisInterval = setInterval(() => {
        // Collect performance metrics
        const metrics = collectPerformanceMetrics();
        performanceData.push(metrics);
        
        // Keep only recent data (last hour)
        const maxAge = 60 * 60 * 1000; // 1 hour
        const cutoff = Date.now() - maxAge;
        performanceData = performanceData.filter(data => data.timestamp > cutoff);
        
        // Send periodic update
        self.postMessage({
            type: 'PERFORMANCE_UPDATE',
            data: metrics
        });
        
    }, analysisConfig.sampleRate);
}

// Collect current performance metrics
function collectPerformanceMetrics() {
    const timestamp = Date.now();
    
    return {
        timestamp,
        memory: getMemoryUsage(),
        timing: getTimingMetrics(),
        workload: getCurrentWorkload()
    };
}

// Get memory usage information
function getMemoryUsage() {
    // Note: Some APIs may not be available in web workers
    return {
        used: self.performance?.memory?.usedJSHeapSize || 0,
        total: self.performance?.memory?.totalJSHeapSize || 0,
        limit: self.performance?.memory?.jsHeapSizeLimit || 0,
        timestamp: Date.now()
    };
}

// Get timing metrics
function getTimingMetrics() {
    return {
        now: performance.now(),
        timestamp: Date.now()
    };
}

// Get current workload estimation
function getCurrentWorkload() {
    return {
        activeAnalyses: 0, // Would track active analysis tasks
        queueSize: 0,     // Would track pending analysis queue
        cpuEstimate: 'low' // Would estimate CPU usage
    };
}

// Analyze performance data
async function analyzePerformance(data) {
    if (!isInitialized) {
        throw new Error('Analysis worker not initialized');
    }
    
    const {
        metrics,
        timeRange,
        analysisType = 'comprehensive'
    } = data;
    
    console.log(`📊 Analyzing performance data (${analysisType})`);
    
    const analysis = {
        timestamp: Date.now(),
        timeRange,
        analysisType,
        summary: {},
        details: {},
        recommendations: []
    };
    
    // Memory analysis
    if (metrics.memory) {
        analysis.memory = analyzeMemoryMetrics(metrics.memory);
    }
    
    // Timing analysis
    if (metrics.timing) {
        analysis.timing = analyzeTimingMetrics(metrics.timing);
    }
    
    // Performance trends
    if (metrics.trends) {
        analysis.trends = analyzeTrends(metrics.trends);
    }
    
    // Generate recommendations
    analysis.recommendations = generatePerformanceRecommendations(analysis);
    
    // Calculate overall score
    analysis.score = calculatePerformanceScore(analysis);
    
    console.log(`✅ Performance analysis completed (Score: ${analysis.score})`);
    
    return analysis;
}

// Analyze memory metrics
function analyzeMemoryMetrics(memoryData) {
    const analysis = {
        current: memoryData[memoryData.length - 1] || {},
        peak: { used: 0, total: 0 },
        average: { used: 0, total: 0 },
        trend: 'stable',
        issues: []
    };
    
    // Calculate peak and average
    let totalUsed = 0;
    let totalSize = 0;
    
    memoryData.forEach(data => {
        totalUsed += data.used;
        totalSize += data.total;
        
        if (data.used > analysis.peak.used) {
            analysis.peak.used = data.used;
        }
        if (data.total > analysis.peak.total) {
            analysis.peak.total = data.total;
        }
    });
    
    analysis.average.used = totalUsed / memoryData.length;
    analysis.average.total = totalSize / memoryData.length;
    
    // Analyze trend
    if (memoryData.length >= 2) {
        const recent = memoryData.slice(-10); // Last 10 samples
        const slope = calculateLinearTrend(recent.map((d, i) => [i, d.used]));
        
        if (slope > 1000000) { // 1MB per sample
            analysis.trend = 'increasing';
        } else if (slope < -1000000) {
            analysis.trend = 'decreasing';
        }
    }
    
    // Identify issues
    const currentUsage = analysis.current.used / analysis.current.total;
    if (currentUsage > 0.9) {
        analysis.issues.push('high_memory_usage');
    }
    
    if (analysis.trend === 'increasing') {
        analysis.issues.push('memory_leak_potential');
    }
    
    return analysis;
}

// Analyze timing metrics
function analyzeTimingMetrics(timingData) {
    const analysis = {
        responseTime: {},
        frameRate: {},
        issues: []
    };
    
    // Calculate response time statistics
    const responseTimes = timingData.map(d => d.responseTime).filter(t => t);
    if (responseTimes.length > 0) {
        analysis.responseTime = {
            average: responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length,
            min: Math.min(...responseTimes),
            max: Math.max(...responseTimes),
            p95: percentile(responseTimes, 95),
            p99: percentile(responseTimes, 99)
        };
        
        // Check for performance issues
        if (analysis.responseTime.p95 > 100) {
            analysis.issues.push('slow_response_time');
        }
    }
    
    return analysis;
}

// Analyze trends in data
function analyzeTrends(trendData) {
    const analysis = {
        direction: 'stable',
        strength: 'weak',
        correlation: 0,
        forecast: null
    };
    
    if (trendData.length < 3) {
        return analysis;
    }
    
    // Calculate linear trend
    const points = trendData.map((value, index) => [index, value]);
    const slope = calculateLinearTrend(points);
    
    // Determine trend direction
    if (slope > 0.1) {
        analysis.direction = 'increasing';
    } else if (slope < -0.1) {
        analysis.direction = 'decreasing';
    }
    
    // Calculate trend strength (R-squared)
    analysis.correlation = calculateCorrelation(points);
    
    if (Math.abs(analysis.correlation) > 0.8) {
        analysis.strength = 'strong';
    } else if (Math.abs(analysis.correlation) > 0.5) {
        analysis.strength = 'moderate';
    }
    
    // Simple forecast (next 5 points)
    if (analysis.strength !== 'weak') {
        analysis.forecast = [];
        for (let i = 1; i <= 5; i++) {
            const nextIndex = trendData.length + i - 1;
            const predictedValue = slope * nextIndex + calculateIntercept(points);
            analysis.forecast.push(predictedValue);
        }
    }
    
    return analysis;
}

// Calculate statistics for datasets
function calculateStatistics(data) {
    const { dataset, metrics = ['basic'] } = data;
    
    if (!Array.isArray(dataset) || dataset.length === 0) {
        return { error: 'Invalid or empty dataset' };
    }
    
    const stats = {
        count: dataset.length,
        timestamp: Date.now()
    };
    
    // Basic statistics
    if (metrics.includes('basic') || metrics.includes('all')) {
        const values = dataset.map(item => 
            typeof item === 'number' ? item : item.value || 0
        );
        
        stats.basic = {
            sum: values.reduce((a, b) => a + b, 0),
            mean: values.reduce((a, b) => a + b, 0) / values.length,
            median: calculateMedian(values),
            mode: calculateMode(values),
            min: Math.min(...values),
            max: Math.max(...values),
            range: Math.max(...values) - Math.min(...values),
            standardDeviation: calculateStandardDeviation(values),
            variance: calculateVariance(values)
        };
    }
    
    // Advanced statistics
    if (metrics.includes('advanced') || metrics.includes('all')) {
        const values = dataset.map(item => 
            typeof item === 'number' ? item : item.value || 0
        );
        
        stats.advanced = {
            skewness: calculateSkewness(values),
            kurtosis: calculateKurtosis(values),
            percentiles: {
                p10: percentile(values, 10),
                p25: percentile(values, 25),
                p75: percentile(values, 75),
                p90: percentile(values, 90),
                p95: percentile(values, 95),
                p99: percentile(values, 99)
            },
            quartiles: {
                q1: percentile(values, 25),
                q2: percentile(values, 50),
                q3: percentile(values, 75),
                iqr: percentile(values, 75) - percentile(values, 25)
            }
        };
    }
    
    // Distribution analysis
    if (metrics.includes('distribution') || metrics.includes('all')) {
        stats.distribution = analyzeDistribution(dataset);
    }
    
    return stats;
}

// Analyze user behavior patterns
function analyzeUserBehavior(data) {
    const { events, timeframe } = data;
    
    const analysis = {
        timestamp: Date.now(),
        timeframe,
        patterns: {},
        insights: [],
        recommendations: []
    };
    
    // Session patterns
    analysis.patterns.sessions = analyzeSessionPatterns(events);
    
    // Interaction patterns
    analysis.patterns.interactions = analyzeInteractionPatterns(events);
    
    // Performance patterns
    analysis.patterns.performance = analyzePerformancePatterns(events);
    
    // Generate insights
    analysis.insights = generateBehaviorInsights(analysis.patterns);
    
    // Generate recommendations
    analysis.recommendations = generateBehaviorRecommendations(analysis.insights);
    
    return analysis;
}

// Analyze game session data
function analyzeGameSession(sessionData) {
    const {
        gameMode,
        questions,
        answers,
        timeSpent,
        score,
        difficulty
    } = sessionData;
    
    const analysis = {
        gameMode,
        difficulty,
        timestamp: Date.now(),
        performance: {},
        patterns: {},
        insights: []
    };
    
    // Performance metrics
    analysis.performance = {
        accuracy: (answers.filter(a => a.correct).length / answers.length) * 100,
        averageTime: timeSpent.reduce((a, b) => a + b, 0) / timeSpent.length,
        totalTime: timeSpent.reduce((a, b) => a + b, 0),
        score: score,
        efficiency: score / (timeSpent.reduce((a, b) => a + b, 0) / 1000) // points per second
    };
    
    // Answer patterns
    analysis.patterns.answers = {
        streak: calculateLongestStreak(answers.map(a => a.correct)),
        consistency: calculateConsistency(answers.map(a => a.correct)),
        timeProgression: analyzeTimeProgression(timeSpent),
        difficultyResponse: analyzeDifficultyResponse(questions, answers)
    };
    
    // Generate insights
    analysis.insights = generateGameInsights(analysis);
    
    return analysis;
}

// Detect patterns in data
function detectPatterns(data) {
    const { dataset, patternTypes = ['trends', 'cycles', 'anomalies'] } = data;
    
    const patterns = {
        timestamp: Date.now(),
        detected: []
    };
    
    // Trend detection
    if (patternTypes.includes('trends')) {
        const trends = detectTrends(dataset);
        patterns.detected.push(...trends);
    }
    
    // Cycle detection
    if (patternTypes.includes('cycles')) {
        const cycles = detectCycles(dataset);
        patterns.detected.push(...cycles);
    }
    
    // Anomaly detection
    if (patternTypes.includes('anomalies')) {
        const anomalies = detectAnomalies(dataset);
        patterns.detected.push(...anomalies);
    }
    
    return patterns;
}

// Generate optimization recommendations
function getOptimizationRecommendations(data) {
    const { analysisResults, targetMetrics } = data;
    
    const recommendations = {
        timestamp: Date.now(),
        priority: 'medium',
        categories: {
            performance: [],
            memory: [],
            user_experience: [],
            accessibility: []
        },
        actionItems: []
    };
    
    // Performance recommendations
    if (analysisResults.performance) {
        recommendations.categories.performance = generatePerformanceRecommendations(analysisResults.performance);
    }
    
    // Memory recommendations
    if (analysisResults.memory) {
        recommendations.categories.memory = generateMemoryRecommendations(analysisResults.memory);
    }
    
    // UX recommendations
    if (analysisResults.userBehavior) {
        recommendations.categories.user_experience = generateUXRecommendations(analysisResults.userBehavior);
    }
    
    // Accessibility recommendations
    if (analysisResults.accessibility) {
        recommendations.categories.accessibility = generateAccessibilityRecommendations(analysisResults.accessibility);
    }
    
    // Prioritize recommendations
    recommendations.actionItems = prioritizeRecommendations(recommendations.categories);
    
    return recommendations;
}

// Generate comprehensive analysis report
function generateReport(data) {
    const { 
        timeRange, 
        includeCharts = false,
        format = 'json' 
    } = data;
    
    const report = {
        metadata: {
            generated: Date.now(),
            timeRange,
            format,
            version: '1.0.0'
        },
        summary: {},
        sections: {},
        appendix: {}
    };
    
    // Executive summary
    report.summary = {
        overallScore: calculateOverallScore(),
        keyMetrics: getKeyMetrics(),
        criticalIssues: getCriticalIssues(),
        improvements: getImprovementAreas()
    };
    
    // Detailed sections
    report.sections = {
        performance: summarizePerformanceData(),
        memory: summarizeMemoryData(),
        userBehavior: summarizeUserBehavior(),
        recommendations: getTopRecommendations()
    };
    
    // Charts data (if requested)
    if (includeCharts) {
        report.charts = generateChartData();
    }
    
    return report;
}

// Utility functions for statistical calculations
function calculateMedian(values) {
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function calculateMode(values) {
    const frequency = {};
    values.forEach(value => frequency[value] = (frequency[value] || 0) + 1);
    return Object.keys(frequency).reduce((a, b) => frequency[a] > frequency[b] ? a : b);
}

function calculateStandardDeviation(values) {
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
    return Math.sqrt(variance);
}

function calculateVariance(values) {
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    return values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
}

function percentile(values, p) {
    const sorted = [...values].sort((a, b) => a - b);
    const index = (p / 100) * (sorted.length - 1);
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    return lower === upper ? sorted[lower] : 
           sorted[lower] * (upper - index) + sorted[upper] * (index - lower);
}

function calculateLinearTrend(points) {
    const n = points.length;
    const sumX = points.reduce((sum, point) => sum + point[0], 0);
    const sumY = points.reduce((sum, point) => sum + point[1], 0);
    const sumXY = points.reduce((sum, point) => sum + point[0] * point[1], 0);
    const sumXX = points.reduce((sum, point) => sum + point[0] * point[0], 0);
    
    return (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
}

function calculateCorrelation(points) {
    const n = points.length;
    const sumX = points.reduce((sum, point) => sum + point[0], 0);
    const sumY = points.reduce((sum, point) => sum + point[1], 0);
    const sumXY = points.reduce((sum, point) => sum + point[0] * point[1], 0);
    const sumXX = points.reduce((sum, point) => sum + point[0] * point[0], 0);
    const sumYY = points.reduce((sum, point) => sum + point[1] * point[1], 0);
    
    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumXX - sumX * sumX) * (n * sumYY - sumY * sumY));
    
    return denominator === 0 ? 0 : numerator / denominator;
}

// Stub functions for complex analysis (would be implemented based on requirements)
function analyzeSessionPatterns() { return {}; }
function analyzeInteractionPatterns() { return {}; }
function analyzePerformancePatterns() { return {}; }
function generateBehaviorInsights() { return []; }
function generateBehaviorRecommendations() { return []; }
function generatePerformanceRecommendations() { return []; }
function generateMemoryRecommendations() { return []; }
function calculatePerformanceScore() { return 85; }
function analyzeDistribution() { return {}; }
function detectTrends() { return []; }
function detectCycles() { return []; }
function detectAnomalies() { return []; }
function calculateLongestStreak() { return 0; }
function calculateConsistency() { return 0; }
function analyzeTimeProgression() { return {}; }
function analyzeDifficultyResponse() { return {}; }
function generateGameInsights() { return []; }

// Log that worker is ready
console.log('📊 AnalysisWorker loaded and ready');





