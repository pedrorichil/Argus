import { Chart, registerables } from 'chart.js';
import { Colors } from 'chart.js';

Chart.register(...registerables, Colors);

Chart.defaults.color = '#a0a0a0'; 
Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)'; 
Chart.defaults.plugins.legend.display = false; 
Chart.defaults.responsive = true;
Chart.defaults.maintainAspectRatio = false;