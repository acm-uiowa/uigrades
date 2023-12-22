import React from 'react'
import { Pie } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

const BarGraph = ({course}) => {
    ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    const options = {
        responsive: true,
        plugins: {
            legend: {
            display: false,
            },
            title: {
            display: true,
            },
        },
        scales: {
            y: {
            display: false,
            beginAtZero: true,
            ticks: {
                stepSize: 1,
            },
            },
        },
    };

    const labels = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+','D','D-', 'F', 'W'];

    const data = {
      labels: labels,
      datasets: [
        {
          label: ` Hawkeyes`,
          data: [
            course["A_PLUS"],
            course["A"],
            course["A_MINUS"],
            course["B_PLUS"],
            course["B"],
            course["B_MINUS"],
            course["C_PLUS"],
            course["C"],
            course["C_MINUS"],
            course["D_PLUS"],
            course["D"],
            course["D_MINUS"],
            course["F"],
            course["WITHDRAWN"],
          ],
          backgroundColor: [
            "rgba(255, 83, 83, 0.5)",
            "rgba(255, 159, 64, 0.5)",
            "rgba(255, 305, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(153, 102, 255, 0.5)",
            "rgba(201, 203, 207, 0.5)",
            "rgba(255, 99, 132, 0.5)",
            "rgba(255, 159, 64, 0.5)",
            "rgba(255, 205, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(177, 52, 194, 0.5)",
            "rgba(95, 255, 83, 0.5)",
          ],
          borderColor: [
            "rgb(255, 0, 0)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(177, 52, 194)",
            "rgb(95, 255, 83)",
          ],
          borderWidth: 2,
        },
      ],
    };

    return (
        <Pie data={data} options={options} />
    )
}

export default BarGraph