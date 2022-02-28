import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useSelector } from 'react-redux';
import { RootState } from '../../core/store';

const DashboardContainer = () => {
  const { isOpenSidebar } = useSelector((state: RootState) => state.modal);

  const options: ApexOptions = {
    chart: {
      id: 'basic-bar',
    },
    tooltip: {
      enabled: true,
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
  };

  const series = [
    {
      name: 'series-1',
      data: [30, 40, 45, 50, 49, 60, 70, 91, 45, 12, 90, 100, 101],
    },
  ];

  const series2 = [44, 55, 13, 43, 22];

  const options2: ApexOptions = {
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: ['Pizza', 'Burgers', 'Pasta', 'Dessert', 'Cold Drinks'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 mb-7">
        <div
          className="col-span-3 lg:col-span-2 bg-white border border-black-007
            border-solid shadow-shadow-3 dark:bg-[#0E1726] p-5 rounded-md">
          <ReactApexChart options={options} series={series} type="bar" />
        </div>

        <div
          className="col-span-1 lg:col-span-1 bg-white border border-black-007
            border-solid shadow-shadow-3 dark:bg-[#0E1726] p-5 rounded-md flex items-center flex-col">
          <h3 className="mb-8 text-lg text-dark-text-bold font-semibold w-full">
            Sales by category
          </h3>
          <ReactApexChart
            options={options2}
            series={series2}
            type="pie"
            height={500}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
        <div
          className="col-span-3 lg:col-span-2 bg-white border border-black-007
            border-solid shadow-shadow-3 dark:bg-[#0E1726] p-5 rounded-md">
          <ReactApexChart options={options} series={series} type="bar" />
        </div>

        <div
          className="col-span-1 lg:col-span-1 bg-white border border-black-007
            border-solid shadow-shadow-3 dark:bg-[#0E1726] p-5 rounded-md flex items-center flex-col">
          <h3 className="mb-8 text-lg text-dark-text-bold font-semibold w-full">
            Sales by category
          </h3>
          <ReactApexChart options={options2} series={series2} type="donut" />
        </div>
      </div>
    </section>
  );
};

export default DashboardContainer;
