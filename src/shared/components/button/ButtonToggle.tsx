import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../core/store';
import { toggleTheme } from '../../../modules/theme/themeSlice';

const ButtonToggle = () => {
  const dispatch = useDispatch();
  const { currentTheme } = useSelector((state: RootState) => state.theme);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <span
      onClick={handleToggle}
      className="relative cursor-pointer h-6 w-14 rounded-[25px] bg-[#4D4D4D]">
      <span
        className={`absolute h-[22px] w-[22px] transform top-1/2 -translate-y-1/2 z-10 left-[2px] rounded-[50%] bg-white transition-all ${
          currentTheme === 'dark' ? 'left-[calc(100%-26px)]' : ''
        }`}></span>

      <span className="absolute right-1 h-full text-[17px] flex items-center justify-center">
        🌞
      </span>
      <span className="absolute left-1 h-full text-[17px] flex items-center justify-center">
        🌜
      </span>
    </span>
  );
};

export default ButtonToggle;
