import { useSelector } from 'react-redux';
import { RootState } from '../../core/store';

const useLocale = () => {
  const language = useSelector((state: RootState) => state.language.language);
  return language;
};

export default useLocale;
