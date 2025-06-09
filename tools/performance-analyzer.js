




import fs from 'fs';
import path from 'path';
import { performance } from 'perf_hooks';

export class PerformanceAnalyzer {
  constructor() {
    this.metrics = new Map();
    this.sessions = new Map();
    this.benchmarks = [];
    this.thresholds = {
      loadTime: 100, // ms
      renderTime: 50, // ms
      memoryUsage: 10 * 1024 * 1024, // 10MB
      bundleSize: 500 * 1024 // 500KB
    };
  }

  startSession(sessionId) {
    this.sessions.set(sessionId, {
      id: sessionId,
      startTime: performance.now(),
      events: [],
      metrics: new Map()
    });
  }

  endSession(sessionId) {
    const session = this.sessions.get(sessionId);
    if (!session) return null;

    session.endTime = performance.now();
    session.duration = session.endTime - session.startTime;
    
    const report = this.generateSessionReport(session);
    this.sessions.delete(sessionId);
    
    return report;
  }

  recordEvent(sessionId, eventName, data = {}) {
    const session = this.sessions.get(sessionId);
    if (!session) return;

    const event = {
      name: eventName,
      timestamp: performance.now(),
      duration: data.duration || 0,
      data: { ...data }
    };

    session.events.push(event);
    
    // Update session metrics
    if (!session.metrics.has(eventName)) {
      session.metrics.set(eventName, []);
    }
    session.metrics.get(eventName).push(event);
  }

  measureFunction(fn, label = 'function') {
    const startTime = performance.now();
    const startMemory = this.getMemoryUsage();
    
    let result;
    try {
      result = fn();
    } catch (error) {
      const endTime = performance.now();
      this.recordMeasurement(label, {
        duration: endTime - startTime,
        success: false,
        error: error.message
      });
      throw error;
    }
    
    const endTime = performance.now();
    const endMemory = this.getMemoryUsage();
    
    this.recordMeasurement(label, {
      duration: endTime - startTime,
      memoryDelta: endMemory - startMemory,
      success: true
    });
    
    return result;
  }

  async measureAsyncFunction(fn, label = 'asyncFunction') {
    const startTime = performance.now();
    const startMemory = this.getMemoryUsage();
    
    let result;
    try {
      result = await fn();
    } catch (error) {
      const endTime = performance.now();
      this.recordMeasurement(label, {
        duration: endTime - startTime,
        success: false,
        error: error.message
      });
      throw error;
    }
    
    const endTime = performance.now();
    const endMemory = this.getMemoryUsage();
    
    this.recordMeasurement(label, {
      duration: endTime - startTime,
      memoryDelta: endMemory - startMemory,
      success: true
    });
    
    return result;
  }

  recordMeasurement(label, data) {
    if (!this.metrics.has(label)) {
      this.metrics.set(label, []);
    }
    
    this.metrics.get(label).push({
      ...data,
      timestamp: Date.now()
    });
  }

  analyzeBundleSize(bundlePath) {
    if (!fs.existsSync(bundlePath)) {
      throw new Error(`Bundle file not found: ${bundlePath}`);
    }

    const stats = fs.statSync(bundlePath);
    const size = stats.size;
    
    const analysis = {
      path: bundlePath,
      size: size,
      sizeFormatted: this.formatBytes(size),
      exceedsThreshold: size > this.thresholds.bundleSize,
      compressionRatio: this.estimateCompressionRatio(bundlePath)
    };

    this.recordMeasurement('bundleSize', analysis);
    return analysis;
  }

  analyzeDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) {
      throw new Error(`Directory not found: ${dirPath}`);
    }

    const analysis = {
      totalFiles: 0,
      totalSize: 0,
      fileTypes: new Map(),
      largestFiles: []
    };

    const files = this.getAllFiles(dirPath);
    
    files.forEach(filePath => {
      const stats = fs.statSync(filePath);
      const ext = path.extname(filePath);
      
      analysis.totalFiles++;
      analysis.totalSize += stats.size;
      
      if (!analysis.fileTypes.has(ext)) {
        analysis.fileTypes.set(ext, { count: 0, size: 0 });
      }
      
      const typeData = analysis.fileTypes.get(ext);
      typeData.count++;
      typeData.size += stats.size;
      
      analysis.largestFiles.push({
        path: filePath,
        size: stats.size,
        sizeFormatted: this.formatBytes(stats.size)
      });
    });

    // Sort largest files
    analysis.largestFiles.sort((a, b) => b.size - a.size);
    analysis.largestFiles = analysis.largestFiles.slice(0, 10);

    // Convert file types map to object
    analysis.fileTypesSummary = {};
    for (const [ext, data] of analysis.fileTypes) {
      analysis.fileTypesSummary[ext] = {
        ...data,
        sizeFormatted: this.formatBytes(data.size)
      };
    }

    analysis.totalSizeFormatted = this.formatBytes(analysis.totalSize);
    
    return analysis;
  }

  runBenchmark(name, iterations = 100, setup = null, teardown = null) {
    const benchmark = {
      name,
      iterations,
      results: [],
      startTime: Date.now()
    };

    for (let i = 0; i < iterations; i++) {
      if (setup) setup();
      
      const startTime = performance.now();
      const startMemory = this.getMemoryUsage();
      
      // Run the actual benchmark code here
      // This would typically be passed as a parameter
      
      const endTime = performance.now();
      const endMemory = this.getMemoryUsage();
      
      benchmark.results.push({
        iteration: i + 1,
        duration: endTime - startTime,
        memoryDelta: endMemory - startMemory
      });
      
      if (teardown) teardown();
    }

    benchmark.endTime = Date.now();
    benchmark.statistics = this.calculateStatistics(benchmark.results);
    
    this.benchmarks.push(benchmark);
    return benchmark;
  }

  calculateStatistics(results) {
    const durations = results.map(r => r.duration);
    const memoryDeltas = results.map(r => r.memoryDelta);
    
    return {
      duration: {
        min: Math.min(...durations),
        max: Math.max(...durations),
        avg: durations.reduce((a, b) => a + b, 0) / durations.length,
        median: this.calculateMedian(durations),
        p95: this.calculatePercentile(durations, 95),
        p99: this.calculatePercentile(durations, 99)
      },
      memory: {
        min: Math.min(...memoryDeltas),
        max: Math.max(...memoryDeltas),
        avg: memoryDeltas.reduce((a, b) => a + b, 0) / memoryDeltas.length
      }
    };
  }

  calculateMedian(values) {
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 
      ? (sorted[mid - 1] + sorted[mid]) / 2 
      : sorted[mid];
  }

  calculatePercentile(values, percentile) {
    const sorted = [...values].sort((a, b) => a - b);
    const index = Math.ceil((percentile / 100) * sorted.length) - 1;
    return sorted[index];
  }

  getMemoryUsage() {
    if (typeof process !== 'undefined' && process.memoryUsage) {
      return process.memoryUsage().heapUsed;
    }
    return 0;
  }

  estimateCompressionRatio(filePath) {
    // Simple estimation based on file type
    const ext = path.extname(filePath).toLowerCase();
    const compressionRatios = {
      '.js': 0.3,
      '.css': 0.4,
      '.html': 0.5,
      '.json': 0.2,
      '.txt': 0.6
    };
    
    return compressionRatios[ext] || 0.5;
  }

  getAllFiles(dirPath) {
    let files = [];
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stats = fs.statSync(fullPath);
      
      if (stats.isDirectory()) {
        files = files.concat(this.getAllFiles(fullPath));
      } else {
        files.push(fullPath);
      }
    }
    
    return files;
  }

  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  generateSessionReport(session) {
    const eventSummary = {};
    
    for (const [eventName, events] of session.metrics) {
      const durations = events.map(e => e.duration).filter(d => d > 0);
      
      eventSummary[eventName] = {
        count: events.length,
        totalDuration: durations.reduce((sum, d) => sum + d, 0),
        avgDuration: durations.length > 0 ? 
          durations.reduce((sum, d) => sum + d, 0) / durations.length : 0
      };
    }

    return {
      sessionId: session.id,
      totalDuration: session.duration,
      totalEvents: session.events.length,
      eventSummary,
      performanceIssues: this.identifyPerformanceIssues(session)
    };
  }

  identifyPerformanceIssues(session) {
    const issues = [];
    
    // Check for slow events
    session.events.forEach(event => {
      if (event.duration > this.thresholds.renderTime) {
        issues.push({
          type: 'slow_event',
          event: event.name,
          duration: event.duration,
          threshold: this.thresholds.renderTime
        });
      }
    });

    // Check session duration
    if (session.duration > this.thresholds.loadTime) {
      issues.push({
        type: 'slow_session',
        duration: session.duration,
        threshold: this.thresholds.loadTime
      });
    }

    return issues;
  }

  getOverallReport() {
    const report = {
      totalSessions: this.sessions.size,
      totalMeasurements: this.metrics.size,
      totalBenchmarks: this.benchmarks.length,
      metrics: {},
      benchmarks: this.benchmarks,
      recommendations: []
    };

    // Aggregate metrics
    for (const [label, measurements] of this.metrics) {
      const durations = measurements
        .map(m => m.duration)
        .filter(d => d !== undefined && d > 0);
      
      if (durations.length > 0) {
        report.metrics[label] = this.calculateStatistics(
          measurements.map(m => ({ duration: m.duration || 0, memoryDelta: m.memoryDelta || 0 }))
        );
      }
    }

    // Generate recommendations
    report.recommendations = this.generateRecommendations(report);

    return report;
  }

  generateRecommendations(report) {
    const recommendations = [];
    
    // Check for slow operations
    for (const [label, stats] of Object.entries(report.metrics)) {
      if (stats.duration.avg > this.thresholds.renderTime) {
        recommendations.push({
          type: 'performance',
          message: `${label} average duration (${stats.duration.avg.toFixed(2)}ms) exceeds recommended threshold`,
          severity: 'warning'
        });
      }
    }

    return recommendations;
  }

  exportReport(filePath) {
    const report = this.getOverallReport();
    fs.writeFileSync(filePath, JSON.stringify(report, null, 2));
    return report;
  }

  reset() {
    this.metrics.clear();
    this.sessions.clear();
    this.benchmarks = [];
  }
}

export default PerformanceAnalyzer;



