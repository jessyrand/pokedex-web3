import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);

export default function PokemonChart({ stats }) {
  const chartData = {
    labels: stats.map((stat => stat.stat.name)),
    datasets: [
      {
        label: '',
        data: stats.map(stat => stat.base_stat),
        backgroundColor: stats.map(stat => stat.base_stat < 50 ? '#DC3E26' : '#2DA049'),
        borderColor: '#D2691E',
        borderWidth: 0,
      }
    ]
  }

  const chartOptions = {
    responsive: true,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: "end",
        align: "center",
        color: "#000",
        font: {
          weight: "bold",
        },
        formatter: (value) => value,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 170,
        ticks: {
          display: false,
        },
        grid: {
          display: false
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: '#000',
        },
        grid: {
          display: false
        },
      }
    },
    barPercentage: 0.5,
    categoryPercentage: 0.95
  }

  return (
    <div>
      <Bar data={chartData} options={chartOptions} />
    </div>
  )

}
