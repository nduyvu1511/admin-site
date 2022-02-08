import SideBar from '../sidebar/SideBar';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useSelector } from 'react-redux';
import { RootState } from '../../core/store';

const MainContainer = () => {
  const { isOpenSidebar } = useSelector((state: RootState) => state.modal);

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: true,
      },
    },
  };

  return (
    <section className={`max-w-full w-full`}>
      <div
        className={`w-56 border-r border-solid max-h-screen overflow-y-auto border-white-007 fixed top-header-height bottom-0 left-0 py-3 dark:bg-dark-primary 
        bg-light-bg px-6 transform transition-all ${
          !isOpenSidebar ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <SideBar />
      </div>

      {/* main content */}
      <div
        className={`mt-header-height transition-all ${
          isOpenSidebar ? 'ml-0 px-30px' : ' ml-sidebar-width px-15px'
        } py-6`}>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio
          recusandae asperiores vitae beatae, saepe alias rem. Sapiente
          doloribus molestias voluptas sed quaerat nisi temporibus aut corporis,
          expedita culpa unde suscipit?
        </p>
        <ReactApexChart options={options} type="line" height={350} />
      </div>
    </section>
  );
};

export default MainContainer;
